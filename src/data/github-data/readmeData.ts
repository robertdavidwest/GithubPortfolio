import {Octokit} from "@octokit/rest";

import {About, AboutItem, Skill, SkillGroup} from "../dataDef";

const octokit = new Octokit();

async function getUserReadMeRawData(user: string) {
  const {data} = await octokit.rest.repos.getContent({
    owner: user,
    repo: user,
    path: 'README.md',
  });
  if("content" in data){
    const content: string = Buffer.from(data.content, 'base64').toString();
    return content;
  } else return "";
}

export function getRawTaggedData(str: string, tagName: string) {
  let data;
  const openTag = `<!-- ${tagName}-start -->`;
  const closeTag = `<!-- ${tagName}-end -->`;
  data = str.split(openTag)[1];
  data = data.split(closeTag)[0];
  return data;
}

function trimEmptyLines(str: string) {
  if (!str) return str;
  return str.replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, '').trim();
}

function formatDescription(str: string) {
  return trimEmptyLines(str).split('\n').filter(x=>x!=='');
}

function formatAboutMeList(str: string) {
  str = trimEmptyLines(str);
  const aboutItems : AboutItem[] = [];
  for (let item of str.split('\n')) {
    item = item.slice(0, 2) === '- ' ? item.slice(2) : item;
    const [label, text] = item.split(': ');
    aboutItems.push({label, text});
  }
  return aboutItems;
}

function formatRawSkill(str: string){
 const [name, levelStr] = str.split(": ");
 const level = Number(levelStr.replace("/10", ""));
 return {name, level}
}

function formatSkillGroup(str: string){
  const name = str.substring(0, str.indexOf(": "));
  const levelsRaw =  str.substring(str.indexOf(": ") + 2);
  const skillLevelListRaw = levelsRaw.split(", ");
  const skills : Skill[] = [];
  skillLevelListRaw.forEach((x:string)=>{
    skills.push(formatRawSkill(x));
  })
  return {name, skills};
}

function formatSkillsList(str: string) {
  str = trimEmptyLines(str);
  const skills : SkillGroup[] = [];
  for (let item of str.split('\n')) {
    item = item.slice(0, 2) === '- ' ? item.slice(2) : item;
    skills.push(formatSkillGroup(item))
  }
  return skills;
}

async function getProfileImgSrc(username: string){
  const res = await fetch(`https://api.github.com/users/${username}`);
  const {id} = await res.json();
  return `https://avatars.githubusercontent.com/u/${id}`;
}

async function getAboutData(raw: string, username: string){
  const rawDescription : string = getRawTaggedData(raw, 'description');
  const descParagraphs: string[] = formatDescription(rawDescription);
  const rawAboutMe: string = getRawTaggedData(raw, 'aboutme-list')  
  const aboutItems: AboutItem[] = formatAboutMeList(rawAboutMe);
  
  const profileImageSrc : string = await getProfileImgSrc(username);
  const about: About = {descParagraphs, aboutItems, profileImageSrc} ;
  return about;
}

function getSkillsData(raw: string){
  const rawSkills: string = getRawTaggedData(raw, 'skills')  
  const skills : SkillGroup[] = formatSkillsList(rawSkills)
  return skills
}

export async function getReadmeData(username: string) {
  const raw = await getUserReadMeRawData(username);
  const about: About = await getAboutData(raw, username);
  const skills: SkillGroup[] = getSkillsData(raw);
  return {about, skills};
  }
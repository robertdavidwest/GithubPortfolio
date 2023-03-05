import {Octokit} from "@octokit/rest";

import {About, AboutItem} from "../dataDef";

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

function getRawTaggedData(str: string, tagName: string) {
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

export interface AboutMeList {
  Location: string;
  Nationality: string;
  Study: string;
  Interests: string
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
    // const Icon = mapLabelToIcon(label);
    aboutItems.push({label, text});
  }
  return aboutItems;
}

export async function getReadmeData(username: string) {
  const raw = await getUserReadMeRawData(username);

  const rawDescription : string = getRawTaggedData(raw, 'description');
  const descParagraphs: string[] = formatDescription(rawDescription);
  // const descParagraphs: string[] = pipe((x: string) => getRawTaggedData(x, 'description'), 
                                        // formatDescription)(raw);
  const rawAboutMe: string = getRawTaggedData(raw, 'aboutme-list')  
  const aboutItems: AboutItem[] = formatAboutMeList(rawAboutMe);

  const about: About = {descParagraphs, aboutItems};
  return about;
  }
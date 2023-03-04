import {Octokit} from "@octokit/rest";

import {pipe} from "../toolz"

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

interface AboutMeList {
  Location: string;
  Nationality: string;
  Study: string;
  Interests: string
}

function formatDescription(str: string) {
  const lines: string[] = trimEmptyLines(str).split('\n');
  return lines.reduce((a, x, i) => {
    if (i == lines.length - 1) return a + '</p>';
    if (x === '') a += '</p><p>';
    a += x;
    return a;
  }, '<p>');
}

function formatAboutMeList(str: string) {
  str = trimEmptyLines(str);
  const params: Partial<AboutMeList> = {};
  for (let item of str.split('\n')) {
    item = item.slice(0, 2) === '- ' ? item.slice(2) : item;
    const [key, value] = item.split(': ');
    params[key as keyof AboutMeList] = value;
  }
  return params;
}

export async function getReadmeData(username: string) {
  const raw = await getUserReadMeRawData(username);
  const description: string = pipe((x: string) => getRawTaggedData(x, 'description'), 
                                   formatDescription)(raw);
  const rawAboutMe: string = getRawTaggedData(raw, 'aboutme-list')  
  const aboutme: Partial<AboutMeList> = formatAboutMeList(rawAboutMe);

  return {description, aboutme};
  }
const {Octokit} = require('@octokit/rest');
const {pipe} = require('../toolz');
const octokit = new Octokit();

async function getUserReadMeRawData(user) {
  const {data} = await octokit.rest.repos.getContent({
    owner: user,
    repo: user,
    path: 'README.md',
  });
  const content = Buffer.from(data.content, 'base64').toString();
  return content;
}

function getRawTaggedData(str, tagName) {
  let data;
  const openTag = `<!-- ${tagName}-start -->`;
  const closeTag = `<!-- ${tagName}-end -->`;
  data = str.split(openTag)[1];
  data = data.split(closeTag)[0];
  return data;
}

function rmEmptySpace(str) {
  if (!str) return str;
  return str.replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, '').trim();
}

function formatDescription(str) {
  str = rmEmptySpace(str, '\n');
  let lines = str.split('\n');
  return lines.reduce((a, x, i) => {
    if (i == lines.length - 1) return a + '</p>';
    if (x === '') a += '</p><p>';
    a += x;
    return a;
  }, '<p>');
}

function formatAboutMeList(str) {
  str = rmEmptySpace(str);
  const params = {};
  for (let item of str.split('\n')) {
    item = item.slice(0, 2) === '- ' ? item.slice(2) : item;
    const [key, value] = item.split(': ');
    params[key] = value;
  }
  return params;
}

async function getReadmeData(username) {
  const raw = await getUserReadMeRawData(username);
  let description = pipe(x => getRawTaggedData(x, 'description'), formatDescription)(raw);
  let aboutme = pipe(x => getRawTaggedData(x, 'aboutme-list'), formatAboutMeList)(raw);
  return {description, aboutme};
}

module.exports = {getReadmeData};

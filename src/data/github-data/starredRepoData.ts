import {Octokit} from '@octokit/rest';

import {PortfolioItem} from '../dataDef';
import {getRawTaggedData} from './readmeData';

const octokit = new Octokit();

async function requestStarredRepoData(username: string) {
  const {data} = await octokit.rest.activity.listReposStarredByUser({
    username,
  });

  return data;
}

async function requestStarredRepoReadMe(username: string, repoName: string) {
  const {data} = await octokit.rest.repos.getContent({
    owner: username,
    repo: repoName,
    path: 'README.md',
  });
  if("content" in data){
    const content: string = Buffer.from(data.content, 'base64').toString();
    return content;
  } else return "";
}

async function formatPortfolioItems(data: any[], username: string) {
  const portfolioItems: PortfolioItem[] = [];

  for (let repo of data) {
    const readmeData = await requestStarredRepoReadMe(username, repo.name)
    const imgUrl = getRawTaggedData(readmeData, "imgUrl");

    const portfolioItemData: PortfolioItem = {
      title: repo.name,
      description: repo.description,
      url: repo.homepage,
      image: imgUrl,
    };
    portfolioItems.push(portfolioItemData);
  }

  return portfolioItems;
}

export async function getStarredRepoData(username: string) {
  const data = await requestStarredRepoData(username);
  const portfolioItems: PortfolioItem[] = await formatPortfolioItems(data, username);

  return portfolioItems;
}

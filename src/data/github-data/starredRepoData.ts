import {Octokit} from '@octokit/rest';

import {PortfolioItem} from '../dataDef';

const octokit = new Octokit();

async function requestStarredRepoData(username: string) {
  const {data} = await octokit.rest.activity.listReposStarredByUser({
    username,
  });
  return data;
}

async function formatPortfolioItems(data: any[]) {
  const portfolioItems: PortfolioItem[] = [];

  for (const repo of data) {
    const imgUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/HEAD/app-screenshot.png`

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
  const portfolioItems: PortfolioItem[] = await formatPortfolioItems(data);

  return portfolioItems;
}

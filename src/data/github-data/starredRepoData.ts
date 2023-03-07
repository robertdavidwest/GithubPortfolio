import {Octokit} from '@octokit/rest';

import {PortfolioItem} from '../dataDef';

const octokit = new Octokit();

async function requestStarredRepoData(username: string) {
  const {data} = await octokit.request(`GET /users/${username}/starred`);

  return data;
}

function formatPortfolioItems(data) {
  const portfolioItems: PortfolioItem[] = [];

  for (let repo of data) {
    const portfolioItemData: PortfolioItem = {
      title: repo.name,
      description: repo.description,
      url: repo.homepage,
      image: repo.owner.avatar_url,
    };
    portfolioItems.push(portfolioItemData);
  }

  return portfolioItems;
}

export async function getStarredRepoData(username: string) {
  const data = await requestStarredRepoData(username);
  const portfolioItems: PortfolioItem[] = formatPortfolioItems(data);

  return portfolioItems;
}

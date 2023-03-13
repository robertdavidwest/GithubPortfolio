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
    const githubUrl = `https://github.com/${repo.owner.login}/${repo.name}`;
    let imgUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/HEAD/app-screenshot.png`;
    const defaultImageUrl = 'https://octodex.github.com/images/droidtocat.png';
    const response = await fetch(imgUrl);
    if (!(response.status === 200)) imgUrl = defaultImageUrl;
    const portfolioItemData: PortfolioItem = {
      title: repo.name,
      description: repo.description,
      githubUrl: githubUrl,
      siteUrl: repo.homepage,
      image: imgUrl,
      tags: repo.topics,
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

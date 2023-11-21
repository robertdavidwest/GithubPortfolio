import {PortfolioItem, RawPinnedRepo} from '../dataDef';

async function postRequest(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function getGraphqlData(username: string) {
  const data = {
    query: `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            totalCount
            edges {
              node {
                ... on Repository {
                  name
                  owner {
                    login
                  }
                }
              }
            }
          }
        }
      }
    `,
  };
  return data;
}

async function getRawPinnedRepos(username: string) {
  const apiUrls: string[] = [];
  try {
    const graphQlData = getGraphqlData(username);
    const postData = await postRequest('https://api.github.com/graphql', graphQlData);
    const data: RawPinnedRepo[] = postData.data.user.pinnedItems.edges;
    data.map(x => {
      const {name, owner} = x.node;
      const {login} = owner;
      const apiUrl = `https://api.github.com/repos/${login}/${name}`;
      apiUrls.push(apiUrl);
    });
  } catch (error) {
    return apiUrls;
  }
  return apiUrls;
}

async function getRepoInfo(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
}

async function createPortfolioItems(repoUrls: string[]) {
  const portfolioItems: PortfolioItem[] = [];

  for (const repoUrl of repoUrls) {
    const repo = await getRepoInfo(repoUrl);
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

export async function getPinnedRepos(username: string) {
  const repoUrls: string[] = await getRawPinnedRepos(username);
  const portfolioItems: PortfolioItem[] = await createPortfolioItems(repoUrls);
  return portfolioItems;
}

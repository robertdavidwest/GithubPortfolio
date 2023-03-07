import {GithubData} from '../dataDef';
import {getReadmeData} from './readmeData';
import {getStarredRepoData} from './starredRepoData';

export async function getAllGithubData(username: string) {
  // Add all function calls here to collect all github data
  // in one place:
  const {about, skills} = await getReadmeData(username);
  const portfolioItems = await getStarredRepoData(username);
  const githubData: GithubData = {about, skills, portfolioItems};
  return githubData;
}

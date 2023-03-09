import {GithubData} from '../dataDef';
import {getReadmeData} from './readmeData';
import {getStarredRepoData} from './starredRepoData';
import {getLinkedinData} from "./archivedLinkedinData";

export async function getAllGithubData(username: string) {
  // Add all function calls here to collect all github data
  // in one place:
  const {about, skills} = await getReadmeData(username);
  const portfolioItems = await getStarredRepoData(username);
  const testimonialSection = await getLinkedinData(username);
  const githubData: GithubData = {about, skills, portfolioItems, testimonialSection};

  return githubData;
}

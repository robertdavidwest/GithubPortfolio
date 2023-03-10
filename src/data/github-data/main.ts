import {GithubData} from '../dataDef';
import {getLinkedinData} from "./archivedLinkedinData";
import {getReadmeAndProfileData} from "./readmeData";
import {getStarredRepoData} from './starredRepoData';

export async function getAllGithubData(username: string) {
  // Add all function calls here to collect all github data 
  // in one place: 
  const {about, contactSection, heroData, socialLinks, skills}= await getReadmeAndProfileData(username);
  const {education, experience, testimonialSection} = await getLinkedinData(username);
  const portfolioItems = await getStarredRepoData(username);
  const githubData : GithubData = {about, contactSection, education, experience, 
                                   heroData, portfolioItems, socialLinks, 
                                   skills, testimonialSection};
  return githubData;
}

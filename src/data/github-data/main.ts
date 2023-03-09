import {GithubData} from "../dataDef";
import {getLinkedinData} from "./archivedLinkedinData";
import {getReadmeAndProfileData} from "./readmeData";

export async function getAllGithubData(username: string) {
  // Add all function calls here to collect all github data 
  // in one place: 
  const {about, heroData, skills}= await getReadmeAndProfileData(username);
  const {education, experience, testimonialSection} = await getLinkedinData(username);
  const githubData : GithubData = {about, education, experience, heroData, skills, testimonialSection};
  return githubData;
}
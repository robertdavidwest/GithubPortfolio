import {GithubData} from "../dataDef";
import {getLinkedinData} from "./archivedLinkedinData";
import {getReadmeData} from "./readmeData";

export async function getAllGithubData(username: string) {
  // Add all function calls here to collect all github data 
  // in one place: 
  const {about, skills}= await getReadmeData(username);
  const {education, experience, testimonialSection} = await getLinkedinData(username);
  const githubData : GithubData = {about, education, experience, skills, testimonialSection};
  return githubData;
}
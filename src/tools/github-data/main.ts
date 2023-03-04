import {getReadmeData} from "./readmeData";

export function getAllGithubData(username: string) {
  // Add all function calls here to collect all github data 
  // in one place: 
  return getReadmeData(username);
}

async function main() {
  // test run this fn for my username: 
  const data = await getAllGithubData('robertdavidwest');
  console.log(data);
}

// for testing : 
//main();
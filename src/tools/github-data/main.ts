import {getReadmeData} from "./readmeData";

export function getAllGithubData(username: string) {
  return getReadmeData(username);
}

async function main() {
  // test run this fns for my username: 
  const data = await getAllGithubData('robertdavidwest');
  console.log(data);
}

main();
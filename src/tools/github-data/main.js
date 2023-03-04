const {getReadmeData} = require('./readmeData');

function getAllGithubData(username) {
  return getReadmeData(username);
}

if (require.main === module) {
  async function main() {
    const data = await getAllGithubData('robertdavidwest');
    console.log(data);
  }
  main();
}

module.exports = {getAllGithubData};

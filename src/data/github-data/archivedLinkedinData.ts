import {Octokit} from "@octokit/rest";

import {Testimonial, TestimonialSection} from "../dataDef";

const octokit = new Octokit();

async function getLinkedinRecommendations(user: string) {
  const {data} = await octokit.rest.repos.getContent({
    owner: user,
    repo: "linkedinData",
    path: 'Recommendations_Received.csv'
  });
  if("content" in data){
    const content: string = Buffer.from(data.content, 'base64').toString();
    return content;
  } else return "";
}

// Return array of string values, or NULL if CSV string not well formed.
function csvToArray(text: string) {
  const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null;
  const a = [];                     // Initialize array to receive values.
  text.replace(re_value, // "Walk" the string using replace with callback.
      function(_, m1, m2, m3) {
          // Remove backslash from \' in single quoted values.
          if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
          // Remove backslash from \" in double quoted values.
          else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
          else if (m3 !== undefined) a.push(m3);
          return ''; // Return empty string.
      });
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push('');
  return a;
};

function convertRawCsvToRecordList(raw: string){
  const rawRows = raw.split('\n')
  const header = rawRows[0].split(",");
  const labels : string[] = header.map((x : string) => x.replace(" ", ""));
  const data = [];
  for (const row of raw.split('\n').slice(1).filter(x=>x!=='')){
    const itemList = csvToArray(row);
    if (!itemList) continue;
    const init : Record<string, string> = {};
    const dataObj : Record<string, string> = itemList.reduce((a, x: string, i)=>{
      const key = labels[i]; 
      a[key] = x;
      return a;
     }, init)
    data.push(dataObj) 
  }
  return data;
}

export async function getLinkedinData(githubUsername: string){
  let raw : string;
  try {
    raw = await getLinkedinRecommendations(githubUsername)
  } catch (error) {
    const testimonials :  Testimonial[] = [];
    return {testimonials}
  }
  const data : Record<string, string>[] = convertRawCsvToRecordList(raw);
  const testimonials : Testimonial[] = [];
  for (const record of data){
    const name = record['FirstName'] + ' ' + record['LastName'];
    const title = record['JobTitle']
    const company = record['Company'];
    const text = record['Text'];
    testimonials.push({
      name, title, company, text
    })
  }
  const testimonialSection : TestimonialSection = {testimonials}
  return testimonialSection;
}
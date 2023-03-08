# Github Portfolio

This project is a fork of the excellent [React JS Resume Project](https://github.com/tbakerx/react-resume-template) by [Tim Baker](https://github.com/tbakerx).

Team Alphaca has taken Tim's React App and automated the Data Ingestion from Github. Any dev can now very quickly and easily turn their existing Github account into a beautifully rendered Portfolio website!

## How it works

When you run this app in Dev or Prod, data will be automatically pulled from your public Github data, including your Bio and information and all of your **Starred** Github repos will show up as your projects in your portfolio!

## Set up your Github Profile

You will just need to make sure that your Github account conforms to the following features and your data will automatically be rendered.

1. Create a user repo: Your Github Account should have a profile landing page. This is achieved by creating a github repo with the same name as your username.
2. Create a `README.md` file in the repo: In your github user repo you will need a README file. In here you can store information for people to see when they visit your Github page, which is something we suggest you do even if you are not using this Github Portfolio builder. [Here](https://dev.to/puenehfaith/how-to-beautifully-organize-your-github-profile-dha?ck_subscriber_id=1030950679&utm_source=convertkit&utm_medium=email&utm_campaign=Diversify+Tech+%23221%20-%209810757) is a useful resource for putting that together in general.
3. Inside the `README.md` add information about yourself, using the following template:

   1. Add a **description** of yourself, this will show up in the aboutme section. Place the description between these tags:

      ```
      <!-- description-start -->
      Use this bio section as your way of describing yourself and saying what you do, ...
      <!-- description-end -->
      ```

   2. Add **aboutme** bullet points. These will also show up in the aboutme section. Add bullet points with a label followed by a colon:

      ```
      <!-- aboutme-list-start -->
      - Location: in Space
      - Nationality: Alien
      - Study: Milky Way University
      - Interests: Humans
      - Age: 500000
      - Employment: Oberver, Aliens Inc.
      <!-- aboutme-list-end -->
      ```

      (NOTE1: You can omit any of these categories and everything will still work)
      (NOTE2: You can add any custom categories, they will just show up without a logo)

   3. Add a list of **skills** and **levels**, copy the format below:

      ```
      <!-- skills-start -->
      - Languages: Python: 8/10, JavaScript: 7/10, ...
      - Frontend: React: 7/10, ...
      - Backend: Node.js
      <!-- skills-end -->
      ```

      (NOTE: Add as many bullets as you like, ensure the format matches exactly, including spacing)

   (NOTE: If you don't want to show any of the following information on your Github page but still want it in your Github Portfolio then just put it between html comment tags ! like this: `<-- info here i dont want to show -->`

## Upload your Linkedin data to Github (optional)

We have also made it possible for you to pull in your Experience, Education and received recommendations from your linked in profile! Unfortunetely LinkedIn does not make this data available via an API. So will need to follow these steps to manually obtain your linkedin data and use it on your website:

1. Follow these instructions from Linkedin to download your data: https://www.linkedin.com/help/linkedin/answer/a1339364 and be sure to select the option to download all data. For the data we need, a download link will become available 10 minutes after you have made the request.
2. Create a repo on your github profile called `linkedinData`.
3. Commit these files to the new repo and push them up:

- `Recommendations_Received.csv`
- `<experience_file_TBD>`
- `<education_file_TBD>`

That's it! Now the Sections **Experience**, **Education** and **Recommendations** will be populated with your data from linkedin. Anytime you want to refresh your linkedin data just download a new file from linkedin and replace the old one in the `linkedinData` repo.

If you choose not to include linkedin data then these sections will simply be omitted from the portfolio site.

## Dev Setup

You will need to create an environment file called `.env` and add your github user account to the file:

```
# .env
GITHUB_USERNAME=<your-username>
```

## Github Account Configuration for the project

to be written...

Now that your Github account is configured correctly, follow the steps below to set up your Portfolio website!

Below see the original README from Tim's project:

# React JS Resume Website Template

![ReactJS Resume Website Template](resume-screenshot.jpg?raw=true 'ReactJS Resume Website Template')

<div align="center">

<img alt="GitHub release (latest by date including pre-releases" src="https://img.shields.io/github/v/release/tbakerx/react-resume-template?include_prereleases">

<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/tbakerx/react-resume-template?style=flat">

<img alt="GitHub Repo forks" src="https://img.shields.io/github/forks/tbakerx/react-resume-template?style=flat&color=success">

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/tbakerx/react-resume-template?style=flat&color=yellow">

<img alt="GitHub package.json dependency version (prod)" src="https://img.shields.io/github/package-json/dependency-version/tbakerx/react-resume-template/react?style=flat">

<img alt="Github Repo Sponsors" src="https://img.shields.io/github/sponsors/tbakerx?style=flat&color=blueviolet">

## React based template for software developer-focused resume websites

</div>

### View a [live demo here.](https://reactresume.com)

#### If this template has helped you and you'd like to support my work, feel free to [♥️ Sponsor](https://github.com/sponsors/tbakerx) the project

### 🎉 Version 2 is here! New features:

1. Completely rebuilt with React and full typescript support
2. Built on the [Next.js](https://nextjs.org/) framework for easy server side rendering/static generation, image optimization, api routes, and deployment
3. Styled entirely with [TailwindCss](https://tailwindcss.com/)
4. Re-organized data population file for customizing site.
5. Significant improvement/modernization of all site sections

**Looking for the old version? You can find it [here.](https://github.com/tbakerx/react-resume-template/releases/tag/v1.0.0)**

## Description

This is a React based personal resume website template. Built with typescript on the Next.js framework, styled with Tailwind css, and populated with data from a single file, you can easily create, customize and host your own personal website in minutes. Even better, the site is fully mobile-optimized and server-side rendered to ensure fast loading and a clean UI on any device. Read on to learn how to make it your own.

## Make it Your Own!

### 1. Make sure you have what you need

To build this website, you will need to have the latest stable versions of Node and Yarn downloaded and installed on your machine. If you don't already have them, you can get Node [here,](https://nodejs.org/en/download/) and Yarn [here.](https://yarnpkg.com/getting-started/install)

### 2. Fork and download this repo (and star if you like!)

Next, find the `Fork` button in the top right of this page. This will allow you to make your own copy, for more info on forking repo's see [here.](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) After this, download to your development machine using the green `Code` button at the top of the repo page.

### 3. Install dependencies and run

Once you have your own copy of this repo forked and downloaded, open the folder in your favorite terminal and run `yarn install` to install dependencies. Following this, run `yarn dev` to run the project. In your terminal you should be given the url of the running instance (usually http://localhost:3000 unless you have something else running).

### 4. Customize the data to make it your own

All of the data for the site is driven via a file at `/src/data/data.tsx`. This is where you'll find the existing content, and updating the values here will be reflected on the site. If you have the site running as described above, you should see these changes reflected on save. The data types for all of these items are given in the same folder in the `dataDef.ts` file. Example images can be found at `src/images/` and are imported in the data file. To change, simply update these images using the same name and location, or add new images and update the imports.

### 5. Hook up contact form

Due to the variety of options available for contact form providers, I've hooked up the contact form only so far as handling inputs and state. Form submission and the actual sending of the email is open to your own implementation. My personal recommendation for email provider is [Sendgrid.](https://sendgrid.com/)

### 6. Make any other changes you like

Of course, all of the code is there and nothing is hidden from you so if you would like to make any other styling/data changes, feel free!

### 7. Deploy to Vercel and enjoy your new Resume Website

Deploying your new site to Vercel is simple, and can be done by following their guide [here.](https://vercel.com/guides/deploying-nextjs-with-vercel) When you're all done and the build succeeds, you should be given a url for your live site, go there and you'll see your new personal resume website! Congratulations!

## Project Created & Maintained By

### Tim Baker

<a href="https://twitter.com/timbakerx"><img src="https://github.com/aritraroy/social-icons/blob/master/twitter-icon.png?raw=true" width="60"></a><a href="https://instagram.com/tbakerx"><img src="https://github.com/aritraroy/social-icons/blob/master/instagram-icon.png?raw=true" width="60"></a>

[![GitHub followers](https://img.shields.io/github/followers/tbakerx.svg?style=social&label=Follow)](https://github.com/tbakerx/)

## Stargazers

[![Stargazers repo roster for @tbakerx/react-resume-template](https://reporoster.com/stars/dark/tbakerx/react-resume-template)](https://github.com/tbakerx/react-resume-template/stargazers)

## Forkers

[![Forkers repo roster for @tbakerx/react-resume-template](https://reporoster.com/forks/dark/tbakerx/react-resume-template)](https://github.com/tbakerx/react-resume-template/network/members)

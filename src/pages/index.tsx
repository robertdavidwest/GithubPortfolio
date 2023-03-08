import {GetServerSideProps, NextPage} from 'next';
import dynamic from 'next/dynamic';
import {memo} from 'react';

import Page from '../components/Layout/Page';
import About from '../components/Sections/About';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Sections/Footer';
import Hero from '../components/Sections/Hero';
import Portfolio from '../components/Sections/Portfolio';
import Resume from '../components/Sections/Resume';
import Testimonials from '../components/Sections/Testimonials';
import {homePageMeta} from '../data/data';
import {GithubData,GithubDataProps} from '../data/dataDef';
import {getAllGithubData} from '../data/github-data/main';

// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

const Home: NextPage<GithubDataProps> = memo(({githubData}) => {
  const {title, description} = homePageMeta;
  return (
    <Page description={description} title={title}>
      <Header />
      <Hero />
      <About {...githubData} />
      <Resume {...githubData} />
      <Portfolio />
      <Testimonials {...githubData} />
      <Contact />
      <Footer />
    </Page>
  );
});

export const getServerSideProps: GetServerSideProps = async () => {
  const username : string = process.env.GITHUB_USERNAME as string;
  const githubData: GithubData = await getAllGithubData(username);
  return {props: {githubData}};
}
 
export default Home;

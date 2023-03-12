import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {memo, useCallback, useState} from 'react';

import {SectionId} from '../../../data/data';
import {GithubData} from '../../../data/dataDef';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';
import {SkillGroup} from './Skills';
import TimelineItem from './TimelineItem';

const Resume: NextPage<GithubData> = memo(({education, experience, skills}) => {
  const router = useRouter();
  const previewNum = 1;
  const [showExperience, setShowExperience] = useState(false);
  const togglerExperience = useCallback(() => {
    setShowExperience(!showExperience);
    if (showExperience) router.push('#resume');
  }, [showExperience, router]);

  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        <ResumeSection title="Skills">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skills.map((skillgroup, index) => (
              <SkillGroup key={`${skillgroup.name}-${index}`} skillGroup={skillgroup} />
            ))}
          </div>
        </ResumeSection>
        {experience.length ? (
          <ResumeSection title="Work">
            {showExperience
              ? experience.map((item, index) => <TimelineItem item={item} key={`${item.title}-${index}`} />)
              : experience
                  .slice(0, previewNum)
                  .map((item, index) => <TimelineItem item={item} key={`${item.title}-${index}`} />)}
            {experience.length > previewNum ? (
              <button
                className="mt-3 w-32 bg-orange-500 px-5 py-2 text-white duration-300 hover:bg-orange-700"
                onClick={togglerExperience}>
                {showExperience ? 'Show Less' : 'Show More'}
              </button>
            ) : null}
          </ResumeSection>
        ) : null}
        {education.length ? (
          <ResumeSection title="Education">
            {education.map((item, index) => (
              <TimelineItem item={item} key={`${item.title}-${index}`} />
            ))}
          </ResumeSection>
        ) : null}
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;

import React, { FC } from 'react';

import { memberFirstImages, memberThirdImages } from 'constants';
import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';

import { MembersLink } from './subcomponents';

interface Member {
  memberImage: string;
  imageDescription: string;
  memberName: string;
  memberRole: string;
  memberCV: string;
  githubLink: string;
  linkedinLink: string;
  emailLink: string;
  telegramLink: string;
}

const AboutUs: FC<{}> = () => {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedFirstMemberImage = generateContentImages(
    memberFirstImages,
    devicePixelRatio,
    'image/webp',
    window.innerWidth,
  );

  const matchedThirdMemberImage = generateContentImages(
    memberThirdImages,
    devicePixelRatio,
    'image/webp',
    window.innerWidth,
  );

  const firstMemberImageUrl = useCacheImage(matchedFirstMemberImage?.src || '');
  const thirdMemberImageUrl = useCacheImage(matchedThirdMemberImage?.src || '');

  const members = [
    {
      groupTitle: 'Front-end',
      groupMembers: [
        {
          memberImage: firstMemberImageUrl,
          imageDescription: 'Greg Terekhov',
          memberName: 'Greg Terekhov',
          memberRole: 'Team leader, scrum, developer',
          memberCV:
            'https://drive.google.com/file/d/1UK9RnTddIt39_VsQnd70jJe0ii3AhZFL/view?usp=sharing',
          githubLink: 'https://github.com/GregTerekhov',
          linkedinLink: 'https://www.linkedin.com/in/greg-terekhov/',
          emailLink: 'mailto:gregterekhov@gmail.com',
          telegramLink: 'http://t.me/GregTerekhov',
        },
        {
          memberImage: '',
          imageDescription: 'Max Mordovtsev',
          memberName: 'Max Mordovtsev',
          memberRole: 'Developer',
          memberCV:
            'https://drive.google.com/file/d/1JGiyIpvcbVInuIxQj67O7OB7CDPbbDC7/view?usp=sharing',
          githubLink: 'https://github.com/Max3281',
          linkedinLink: 'https://www.linkedin.com/in/maxim-mordovtsev/',
          emailLink: 'mailto:9.crover@gmail.com',
          telegramLink: 'http://t.me/ZCrover',
        },
      ],
    },
    {
      groupTitle: 'Back-end',
      groupMembers: [
        {
          memberImage: thirdMemberImageUrl,
          imageDescription: 'Dmytro Pavlenko',
          memberName: 'Dmytro Pavlenko',
          memberRole: 'Developer',
          memberCV:
            'https://drive.google.com/file/d/15pBheHpJaq_u8UyXg0W31FrZEey5Z3vC/view?usp=sharing',
          githubLink: 'https://github.com/PavlenkoDm',
          linkedinLink: '',
          emailLink: 'mailto:dmpavlenko07@gmail.com',
          telegramLink: 'http://t.me/Pavlenko_Dm',
        },
      ],
    },
  ];

  const commonTextMemberClass = 'text-darkBase dark:text-whiteBase transition-colors duration-500';

  return (
    <>
      <h1 className={`${commonTextMemberClass} text-giant font-bold mb-10`}>About Us</h1>
      {members &&
        members.map((group) => (
          <div key={group.groupTitle}>
            <h2
              className={`${commonTextMemberClass} text-3.5xl mb-2 md:mb-6 after:content-[""] after:block after:w-full after:h-px after:bg-greyAlt after:mt-2`}
            >
              {group.groupTitle}
            </h2>
            <ul className='max-lg:space-y-10 mb-12 md:mb-20 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-10'>
              {group.groupMembers.map(
                ({
                  memberName,
                  memberImage,
                  imageDescription,
                  memberRole,
                  memberCV,
                  githubLink,
                  linkedinLink,
                  emailLink,
                  telegramLink,
                }: Member) => (
                  <li key={memberName} className='max-md:space-y-4 md:flex md:gap-x-12'>
                    <div className='rounded-xl md:w-96 shadow-card dark:shadow-darkCard duration-500 lg:w-72 overflow-hidden'>
                      <img
                        src={memberImage}
                        alt={imageDescription}
                        className='h-full max-md:max-w-full'
                      />
                    </div>
                    <div className='max-md:space-y-4 md:grow md:flex md:flex-col md:justify-around'>
                      <div className='space-y-4'>
                        <p className={`${commonTextMemberClass} text-2xl md:text-4xl`}>
                          {memberName}
                        </p>
                        <p className={`${commonTextMemberClass} md:text-xl lg:text-medium`}>
                          Role: {memberRole}
                        </p>
                        <p className={`${commonTextMemberClass} md:text-xl lg:text-medium`}>
                          Resume:{' '}
                          <a
                            href={memberCV}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-accentBase font-medium dark:text-whiteBase dark:underline'
                          >
                            {memberName} CV
                          </a>
                        </p>
                      </div>
                      <MembersLink
                        githubLink={githubLink}
                        linkedinLink={linkedinLink}
                        emailLink={emailLink}
                        telegramLink={telegramLink}
                      />
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
    </>
  );
};

export default AboutUs;

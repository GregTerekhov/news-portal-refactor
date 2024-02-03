import React, { FC } from 'react';

import { memberFirstImages, memberSecondImages, memberThirdImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';

import { MembersLink } from './subcomponents';
import { MemberItem, getMembersList } from './assistants';

const AboutUs: FC<{}> = () => {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedFirstMemberImage = generateContentImages(
    memberFirstImages,
    devicePixelRatio,
    // 'image/webp',
    window.innerWidth,
  );

  const matchedSecondMemberImage = generateContentImages(
    memberSecondImages,
    devicePixelRatio,
    // 'image/webp',
    window.innerWidth,
  );

  const matchedThirdMemberImage = generateContentImages(
    memberThirdImages,
    devicePixelRatio,
    // 'image/webp',
    window.innerWidth,
  );

  const firstMemberImageUrl = useCacheImage(matchedFirstMemberImage?.src || '');
  const secondMemberImageUrl = useCacheImage(matchedSecondMemberImage?.src || '');
  const thirdMemberImageUrl = useCacheImage(matchedThirdMemberImage?.src || '');

  const members = getMembersList(firstMemberImageUrl, secondMemberImageUrl, thirdMemberImageUrl);

  const commonTextMemberClass = 'text-darkBase dark:text-whiteBase transition-colors duration-500';

  return (
    <>
      <h1 className={`${commonTextMemberClass} mb-10 text-giant font-bold`}>About Us</h1>
      {members &&
        members.map((group) => (
          <div key={group.groupTitle}>
            <h2
              className={`${commonTextMemberClass} mb-2 text-3.5xl after:mt-2 after:block after:h-px after:w-full after:bg-greyAlt after:content-[""] md:mb-6`}
            >
              {group.groupTitle}
            </h2>
            <ul className='mb-12 max-lg:space-y-10 md:mb-20 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-10'>
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
                }: MemberItem) => (
                  <li key={memberName} className='max-md:space-y-4 md:flex md:gap-x-12'>
                    <div className='overflow-hidden rounded-xl shadow-card duration-500 dark:shadow-darkCard md:w-96 lg:w-72 hg:w-[320px]'>
                      <img
                        src={memberImage}
                        alt={imageDescription}
                        className='h-full max-md:max-w-full'
                      />
                    </div>
                    <div className='max-md:space-y-4 md:flex md:grow md:flex-col md:justify-around'>
                      <div className='space-y-4'>
                        <h3 className={`${commonTextMemberClass} text-2xl md:text-4xl hg:text-5xl`}>
                          {memberName}
                        </h3>
                        <p
                          className={`${commonTextMemberClass} md:text-xl lg:text-medium hg:text-lg`}
                        >
                          <span className='font-bold'>Role:</span> {memberRole}
                        </p>
                        <p
                          className={`${commonTextMemberClass} md:text-xl lg:text-medium hg:text-lg`}
                        >
                          <span className='font-bold'>Resume: </span>
                          <a
                            href={memberCV}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-medium text-accentBase transition-colors duration-500 dark:text-whiteBase dark:underline'
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

import React, { FC } from 'react';

import { memberFirstImages, memberSecondImages, memberThirdImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';

import { MembersList } from './subcomponents';
import { getMembersList } from './assistants';

const AboutUs: FC<{}> = () => {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedMemberImages = [memberFirstImages, memberSecondImages, memberThirdImages].map(
    (images) => generateContentImages(images, devicePixelRatio, window.innerWidth),
  );

  const firstMemberImageUrl = useCacheImage(matchedMemberImages[0]?.src || '');
  const secondMemberImageUrl = useCacheImage(matchedMemberImages[1]?.src || '');
  const thirdMemberImageUrl = useCacheImage(matchedMemberImages[2]?.src || '');

  const members = getMembersList(firstMemberImageUrl, secondMemberImageUrl, thirdMemberImageUrl);

  const commonTextMemberClass = 'text-darkBase dark:text-whiteBase transition-colors';

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
            <MembersList
              groupMembers={group.groupMembers}
              commonTextMemberClass={commonTextMemberClass}
            />
          </div>
        ))}
    </>
  );
};

export default AboutUs;

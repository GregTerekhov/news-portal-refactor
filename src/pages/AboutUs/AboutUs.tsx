import React, { FC } from 'react';

import { useCacheImage } from 'hooks';

import { MembersList } from './subcomponents';
import { getMatchedImages, getMembersList } from './assistants';

const AboutUs: FC<{}> = () => {
  const matchedMemberImages = getMatchedImages();

  const memberImageUrls = matchedMemberImages.map((matchedImage) =>
    useCacheImage(matchedImage?.src || ''),
  );

  const members = getMembersList(memberImageUrls);

  const commonTextMemberClass = 'text-darkBase dark:text-whiteBase transition-colors';

  return (
    <>
      <h1 className={`${commonTextMemberClass} mb-10 text-giant font-bold`}>About Us</h1>
      {Array.isArray(members) &&
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

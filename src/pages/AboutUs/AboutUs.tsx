import React, { FC } from 'react';

import { MembersList } from './subcomponents';

import { useCache } from 'hooks';
import { getMatchedImages, getMembersList } from './assistants';

const AboutUs: FC = () => {
  const { cacheImage } = useCache();

  const matchedMemberImages = getMatchedImages();

  const memberImageUrls = matchedMemberImages.map((matchedImage) =>
    cacheImage(matchedImage?.src || ''),
  );

  const members = getMembersList(memberImageUrls);

  const commonTextMemberClass = 'text-darkBase dark:text-whiteBase transition-colors';

  return (
    <>
      <h1 className={`${commonTextMemberClass} mb-10 text-giant font-bold`}>About Us</h1>
      {Array.isArray(members) &&
        members.map(({ groupTitle, groupMembers }) => (
          <div key={groupTitle}>
            <h2
              className={`${commonTextMemberClass} mb-2 text-3.5xl after:mt-2 after:block after:h-px after:w-full after:bg-greyAlt after:content-[""] md:mb-6`}
            >
              {groupTitle}
            </h2>
            <MembersList
              groupMembers={groupMembers}
              commonTextMemberClass={commonTextMemberClass}
            />
          </div>
        ))}
    </>
  );
};

export default AboutUs;

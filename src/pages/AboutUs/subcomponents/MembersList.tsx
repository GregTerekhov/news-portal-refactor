import React, { FC } from 'react';

import MembersLink from './MembersLink';
import { MemberItem } from '../assistants';

interface MemberListProps {
  groupMembers: MemberItem[];
  commonTextMemberClass: string;
}

const MembersList: FC<MemberListProps> = ({ groupMembers, commonTextMemberClass }) => {
  return (
    <ul className='mb-12 max-lg:space-y-10 md:mb-20 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-10'>
      {groupMembers.map(
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
            <div className='overflow-hidden rounded-xl shadow-card dark:shadow-darkCard md:w-96 lg:w-72 hg:w-80'>
              <img src={memberImage} alt={imageDescription} className='max-md:max-w-full' />
            </div>
            <div className='max-md:space-y-4 md:flex md:grow md:flex-col md:justify-around'>
              <div className='space-y-4'>
                <h3 className={`${commonTextMemberClass} text-2xl md:text-4xl hg:text-5xl`}>
                  {memberName}
                </h3>
                <p className={`${commonTextMemberClass} md:text-xl lg:text-medium hg:text-xl`}>
                  <span className='font-bold'>Role:</span> {memberRole}
                </p>
                <p className={`${commonTextMemberClass} md:text-xl lg:text-medium hg:text-xl`}>
                  <span className='font-bold'>Resume: </span>
                  <a
                    href={memberCV}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-medium text-accentBase transition-colors dark:text-accentBase dark:underline dark:hover:text-whiteBase'
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
  );
};

export default MembersList;

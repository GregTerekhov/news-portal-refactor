import { ICON_SIZES } from 'constants/iconSizes';

export type MemberItem = {
  memberImage: string;
  imageDescription: string;
  memberName: string;
  memberRole: string;
  memberCV: string;
  githubLink: string;
  linkedinLink: string;
  emailLink: string;
  telegramLink: string;
};

interface Members {
  groupTitle: string;
  groupMembers: MemberItem[];
}

interface ILink {
  link: string;
  icon: string;
  iconSize: number;
}

export const getMembersList = (
  firstMemberImageUrl: string,
  secondMemberImageUrl: string,
  thirdMemberImageUrl: string,
): Members[] => {
  const members: Members[] = [
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
          memberImage: secondMemberImageUrl,
          imageDescription: 'Max Mordovtsev',
          memberName: 'Max Mordovtsev',
          memberRole: 'Developer',
          memberCV:
            'https://drive.google.com/file/d/19lChIbPB0JDQeeP2y7EpqPYfrK9ZyKXc/view?usp=sharing',
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
          linkedinLink: 'https://www.linkedin.com/in/pavlenko-dmitry/',
          emailLink: 'mailto:dmpavlenko07@gmail.com',
          telegramLink: 'http://t.me/Pavlenko_Dm',
        },
      ],
    },
  ];

  return members;
};

export const getMembersLink = (
  githubLink: string,
  linkedinLink: string,
  emailLink: string,
  telegramLink: string,
): ILink[] => {
  const links: ILink[] = [
    {
      link: githubLink,
      icon: 'icon-github',
      iconSize: ICON_SIZES.mdIcon28,
    },
    {
      link: linkedinLink,
      icon: 'icon-linkedin',
      iconSize: ICON_SIZES.mdIcon28,
    },
    {
      link: emailLink,
      icon: 'icon-gmail',
      iconSize: ICON_SIZES.lgIcon30,
    },
    {
      link: telegramLink,
      icon: 'icon-telegram',
      iconSize: ICON_SIZES.mdIcon28,
    },
  ];
  return links;
};

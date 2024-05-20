import { IconName, IconSizes, type MemberItem } from 'types';

interface IMembers {
  groupTitle: string;
  groupMembers: MemberItem[];
}

interface ILink {
  link: string;
  icon: IconName;
  iconSize: IconSizes;
}

export const getMembersList = (memberImageUrls: string[]): IMembers[] => {
  return [
    {
      groupTitle: 'Front-end',
      groupMembers: [
        {
          memberImage: memberImageUrls[0],
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
          memberImage: memberImageUrls[1],
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
          memberImage: memberImageUrls[2],
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
};

export const getMembersLink = (
  githubLink: string,
  linkedinLink: string,
  emailLink: string,
  telegramLink: string,
): ILink[] => {
  return [
    {
      link: githubLink,
      icon: IconName.Github,
      iconSize: IconSizes.mdIcon28,
    },
    {
      link: linkedinLink,
      icon: IconName.Linkedin,
      iconSize: IconSizes.mdIcon28,
    },
    {
      link: emailLink,
      icon: IconName.Gmail,
      iconSize: IconSizes.lgIcon30,
    },
    {
      link: telegramLink,
      icon: IconName.Telegram,
      iconSize: IconSizes.mdIcon28,
    },
  ];
};

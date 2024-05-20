export interface MemberItem {
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

type LinkProperties<T> = {
  [K in keyof T as K extends `${string}Link` ? K : never]: T[K];
};

export type MemberLinks = LinkProperties<MemberItem>;

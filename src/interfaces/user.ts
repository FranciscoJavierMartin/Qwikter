export interface UserContextState {
  user: User;
  token: string;
}

export enum SocialLinksType {
  facebook = 'facebook',
  instagram = 'instagram',
  twitter = 'twitter',
  youtube = 'youtube',
}

export enum NotificationType {
  comments = 'comments',
  follows = 'follows',
  messages = 'messages',
  reactions = 'reactions',
}

export type NotificationSettings = Record<NotificationType, boolean>;
export type SocialLinks = Record<SocialLinksType, string>;

export interface User {
  _id: string;
  username?: string;
  email?: string;
  avatarColor?: string;
  uId?: string;
  postsCount: number;
  work: string;
  school: string;
  quote: string;
  location: string;
  blocked: string[];
  blockedBy: string[];
  followersCount: number;
  followingCount: number;
  notifications: NotificationSettings;
  social: SocialLinks;
  bgImageVersion: string;
  bgImageId: string;
  profilePicture: string;
  createdAt?: Date;
}

export interface RegisterResponse {
  token: string;
  user: User;
  message: string;
}

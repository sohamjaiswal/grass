export interface GuildedMe {
  user:              User;
  friends:           Friend[];
  teams:             Team[];
  updateMessage:     null;
  inAppUpdateBanner: null;
}

export interface Friend {
  friendUserId: string;
  friendStatus: FriendStatus;
  createdAt:    Date;
}

export enum FriendStatus {
  Accepted = "accepted",
  Pending = "pending",
  Requested = "requested",
}

export interface Team {
  id:                        string;
  name:                      string;
  subdomain:                 null | string;
  bio:                       null;
  timezone:                  null | string;
  description:               null | string;
  type:                      TeamType | null;
  visibility:                Visibility;
  createdAt:                 Date;
  ownerId:                   string;
  profilePicture:            null | string;
  teamDashImage:             null | string;
  homeBannerImageSm:         null | string;
  homeBannerImageMd:         null | string;
  homeBannerImageLg:         null | string;
  additionalInfo:            TeamAdditionalInfo;
  additionalGameInfo:        { [key: string]: AdditionalGameInfo };
  teamPreferences:           null;
  socialInfo:                SocialInfo;
  isRecruiting:              boolean;
  isVerified:                boolean;
  isPro:                     boolean;
  isPublic:                  boolean;
  notificationPreference:    Notification | null;
  flair:                     Flair[];
  membershipRole:            MembershipRole;
  roleIds?:                  number[];
  games?:                    number[];
  memberCount:               string;
  lfmStatusByGameId:         { [key: string]: LfmStatusByGameID };
  canInviteMembers:          boolean;
  canUpdateTeam:             boolean;
  canManageBots:             boolean;
  canManageTournaments:      boolean;
  canRegisterForTournaments: boolean;
  viewerIsMember:            boolean;
  isAdmin:                   boolean;
  rolesById:                 RolesByID;
  isFavorite?:               boolean;
}

export interface AdditionalGameInfo {
  region?:                         The281074_Ssburegions;
  teamtypebuilders?:               string;
  "platformps4,xbox,pc,switch"?:   Platformps4XboxPC;
  "platformps4,xbox,pc"?:          Platformps4XboxPC;
  "201000-fortniteserverregions"?: string;
  teamtype?:                       string;
  "league-servers"?:               string;
  "ow-region"?:                    string;
  "10300-csgoregions"?:            string;
  "281074-ssburegions"?:           The281074_Ssburegions;
}

export enum The281074_Ssburegions {
  Europe = "Europe",
  Global = "Global",
  NorthAmerica = "North America",
  SouthAsia = "South Asia",
}

export enum Platformps4XboxPC {
  PC = "PC",
  Playstation = "Playstation",
  Xbox = "Xbox",
}

export interface TeamAdditionalInfo {
  platform?:        Platform;
  skipTeamNux?:     boolean;
  skipBotCreation?: boolean;
  gameId?:          string;
  source?:          string;
}

export enum Platform {
  Desktop = "desktop",
  Electron = "electron",
  Native = "native",
}

export interface Flair {
  id: number;
}

export interface LfmStatusByGameID {
  description:             null | string;
  gameId:                  number;
  isLookingForMember:      boolean;
  isAcceptingApplications: boolean;
}

export enum MembershipRole {
  Admin = "admin",
  Member = "member",
}

export enum Notification {
  AllNewContent = "AllNewContent",
  Mentions = "Mentions",
  Nothing = "Nothing",
}

export interface RolesByID {
}

export interface SocialInfo {
  youtube?:  string;
  twitter?:  string;
  twitch?:   string;
  facebook?: string;
}

export enum TeamType {
  Community = "community",
  Friends = "friends",
  Organization = "organization",
  Other = "other",
}

export enum Visibility {
  Default = "default",
  OpenEntry = "open-entry",
  Private = "private",
}

export interface User {
  id:                              string;
  name:                            string;
  subdomain:                       string;
  email:                           string;
  profilePictureSm:                string;
  profilePicture:                  string;
  profilePictureLg:                string;
  profilePictureBlur:              string;
  profileBannerBlur:               string;
  joinDate:                        Date;
  userStatus:                      UserStatus;
  moderationStatus:                null;
  aboutInfo:                       AboutInfo;
  lastOnline:                      Date;
  robloxId:                        null;
  needsRequiredAccountInfo:        boolean;
  isUnrecoverable:                 boolean;
  aliases:                         Alias[];
  socialLinks:                     SocialLink[];
  blockedUsers:                    string[];
  devices:                         Device[];
  userChannelNotificationSettings: UserChannelNotificationSetting[];
  userPresenceStatus:              number;
  userTransientStatus:             null;
  badges:                          any[];
  useLegacyNav:                    boolean;
  upsell:                          null;
  hasSeenServerSubscriptions:      boolean;
  serverSubscriptions:             any[];
  advancedSettings:                AdvancedSettings;
}

export interface AboutInfo {
  bio:     string;
  tagLine: string;
}

export interface AdvancedSettings {
  hasDeveloperModeEnabled: boolean;
}

export interface Alias {
  alias:            null | string;
  discriminator:    null | string;
  name:             string;
  createdAt:        Date;
  userId:           string;
  gameId:           number;
  socialLinkSource: null | string;
  additionalInfo:   Record<string, any>;
  editedAt:         Date;
  socialLinkHandle: null | string;
  playerInfo:       null;
}

export interface The361074_Halocegametype {
  value:      boolean;
  optionName: string;
}

export interface Device {
  type:       DeviceType;
  id:         string;
  lastOnline: Date;
  isActive:   boolean;
}

export enum DeviceType {
  Desktop = "desktop",
  Mobile = "mobile",
}

export interface SocialLink {
  serviceId:      null | string;
  type:           string;
  handle:         string;
  profilePicture: null | string;
  additionalInfo: SocialLinkAdditionalInfo;
}

export interface SocialLinkAdditionalInfo {
  id?:              string;
  avatarUrl?:       string;
  profileUrl?:      string;
  personaState?:    number;
  scope?:           string;
  channelId?:       string;
  channelName?:     string;
  lastRefreshed?:   Date;
  broadcasterType?: string;
  sub?:             string;
  nickname?:        string;
}

export interface UserChannelNotificationSetting {
  teamId:                   string;
  teamSettings:             TeamSettings;
  channelCategoryOverrides: { [key: string]: ChannelCategoryOverride } | null;
  channelOverrides:         ChannelOverrides | null;
}

export interface ChannelCategoryOverride {
  mute: boolean;
}

export interface ChannelOverrides {
  "53169a39-0c1f-48a9-8992-c126f4e8e94b"?: ChannelCategoryOverride;
  "44bba022-27e7-4818-bd24-78c3fff077be"?: ChannelCategoryOverride;
  "62ee7444-e767-452a-8de8-0e00dde6b8de"?: ChannelCategoryOverride;
  "1830abf8-3421-4a2a-89c8-4144574fefde"?: ChannelCategoryOverride;
  "36df045b-a8a0-4074-98c7-d7db82051ae0"?: The36_Df045BA8A0407498_C7D7Db82051Ae0;
  "2f34923a-d2af-4cde-bbb7-20c8359fe889"?: ChannelCategoryOverride;
  "e72dec5b-c162-41ec-8a89-817cba14a5f8"?: The36_Df045BA8A0407498_C7D7Db82051Ae0;
}

export interface The36_Df045BA8A0407498_C7D7Db82051Ae0 {
  mute:                 boolean;
  notificationSettings: Notification;
}

export interface TeamSettings {
  mute?:                    boolean;
  notificationSettings?:    Notification;
  mobilePushNotification?:  boolean;
  suppressEveryoneAndHere?: boolean;
}

export interface UserStatus {
  content: Content
  customReactionId: number
  expireInMs: number
}

export interface Content {
  document: Document
  object: string
}

export interface Document {
  data: Data
  nodes: Node[]
  object: string
}

export interface Data {}

export interface Node {
  data: Data2
  nodes: Node2[]
  object: string
  type: string
}

export interface Data2 {}

export interface Node2 {
  leaves?: Lefe[]
  object: string
  type?: string
  data?: Data3
  nodes?: Node3[]
}

export interface Lefe {
  marks: any[]
  object: string
  text: string
}

export interface Data3 {
  name: string
  fileSizeBytes: number
  src: string
}

export interface Node3 {
  object: string
  leaves: Lefe2[]
}

export interface Lefe2 {
  object: string
  text: string
  marks: any[]
}


export interface GuildedMediaUpload {
  url: string
}
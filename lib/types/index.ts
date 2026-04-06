export type Role = "manager" | "account_manager" | "graphic_designer" | "video_editor" | "photographer";

export type AgencyMode = "full_service" | "paid_ads" | "social_media";

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  weeklyCapacityHours: number;
};

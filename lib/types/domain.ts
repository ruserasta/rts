export type ClientStatus = "active" | "inactive" | "on_hold";
export type CampaignStatus = "draft" | "planned" | "active" | "paused" | "completed" | "cancelled";
export type TaskStatus = "backlog" | "todo" | "in_progress" | "waiting_review" | "approved" | "done" | "blocked";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type CrmStage = "new_lead" | "contacted" | "qualified" | "proposal_sent" | "negotiation" | "won" | "lost";

export type ClientRecord = {
  id: string;
  name: string;
  industry: string;
  owner: string;
  serviceType: "full_service" | "paid_ads" | "social_media";
  retainer: number;
  status: ClientStatus;
};

export type CampaignRecord = {
  id: string;
  name: string;
  clientId: string;
  type: "full_service" | "paid_ads" | "social_media" | "branding" | "production";
  channel: string;
  budget: number;
  spend: number;
  owner: string;
  status: CampaignStatus;
};

export type TaskRecord = {
  id: string;
  title: string;
  clientId: string;
  campaignId: string;
  assignedTo: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
};

export type CrmLeadRecord = {
  id: string;
  company: string;
  contactPerson: string;
  serviceInterested: string;
  estimatedValue: number;
  stage: CrmStage;
  owner: string;
  nextFollowUpDate: string;
};

export type BudgetRecord = {
  id: string;
  clientId: string;
  campaignId: string;
  allocatedBudget: number;
  actualSpend: number;
  internalProductionCost: number;
  externalCost: number;
  revenue: number;
};

export type ContentItemRecord = {
  id: string;
  title: string;
  clientId: string;
  platform: "Instagram" | "Facebook" | "TikTok" | "LinkedIn" | "YouTube" | "Website" | "Email";
  contentType: "Post" | "Reel" | "Story" | "Carousel" | "Video" | "Ad Creative" | "Blog" | "Email Campaign";
  publishDate: string;
  approvalStatus: "Draft" | "In Review" | "Needs Changes" | "Approved" | "Scheduled" | "Published";
  postingStatus: "Not Ready" | "Ready" | "Scheduled" | "Posted";
  owner: string;
};

import { AgencyMode, UserProfile } from "@/lib/types";

export const teamMembers: UserProfile[] = [
  { id: "u1", fullName: "Manager 1", email: "manager1@cakgroup.com", role: "manager", weeklyCapacityHours: 40 },
  { id: "u2", fullName: "Graphic Designer 1", email: "designer1@cakgroup.com", role: "graphic_designer", weeklyCapacityHours: 40 },
  { id: "u3", fullName: "Graphic Designer 2", email: "designer2@cakgroup.com", role: "graphic_designer", weeklyCapacityHours: 40 },
  { id: "u4", fullName: "Video Editor 1", email: "video1@cakgroup.com", role: "video_editor", weeklyCapacityHours: 40 },
  { id: "u5", fullName: "Photographer 1", email: "photo1@cakgroup.com", role: "photographer", weeklyCapacityHours: 40 },
  { id: "u6", fullName: "Account Manager 1", email: "am1@cakgroup.com", role: "account_manager", weeklyCapacityHours: 40 },
  { id: "u7", fullName: "Account Manager 2", email: "am2@cakgroup.com", role: "account_manager", weeklyCapacityHours: 40 }
];

export const dashboardStats = {
  activeClients: 12,
  activeCampaigns: 24,
  upcomingDeadlines: 18,
  overdueTasks: 6,
  contentThisWeek: 42,
  monthlyBudget: 125000,
  monthlySpend: 89600,
  pipelineValue: 320000,
  teamUtilization: 82
};

export const chartData = {
  campaignStatus: [
    { name: "Active", value: 15 },
    { name: "Planned", value: 5 },
    { name: "Paused", value: 3 },
    { name: "Completed", value: 8 }
  ],
  tasksByStatus: [
    { name: "To Do", value: 18 },
    { name: "In Progress", value: 20 },
    { name: "Waiting Review", value: 7 },
    { name: "Done", value: 33 }
  ],
  leadsByStage: [
    { name: "New", value: 8 },
    { name: "Qualified", value: 12 },
    { name: "Proposal", value: 5 },
    { name: "Won", value: 6 }
  ],
  contentByPlatform: [
    { name: "Instagram", value: 12 },
    { name: "TikTok", value: 9 },
    { name: "YouTube", value: 5 },
    { name: "LinkedIn", value: 7 },
    { name: "Facebook", value: 6 },
    { name: "Website", value: 3 }
  ]
};

export const clients = [
  { id: "c1", name: "Nexa Homes", industry: "Real Estate", status: "active", retainer: 12000 },
  { id: "c2", name: "Bloom Wellness", industry: "Healthcare", status: "active", retainer: 9000 },
  { id: "c3", name: "Orbit Foods", industry: "FMCG", status: "on_hold", retainer: 15000 }
];

export const workspaceModes: { label: string; value: AgencyMode; description: string }[] = [
  { label: "Full-Service", value: "full_service", description: "All modules and services enabled." },
  { label: "Paid Ads", value: "paid_ads", description: "Campaign, budget, and conversion focused workspace." },
  { label: "Social Media", value: "social_media", description: "Content production and publishing workflow workspace." }
];

export const modulePlaceholder = {
  campaigns: "Campaign tracker with filters, KPIs, and linked tasks/content.",
  content: "Calendar planning with weekly/monthly/list views and ownership workload.",
  tasks: "Kanban + table task workflows with comments and due-date health.",
  budgets: "Budget vs spend with profit, margin, and ROI calculations.",
  crm: "Pipeline board with weighted value and follow-up reminders.",
  capacity: "Utilization by teammate and overload warnings based on assigned hours.",
  weekly: "Plan weekly priorities and blockers tied to campaigns and tasks.",
  reports: "Export-friendly operational and performance analytics views."
};


export const testCredentials = {
  adminEmail: "manager1@cakgroup.com",
  defaultPassword: "CakGroup!2026"
};

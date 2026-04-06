import { BudgetRecord, CampaignRecord, ClientRecord, ContentItemRecord, CrmLeadRecord, TaskRecord } from "@/lib/types/domain";

export const clientsData: ClientRecord[] = [
  { id: "c1", name: "Nexa Homes", industry: "Real Estate", owner: "Account Manager 1", serviceType: "full_service", retainer: 12000, status: "active" },
  { id: "c2", name: "Bloom Wellness", industry: "Healthcare", owner: "Account Manager 2", serviceType: "social_media", retainer: 9000, status: "active" },
  { id: "c3", name: "Orbit Foods", industry: "FMCG", owner: "Account Manager 1", serviceType: "paid_ads", retainer: 15000, status: "on_hold" },
  { id: "c4", name: "Northstar Clinics", industry: "Healthcare", owner: "Account Manager 2", serviceType: "paid_ads", retainer: 11000, status: "active" }
];

export const campaignsData: CampaignRecord[] = [
  { id: "cp1", name: "Q2 Growth Launch", clientId: "c1", type: "full_service", channel: "Instagram + Meta Ads", budget: 30000, spend: 22000, owner: "Manager 1", status: "active" },
  { id: "cp2", name: "Brand Refresh", clientId: "c2", type: "social_media", channel: "Instagram + TikTok", budget: 12000, spend: 8400, owner: "Account Manager 2", status: "planned" },
  { id: "cp3", name: "Lead Gen Sprint", clientId: "c4", type: "paid_ads", channel: "Google Ads", budget: 18000, spend: 19000, owner: "Manager 1", status: "active" },
  { id: "cp4", name: "Seasonal Product Push", clientId: "c3", type: "paid_ads", channel: "Meta Ads", budget: 14000, spend: 3000, owner: "Account Manager 1", status: "paused" }
];

export const tasksData: TaskRecord[] = [
  { id: "t1", title: "Design 6 carousel concepts", clientId: "c1", campaignId: "cp1", assignedTo: "Graphic Designer 1", priority: "high", status: "in_progress", dueDate: "2026-04-09", estimatedHours: 10, actualHours: 6 },
  { id: "t2", title: "Edit launch reel", clientId: "c1", campaignId: "cp1", assignedTo: "Video Editor 1", priority: "urgent", status: "waiting_review", dueDate: "2026-04-07", estimatedHours: 8, actualHours: 9 },
  { id: "t3", title: "Product photo session", clientId: "c3", campaignId: "cp4", assignedTo: "Photographer 1", priority: "medium", status: "todo", dueDate: "2026-04-12", estimatedHours: 6, actualHours: 0 },
  { id: "t4", title: "Performance report deck", clientId: "c4", campaignId: "cp3", assignedTo: "Account Manager 2", priority: "high", status: "todo", dueDate: "2026-04-08", estimatedHours: 5, actualHours: 1 }
];

export const crmLeadsData: CrmLeadRecord[] = [
  { id: "l1", company: "Skyline Clinics", contactPerson: "Noah Lee", serviceInterested: "Full-service", estimatedValue: 50000, stage: "qualified", owner: "Account Manager 1", nextFollowUpDate: "2026-04-08" },
  { id: "l2", company: "Harbor Hotels", contactPerson: "Ava Moore", serviceInterested: "Paid ads", estimatedValue: 68000, stage: "proposal_sent", owner: "Manager 1", nextFollowUpDate: "2026-04-11" },
  { id: "l3", company: "Volt Fitness", contactPerson: "Luca Martin", serviceInterested: "Social media", estimatedValue: 36000, stage: "contacted", owner: "Account Manager 2", nextFollowUpDate: "2026-04-10" }
];

export const budgetsData: BudgetRecord[] = [
  { id: "b1", clientId: "c1", campaignId: "cp1", allocatedBudget: 30000, actualSpend: 22000, internalProductionCost: 3800, externalCost: 2100, revenue: 46000 },
  { id: "b2", clientId: "c2", campaignId: "cp2", allocatedBudget: 12000, actualSpend: 8400, internalProductionCost: 2200, externalCost: 1400, revenue: 21000 },
  { id: "b3", clientId: "c4", campaignId: "cp3", allocatedBudget: 18000, actualSpend: 19000, internalProductionCost: 2600, externalCost: 900, revenue: 28000 }
];

export const contentItemsData: ContentItemRecord[] = [
  { id: "ci1", title: "Neighborhood spotlight reel", clientId: "c1", platform: "Instagram", contentType: "Reel", publishDate: "2026-04-09", approvalStatus: "In Review", postingStatus: "Scheduled", owner: "Graphic Designer 1" },
  { id: "ci2", title: "Wellness tips carousel", clientId: "c2", platform: "Instagram", contentType: "Carousel", publishDate: "2026-04-11", approvalStatus: "Approved", postingStatus: "Scheduled", owner: "Graphic Designer 2" },
  { id: "ci3", title: "Ad creative cutdown", clientId: "c4", platform: "Facebook", contentType: "Ad Creative", publishDate: "2026-04-08", approvalStatus: "Needs Changes", postingStatus: "Not Ready", owner: "Video Editor 1" }
];

export function getClientName(clientId: string) {
  return clientsData.find((client) => client.id === clientId)?.name ?? "Unknown";
}

export function getCampaignName(campaignId: string) {
  return campaignsData.find((campaign) => campaign.id === campaignId)?.name ?? "Unknown";
}

export function calculateBudgetMetrics(row: BudgetRecord) {
  const totalCost = row.actualSpend + row.internalProductionCost + row.externalCost;
  const profit = row.revenue - totalCost;
  const margin = row.revenue > 0 ? profit / row.revenue : 0;
  const roi = totalCost > 0 ? profit / totalCost : 0;

  return { totalCost, profit, margin, roi };
}

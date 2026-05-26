export type RiskLevel = "Low" | "Medium" | "High";

export type EvidenceStatus = "Available" | "Missing" | "Needs Review";

export type EvidenceCategory =
  | "Identity"
  | "Timeline"
  | "Communication"
  | "Medical"
  | "Financial"
  | "Court"
  | "Witness";

export type ScanStatus =
  | "idle"
  | "uploading"
  | "scanning"
  | "extracting"
  | "buildingTimeline"
  | "spottingIssues"
  | "complete";

export type CaseParty = {
  id: string;
  name: string;
  role: string;
  description: string;
};

export type CaseFact = {
  id: string;
  label: string;
  value: string;
  confidence: number;
  source: string;
};

export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  source: string;
  confidence: number;
};

export type LegalIssue = {
  id: string;
  issue: string;
  riskLevel: RiskLevel;
  summary: string;
  reviewPrompt: string;
  disclaimer: string;
};

export type EvidenceItem = {
  id: string;
  label: string;
  status: EvidenceStatus;
  category: EvidenceCategory;
  notes: string;
};

export type ExportSummary = {
  title: string;
  overview: string;
  keyFindings: string[];
  recommendedReviewAreas: string[];
  disclaimer: string;
};

export type CaseAnalysis = {
  id: string;
  caseTitle: string;
  caseType: string;
  jurisdiction: string;
  court: string;
  documentName: string;
  uploadedAt: string;
  parties: CaseParty[];
  facts: CaseFact[];
  timeline: TimelineEvent[];
  issues: LegalIssue[];
  evidenceChecklist: EvidenceItem[];
  exportSummary: ExportSummary;
};

export type ScanStep = {
  id: ScanStatus;
  label: string;
  description: string;
  progress: number;
};
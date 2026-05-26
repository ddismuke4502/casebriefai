import { CaseAnalysis, ScanStep } from "@/types/caseBrief";

export const scanSteps: ScanStep[] = [
  {
    id: "idle",
    label: "Ready for document upload",
    description: "Awaiting a mock case file to begin analysis.",
    progress: 0,
  },
  {
    id: "uploading",
    label: "Uploading mock case file",
    description: "Securing the document and preparing it for review.",
    progress: 16,
  },
  {
    id: "scanning",
    label: "Scanning document structure",
    description: "Reading headings, dates, parties, and document sections.",
    progress: 34,
  },
  {
    id: "extracting",
    label: "Extracting case facts",
    description: "Identifying key facts, parties, allegations, and claims.",
    progress: 58,
  },
  {
    id: "buildingTimeline",
    label: "Building case timeline",
    description: "Organizing events into chronological order.",
    progress: 76,
  },
  {
    id: "spottingIssues",
    label: "Spotting possible issues",
    description: "Flagging review areas that may need attorney analysis.",
    progress: 91,
  },
  {
    id: "complete",
    label: "Case analysis complete",
    description: "Mock analysis package is ready for review and export.",
    progress: 100,
  },
];

export const mockCaseAnalysis: CaseAnalysis = {
  id: "case-demo-001",
  caseTitle: "State v. Demo Client",
  caseType: "Criminal Defense Review",
  jurisdiction: "Fictional County, GA",
  court: "Superior Court Mock Division",
  documentName: "demo-case-file.pdf",
  uploadedAt: "2026-05-26T10:30:00Z",

  parties: [
    {
      id: "party-001",
      name: "Demo Client",
      role: "Defendant",
      description:
        "Individual listed as the accused party in the mock case file.",
    },
    {
      id: "party-002",
      name: "State of Georgia",
      role: "Plaintiff",
      description:
        "Government party bringing the fictional criminal complaint.",
    },
    {
      id: "party-003",
      name: "Officer J. Carter",
      role: "Responding Officer",
      description:
        "Officer referenced in the incident report and arrest narrative.",
    },
    {
      id: "party-004",
      name: "Witness A",
      role: "Civilian Witness",
      description:
        "Witness mentioned in the narrative with a partial statement.",
    },
  ],

  facts: [
    {
      id: "fact-001",
      label: "Incident Date",
      value: "March 14, 2026",
      confidence: 96,
      source: "Incident report header",
    },
    {
      id: "fact-002",
      label: "Primary Allegation",
      value: "Physical altercation resulting in reported injury",
      confidence: 89,
      source: "Narrative summary",
    },
    {
      id: "fact-003",
      label: "Arrest Location",
      value: "Fictional Avenue and 7th Street",
      confidence: 84,
      source: "Officer report",
    },
    {
      id: "fact-004",
      label: "Body Camera Referenced",
      value: "Yes, but footage status is not confirmed",
      confidence: 78,
      source: "Evidence section",
    },
    {
      id: "fact-005",
      label: "Medical Documentation",
      value: "Referenced but not attached to the document packet",
      confidence: 81,
      source: "Supplemental notes",
    },
    {
      id: "fact-006",
      label: "Witness Statement",
      value: "One civilian witness statement appears partially summarized",
      confidence: 74,
      source: "Witness section",
    },
  ],

  timeline: [
    {
      id: "timeline-001",
      date: "2026-03-14",
      title: "Reported incident occurs",
      description:
        "The case file states that the alleged incident occurred near Fictional Avenue and 7th Street.",
      source: "Incident report",
      confidence: 96,
    },
    {
      id: "timeline-002",
      date: "2026-03-14",
      title: "Officer response documented",
      description:
        "Responding officer records initial observations and identifies involved parties.",
      source: "Officer narrative",
      confidence: 88,
    },
    {
      id: "timeline-003",
      date: "2026-03-15",
      title: "Initial witness statement collected",
      description:
        "A civilian witness statement is referenced, but the full statement is not included.",
      source: "Witness summary",
      confidence: 74,
    },
    {
      id: "timeline-004",
      date: "2026-03-17",
      title: "Medical records referenced",
      description:
        "The packet references medical documentation, but supporting records are missing from the upload.",
      source: "Supplemental notes",
      confidence: 81,
    },
    {
      id: "timeline-005",
      date: "2026-03-22",
      title: "Court filing generated",
      description:
        "A formal filing appears in the document packet with case metadata and charge language.",
      source: "Court filing",
      confidence: 92,
    },
  ],

  issues: [
    {
      id: "issue-001",
      issue: "Missing Supporting Evidence",
      riskLevel: "High",
      summary:
        "The case file references medical documentation and possible camera footage, but neither appears attached in the uploaded packet.",
      reviewPrompt:
        "Confirm whether body camera footage, medical reports, and supplemental records were produced.",
      disclaimer:
        "This is a mock review flag and should not be interpreted as legal advice.",
    },
    {
      id: "issue-002",
      issue: "Incomplete Witness Record",
      riskLevel: "Medium",
      summary:
        "The witness statement appears summarized rather than fully included, which may limit factual review.",
      reviewPrompt:
        "Request the full witness statement and compare it against the officer narrative.",
      disclaimer:
        "This is a mock review flag and should not be interpreted as legal advice.",
    },
    {
      id: "issue-003",
      issue: "Timeline Consistency Check",
      riskLevel: "Medium",
      summary:
        "The incident date, witness statement date, and medical reference date should be reviewed for consistency.",
      reviewPrompt:
        "Verify whether each event date aligns with the official court record and discovery packet.",
      disclaimer:
        "This is a mock review flag and should not be interpreted as legal advice.",
    },
  ],

  evidenceChecklist: [
    {
      id: "evidence-001",
      label: "Incident report",
      status: "Available",
      category: "Court",
      notes: "Included in uploaded packet.",
    },
    {
      id: "evidence-002",
      label: "Body camera footage",
      status: "Needs Review",
      category: "Timeline",
      notes: "Referenced but not confirmed as attached.",
    },
    {
      id: "evidence-003",
      label: "Medical documentation",
      status: "Missing",
      category: "Medical",
      notes: "Mentioned in notes but not included in packet.",
    },
    {
      id: "evidence-004",
      label: "Full witness statement",
      status: "Missing",
      category: "Witness",
      notes: "Only a summarized statement appears in the mock file.",
    },
    {
      id: "evidence-005",
      label: "Charging document",
      status: "Available",
      category: "Court",
      notes: "Court filing appears present.",
    },
    {
      id: "evidence-006",
      label: "Communication records",
      status: "Needs Review",
      category: "Communication",
      notes: "No messages or call logs are attached.",
    },
  ],

  exportSummary: {
    title: "Mock Case Review Summary",
    overview:
      "CaseBrief AI reviewed the uploaded mock case packet and generated a structured summary of parties, extracted facts, timeline events, possible issue areas, and missing evidence items.",
    keyFindings: [
      "The incident report and charging document appear available in the mock packet.",
      "Medical documentation is referenced but not attached.",
      "Body camera footage is referenced but its availability is unclear.",
      "The witness statement appears incomplete or summarized.",
    ],
    recommendedReviewAreas: [
      "Confirm all discovery materials were produced.",
      "Compare witness statement details against the officer narrative.",
      "Validate the timeline against court filings and external records.",
      "Review whether missing evidence affects the completeness of the case packet.",
    ],
    disclaimer:
      "This export is generated by a portfolio mockup and does not provide legal advice, legal strategy, or attorney-client services.",
  },
};
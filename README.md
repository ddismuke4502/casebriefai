# CaseBrief AI

[![CI](https://github.com/ddismuke4502/casebriefai/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/ddismuke4502/casebriefai/actions/workflows/ci.yml)

CaseBrief AI is a noir-inspired legal-tech SaaS mockup that simulates an AI-assisted legal document analysis workflow. The project demonstrates how a serious AI product could help organize complex legal documents into structured, reviewable information without presenting itself as legal advice.

Live Demo: https://casebriefai.vercel.app
Repository: https://github.com/ddismuke4502/casebriefai

## Overview

CaseBrief AI is designed as a portfolio-grade frontend product that translates dense legal-document workflows into a polished, interactive user experience.

The app simulates:

* Mock document upload
* AI scanning workflow
* Extracted case facts
* Party identification
* Timeline reconstruction
* Issue spotting
* Evidence checklist review
* Exportable case summary generation
* Non-legal-advice safety framing

The product is built as a mock AI SaaS experience using structured local data, reusable UI primitives, stateful workflows, GSAP animation, responsive design, and skeleton loading states.

## Important Disclaimer

CaseBrief AI is a portfolio mockup. It does not provide legal advice, legal representation, case strategy, attorney-client services, or attorney-reviewed legal work product.

No real documents are processed. The analyzer uses mock data only.

## Features

### Mock AI Upload Flow

Users can run a simulated document analysis flow that progresses through multiple AI-style states:

* Uploading mock case file
* Scanning document structure
* Extracting case facts
* Building timeline
* Spotting possible issues
* Completing case analysis

### Stateful Results Unlock

Before analysis runs, the results are locked. During the scan, the app displays skeleton loading states. After completion, the full analysis dashboard is revealed.

### Extracted Case Intelligence

The analysis dashboard organizes mock case information into:

* Case metadata
* Court and jurisdiction details
* Document name
* Identified parties
* Extracted facts
* Confidence indicators
* Source references

### Timeline Builder

The timeline section reconstructs a chronological case sequence from mock document clues, including event dates, descriptions, source references, and confidence scores.

### Issue Spotting

The issue spotting section surfaces possible review areas with:

* Risk levels
* Review priority labels
* Attorney-review prompts
* Safety-conscious disclaimer messaging

### Evidence Checklist

The evidence checklist helps organize mock case materials by status and category.

Supported evidence statuses:

* Available
* Missing
* Needs Review

Supported categories include:

* Court
* Timeline
* Medical
* Witness
* Communication
* Identity
* Financial

### Export Summary

The export section simulates generating a review packet from the analysis. It includes:

* Generated summary state
* Skeleton loading transition
* Key findings
* Recommended review areas
* Disclaimer block
* Copy summary action
* Download summary action
* Print preview support

### Motion and Interaction

The project uses GSAP for polished product motion, including:

* Hero entrance animation
* Upload/scanning animation
* Extracted facts reveal
* Timeline reveal
* Issue card reveal
* Evidence filter animation
* Export summary transition
* Glitch-style disclaimer alert animation

Animations respect reduced-motion preferences.

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* GSAP
* Lucide React
* Vercel

## Architecture Highlights

The project is organized around reusable sections, cards, UI primitives, mock data models, and animation hooks.

```txt
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── cards/
│   │   ├── EvidenceItem.tsx
│   │   ├── FactCard.tsx
│   │   ├── IssueCard.tsx
│   │   └── TimelineItem.tsx
│   │
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   │
│   ├── sections/
│   │   ├── AnalysisDashboard.tsx
│   │   ├── DisclaimerStrip.tsx
│   │   ├── EvidenceChecklist.tsx
│   │   ├── ExportSummary.tsx
│   │   ├── HeroSection.tsx
│   │   ├── IssueSpottingSection.tsx
│   │   ├── ResultSkeleton.tsx
│   │   ├── TimelineSection.tsx
│   │   └── UploadAnalyzer.tsx
│   │
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── SectionHeader.tsx
│   │   └── Skeleton.tsx
│   │
│   └── CaseBriefExperience.tsx
│
├── data/
│   └── mockCaseData.ts
│
├── hooks/
│   └── useGsapReveal.ts
│
└── types/
    └── caseBrief.ts
```

## Product Thinking

CaseBrief AI was designed to feel like a serious legal-tech SaaS product while keeping the safety boundaries clear.

The project focuses on:

* Translating complex document workflows into understandable UI
* Showing AI output as review assistance, not legal advice
* Keeping human review central to the experience
* Demonstrating structured data modeling
* Building a complete product journey from upload to export
* Creating a polished, responsive, animation-rich interface

## Design Direction

The visual system uses a dark noir legal-tech aesthetic inspired by detective case files, evidence boards, and premium SaaS dashboards.

Design characteristics:

* Gunmetal and charcoal surfaces
* Restrained gold signal accents
* Red warning and disclaimer states
* Parchment-style text color
* Glitch-style safety notice animation
* Dashboard-style cards and panels
* Responsive mobile-first layouts

## Accessibility and UX Considerations

The project includes:

* Reduced-motion support
* Keyboard focus states
* Semantic sections
* Accessible progress indicators
* Button disabled states
* Responsive layouts
* Clear disclaimer language
* No real document upload requirement

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

Build for production:

```bash
npm run build
```

## Future Improvements

Potential next steps include:

* Real document parsing flow
* Authenticated user workspaces
* Secure file upload pipeline
* OCR/PDF extraction
* AI-generated plain-English summaries
* Attorney-prep question generation
* Document deadline extraction
* User-controlled data deletion
* Export to PDF
* Backend audit logging
* Stronger privacy/security model

## Portfolio Purpose

This project was built to demonstrate frontend engineering depth, product design judgment, animation implementation, responsive UI polish, reusable component architecture, and safety-conscious AI UX design.

CaseBrief AI is not a legal product. It is a portfolio project showing how a legal document assistance workflow could be designed responsibly.

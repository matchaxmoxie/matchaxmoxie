# Transparency Log

## Case 001: Agent Draft Rejected During UI Refactor

During a recruiter-mode UI refactor, an agent suggested consolidating style rules in a way that unintentionally reduced color contrast and broke keyboard focus visibility on interactive controls. The issue was caught in manual review before merge by checking focus states and contrast behavior against the accessibility gate. The final resolution kept the structural cleanup but restored explicit focus outlines and contrast-safe token usage, and the rejected lines were documented as a hallucination-risk pattern for future prompts.

## Case 002: Low-Contrast Yellow CTA Corrected

Identified and resolved a low-contrast accessibility issue in the Hero navigation to ensure universal legibility. The citrus/yellow interactive styles were updated to use dark text and stronger border contrast, and CTA foreground/background values were normalized to WCAG-friendly combinations before release.

## Case 003: Linguistic UAT - March 2026

- Audit Type: Polyglot Peer Review (Human-in-the-Loop).
- The Issue: AI-generated Spanish was too formal; Chinese was too robotic.
- The Fix: Strings were manually audited with polyglot friends to align tone with Madrid and Fuzhou professional cultures.
- The Rationale: Inclusive architecture requires the intent to be as readable as the code.

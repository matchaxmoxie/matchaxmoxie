#!/usr/bin/env bash
# Jade Day 3 module status — open todos + draft paths (terminal-friendly).
# Usage: ./scripts/module-status.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONTENT="${ROOT}/content/jade-day3"
SCRIPTS="${CONTENT}/video-scripts"
SITE="${ROOT}/site/jade-day3.html"

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
path() { printf '  %s\n' "$1"; }

bold "(Jade) Day 3 — FASE Events & Attendance"
echo "Repo: ${ROOT}"
echo "Board: file://${SITE}"
echo

bold "Open todos"
echo "  • Confirm SPC Meetings + Lunch & Learns need new videos (L&L optional)"
echo "  • Record: iPad check-in, event idea walkthrough, Absence Protocol"
echo "  • Ping Marisa on Fall 2026 FASE Calendar (publish rest without waiting)"
echo "  • Build both quizzes in New Quizzes; link sample forms + event-idea before publish"
echo

bold "Priority video scripts (record next)"
path "${SCRIPTS}/2026-ipad-checkin-video-script.md"
path "${SCRIPTS}/2026-event-idea-video-script.md"
path "${SCRIPTS}/2026-absence-protocol-video-script.md"
echo

bold "Optional / stub video scripts"
path "${SCRIPTS}/2026-spc-meetings-video-script-STUB.md"
path "${SCRIPTS}/2026-lunch-and-learns-video-script-STUB.md"
echo

bold "Page drafts (content/jade-day3/)"
for f in \
  office-hours.md \
  ipad-checkin.md \
  spc-meetings.md \
  in-services-sph-l102.md \
  msld-programs.md \
  lunch-and-learns.md \
  event-idea.md \
  sample-budget-event-forms.md \
  absence-protocol.md \
  fall-2026-calendar.md; do
  path "${CONTENT}/${f}"
done
echo

bold "Quizzes"
path "${CONTENT}/quiz-budget-event-forms.md"
path "${CONTENT}/quiz-fase-events-attendance.md"
echo

bold "Blocked"
echo "  Fall 2026 FASE Calendar — Marisa → ${CONTENT}/fall-2026-calendar.md"

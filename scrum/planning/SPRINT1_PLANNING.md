# Sprint Planning Report: Sprint 1

---

## 1. Meeting Details

**Date:** 11/2/2026

**Scrum Master:** Zaina Olibah

**Attendees:** Callie, Devin, Aidan

**Absent:** none

---

## 2. Sprint Goal

A player can open Mage Quest, press Start, pick a mage type, and move their mage around the screen.

---

## 3. Capacity and Velocity

**Sprint dates:** 11/2/2026 to 11/8/2026

**Velocity last sprint (points completed):** n/a

**Average velocity so far:** n/a

**Known absences or reduced availability this sprint:** n/a

**Points committed this sprint:** 14

**Why this commitment is realistic:** Its the beginning steps of a game. 4 people at 5 hours each is about 20 hours for the week, and the task estimates below add up to 16 hours.

---

## 4. Committed Backlog Items

| Issue # | User story | Estimate | Owner | Ready? |
|---------|------------|----------|-------|--------|
| #7 | Player icon moves on screen | 5 | Aidan | [x] |
| #27 | Make a player icon | 3 | Zaina | [x] |
| #12 | Title screen with Start button | 3 | Devin | [x] |
| #1 | Choose a mage type at the start of a run | 3 | Callie | [x] |

**Total points:** 14

**Notes:** These are the four Urgent items at the top of the backlog. #17 (Taking damage) was left for Sprint 2 since there is nothing to take damage from yet.

---

## 5. Task Breakdown

### Issue #7: *Player icon moves on screen*

- [ ] Set up src/model, src/view, src/controller folders and wire them in sketch.js (1 hour)
- [ ] Load the icon (0.5 hours)
- [ ] Connect movement to arrow keys and WASD (1.5 hours)
- [ ] Keep the icon inside the screen edges (0.5 hours)
- [ ] Write Jasmine specs for the movement logic (1 hour)
- [ ] Review PR (0.5 hours)

### Issue #27: *Make a player icon*

- [ ] Make p5.js character (1 hour)
- [ ] Make color variations for the three mage types (1 hour)
- [ ] Write Jasmine spec for picking the color from the mage type (0.5 hours)
- [ ] Review PR (0.5 hours)

### Issue #12: *Title screen with Start button*

- [ ] Make cool title image (1 hour)
- [ ] Create startup screen (1 hour)
- [ ] Clickable start button that switches to the game screen (1 hour)
- [ ] Write Jasmine spec for the screen state change (0.5 hours)
- [ ] Review PR (0.5 hours)

### Issue #1: *Choose a mage type at the start of a run*

- [ ] Create screen that pulls up after start button (1 hour)
- [ ] 3 mage type buttons (1 hour)
- [ ] Connect buttons to different skin variations (1 hour)
- [ ] Write Jasmine spec for storing the chosen mage type (0.5 hours)
- [ ] Review PR (0.5 hours)

---

## 6. Work Distribution

| Member | Stories owned | Points |
|--------|---------------|--------|
| Callie | 1 | 3 |
| Devin | 1 | 3 |
| Aidan | 1 | 5 |
| Zaina | 1 | 3 |

*If the work is not balanced, explain why:* Aidan has 5 points because #7 includes setting up the folder structure everyone else will build on.

---

## 7. Stories Split or Deferred

We split making a player move into two parts (#7 and #27) because an icon would be a large enough task in itself.

---

## 8. Retrospective Follow-Through

n/a

---

## 9. Risks and Dependencies

Icon (#27) is needed for visual aspect tasks. #7 depends on #27 for the icon, and #27 depends on #1 for the mage type colors, so #1 and #27 should be done first. If they slip, #7 can use a placeholder square.

---

## 10. Checklist

- [x] Sprint goal written
- [x] Every committed story meets the Definition of Ready
- [x] Every story has an owner
- [x] Board updated: committed stories in the sprint, tasks created
- [x] Commitment compared to velocity
- [x] Report committed to `scrum/planning/` via pull request

# Sprint Review Report: Sprint 1

**Demo commit:** 179c9ed53f4cfb96dea93b42d2ab3c485e192deb

---

## 1. Meeting Details

**Date:** November 9, 2026

**Scrum Master:** Zaina Olibah

**Attendees:** Zaina Olibah, Aidan Kleen, Callie DuBois, Devin Shifflett

**Absent:** None

**Presenter:** Zaina Olibah

**Deployed build reviewed:** https://jmu-cs345.github.io/F26Team1/

**Release PR into `production`:** https://github.com/JMU-CS345/F26Team1/pull/38

---

## 2. Sprint Goal

**The goal we set:** A player can open Mage Quest, press Start, pick a mage type, and move their mage around the screen.

**Did we meet it?** Yes

The deployed build goes from the Jelly Biscuit intro to the title screen, the Start button opens the mage select screen, picking fire, ice or mind puts that mage on the game screen, and WASD moves it around.

---

## 3. Committed Items: Done or Not Done

| Issue # | User story | Estimate | Owner | Done? | Built by |
|---------|------------|----------|-------|-------|----------|
| #7 | Player icon moves on screen | 5 | Aidan | Yes | Aidan |
| #27 | Make a player icon | 3 | Zaina | Yes | Zaina |
| #12 | Title screen with Start button | 3 | Devin | Yes | Devin |
| #1 | Choose a mage type at the start of a run | 3 | Callie | Yes | Callie |

---

## 4. Metrics

| | Points |
|---|---|
| Committed | 14 |
| Completed | 14 |
| Completion rate | 100% |

**Velocity history:**

| Sprint | Committed | Completed |
|--------|-----------|-----------|
| 1      | 14        | 14        |
| 2      |           |           |
| 3      |           |           |
| 4      |           |           |

**Burndown or board snapshot:** https://github.com/orgs/JMU-CS345/projects/23 (all four Sprint 1 items in the Done column)

**What explains the difference between committed and completed?** There is no difference. All four stories were merged into `main` by November 7 and are in the deployed build.

---

## 5. Demo

### Issue #12: Title screen with Start button

- [x] Given I open the game, when it finishes loading, then I see a title screen with the game name and a Start button.
- [x] Given I am on the title screen, when I click Start or press Enter, then the title screen goes away and the game screen appears.
- [x] Given I am on the title screen, when I press any other key, then nothing happens and I stay on the title screen.

### Issue #1: Choose a mage type at the start of a run

- [x] Given I start a new run, when I am creating my character, then the game shows me the available mage types and lets me select one.
- [x] Given I have selected a mage type, when I confirm my choice, then the game moves on to the next step of creating my character.

### Issue #27: Make a player icon

- [x] Given the game screen is showing, when I look at it, then I can see an icon that represents my mage.
- [x] Given I picked a mage type, when the icon is drawn, then its color matches that type.

### Issue #7: Player icon moves on screen

- [x] Given the game is running, when I look at the screen, then I can see an icon that represents my character.
- [x] Given the icon is on screen, when I press a movement key, then the icon moves in that direction.
- [x] Given the icon is at the edge of the screen, when I keep pressing toward the edge, then the icon stays on screen.

---

## 6. Incomplete Work

| Issue # | What remains | New estimate | Back in backlog? |
|---------|--------------|--------------|------------------|
| n/a     | n/a          | n/a          | [ ]              |

---

## 7. Stakeholder Feedback

_

---

## 8. Backlog Changes

**New stories added:** #31 Walking animation for the mage. Zaina added it during the sprint so the mage can have walk frames instead of a still picture.

**Priorities changed:** None. #17 is still the top item for Sprint 2.

**Stories removed:** None

**If no change was needed, why not?** Riley's feedback was about the build we showed, not about what we build next, so the backlog order from planning still holds.

---

## 9. Quality

**CI status on `production`:** passing

**Number of specs:** 6

**Known bugs in the deployed build:** Movement is 20 pixels per frame so it feels fast. The screen bounds stop the center of the mage at the edge, so about half the sprite can still hang past the edge. `sketch.js` has a leftover `drawFreeMovement` function that is never called.

---

## 10. Checklist

- [x] Demo given from the deployed GitHub Pages build
- [x] Demo given by one presenter, crediting the members who built each story
- [x] Release PR merged before the review begins
- [x] Every committed item marked Done or Not Done
- [x] Every item marked Done has all its acceptance criteria checked in section 5
- [x] Metrics filled in, with the committed/completed difference explained
- [ ] Stakeholder feedback recorded (Sprint 4: n/a)
- [x] Backlog updated, or the reason no change was needed explained (Sprint 4: n/a)
- [x] Report committed to `scrum/review/` via pull request by 11:59 p.m. on the day of the review

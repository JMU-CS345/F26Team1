# Sprint Review Report: Sprint 2

---

## 1. Meeting Details

**Date:** 11/18

**Scrum Master:** Aidan Kleen

**Attendees:** Aidan Kleen, Zaina Olibah, Devin Shifflett

**Absent:** Callie DuBois

**Presenter:** *(one member gives the whole demo)*

**Deployed build reviewed:** (https://jmu-cs345.github.io/F26Team1/)

**Release PR into `production`:** (https://github.com/JMU-CS345/F26Team1/pull/55)

---

## 2. Sprint Goal

*Tell the stakeholder whether the sprint delivered what it set out to.*

**The goal we set:** The player can move in a dungeon, exit into a town, and then enter a new dungeon. We'll also start a couple of basic elements for the dungeons.

**Did we meet it?** Yes. The dungeons are randomly generated, the player can move around in a town, and enter new dungeons. Enemies and decorations appear in dungeons.

_

---

## 3. Committed Items: Done or Not Done

*Done means the item meets every point of your Definition of Done, including "works in the deployed build." There is no "mostly done."*

*The presenter credits the members who built each story during the demo.*

| Issue # | User story | Estimate | Owner | Done? | Built by |
|---------|------------|----------|-------|-------|----------|
|  3      | Change dungeon layouts                                                                |    5      |  Zaina     | [x]    | Zaina
|  5&20   | Visit towns & Towns stay the same between runs                                        |    5      |  Devin     | [x]    | Devin
|  15     | Different enemy types                                                                 |    3      |  Aidan     | [x]    | Aidan
|  31&42  | Mage walk animation in 4 directions & See mage type/description on mage select screen |    3      |  Callie    | [x]    | Callie

---

## 4. Metrics

| Points |
| Committed | 16|
| Completed | 16|
| Completion rate | 100% |

**Velocity history:**

| Sprint | Committed | Completed |
|--------|-----------|-----------|
| 1      | 14        | 14        |
| 2      | 16        | 16        |
| 3      |           |           |
| 4      |           |           |

**Burndown or board snapshot:** https://github.com/orgs/JMU-CS345/projects/23/views/4 (Everything in the done category)

**What explains the difference between committed and completed?** No difference. Everything in "Done" because they all meet the definition of done.

---

## 5. Demo

### Issue #3: Change dungeon layouts

- [x] Make a procedural generator that makes new layouts
- [x] Apply a random theme to it
- [ ]

### Issue #5 & 20: Visit towns & Towns stay the same between runs

- [x] Design a town to explore
- [x] Not randomly generated
- [ ]

### Issue #15: Different enemy types

- [x] Make basic enemies (for now. More detailed enemies can come later)
- [x] Enemies chase the player and can maybe attack them
- [ ]

### Issue #31: Mage walk animation in 4 directions

- [x] Implement the walking animation Zaina made
- [ ]
- [ ]

### Issue #42: See mage type/description on mage select screen

- [x] Each mage type has a title above it
- [x] There's a way to get a brief description of each mage type
- [ ]

---

## 6. Incomplete Work

*What happens to each item that is not done? Return it to the backlog and re-estimate it, even if the estimate stays the same. (Sprint 4: write "n/a")*

| Issue # | What remains | New estimate | Back in backlog? |
|---------|--------------|--------------|------------------|
 N/A      |   N/A        |    N/A       |     N/A

---

## 7. Stakeholder Feedback

He didn't make any suggestions, he just said he liked it.

_

---

## 8. Backlog Changes

**New stories added:** N/A

**Priorities changed:** N/A

**Stories removed:** N/A

**If no change was needed, why not?** Everything looked good according to him and he suggested no changes.

---

## 9. Quality

**CI status on `production`:** Passing

**Number of specs:** 36

**Known bugs in the deployed build:** None so far

---

## 10. Checklist

- [x] Demo given from the deployed GitHub Pages build
- [x] Demo given by one presenter, crediting the members who built each story
- [x] Release PR merged before the review begins
- [x] Every committed item marked Done or Not Done
- [x] Every item marked Done has all its acceptance criteria checked in section 5
- [x] Metrics filled in, with the committed/completed difference explained
- [x] Stakeholder feedback recorded (Sprint 4: n/a)
- [x] Backlog updated, or the reason no change was needed explained (Sprint 4: n/a)
- [x] Report committed to `scrum/review/` via pull request by 11:59 p.m. on the day of the review

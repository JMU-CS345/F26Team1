# Sprint Planning Report: Sprint _

*Copy this file into `scrum/planning/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information.*

---

## 1. Meeting Details

**Date:** 11/11/26

**Scrum Master:** Aidan Kleen

**Attendees:** Aidan, Devin, Zaina

**Absent:** Callie

---

## 2. Sprint Goal

The player can move in a dungeon, exit into a town, and then enter a new dungeon. We'll also start a couple of basic elements for the dungeons.

_

---

## 3. Capacity and Velocity

**Sprint dates:** 11/11 to 11/19

**Velocity last sprint (points completed):** 14

**Average velocity so far:** 14

**Known absences or reduced availability this sprint:** N/A

**Points committed this sprint:** 16

**Why this commitment is realistic:** *(Compare it to your velocity and capacity. If you are committing more than last sprint's velocity, explain why.)*

_

---

## 4. Committed Backlog Items

*Every item listed here must meet the Definition of Ready in your constitution. Items should be taken from the top of the product backlog in priority order. If you skipped a higher-priority item, explain why under "Notes".*

| Issue # | User story | Estimate | Owner | Ready? |
|---------|------------|----------|-------|--------|
|  3      | Change dungeon layouts                                                                |    5      |  Zaina     | [ ]    |
|  5&20   | Visit towns & Towns stay the same between runs                                        |    5      |  Devin     | [ ]    |
|  15     | Different enemy types                                                                 |    3      |  Aidan     | [ ]    |
|  31&42  | Mage walk animation in 4 directions & See mage type/description on mage select screen |    3      |  Callie    | [ ]    |
|         |            |          |       | [ ]    |

**Total points:** 16

**Notes:** 

---

## 5. Task Breakdown

Zaina will make a procedural generator for the dungeons that make a new layout and applies a random theme to it
Devin will design the towns (which are not randomly generated)
Aidan will make basic enemies that run around and chase the player
Callie will add the mage type descriptions that Prof. Riley asked for and implement the walking animation for the mage

### Issue #3: Change dungeon layouts

- [ ] Make a procedural generator that makes new layouts
- [ ] Apply a random theme to it
- [ ]

### Issue #5 & 20: Visit towns & Towns stay the same between runs

- [ ] Design a town to explore
- [ ] Not randomly generated
- [ ]

### Issue #15: Different enemy types

- [ ] Make basic enemies (for now. More detailed enemies can come later)
- [ ] Enemies chase the player and can maybe attack them
- [ ]

### Issue #31: Mage walk animation in 4 directions

- [ ] Implement the walking animation Zaina made
- [ ]
- [ ]

### Issue #42: See mage type/description on mage select screen

- [ ] Each mage type has a title above it
- [ ] There's a way to get a brief description of each mage type
- [ ]
---

## 6. Work Distribution

| Member | Stories owned | Points |
|--------|---------------|--------|
| Zaina       |     1          |   5     |
| Devin       |     2          |   5     |
| Aidan       |     1          |   3     |
| Callie      |     2          |   4     |

*If the work is not balanced, explain why:*

I feel like they're fairly balanced. With the goals we set up for ourselves for this sprint, this is the best we could do.

---

## 7. Stories Split or Deferred

*Did you split any stories that were too large for one sprint, or move stories back to the backlog? List them and say why.*

N/A

---

## 8. Retrospective Follow-Through

*Which action items from last sprint's retrospective are part of this sprint's plan, and how? (Sprint 1: write "n/a")*

| Action item | How it shows up in this sprint |
|-------------|--------------------------------|
| Write "Closes #N" in every story PR description              | This is something Aidan needs to do through every PR  |
| Merge `main` into `production` at the end of each week       | We'll check this on Friday                            |
| Add at least one spec for any new file that has game logic   | This is a technique we'll all have to use             |

---

## 9. Risks and Dependencies

*What might stop the team from meeting the sprint goal? Which stories depend on others being finished first?*

We tried to have way less dependencies than last sprint, and really the only thing that could stop us for this sprint is unexpected roadblocks.

---

## 10. Checklist

- [x] Sprint goal written
- [x] Every committed story meets the Definition of Ready
- [x] Every story has an owner
- [x] Board updated: committed stories in the sprint, tasks created
- [x] Commitment compared to velocity
- [x] Report committed to `scrum/planning/` via pull request

# Sprint Planning Report: Sprint _

*Copy this file into `scrum/planning/` using your team's naming format. Fill in every field. Replace the italic guidance with your team's information.*

---

## 1. Meeting Details

**Date:**  11/20/2026

**Scrum Master:** Callie DuBois

**Attendees:** Zaina, Callie, Aidan

**Absent:** Devin

---

## 2. Sprint Goal

*One or two sentences describing a playable outcome, not a list of tickets. e.g., "A player can create a character and enter the first dungeon."* Want functional item and weapons, and a working combat system. 

_

---

## 3. Capacity and Velocity

**Sprint dates:** 11/20/2026 to 12/4/2026

**Velocity last sprint (points completed):** 16 *(Sprint 1: write "n/a")*

**Average velocity so far:** 15

**Known absences or reduced availability this sprint:** All good other than like break events.

**Points committed this sprint:** 34

**Why this commitment is realistic:** *(Compare it to your velocity and capacity. If you are committing more than last sprint's velocity, explain why.)* We have two weeks to complete this sprint when we had a week for each of the previous sprints, so basically doubled the points committed to this sprint to make up for that.

_

---

## 4. Committed Backlog Items

*Every item listed here must meet the Definition of Ready in your constitution. Items should be taken from the top of the product backlog in priority order. If you skipped a higher-priority item, explain why under "Notes".*

| Issue # | User story | Estimate | Owner | Ready? |
|---------|------------|----------|-------|--------|
|   61    | Town Shops |    8     | Devin | [X]    |
|   17    | Taking Damage |    5     | Zaina  | [ ]    |
|   47    | Player Health |    3     | Zaina | [X]    |
|   59    | Starting Weapon |    3    | Callie | [X]    |
|  60     | Starting Spell by Mage type |    5     | Callie | [X]   |
|   58    | Dealing damage |    5     | Aidan | [ ]    |
|   62    | Hitboxes |    5    | Aidan |  [X]    |

**Total points:** 34

**Notes:** -

---

## 5. Task Breakdown

*Break each story into tasks. Include tasks for writing tests and reviewing PRs, not only coding.*

### Issue #61: Town Shops

- [ ] Shops can be entered
- [ ] You can buy items within the shop
- [ ] Items will stay with the player even after you leave the shop

### Issue #17: Taking Damage

- [ ] Player Health changes when hurt by enemies
- [ ] Indication that player was hit
- [ ] Player dies and looses when they run out of hp

### Issue #47: Player Health

- [ ] Player has health value
- [ ] A health bar is visible on screen 
- [ ] Health bar dynamically changes to current player health


### Issue #59: Starting Weapon

- [ ] Player starts with a basic sword 
- [ ] On right click a close range sweep appears on screen next to the player
- [ ] Deals damage to enemies within sweep

### Issue #60: Starting Spell by Mage type

- [ ] Player has a basic projectile spell they can use
- [ ] Spell is based on mage type
- [ ] Shoots a projectile in the direction of the cursor when left clicking
- [ ] projectile deals damage to enemies upon hitting them

### Issue #58: Dealing damage

- [ ] Player can deal damage to enemies with weapons
- [ ] Damage eventually causes enemies to be killed
- [ ]

### Issue #62: Hitboxes 

- [ ] Enemies and player have hitboxes that allow them to interact with spells and weapons


*(Repeat for each committed story.)*

---

## 6. Work Distribution

| Member | Stories owned | Points |
|--------|---------------|--------|
|  Devin |      61       |   8    |
| Zaina  |    17&47      |   8    |
| Callie |    59&60      |   8    |
|  Aidan |    58&62      |   10   |

*If the work is not balanced, explain why:*

_

---

## 7. Stories Split or Deferred

*Did you split any stories that were too large for one sprint, or move stories back to the backlog? List them and say why.*

nope

---

## 8. Retrospective Follow-Through

*Which action items from last sprint's retrospective are part of this sprint's plan, and how? (Sprint 1: write "n/a")*

| Action item | How it shows up in this sprint |
|-------------|--------------------------------|
|      n/a    |                                |
|             |                                |

---

## 9. Risks and Dependencies

*What might stop the team from meeting the sprint goal? Which stories depend on others being finished first?*

Hitboxes are needed for enemies and the player to take damage, break might take up peoples time


---

## 10. Checklist

- [X] Sprint goal written
- [X] Every committed story meets the Definition of Ready
- [X] Every story has an owner
- [X] Board updated: committed stories in the sprint, tasks created
- [X] Commitment compared to velocity
- [X] Report committed to `scrum/planning/` via pull request

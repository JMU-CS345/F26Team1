# Team Constitution

*This document records how our team works together on Mage Quest. Fill in every field. Replace the italic guidance with your team's decisions. Changes to this document go through a pull request like any other change.*

---

## 1. Team and Roles

### Team Number

1

### Team Name

_

### Members

| Name | GitHub username | Usual availability |
|------|-----------------|--------------------|
| Zaina Olibah | zolibah-star | Everyday but Friday & Saturday |
| Aidan Kleen | AidanKleen | |
| Callie DuBois | CallieDuBois | |
| Devin | dshif21 | |

### Scrum Master

**Sprint 1 Scrum Master:** Zaina Olibah

**Does the role rotate?** Rotates each sprint in the order listed in the members table. Zaina has Sprint 1, then Aidan, Callie, Devin, and back to Zaina

_

### Product Owner

*Choose one team member who will interact with the instructor (stakeholder) to clarify and prioritize stories, and to collect new ones.*

_

### Other Responsibilities

Who is responsible for maintaining the project board / backlog in good order? The current sprint's Scrum Master.

Who is responsible for deploying the main branch to production to update GitHub pages? The current sprint's Scrum Master, right after the sprint review.

### Decision Making

Try for consensus first. If that fails, majority vote. If the vote is 2 to 2, the current Scrum Master decides.

_

---

## 2. Scrum Process

### Sprint Length and Dates

| Sprint | Start | End | Review / Retro date |
|--------|-------|-----|---------------------|
| 1 | 11/2 | 11/8 | 11/9 |
| 2 | 11/9 | 11/15 | 11/16 |
| 3 | 11/16 | 11/29 | 11/30 |
| 4 | 11/30 | 12/6 | 12/7 |
| 5 | 12/7 | presentation day | presentation day | 

### Meetings

| Meeting | When |
|---------|------|
| Daily standup | Wed/Fri |
| Sprint planning | Mon |
| Sprint review | Mon |
| Sprint retrospective | Mon |


_

### Definition of Ready

*A backlog item may be pulled into a sprint only when:*

- [ ] it is written as a user story
- [ ] it has acceptance criteria
- [ ] it has an estimate

### Definition of Done

*An item is done only when:*

- [ ] code is reviewed and approved by at least one teammate
- [ ] all tests pass in CI
- [ ] merged to `main`
- [ ] works in the deployed build
- [ ] the issue is closed
- [ ] Any new model code has at least one Jasmine spec

### Estimation

**Method:** *(story points, t-shirt sizes, hours)*

**Scale:** *(e.g., 1, 2, 3, 5, 8, 13)*

_

### Backlog and Board

**Where the backlog lives:** GitHub Issues on the F26Team1 repo. Project board link to be added.

**Board columns:** *(e.g., To Do → In Progress → In Review → Done)*

_

---

## 3. Communication

### Primary Channel

**Channel:** iMessage

**Expected response time:** Within 12 hours on weekdays

### What Goes Where

Chat is for scheduling, quick questions and heads-ups. GitHub Issues are for anything about a story, including questions about what it means. PR comments are for anything about the code itself.

_

### Reporting Blockers or Falling Behind

*(How and how early does a member tell the team they are stuck or behind?)*

_

### Absences

*(How much notice is required? How is the absent member's work covered?)*

_

---

## 4. Git and GitHub Workflow

### Branch Naming

**Format:** type/issue-short-description

**Allowed types:** `feature`, `fix`, `docs`, `test`, `chore`

**Examples:**

-
-

### Branch Protection on `main`

- [x] No direct pushes to `main`
- [x] Required approvals before merge: _
- [x] CI must pass before merge
- [x] Same protection on `production`

### Commit Messages

Imperative mood, like Add player movement or Fix door collision. First line under 50 characters. No Conventional Commits prefixes

_

### Pull Requests

**Maximum size:** Aim for under 300 changed lines.

**Description template:** What changed, Why, How to test. Add a screenshot for anything visual.

**Linking issues:** Every PR description includes Closes #N so the issue closes on merge.

_

### Code Review

**Review turnaround:** Within 24 hours of being requested.

**Who reviews what:** *(e.g., any teammate; or a rotating assignment)*

_

### Merging

**Merge style:** Squash and merge, so main has one commit per story.

**Who merges:** The author, after approval and a green Tests check.

**After merge:** Delete the branch

_

---

## 5. Code Conventions

### Naming

| Kind | Convention | Example |
|------|------------|---------|
| Variables and functions |camelCase|playerHealth|
| Classes |PascalCase|Player|
| Constants |UPPER_SNAKE_CASE|MAX_HEALTH|
| Files |lowercase w/ hyphens|player-stats|
| Test files |same name as the file under test w/ .spec.js|player-stats.spec.js|

### Formatting

**Indentation:2 spaces

**Semicolons:** always

**Quotes:** double

**Maximum line length:100

**Tools:** *(e.g., Prettier and ESLint, with config files committed to the repo)*

_

### Project Structure

*(Where does each kind of file live?)*

```
index.html          (entry point, loads p5 and src/)
SpecRunner.html     (runs the Jasmine specs, must stay at top level)
p5.js, p5.min.js    (library, do not edit)
src/                (all game code)
test/               (Jasmine specs, *.spec.js)
scrum/              (templates, planning, review, retrospective reports)
.github/workflows/  (CI config)
```

### Architecture Rules

*(e.g., game logic never calls p5 drawing functions directly, so it can be unit tested)*

-Drawing lives in src/view
-Input handling lives in src/controller.

### Comments and Documentation

JSDoc on every class and every function in src/model. Elsewhere, comment anything that is not obvious from the name.

_

### Assets

**File naming:** all lowercase, hyphens, no spaces

**Licensing and attribution:** A file at assets/CREDITS.md listing the source and license of anything the team did not make.

_

---

## 6. Testing and Quality

**Test framework:** Jasmine

**Where tests live:** `test/`

**What must have tests:** All model code; every bug fix gets a test that reproduces it; combat and puzzle rules

_

**Coverage expectations:** 90+%

**Continuous integration:** GitHub Actions runs every spec in SpecRunner.html in headless Chrome on pull requests into `main` and `production`, and on pushes to `production`.

**Rule for failing CI:** Nothing merges while the Tests check is red. Whoever broke it fixes it before starting anything else.

_

**Manual playtesting:** Everyone plays the deployed build the day before the sprint review and files anything they find as an issue with a bug label.

_

---

## 7. Deployment

**Where the game is deployed:** GitHub Pages, URL here

**What triggers a deploy:** A merge into `production`.

**Who checks the deployed build, and when:** The Scrum Master right after each merge into production, plus everyone during playtesting before the review.

---

## 8. AI Tool Usage

**Allowed tools:** Any

**Allowed uses:** ethical use

_

**Not allowed:** Submitting code you cannot explain line by line. 

**Disclosure:** A one-line note in the PR description when AI wrote most of the change. Small help like autocomplete does not need a note.

_

**Responsibility:** Whoever opens the PR owns everything in it, AI-written or not, and has to be able to defend it in a review or to Riley.

_

---

## 9. Working Agreements and Conflict

### Expected Effort

5 hours per person per week outside of class, more in the last two sprints.

_

### Fair Contribution

PRs merged, reviews done and story points completed, all visible on GitHub. The sprint review report records points per person each sprint.
_

### Conflict Resolution

*(What steps do we follow when there is a disagreement or a problem with a teammate?)*

1. talk to the person directly
2. raise it at the retrospective
3. Scrum Master mediates
4. escalate to the instructor

### Missed Commitments

First time, it comes up at the next standup and the story is reassigned if needed. Second time, it becomes a retro action item with that person as owner. Third time, the team talks to Riley.

_

### Amending This Constitution

Propose the change as a PR to CONSTITUTION.md. It needs 3 of 4 approvals and is normally discussed at a retrospective first.

_

---

## 10. Sign-Off

*By signing, each member agrees to follow this constitution.*

| GitHub name | Signature (type your name) | Date |
|------|----------------------------|------|
|zolibah-star|Zaina Olibah|10-26-2026|
|      |                            |      |
|      |                            |      |
|      |                            |      |

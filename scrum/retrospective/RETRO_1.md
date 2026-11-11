# Sprint Retrospective Report: Sprint 1

---

## 1. Meeting Details

**Date:** November 9, 2026

**Facilitator:** Zaina Olibah

**Attendees:** Zaina Olibah, Aidan Kleen, Callie DuBois, Devin Shifflett

**Absent:** None

---

## 2. Last Sprint's Action Items

| Action item | Owner | Done? | Did it help? |
|-------------|-------|-------|--------------|
| n/a         | n/a   | n/a   | n/a          |

---

## 3. The Sprint in Numbers

**Points committed / completed:** 14 / 14

**PRs merged:** 5 (#28 planning report, #29 title screen, #30 player icon, #32 movement, #33 mage select)

**CI runs failed / total:** 0 / 5

**Stories carried over:** 0

---

## 4. Observations

### What went well

- All four committed stories (14 points) were merged into `main` by November 7, two days before the review.
- Every CI run passed. 0 of the 5 Tests runs this sprint failed.
- The stories depended on each other (#1 feeds #27 which feeds #7) but nobody got blocked. Each one was built on its own branch and merged with a squash merge like the constitution says.
- Everyone finished their own story. The points were split 5/3/3/3 across the four of us and all four came in.

### What did not go well

- Issue #1 was still open on review day even though PR #33 that finished it was merged, so the board did not match the repo.
- `main` was not merged into `production` until review day, so the GitHub Pages build showed the old gray canvas for the whole sprint.
- We only have 6 Jasmine specs and they all test `mage-types.js`. The title screen, movement and mage select have no specs.
- The edge check in #7's third acceptance criterion was missed when PR #32 was reviewed. Aidan fixed it on review day in #37, but his first try (#35) was opened from a branch 7 commits behind `main` and would have removed the mage select screen, so it had to be closed and redone.

### What puzzled us or what we want to try

- Put "Closes #N" in the PR description so the issue closes itself when the PR is merged.
- Merge `main` into `production` at the end of every week so Pages never falls behind.

---

## 5. Root Cause

**Problem:** The issues and the deployed build fell behind the code. #1 stayed open after its PR merged and Pages was stale until review day.

**Why?** Nobody closed #1 when PR #33 merged and nobody made a release PR during the sprint.

**Why?** The PRs did not reference their issues and no one owned the release step.

**Why?** CONSTITUTION.md only says to deploy to `production` right after the sprint review, so nothing told us to release during the sprint, and nothing says to check that an issue closed when its PR merged.

**Root cause:** Our workflow rules were written before we had done a sprint, so they stop at merging into `main` and leave the release and the board until review day.

---

## 6. Action Items for Next Sprint

| Action item | Owner | How we will know it worked |
|-------------|-------|----------------------------|
| Put "Closes #N" in every story PR description like the constitution already says | Everyone, Aidan checks as Scrum Master | Every story PR merged in Sprint 2 closes its issue on its own |
| Merge `main` into `production` at the end of each week | Scrum Master | Pages matches `main` on the Friday of each week of Sprint 2 |
| Add at least one spec for any new file that has game logic | Story owner | Spec count is higher than 6 at the Sprint 2 review |

---

## 7. Constitution Changes

**Proposed change:** Add a release rule to the Merging section of CONSTITUTION.md. The Scrum Master merges `main` into `production` with a merge commit at the end of each week of the sprint, not only after the review. Also fill in the blanks the sprint showed we were missing, the GitHub Pages URL in Section 7, the number of required approvals and the board columns and link in Sections 2 and 4.

**Pull request:** https://github.com/JMU-CS345/F26Team1/pull/40

**If no change is needed, why not?** n/a

---

## 8. Checklist

- [x] Every member contributed observations
- [x] Last sprint's action items reviewed
- [x] A root cause identified
- [x] Action items have owners and success measures (Sprint 4: n/a)
- [x] Action items added to the board or next planning report (Sprint 4: n/a)
- [x] Constitution change proposed through a pull request, or the reason none is needed explained (Sprint 4: n/a)
- [x] Report committed to `scrum/retrospective/` via pull request by 11:59 p.m. on the day of the retrospective

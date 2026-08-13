1. **Improve dashboard leads UX & accessibility**:
   - In `app/dashboard/leads/page.tsx`, add `aria-label`s to the filter input and select.
   - Style the "Filter" button (currently it uses default unstyled browser button).
   - Add a helpful empty state to the leads table that displays "No leads found" and includes a "Clear filters" action if the user has searched or filtered.
2. **Add Palette journal entry**:
   - Add a journal entry in `.Jules/palette.md` noting the pattern of missing utility form labels and empty states in dashboard tables.
3. **Pre-commit**:
   - Run `pre_commit_instructions` to ensure proper testing, verification, review, and reflection are done.
4. **Submit**:
   - Commit and submit the UX enhancement.

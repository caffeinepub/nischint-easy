# Specification

## Summary
**Goal:** Add password-gated admin access for Abhishek/Adarsh to view analytics and stored registration details, backed by persistent submission storage.

**Planned changes:**
- Add backend persistence for registration submissions (store and retrieve submitted form data, including createdAt).
- Update the registration form submission flow to save validated form data to the backend and show an error if saving fails.
- Add two admin-only UI entry points (Analytics and Registration Details) placed only within the four user-selected DOM elements, each requiring username (Abhishek or Adarsh) and password (12345).
- Implement an Analytics admin view that fetches and displays backend-derived analytics (at least total submission count), with loading/error handling.
- Implement a Registration Details admin view that lists all stored submissions (most-recent-first) with empty/loading/error states.

**User-visible outcome:** After submitting the registration form, entries are saved for later review; Abhishek/Adarsh can enter the correct credentials to open Analytics (showing total submissions) or Registration Details (showing who registered and their submitted information).

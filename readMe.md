# Todo Card Component

A clean, modern, accessible Todo / Task Card built with plain HTML, CSS, and JavaScript. Built as part of the HNG Internship Stage 0 task.

## Live Demo

Open `index.html` in any browser — no build tools or installations required.

## Project Structure

```
todo-card/
├── index.html    # Markup and structure
├── style.css     # Styling and responsive layout
├── script.js     # Interactivity and time logic
└── README.md     # Project documentation
```

## Features

- ✅ Priority badge (Low / Medium / High)
- ✅ Status indicator (Pending / In Progress / Done)
- ✅ Checkbox toggle — marks task complete, strikes through title, updates status to "Done"
- ✅ Live time remaining — calculates from due date, refreshes every 60 seconds
- ✅ Tags / category chips
- ✅ Edit and Delete action buttons
- ✅ Fully accessible (WCAG AA compliant)
- ✅ Responsive from 320px to 1200px

## Data Test IDs

All required `data-testid` attributes are present for automated testing:

| Element          | `data-testid`               |
| ---------------- | --------------------------- |
| Card container   | `test-todo-card`            |
| Task title       | `test-todo-title`           |
| Task description | `test-todo-description`     |
| Priority badge   | `test-todo-priority`        |
| Due date         | `test-todo-due-date`        |
| Time remaining   | `test-todo-time-remaining`  |
| Status indicator | `test-todo-status`          |
| Checkbox toggle  | `test-todo-complete-toggle` |
| Tags list        | `test-todo-tags`            |
| Work tag         | `test-todo-tag-work`        |
| Urgent tag       | `test-todo-tag-urgent`      |
| Edit button      | `test-todo-edit-button`     |
| Delete button    | `test-todo-delete-button`   |

## Accessibility

- Checkbox uses a real `<input type="checkbox">` with an associated `<label>`
- All buttons have `aria-label` for screen readers
- Priority and status badges have `aria-label`
- Time remaining uses `aria-live="polite"` for live updates
- Fully keyboard navigable: **Tab → Checkbox → Edit → Delete**
- Visible focus styles on all interactive elements
- WCAG AA color contrast compliant

## Semantic HTML

| Element                   | Tag used                              |
| ------------------------- | ------------------------------------- |
| Card root                 | `<article>`                           |
| Title                     | `<h2>`                                |
| Description               | `<p>`                                 |
| Due date & time remaining | `<time datetime="...">`               |
| Tags                      | `<ul role="list">` + `<li>`           |
| Buttons                   | `<button>`                            |
| Checkbox                  | `<input type="checkbox">` + `<label>` |

## Time Remaining Logic

The time remaining is calculated against a fixed due date (`2026-04-18T18:00:00Z`) and displays friendly text:

- `Due in 3 days`
- `Due tomorrow`
- `Due in 4 hours`
- `Due now!`
- `Overdue by 2 hours`

It refreshes automatically every 60 seconds via `setInterval`.

## Responsive Behaviour

| Breakpoint       | Layout                                              |
| ---------------- | --------------------------------------------------- |
| Mobile (< 480px) | Full-width card, stacked layout, reduced padding    |
| Tablet / Desktop | Centered card, max-width 460px, comfortable spacing |

Tags use `flex-wrap` so they never overflow at any screen width.

## Tech Stack

- HTML5
- CSS3 (Flexbox, CSS Variables, Media Queries)
- Vanilla JavaScript (no frameworks or dependencies)

## Author

Built by **Oduwole Damilare**  
Frontend Developer | Founder of LawPedia & Anonyx

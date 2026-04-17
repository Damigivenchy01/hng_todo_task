# Todo Card — Stage 1

An enhanced, interactive, stateful Todo Card built with semantic HTML, CSS, and vanilla JavaScript. Extended from Stage 0 with editing, status transitions, expand/collapse, priority indicators, and overdue logic.

## Live Demo

Open `index.html` in any browser — no build tools or installations required.

## Project Structure

```
todo-stage1/
├── index.html    # Markup and structure
├── style.css     # Styling and responsive layout
├── script.js     # All interactivity and state logic
└── README.md     # Project documentation
```

## New Features (Stage 1)

- ✅ Edit mode — full form to update title, description, priority, due date
- ✅ Save / Cancel — save updates the card; cancel restores previous values
- ✅ Status control — dropdown to switch between Pending / In Progress / Done
- ✅ Priority indicator — colored top bar + card border accent (red/amber/green)
- ✅ Expand / Collapse — long descriptions are collapsible
- ✅ Overdue indicator — pulsing badge + red accent when task is past due date
- ✅ Time updates every 30 seconds
- ✅ Done status freezes time display to "Completed"
- ✅ Checkbox ↔ Status select stay in sync

## All Data Test IDs

### Stage 0 (retained)

| Element | `data-testid` |
|---|---|
| Card container | `test-todo-card` |
| Task title | `test-todo-title` |
| Task description | `test-todo-description` |
| Priority badge | `test-todo-priority` |
| Due date | `test-todo-due-date` |
| Time remaining | `test-todo-time-remaining` |
| Status display | `test-todo-status` |
| Checkbox toggle | `test-todo-complete-toggle` |
| Tags list | `test-todo-tags` |
| Work tag | `test-todo-tag-work` |
| Urgent tag | `test-todo-tag-urgent` |
| Edit button | `test-todo-edit-button` |
| Delete button | `test-todo-delete-button` |

### Stage 1 (new)

| Element | `data-testid` |
|---|---|
| Edit form container | `test-todo-edit-form` |
| Title input | `test-todo-edit-title-input` |
| Description textarea | `test-todo-edit-description-input` |
| Priority select | `test-todo-edit-priority-select` |
| Due date input | `test-todo-edit-due-date-input` |
| Save button | `test-todo-save-button` |
| Cancel button | `test-todo-cancel-button` |
| Status control | `test-todo-status-control` |
| Priority indicator | `test-todo-priority-indicator` |
| Expand/collapse toggle | `test-todo-expand-toggle` |
| Collapsible section | `test-todo-collapsible-section` |
| Overdue indicator | `test-todo-overdue-indicator` |

## Status Logic

| Action | Result |
|---|---|
| Checkbox checked | Status → Done |
| Checkbox unchecked | Status → Pending |
| Status dropdown → Done | Checkbox becomes checked |
| Status dropdown → Pending/In Progress | Checkbox unchecked |

## Behavior Details

**Edit Mode**
- Opens on Edit button click, populates fields with current values
- Save updates state and returns to view mode
- Cancel restores previous values and returns to view mode
- Escape key also closes edit mode
- Focus returns to Edit button on close

**Expand / Collapse**
- Auto-collapses descriptions longer than 120 characters
- `aria-expanded` attribute toggles on the button
- `aria-controls` points to collapsible section id

**Time Remaining**
- Updates every 30 seconds via `setInterval`
- Granular output: minutes / hours / days
- Overdue: pulsing red badge appears
- Done: displays "Completed", stops updating

**Priority Indicator**
- Colored 3px bar at top of card
- Card border tinted to match priority color
- High → red, Medium → amber, Low → green

## Accessibility

- All form fields have `<label for="">` associations
- Status dropdown has `aria-label`
- Expand toggle uses `aria-expanded` and `aria-controls`
- Overdue indicator uses `aria-live="polite"` and `role="status"`
- Time remaining uses `aria-live="polite"`
- Keyboard flow: **Tab → Checkbox → Status control → Expand toggle → Edit → Delete**
- In edit mode: **Tab → Title → Description → Priority → Due Date → Save → Cancel**
- Escape closes edit mode
- Focus returns to Edit button when edit mode closes
- All focus styles are visible

## Responsive Layout

| Breakpoint | Behaviour |
|---|---|
| 320px mobile | Full-width, reduced padding, form fields stacked |
| 480px | Form row switches to single column |
| 768px | Card max-width 500px |
| 1024px+ | Card max-width 520px |

## Tech Stack

- HTML5 (semantic)
- CSS3 (Flexbox, CSS Variables, transitions, Media Queries)
- Vanilla JavaScript (state object pattern, no frameworks)

## Author

**Oduwole Damilare**  
Frontend Developer | Founder of LawPedia & Anonyx

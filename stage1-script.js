/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
const state = {
  title:       'Redesign onboarding flow',
  description: 'Map out a frictionless first-run experience for new users. Focus on reducing drop-off between sign-up and the first value moment. This includes revisiting the welcome email sequence, the in-app tooltip flow, the empty state designs, and the onboarding checklist widget that guides users to their first key action.',
  priority:    'High',
  status:      'In Progress',
  dueDate:     new Date('2026-04-18T18:00:00Z'),
  completed:   false,
  expanded:    false,
};

// Snapshot for cancel
let editSnapshot = null;

/* ══════════════════════════════════════════
   ELEMENT REFERENCES
══════════════════════════════════════════ */
const card              = document.getElementById('todo-card');
const viewMode          = document.getElementById('view-mode');
const editMode          = document.getElementById('edit-mode');

const priorityIndicator = document.getElementById('priority-indicator');
const priorityBadge     = document.getElementById('priority-badge');
const statusBadge       = document.getElementById('status-badge');
const statusSelect      = document.getElementById('status-control');
const checkbox          = document.getElementById('todo-checkbox');
const titleEl           = document.getElementById('todo-title');
const descriptionEl     = document.getElementById('todo-description');

const collapsibleSection = document.getElementById('collapsible-section');
const expandToggle       = document.getElementById('expand-toggle');
const expandToggleLabel  = document.getElementById('expand-toggle-label');
const expandIcon         = document.getElementById('expand-icon');

const dueDateEl         = document.getElementById('due-date-el');
const timeRemainingEl   = document.getElementById('time-remaining-el');
const overdueIndicator  = document.getElementById('overdue-indicator');

const editBtn           = document.getElementById('edit-btn');
const cancelBtn         = document.getElementById('cancel-btn');
const editForm          = document.getElementById('edit-form');

const editTitleInput    = document.getElementById('edit-title-input');
const editDescInput     = document.getElementById('edit-description-input');
const editPrioritySelect= document.getElementById('edit-priority-select');
const editDueDateInput  = document.getElementById('edit-due-date-input');

/* ══════════════════════════════════════════
   PRIORITY HELPERS
══════════════════════════════════════════ */
const PRIORITY_MAP = {
  High:   { icon: '↑', badgeClass: 'badge-high',   indicatorClass: 'priority-high',   cardClass: 'priority-high'   },
  Medium: { icon: '→', badgeClass: 'badge-medium',  indicatorClass: 'priority-medium', cardClass: 'priority-medium' },
  Low:    { icon: '↓', badgeClass: 'badge-low',     indicatorClass: 'priority-low',    cardClass: 'priority-low'    },
};

const STATUS_MAP = {
  'Pending':     { badgeClass: 'badge-pending',    selectClass: 'status-pending'    },
  'In Progress': { badgeClass: 'badge-inprogress', selectClass: 'status-inprogress' },
  'Done':        { badgeClass: 'badge-done',        selectClass: 'status-done'       },
};

/* ══════════════════════════════════════════
   RENDER — sync all UI to state
══════════════════════════════════════════ */
function render() {
  // Title
  titleEl.textContent = state.title;
  titleEl.classList.toggle('completed', state.completed);

  // Description
  descriptionEl.textContent = state.description;

  // Priority badge
  const p = PRIORITY_MAP[state.priority];
  priorityBadge.className = `badge ${p.badgeClass}`;
  priorityBadge.setAttribute('aria-label', `Priority: ${state.priority}`);
  priorityBadge.innerHTML = `<span aria-hidden="true">${p.icon}</span> ${state.priority}`;

  // Priority indicator bar + card border
  priorityIndicator.className = `priority-indicator ${p.indicatorClass}`;
  card.classList.remove('priority-high', 'priority-medium', 'priority-low');
  card.classList.add(p.cardClass);

  // Status badge
  const s = STATUS_MAP[state.status];
  statusBadge.className = `badge ${s.badgeClass}`;
  statusBadge.setAttribute('aria-label', `Status: ${state.status}`);
  statusBadge.textContent = state.status;

  // Status select
  statusSelect.value = state.status;
  statusSelect.className = `status-select ${s.selectClass}`;

  // Checkbox
  checkbox.checked = state.completed;

  // Done card class
  card.classList.toggle('card-done', state.completed);

  // Due date display
  dueDateEl.textContent = `Due ${formatDate(state.dueDate)}`;
  dueDateEl.setAttribute('datetime', state.dueDate.toISOString());
  timeRemainingEl.setAttribute('datetime', state.dueDate.toISOString());

  // Expand/collapse — auto-collapse long descriptions
  const isLong = state.description.length > 120;
  if (isLong) {
    expandToggle.classList.remove('hidden');
    collapsibleSection.classList.toggle('collapsed', !state.expanded);
    collapsibleSection.classList.toggle('expanded', state.expanded);
    expandToggle.setAttribute('aria-expanded', String(state.expanded));
    expandToggleLabel.textContent = state.expanded ? 'Show less' : 'Show more';
  } else {
    expandToggle.classList.add('hidden');
    collapsibleSection.classList.remove('collapsed');
    collapsibleSection.classList.add('expanded');
  }

  updateTime();
}

/* ══════════════════════════════════════════
   TIME LOGIC
══════════════════════════════════════════ */
function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getTimeRemaining(due) {
  const now  = new Date();
  const diff = due - now;
  const abs  = Math.abs(diff);

  const mins  = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  const days  = Math.floor(abs / 86400000);

  if (abs < 60000) return { text: 'Due now!', cls: 'time-warning', overdue: false };

  if (diff < 0) {
    if (mins  < 60)  return { text: `Overdue by ${mins} minute${mins !== 1 ? 's' : ''}`,   cls: 'time-overdue', overdue: true };
    if (hours < 24)  return { text: `Overdue by ${hours} hour${hours !== 1 ? 's' : ''}`,   cls: 'time-overdue', overdue: true };
                     return { text: `Overdue by ${days} day${days !== 1 ? 's' : ''}`,      cls: 'time-overdue', overdue: true };
  }

  if (mins  < 60)  return { text: `Due in ${mins} minute${mins !== 1 ? 's' : ''}`,   cls: 'time-normal', overdue: false };
  if (hours < 24)  return { text: `Due in ${hours} hour${hours !== 1 ? 's' : ''}`,   cls: 'time-normal', overdue: false };
  if (days  === 1) return { text: 'Due tomorrow',                                      cls: 'time-normal', overdue: false };
                   return { text: `Due in ${days} days`,                               cls: 'time-normal', overdue: false };
}

function updateTime() {
  if (state.completed) {
    timeRemainingEl.textContent = 'Completed';
    timeRemainingEl.className   = 'time-complete';
    overdueIndicator.classList.add('hidden');
    return;
  }

  const { text, cls, overdue } = getTimeRemaining(state.dueDate);
  timeRemainingEl.textContent = text;
  timeRemainingEl.className   = cls;

  overdueIndicator.classList.toggle('hidden', !overdue);

  // Overdue card visual
  card.style.borderColor = overdue ? 'rgba(239,68,68,0.35)' : '';
}

/* ══════════════════════════════════════════
   STATUS SYNC
══════════════════════════════════════════ */
function setStatus(newStatus) {
  state.status    = newStatus;
  state.completed = (newStatus === 'Done');
  render();
}

/* ══════════════════════════════════════════
   CHECKBOX
══════════════════════════════════════════ */
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    setStatus('Done');
  } else {
    setStatus('Pending');
  }
});

/* ══════════════════════════════════════════
   STATUS DROPDOWN
══════════════════════════════════════════ */
statusSelect.addEventListener('change', () => {
  setStatus(statusSelect.value);
});

/* ══════════════════════════════════════════
   EXPAND / COLLAPSE
══════════════════════════════════════════ */
expandToggle.addEventListener('click', () => {
  state.expanded = !state.expanded;
  render();
});

/* ══════════════════════════════════════════
   EDIT MODE — OPEN
══════════════════════════════════════════ */
editBtn.addEventListener('click', () => {
  // Save snapshot for cancel
  editSnapshot = {
    title:       state.title,
    description: state.description,
    priority:    state.priority,
    dueDate:     new Date(state.dueDate),
  };

  // Populate form
  editTitleInput.value      = state.title;
  editDescInput.value       = state.description;
  editPrioritySelect.value  = state.priority;
  editDueDateInput.value    = toDateInputValue(state.dueDate);

  // Swap views
  viewMode.classList.add('hidden');
  editMode.classList.remove('hidden');

  // Focus first field
  editTitleInput.focus();
});

/* ══════════════════════════════════════════
   EDIT MODE — CANCEL
══════════════════════════════════════════ */
cancelBtn.addEventListener('click', closeEditMode);

function closeEditMode() {
  viewMode.classList.remove('hidden');
  editMode.classList.add('hidden');
  editBtn.focus(); // return focus to edit button
}

/* ══════════════════════════════════════════
   EDIT MODE — SAVE
══════════════════════════════════════════ */
editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTitle = editTitleInput.value.trim();
  if (!newTitle) {
    editTitleInput.focus();
    return;
  }

  state.title       = newTitle;
  state.description = editDescInput.value.trim() || state.description;
  state.priority    = editPrioritySelect.value;

  if (editDueDateInput.value) {
    state.dueDate = new Date(editDueDateInput.value + 'T18:00:00Z');
  }

  closeEditMode();
  render();
});

/* ══════════════════════════════════════════
   KEYBOARD — Escape closes edit mode
══════════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !editMode.classList.contains('hidden')) {
    closeEditMode();
  }
});

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function toDateInputValue(date) {
  const y  = date.getUTCFullYear();
  const m  = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d  = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/* ══════════════════════════════════════════
   INIT + INTERVAL
══════════════════════════════════════════ */
render();
setInterval(updateTime, 30000);

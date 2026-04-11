const DUE_DATE = new Date("2026-04-18T18:00:00Z");

function getTimeRemaining(due) {
  const now  = new Date();
  const diff = due - now;
  const abs  = Math.abs(diff);

  const mins  = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  const days  = Math.floor(abs / 86400000);

  if (abs < 60000) {
    return { text: "Due now!", cls: "time-warning" };
  }

  if (diff < 0) {
    if (hours < 1)  return { text: `Overdue by ${mins} minute${mins !== 1 ? "s" : ""}`,  cls: "time-overdue" };
    if (hours < 24) return { text: `Overdue by ${hours} hour${hours !== 1 ? "s" : ""}`,  cls: "time-overdue" };
                    return { text: `Overdue by ${days} day${days !== 1 ? "s" : ""}`,      cls: "time-overdue" };
  }

  if (hours < 1)  return { text: `Due in ${mins} minute${mins !== 1 ? "s" : ""}`,  cls: "time-normal" };
  if (hours < 24) return { text: `Due in ${hours} hour${hours !== 1 ? "s" : ""}`,  cls: "time-normal" };
  if (days === 1) return { text: "Due tomorrow",                                    cls: "time-normal" };
                  return { text: `Due in ${days} days`,                             cls: "time-normal" };
}

function updateTimeRemaining() {
  const el = document.getElementById("time-remaining-el");
  const { text, cls } = getTimeRemaining(DUE_DATE);
  el.textContent = text;
  el.className = cls;
}

function handleToggle(checkbox) {
  const title       = document.getElementById("todo-title");
  const statusBadge = document.getElementById("status-badge");

  if (checkbox.checked) {
    title.classList.add("completed");
    statusBadge.textContent = "Done";
    statusBadge.className   = "badge badge-done";
    statusBadge.setAttribute("aria-label", "Status: Done");
  } else {
    title.classList.remove("completed");
    statusBadge.textContent = "In Progress";
    statusBadge.className   = "badge badge-inprogress";
    statusBadge.setAttribute("aria-label", "Status: In Progress");
  }
}

// Initialise time remaining and refresh every 60 seconds
updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);

document.addEventListener("DOMContentLoaded", () => {
  function updateClock() {
    const current = new Date();
    const hours = String(current.getHours()).padStart(2, "0");
    const minutes = String(current.getMinutes()).padStart(2, "0");

    document.getElementById("Clock").textContent = `${hours}:${minutes}`;
  }

  updateClock();
  setInterval(updateClock, 5000);
});

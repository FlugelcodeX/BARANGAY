// ======================================================
// KABARANGAY PUBLIC WEBSITE
// Public statistics loader
// ======================================================

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzqoacZ7xqUHMuVer52px-zhAdK7EhA_sGjw1_4sZkm_dfP7SaLkpDEBSwJjPKlkU5avA/exec";

// ======================================================
// LOAD PUBLIC BARANGAY STATISTICS
// ======================================================

function loadPublicStatistics() {
  const populationElement = document.getElementById("population");
  const householdsElement = document.getElementById("households");

  if (!populationElement || !householdsElement) {
    console.error("Statistics elements were not found.");
    return;
  }

  const callbackName = "kabarangayStatsCallback_" + Date.now();

  window[callbackName] = function (data) {
    console.log("Apps Script returned:", data);

    if (
      data &&
      typeof data.population !== "undefined" &&
      typeof data.households !== "undefined"
    ) {
      populationElement.textContent = data.population;
      householdsElement.textContent = data.households;
    } else {
      console.error("Apps Script returned invalid statistics.", data);
    }

    delete window[callbackName];
    script.remove();
  };

  const script = document.createElement("script");

  script.src =
    APPS_SCRIPT_URL +
    "?public=stats&callback=" +
    encodeURIComponent(callbackName);

  script.async = true;

  script.onerror = function () {
    console.error("Apps Script failed to load.");

    populationElement.textContent = "—";
    householdsElement.textContent = "—";

    delete window[callbackName];
    script.remove();
  };

  document.head.appendChild(script);
}

// ======================================================
// START
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  loadPublicStatistics();
});

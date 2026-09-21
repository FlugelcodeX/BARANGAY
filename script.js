// ======================================================
// KABARANGAY PUBLIC WEBSITE
// ======================================================

// Apps Script public statistics endpoint
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzqoacZ7xqUHMuVer52px-zhAdK7EhA_sGjw1_4sZkm_dfP7SaLkpDEBSwJjPKlkU5avA/exec";

// ======================================================
// LOAD PUBLIC STATISTICS
// ======================================================

function loadPublicStatistics() {
  const population = document.getElementById("population");
  const households = document.getElementById("households");

  if (!population || !households) {
    console.error("Population or household element not found.");
    return;
  }

  // Create a unique callback name
  const callbackName = "kabarangayStats_" + Date.now();

  // Create the callback that Apps Script will call
  window[callbackName] = function (data) {
    console.log("Kabarangay statistics received:", data);

    if (data) {
      if (typeof data.population !== "undefined") {
        population.textContent = data.population;
      }

      if (typeof data.households !== "undefined") {
        households.textContent = data.households;
      }
    }

    // Clean up
    delete window[callbackName];

    if (scriptElement) {
      scriptElement.remove();
    }
  };

  // Create script request
  const scriptElement = document.createElement("script");

  scriptElement.src =
    APPS_SCRIPT_URL +
    "?public=stats&callback=" +
    encodeURIComponent(callbackName);

  scriptElement.async = true;

  scriptElement.onerror = function () {
    console.error("Apps Script failed to load.");

    population.textContent = "—";
    households.textContent = "—";

    delete window[callbackName];
    scriptElement.remove();
  };

  document.head.appendChild(scriptElement);
}

// ======================================================
// START WEBSITE
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  loadPublicStatistics();
});

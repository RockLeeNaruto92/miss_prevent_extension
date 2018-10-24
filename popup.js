console.log("popup.js");

document.getElementById("save").onclick = function() {
  console.log("on click save")
  var urls = document.getElementById("production-urls").value;
  var elements = document.getElementById("elements").value;

  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({
    "production_urls": urls,
    "elements": elements
  }, function() {
    console.log("Settings saved");
  });
}

chrome.storage.sync.get(["production_urls", "elements"], function(items) {
  var default_elements = ["input[type=submit]", "button"]

  document.getElementById("production-urls").value = items["production_urls"] || "";
  document.getElementById("elements").value = items["elements"] || default_elements.joins("\n");
});

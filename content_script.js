// Read it using the storage API
chrome.storage.sync.get(["production_urls", "elements"], function(items) {
  var production_urls = (items["production_urls"] || "").split("\n");
  var elements = (items["elements"] || "").split("\n");

  var isProductionUrl = false;

  if (window.location.href.indexOf("/admin/sign_in") > 0) {return;}


  for (var i = 0; i < production_urls.length; i++) {
    if (production_urls[i].indexOf(window.location.host) >= 0) {
      isProductionUrl = true;
    }
  }

  if (isProductionUrl) {
    var elements = [];

    for (var i = 0; i < elements.length; i++) {
      var selectors = "";
      if (elements[i]) {
        selectors = document.querySelectorAll(elements[i]);
        elements.push(Array.from(selectors));
      }
    }

    addAlertWhenClickToElement(elements.flat());
  }
});

function addAlertWhenClickToElement(elements) {
  for (var i = 0; i < elements.length; i++) {
    var e = elements[i];
    e.disabled = true;
    var alertNode = document.createElement("p");
    alertNode.style = "color: red";
    alertNode.innerHTML = "本番環境で操作しています。注意してください。";
    e.parentElement.appendChild(alertNode);

    e.onclick = function(){
      alert("本番環境で操作しています。注意してください。");
    }
  }
}

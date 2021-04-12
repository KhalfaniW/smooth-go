// this is the code which will be injected into a given page...

(function() {
  // just place a div at top right
  var div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = 0;
  div.style.right = 0;
  // div.textContent = "Ran!";
  document.body.appendChild(div);
  function injectsScript(url) {
    console.log("inject.js injecting ", url);
    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
  }
  injectsScript(chrome.runtime.getURL("main/static/js/main.js"));
  // injectsScript("https://m.khal.me/files/js/extension.js");
})();

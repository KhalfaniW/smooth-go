let blackListEnabled = 0;
const redirectDestination = "http://m.khal.me:12345";

function isInBlackList() {
  return (
    window.location.href.indexOf("youtube.com") !== -1 ||
    window.location.href.indexOf("businessinsider.com") !== -1 ||
    window.location.href.indexOf("reddit.com") !== -1
  );
}
//TODO Invert boolean
let completed = false;
function isCompleted() {
  return isInIframe();
}
function isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}
function wrapInIframe() {
  if (
    (window.location.href.indexOf("youtube.com") !== -1 ||
      window.location.href.indexOf("businessinsider.com") !== -1 ||
      window.location.href.indexOf("reddit.com") !== -1) &&
    !isCompleted()
  ) {
    var iframe = document.createElement("iframe");
    iframe.src = window.location.href;
    iframe.width = "98%";

    iframe.height = "80%";
    if (window.location.href.indexOf("youtube.com") !== -1) {
      iframe.height = "500";
    }
    document.body.innerHTML = "";
    document.body.appendChild(iframe);

    var button = document.createElement("button");
    button.innerHTML = "leave";
    button.onclick = (event) => {
      alert(99);
      window.location.href = redirectDestination;
    };
    document.body.appendChild(button);

    var button = document.createElement("button");
    button.innerHTML = "calm";
    button.onclick = (event) => {
      var iframe = document.createElement("iframe");
      iframe = htmlToElement(
        ` <iframe width="100%" height="20%" src="https://www.youtube.com/embed/eitDN3Ay68Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> `,
      );
      // iframe.width = "100%";
      // iframe.height = "80%"

      document.body.appendChild(iframe);
    };
    document.body.appendChild(button);
  }
}
//wrapInIframe();
console.log("main; run ", blackListEnabled);
if (isInBlackList() && blackListEnabled) {
  window.location.href = redirectDestination;
}

if (window.location.href.indexOf("youtube.com") !== -1) {
  let script = document.createElement("script");
  script.src = "https://m.khal.me/files/js/Youtube.js";
  document.body.appendChild(script);
}

// if (window.location.href.indexOf("reddit.com") !== -1) {
// let script = document.createElement("script");
//  script.src = "https://m.khal.me/files/js/Reddit.js";
// document.body.appendChild(script);
// }

// if (
//   window.location.href.indexOf("youtube.com") !== -1 ||
//   window.location.href.indexOf("businessinsider.com") !== -1 ||
//   window.location.href.indexOf("reddit.com") !== -1
// ) {
//   let script = document.createElement("script");
//   script.src = "https://m.khal.me/files/js/ScrollRedirect.js";
//   document.body.appendChild(script);

//   // if (
//   //   confirm(
//   //     "Have you done the following? \n + check if expressing values \n + Describe how you are feeling \n+ breath deeply 10 seconds \n+",
//   //   ) == false
//   // ) {
//   //   window.location.href = redirectDestination;
//   // }
// }

if (false) {
  let script = document.createElement("script");
  script.src = "https://m.khal.me/files/js/Overlay.js";
  document.body.appendChild(script);
}

/*
  let script = document.createElement("script");
script.src = "https://m.khal.me/files/js/MainScript.js";
document.body.appendChild(script);*/
if (isInBlackList()) {
  var button = document.createElement("Button");
  button.innerHTML = "Free Your self";

  //add button at bottom right that scrolls with you
  button.style =
    "bottom:0;left:0;position:absolute;z-index: 9999; position: fixed;";

  button.onclick = function() {
    redirectToCalm();
    //  window.location.href = "http://m.khal.me:12345";
  };

  document.body.appendChild(button);

  function redirectToCalm() {
    window.location.href =
      " https://www.youtube.com/playlist?list=PLBhIaMGFdaG8mlQDFah-23_YT7m0QF5Zi ";
  }
}

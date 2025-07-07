function browserDetection() {
  var isIE = /*@cc_on!@*/ false || !!document.documentMode; /* Internet Explorer 6-11 */

  var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  // At least Safari 3+: "[object HTMLElementConstructor]"

  // Chrome 1 - 71
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  // Firefox
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Edge 20+
  var isEdge = !isIE && (/Edg/.test(navigator.userAgent));

  let isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIE) addBrowserClass('isIE');
  if (isSafari) addBrowserClass('isSafari');
  if (isChrome) addBrowserClass('isChrome');
  if (isEdge) addBrowserClass('isEdge');
  if (isFirefox) addBrowserClass('isFirefox');
  if (isIOS) addBrowserClass('isIOS');
}

function addBrowserClass(name) {
  document.body.classList.add(name);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// IE compatible append function
function appendNode(parent, node) {
  if (window.isIE) {
    parent.appendChild(node);
  } else {
    parent.append(node);
  }
}

function scrollTop() {
  gsap.to(window, {scrollTo: 0, duration: 0.6, ease: Power1.easeInOut});
}

// Format long URLs by inserting line breaks
function formatUrls() {
  let urls = document.querySelectorAll('.format-url');

  urls.forEach((url) => {
    // Split the URL into an array to distinguish double slashes from single slashes
    let doubleSlash = url.innerHTML.split('//')

    // Format the strings on either side of double slashes separately
    let formatted = doubleSlash.map(str =>
      // Insert a word break opportunity after a colon
      str.replace(/(?<after>:)/giu, '$1<wbr>')
      // Before a single slash, tilde, period, comma, hyphen, underline, question mark, number sign, or percent symbol
      .replace(/(?<before>[/~.,\-_?#%])/giu, '<wbr>$1')
      // Before and after an equals sign or ampersand
      .replace(/(?<beforeAndAfter>[=&])/giu, '<wbr>$1<wbr>')
      // Reconnect the strings with word break opportunities after double slashes
    ).join('//<wbr>');

    url.innerHTML = formatted;
  });
}
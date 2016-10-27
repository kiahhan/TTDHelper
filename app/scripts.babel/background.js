'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});


chrome.tabs.onUpdated.addListener((_, details, tab) => {
  setBadge(details.url);
});

chrome.tabs.onActivated.addListener(event => {
  //alert('have you being selected!');
  chrome.tabs.get(event.tabId, tab => {
    setBadge(tab.url);
  });
});


//chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

function setBadge(url) {
  if (detectNewegg(url)>=0) {
    chrome.browserAction.setBadgeText({
      text: 'neg'
    });
  } else {
    chrome.browserAction.setBadgeText({
      text: ''
    });
  }
}
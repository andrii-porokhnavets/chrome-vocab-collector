'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({vocab: []}, function() {
    console.log('Initial empty vocab is set');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: '.'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

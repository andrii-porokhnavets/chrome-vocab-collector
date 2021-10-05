'use strict';

const numberOfWords = document.getElementById('number_of_words');
const lastAdding = document.getElementById('last_adding');
const showVocabBtn = document.getElementById('show_vocab_btn');
showVocabBtn.addEventListener('click', function (event) {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

chrome.storage.sync.get('vocab', function({vocab}) {
  if (vocab.length < 1) {
    return
  }

  lastAdding.innerText = vocab[vocab.length - 1].addedAt
  numberOfWords.innerText = vocab.length;
});

function timeSince(date) {

  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

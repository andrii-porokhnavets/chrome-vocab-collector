'use strict';

let globalVocab = [];

const wordsContainer = document.getElementById('words-table-body');
const saveBtn = document.getElementById('save_btn');
const clearBtn = document.getElementById('clear_btn');
const copyBtn = document.getElementById('copy_btn');
const quizletContent = document.getElementById('content-for-quizlet');

chrome.storage.sync.get('vocab', result => {
  globalVocab = result.vocab;

  generateTable(result.vocab);
  generateQuizletContent(result.vocab);
})

saveBtn.addEventListener('click', function () {
  saveVocab(globalVocab);

  generateQuizletContent(globalVocab);
})

clearBtn.addEventListener('click', function () {
  globalVocab = [];

  saveVocab(globalVocab);
  generateTable(globalVocab);
  // generateQuizletContent(result.vocab);
})

copyBtn.addEventListener('click', function () {
  copyTextToClipboard(quizletContent.innerText);
  openInNewTab('https://quizlet.com/create-set?inFolder=84926671');
})

function generateTable(vocab) {
  wordsContainer.innerHTML = ''

  for (let i = 0; i < vocab.length; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');

    for (let td of [td1, td2, td3, td4]) {
      td.classList.add('align-middle')
    }

    const input = document.createElement('input');
    input.classList.add('form-control');
    input.value = vocab[i].translation || '';
    input.addEventListener('change', ev => onInputChange(ev, i));

    const btn = document.createElement('button');
    btn.classList.add('btn')
    btn.classList.add('btn-link')
    btn.innerText = 'X'
    btn.addEventListener('click', _ => removeElementClickHandler(i))

    td1.innerText = (i + 1).toString();
    td2.innerText = vocab[i].phase;
    td3.appendChild(input);
    td4.appendChild(btn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    wordsContainer.appendChild(tr);
  }
}

function generateQuizletContent(vocab) {
  quizletContent.innerHTML = '';

  for (let i = 0; i < vocab.length; i++) {
    const li = document.createElement('li');

    li.innerText = `${vocab[i].phase.toLowerCase()}-${vocab[i].translation}`;

    quizletContent.appendChild(li);
  }
}

function saveVocab(vocab) {
  chrome.storage.sync.set({ vocab });
}

function onInputChange(event, indexElement) {
  const vocabElement = globalVocab[indexElement];

  const {value} = event.target;
  if (value) {
    vocabElement.translation = value;
  }
}

function removeElementClickHandler(indexElement) {
  globalVocab.splice(indexElement, 1);
  generateTable(globalVocab)
}

function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to.
  const copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child.
  //"execCommand()" only works when there exists selected text, and the text is inside
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur().
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}

function openInNewTab(url) {
  const win = window.open(url, '_blank');
  win.focus();
}

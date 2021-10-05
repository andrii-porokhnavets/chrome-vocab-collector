'use strict';

document.addEventListener('mouseup', function (mouseupEvent) {
  const selection = window.getSelection();

  if (selection.toString()) {
    setTimeout(() => {
      document.addEventListener('click', clickOnSelection, {once: true})
    })
  }

  function clickOnSelection(clickEvent) {
    const selectedPhase = selection.toString();

    if (selectedPhase) {
      const isOnX = Math.abs(mouseupEvent.clientX - clickEvent.clientX) < 100;
      const isOnY = Math.abs(mouseupEvent.clientY - clickEvent.clientY) < 50;


      if (isOnX && isOnY) {
        addToVocab(selectedPhase.trim())
      }
    }
  }
})


function addToVocab(phase) {
  chrome.storage.sync.get('vocab', function (result) {
    const {vocab} = result;

    if (vocab.some(o => o.phase === phase)) {
      console.log(`Phase '${phase}' is already in the vocabulary`);
      return;
    }

    vocab.push({
      phase,
      addedAt: new Date().toLocaleString('en-US')
    });

    chrome.storage.sync.set({vocab});
  })
}


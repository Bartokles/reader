var speech = new SpeechSynthesisUtterance();
var voices;

// wait on voices to be loaded before fetching list
window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
};

// function that reads a text
readTextUsingTTS = function(word){
    let query = word.selectionText;

    if(speech.voice == null){
        speech.voice = voices[localStorage["voice"]];
    }
    speech.text = query;

    window.speechSynthesis.speak(speech);
};

// creates line in menu that appears after right click
chrome.contextMenus.create({
    title: "Read selected text",
    contexts: ["selection"],
    onclick: readTextUsingTTS
});
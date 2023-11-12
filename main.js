var speech = new SpeechSynthesisUtterance();
var voices;

// loading voices when they are ready
window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
};

readTextUsingTTS = function(word){
    let query = word.selectionText;

    // setting speach parameters
    speech.voice = voices[localStorage["voice"]];
    speech.volume = parseFloat(localStorage["volume"] / 10);
    speech.pitch = parseFloat(localStorage["pitch"] / 10);
    speech.rate = parseFloat(localStorage["rate"] / 10);
    speech.text = query;

    window.speechSynthesis.speak(speech);
};

// creates line in context menu
chrome.contextMenus.create({
    title: "Read selected text",
    contexts: ["selection"],
    onclick: readTextUsingTTS
});
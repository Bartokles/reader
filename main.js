readTextUsingTTS = function(word){
    let query = word.selectionText;

    let speech = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();

    speech.text = query;
    speech.voice = voices[1];

    window.speechSynthesis.speak(speech);
};

chrome.contextMenus.create({
    title: "Przeczytaj na głos",
    contexts:["selection"],
    onclick: readTextUsingTTS
});
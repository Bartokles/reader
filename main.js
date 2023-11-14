var languageJSON;

var speech = new SpeechSynthesisUtterance();
var voices;

// loading voices when they are ready
window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
};

function debug(message) {
    console.log(message);
}

function loadLangJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    if(localStorage["lang"] != null){
        xobj.open('GET', `../dictionaries/${localStorage["lang"]}.json`, true);
    }
    else{
        xobj.open('GET', `../dictionaries/en.json`, true);
    }
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

readTextUsingTTS = function(word){
    let query = word.selectionText;

    // setting speach parameters
    speech.voice = voices[localStorage["voice"]];
    
    if(localStorage["volume"] == undefined){
        speech.volume = 1;
    }
    else{
        speech.volume = parseFloat(localStorage["volume"] / 10);
    }

    if(localStorage["pitch"] == undefined){
        speech.pitch = 1;
    }
    else{
        speech.pitch = parseFloat(localStorage["pitch"] / 10);
    }

    if(localStorage["rate"] == undefined){
        speech.rate = 1;
    }
    else{
        speech.rate = parseFloat(localStorage["rate"] / 10);
    }

    speech.text = query;

    window.speechSynthesis.speak(speech);
};

loadLangJSON(function(response) {
    // loading language
    languageJSON = JSON.parse(response);

    // creates line in context menu
    chrome.contextMenus.create({
        title: languageJSON.Read_selected_text,
        contexts: ["selection"],
        onclick: readTextUsingTTS
    });
});
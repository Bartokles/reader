// function that reads selected text
var readTextUsingTTS = function(text){
    let query = text.selectionText; // selected text

    let settings = {
        voiceId: 0,
        volume: 1,
        pitch: 1,
        rate: 1,
    }; // default settings

    // loading settings from browser local storage
    chrome.storage.local.get(["voiceId"]).then((result) => {
        if(result.voiceId != undefined){
            settings.voiceId = result.voiceId;
        }
    });

    chrome.storage.local.get(["volume"]).then((result) => {
        if(result.volume != undefined){
            settings.volume = result.volume
        }
    });

    chrome.storage.local.get(["pitch"]).then((result) => {
        if(result.pitch != undefined){
            settings.pitch = result.pitch
        }
    });
    
    chrome.storage.local.get(["rate"]).then((result) => {
        if(result.rate != undefined){
            settings.rate = result.rate
        }
    });

    // runing speach
    chrome.tts.getVoices(
        function(voices) {
            chrome.tts.speak(
                query,
                {
                    'voiceName': voices[settings.voiceId].voiceName,
                    'volume': parseFloat(settings.volume),
                    'pitch': parseFloat(settings.pitch),
                    'rate': parseFloat(settings.rate),
                }
            );
        }
    );
};


// setting context menu with title in choosed language
chrome.storage.local.get(["title"]).then((result) => {
    let title = "Read selected text";
    if(result.title != undefined){
        title = result.title
    }
    chrome.contextMenus.create({
        id: 'read',
        title: title,
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener(readTextUsingTTS);
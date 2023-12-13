var languages = ['en', 'pl', 'cn', 'es', 'pt', 'ru', 'de', 'fr'] // list of supported languages
var settings = {
    voiceId: 0,
    volume: 1.0,
    pitch: 1.0,
    rate: 1.0,
    lang: 'en',
};
var voices; // list of voices Objects


// function saving all settings to browser local storage
function saveSettings(){
    chrome.storage.local.set({ voiceId: settings.voiceId }).then(() => {});
    chrome.storage.local.set({ volume: settings.volume }).then(() => {});
    chrome.storage.local.set({ pitch: settings.pitch }).then(() => {});
    chrome.storage.local.set({ rate: settings.rate }).then(() => {});
    chrome.storage.local.set({ lang: settings.lang }).then(() => {});
}


// loads voices from browser to list variable
chrome.tts.getVoices(
    function(ttsVoices) {
        voices = ttsVoices
    }
);


// getting all saved settings
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


// main popup script
chrome.storage.local.get(["lang"]).then((result) => {
    if(result.lang != undefined){
        settings.lang = result.lang
    }


    // function that load data from json file 
    function loadLangJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', `dictionaries/${settings.lang}.json`, true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        }
        xobj.send(null);
    }


    // getting json file with language data loaded
    loadLangJSON(function(response) {
        let languageJSON = JSON.parse(response);

        chrome.storage.local.set({ title: languageJSON.Read_selected_text }).then(() => {});
            
        let voiceSelect = document.getElementById("voice");

        for (let i = 0; i < voices.length; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = voices[i].voiceName;
            if(i == settings.voiceId){
                opt.selected = true;
            }
            voiceSelect.appendChild(opt);
        }

        // setting text in choosed language
        document.lang = settings.lang;

        let volumeDiv = document.getElementById("volumeDiv");
        let pitchDiv = document.getElementById("pitchDiv");
        let rateDiv = document.getElementById("rateDiv");

        volumeDiv.innerHTML = volumeDiv.innerHTML.replace("Volume", languageJSON.Volume);
        pitchDiv.innerHTML = pitchDiv.innerHTML.replace("Pitch", languageJSON.Pitch);
        rateDiv.innerHTML = rateDiv.innerHTML.replace("Rate", languageJSON.Rate);

        let volumeSlider = document.getElementById("volume");
        let pitchSlider = document.getElementById("pitch");
        let rateSlider = document.getElementById("rate");

        volumeSlider.value = settings.volume * 10;
        pitchSlider.value = settings.pitch * 10;
        rateSlider.value = settings.rate * 10;

        let saveButton = document.getElementById('saveBtn');
        let resetButton = document.getElementById('resetBtn');

        saveButton.textContent = saveButton.textContent.replace("Save", languageJSON.Save);
        resetButton.textContent = resetButton.textContent.replace("Reset", languageJSON.Reset);

        let githubBtn = document.getElementById('githubBtn');
        let langButton = document.getElementById('langBtn');

        
        saveButton.addEventListener('click', function() {
            let volumeSlider = document.getElementById("volume");
            let pitchSlider = document.getElementById("pitch");
            let rateSlider = document.getElementById("rate");

            settings.voiceId = voiceSelect.value;

            settings.volume = volumeSlider.value / 10;
            settings.pitch = pitchSlider.value / 10;
            settings.rate = rateSlider.value / 10;

            saveSettings();

            window.close();
        }, false);

        resetButton.addEventListener('click', function() {
            chrome.storage.local.clear(function() {
                var error = chrome.runtime.lastError;
                if (error) {
                    console.error(error);
                }
            });
            chrome.runtime.reload();
        }, false);

        githubBtn.addEventListener('click', function() {
            chrome.tabs.create({ url: "https://github.com/Bartokles/reader" });
        }, false);

        langButton.addEventListener('click', function() {
            // language button
            let mainDiv = document.getElementById('mainDiv');
            mainDiv.innerHTML = "";

            const langSelect = document.createElement('select');
            const confirmBtn = document.createElement('button');

            langSelect.id = "langSelect";
            confirmBtn.id = "confirmBtn";

            for (let i = 0; i < languages.length; i++) {
                let opt = document.createElement('option');
                opt.value = languages[i];
                opt.innerHTML = languages[i];
                if(languages[i] == settings.lang){
                    opt.selected = true;
                }
                langSelect.appendChild(opt);
            }

            if (settings.lang != null) {
                confirmBtn.textContent = languageJSON.Save
            }
            else{
                confirmBtn.textContent = "Save";
            }

            confirmBtn.addEventListener('click', function() {
                settings.lang = langSelect.value;

                saveSettings();

                loadLangJSON(function(resp) {
                    let langJSON = JSON.parse(resp);
                    chrome.storage.local.set({ title: langJSON.Read_selected_text }).then(() => {});
                    chrome.runtime.reload();
                })
            }, false);

            mainDiv.append(langSelect);
            mainDiv.append(confirmBtn);
        }, false);
    });
});
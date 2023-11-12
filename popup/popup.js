// var log = chrome.extension.getBackgroundPage().log;

var languages = ['en', 'pl']
var languageJSON;


function loadLangJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', `../dictionaries/${localStorage["lang"]}.json`, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}


document.addEventListener('DOMContentLoaded', function() {
    let voiceSelect = document.getElementById("voice");
    let voices = chrome.extension.getBackgroundPage().voices;

    // setting stored values if their exists
    for (let i = 0; i < voices.length; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = voices[i].name;
        if(i == localStorage["voice"]){
            opt.selected = true;
        }
        voiceSelect.appendChild(opt);
    }

    // setting text in choosed language
    if (localStorage["lang"] != null) {
        document.lang = localStorage["lang"];

        loadLangJSON(function(response) {
            languageJSON = JSON.parse(response);

            let volumeDiv = document.getElementById("volumeDiv");
            let pitchDiv = document.getElementById("pitchDiv");
            let rateDiv = document.getElementById("rateDiv");

            volumeDiv.innerHTML = volumeDiv.innerHTML.replace("Volume", languageJSON.Volume);
            pitchDiv.innerHTML = pitchDiv.innerHTML.replace("Pitch", languageJSON.Pitch);
            rateDiv.innerHTML = rateDiv.innerHTML.replace("Rate", languageJSON.Rate);

            let volumeSlider = document.getElementById("volume");
            let pitchSlider = document.getElementById("pitch");
            let rateSlider = document.getElementById("rate");

            if (localStorage["volume"] != null) {
                volumeSlider.value = localStorage["volume"];
            }
            if (localStorage["pitch"] != null) {
                pitchSlider.value = localStorage["pitch"];
            }
            if (localStorage["rate"] != null) {
                rateSlider.value = localStorage["rate"];
            }

            let saveButton = document.getElementById('saveBtn');
            let resetButton = document.getElementById('resetBtn');

            saveButton.textContent = saveButton.textContent.replace("Save", languageJSON.Save);
            resetButton.textContent = resetButton.textContent.replace("Reset", languageJSON.Reset);
        });
    }

    let saveButton = document.getElementById('saveBtn');
    let resetButton = document.getElementById('resetBtn');
    let langButton = document.getElementById('langBtn');

    // setting onClick listeners
    saveButton.addEventListener('click', function() {
        let volumeSlider = document.getElementById("volume");
        let pitchSlider = document.getElementById("pitch");
        let rateSlider = document.getElementById("rate");

        localStorage["voice"] = voiceSelect.value;

        localStorage["volume"] = volumeSlider.value;
        localStorage["pitch"] = pitchSlider.value;
        localStorage["rate"] = rateSlider.value;

        window.close();
    }, false);

    resetButton.addEventListener('click', function() {
        let volumeSlider = document.getElementById("volume");
        let pitchSlider = document.getElementById("pitch");
        let rateSlider = document.getElementById("rate");

        localStorage["voice"] = 0;

        localStorage["volume"] = 10;
        localStorage["pitch"] = 10;
        localStorage["rate"] = 10;

        voiceSelect[0].selected = true;

        volumeSlider.value = localStorage["volume"];
        pitchSlider.value = localStorage["pitch"];
        rateSlider.value = localStorage["rate"];
    }, false);

    langButton.addEventListener('click', function() {
        let mainDiv = document.getElementById('mainDiv');
        mainDiv.innerHTML = "";

        const langSelect = document.createElement('select');
        const confirmBtn = document.createElement('button');

        langSelect.id = "langSelect";
        confirmBtn.id = "confirmBtn";

        for (let i = 0; i < voices.length; i++) {
            let opt = document.createElement('option');
            opt.value = languages[i];
            opt.innerHTML = languages[i];
            if(languages[i] == localStorage["lang"]){
                opt.selected = true;
            }
            langSelect.appendChild(opt);
        }

        if (localStorage["lang"] != null) {
            confirmBtn.textContent = languageJSON.Save
        }
        else{
            confirmBtn.textContent = "Save";
        }

        confirmBtn.addEventListener('click', function() {
            localStorage["lang"] = langSelect.value;
            window.close();
        }, false);

        mainDiv.append(langSelect);
        mainDiv.append(confirmBtn);
    }, false);
}, false);
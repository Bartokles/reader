document.addEventListener('DOMContentLoaded', function() {
    let voiceSelect = document.getElementById("voice");
    let saveButton = document.getElementById('saveBtn');

    let voices = chrome.extension.getBackgroundPage().voices;

    for (let i = 0; i < voices.length; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = voices[i].name;
        if(i == localStorage["voice"]){
            opt.selected = true;
        }
        voiceSelect.appendChild(opt);
    }

    saveButton.addEventListener('click', function() {
        let speech = chrome.extension.getBackgroundPage().speech;
        let voices = chrome.extension.getBackgroundPage().voices;

        localStorage["voice"] = voiceSelect.value;
        speech.voice = voices[voiceSelect.value];

        window.close();
    }, false);
}, false);
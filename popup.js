document.addEventListener('DOMContentLoaded', function() {
    // loading html elements
    let voiceSelect = document.getElementById("voice");

    let volumeSlider = document.getElementById("volume");
    let pitchSlider = document.getElementById("pitch");
    let rateSlider = document.getElementById("rate");

    let saveButton = document.getElementById('saveBtn');
    let resetButton = document.getElementById('resetBtn');

    let voices = chrome.extension.getBackgroundPage().voices;

    // setting stored values if their exists
    for (let i = 0; i < voices.length; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = voices[i].name;
        if(i == localStorage["voice"]){
            opt.selected = true;
        }
        voiceSelect.appendChild(opt);
    }

    if (localStorage["volume"] != null) {
        volumeSlider.value = localStorage["volume"];
    }
    if (localStorage["pitch"] != null) {
        pitchSlider.value = localStorage["pitch"];
    }
    if (localStorage["rate"] != null) {
        rateSlider.value = localStorage["rate"];
    }

    // setting onChange listeners
    volumeSlider.addEventListener('input', function() {
        localStorage["volume"] = volumeSlider.value;
    }, false);

    pitchSlider.addEventListener('input', function() {
        localStorage["pitch"] = pitchSlider.value;
    }, false);

    rateSlider.addEventListener('input', function() {
        localStorage["rate"] = rateSlider.value;
    }, false);

    // setting onClick listeners
    saveButton.addEventListener('click', function() {
        localStorage["voice"] = voiceSelect.value;
        window.close();
    }, false);

    resetButton.addEventListener('click', function() {
        localStorage["voice"] = 0;

        localStorage["volume"] = 10;
        localStorage["pitch"] = 10;
        localStorage["rate"] = 10;

        voiceSelect[0].selected = true;

        volumeSlider.value = localStorage["volume"];
        pitchSlider.value = localStorage["pitch"];
        rateSlider.value = localStorage["rate"];
    }, false);
}, false);
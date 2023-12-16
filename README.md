# Reader
A browser extension that adds the function of reading user-selected text using system tts

## Supported Browsers

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
 :heavy_check_mark: | :x: | :heavy_check_mark: | :yellow_circle:untested | :yellow_circle:untested |

Firefox will not be supported due to its approach to manifest v3 and tts functionality.

## Install

Only avaliable method right now is installing it from sorce

### From source

You need to download the lates realese of extention and unpack it. Then go to your browser
and in "Extentions" section enable developer mode and then click "load unpacked" and choose the unpacked folder of file you downloaded.

## Usage

After installation, just select any text and right-click to open the context menu, then click "Read selected text". If you want to customize it, click the extension icon and use the panel in the pop-up window

## Roadmap

- [X] Core tts functionality
- [X] GUI to customize options of tts like voices, pitch or volume
- [X] Multi-language GUI Support
    - [X] English
    - [X] Chinese
    - [X] Spanish
    - [X] Portuguese
    - [X] Russian
    - [X] German
    - [X] French
    - [X] Polish
- [X] Migrate to manifest v3
- [ ] Make extantion awaliable in web stores
    - [ ] Chrome Web Store
    - [ ] Microsoft Edge Extensions

## License

Distributed under the GNU GPLv3 License. See `LICENSE` for more information.

## Sources

Helpful sources of knowledge during project development

* [Chrome for Developers - Extensions](http://developer.chrome.com/extensions/getstarted.html)
* [Stackoverflow](https://stackoverflow.com/questions/4725896/chrome-extension-how-to-create)
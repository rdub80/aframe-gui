/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.normalYPosition = 1.5;
window.hiddenYPosition = 1000;

//default colors
window.key_orange = '#ed5b21'; // rgb(237, 91, 33) Light orange
window.key_orange_light = '#ef8c60'; // rgb (239, 140, 96) Extra Light Orange
window.key_grey = '#22252a'; // rgb(34, 37, 42) Standard grey
window.key_grey_dark = '#2c3037'; // rgb(44, 48, 55) Medium grey
window.key_grey_light = '#606876'; // rgb(96, 104, 118) Light grey
window.key_offwhite = '#d3d3d4'; // rgb(211, 211, 212) Extra Light grey
window.key_white = '#fff';

//icon font variables
window.icon_font = { "alert": '\uF101', "alert-circled": '\uF100', "android-add": '\uF2C7', "android-add-circle": '\uF359', "android-alarm-clock": '\uF35A', "android-alert": '\uF35B', "android-apps": '\uF35C', "android-archive": '\uF2C9', "android-arrow-back": '\uF2CA', "android-arrow-down": '\uF35D', "android-arrow-dropdown": '\uF35F', "android-arrow-dropdown-circle": '\uF35E', "android-arrow-dropleft": '\uF361', "android-arrow-dropleft-circle": '\uF360', "android-arrow-dropright": '\uF363', "android-arrow-dropright-circle": '\uF362', "android-arrow-dropup": '\uF365', "android-arrow-dropup-circle": '\uF364', "android-arrow-forward": '\uF30F', "android-arrow-up": '\uF366', "android-attach": '\uF367', "android-bar": '\uF368', "android-bicycle": '\uF369', "android-boat": '\uF36A', "android-bookmark": '\uF36B', "android-bulb": '\uF36C', "android-bus": '\uF36D', "android-calendar": '\uF2D1', "android-call": '\uF2D2', "android-camera": '\uF2D3', "android-cancel": '\uF36E', "android-car": '\uF36F', "android-cart": '\uF370', "android-chat": '\uF2D4', "android-checkbox": '\uF374', "android-checkbox-blank": '\uF371', "android-checkbox-outline": '\uF373', "android-checkbox-outline-blank": '\uF372', "android-checkmark-circle": '\uF375', "android-clipboard": '\uF376', "android-close": '\uF2D7', "android-cloud": '\uF37A', "android-cloud-circle": '\uF377', "android-cloud-done": '\uF378', "android-cloud-outline": '\uF379', "android-color-palette": '\uF37B', "android-compass": '\uF37C', "android-contact": '\uF2D8', "android-contacts": '\uF2D9', "android-contract": '\uF37D', "android-create": '\uF37E', "android-delete": '\uF37F', "android-desktop": '\uF380', "android-document": '\uF381', "android-done": '\uF383', "android-done-all": '\uF382', "android-download": '\uF2DD', "android-drafts": '\uF384', "android-exit": '\uF385', "android-expand": '\uF386', "android-favorite": '\uF388', "android-favorite-outline": '\uF387', "android-film": '\uF389', "android-folder": '\uF2E0', "android-folder-open": '\uF38A', "android-funnel": '\uF38B', "android-globe": '\uF38C', "android-hand": '\uF2E3', "android-hangout": '\uF38D', "android-happy": '\uF38E', "android-home": '\uF38F', "android-image": '\uF2E4', "android-laptop": '\uF390', "android-list": '\uF391', "android-locate": '\uF2E9', "android-lock": '\uF392', "android-mail": '\uF2EB', "android-map": '\uF393', "android-menu": '\uF394', "android-microphone": '\uF2EC', "android-microphone-off": '\uF395', "android-more-horizontal": '\uF396', "android-more-vertical": '\uF397', "android-navigate": '\uF398', "android-notifications": '\uF39B', "android-notifications-none": '\uF399', "android-notifications-off": '\uF39A', "android-open": '\uF39C', "android-options": '\uF39D', "android-people": '\uF39E', "android-person": '\uF3A0', "android-person-add": '\uF39F', "android-phone-landscape": '\uF3A1', "android-phone-portrait": '\uF3A2', "android-pin": '\uF3A3', "android-plane": '\uF3A4', "android-playstore": '\uF2F0', "android-print": '\uF3A5', "android-radio-button-off": '\uF3A6', "android-radio-button-on": '\uF3A7', "android-refresh": '\uF3A8', "android-remove": '\uF2F4', "android-remove-circle": '\uF3A9', "android-restaurant": '\uF3AA', "android-sad": '\uF3AB', "android-search": '\uF2F5', "android-send": '\uF2F6', "android-settings": '\uF2F7', "android-share": '\uF2F8', "android-share-alt": '\uF3AC', "android-star": '\uF2FC', "android-star-half": '\uF3AD', "android-star-outline": '\uF3AE', "android-stopwatch": '\uF2FD', "android-subway": '\uF3AF', "android-sunny": '\uF3B0', "android-sync": '\uF3B1', "android-textsms": '\uF3B2', "android-time": '\uF3B3', "android-train": '\uF3B4', "android-unlock": '\uF3B5', "android-upload": '\uF3B6', "android-volume-down": '\uF3B7', "android-volume-mute": '\uF3B8', "android-volume-off": '\uF3B9', "android-volume-up": '\uF3BA', "android-walk": '\uF3BB', "android-warning": '\uF3BC', "android-watch": '\uF3BD', "android-wifi": '\uF305', "aperture": '\uF313', "archive": '\uF102', "arrow-down-a": '\uF103', "arrow-down-b": '\uF104', "arrow-down-c": '\uF105', "arrow-expand": '\uF25E', "arrow-graph-down-left": '\uF25F', "arrow-graph-down-right": '\uF260', "arrow-graph-up-left": '\uF261', "arrow-graph-up-right": '\uF262', "arrow-left-a": '\uF106', "arrow-left-b": '\uF107', "arrow-left-c": '\uF108', "arrow-move": '\uF263', "arrow-resize": '\uF264', "arrow-return-left": '\uF265', "arrow-return-right": '\uF266', "arrow-right-a": '\uF109', "arrow-right-b": '\uF10A', "arrow-right-c": '\uF10B', "arrow-shrink": '\uF267', "arrow-swap": '\uF268', "arrow-up-a": '\uF10C', "arrow-up-b": '\uF10D', "arrow-up-c": '\uF10E', "asterisk": '\uF314', "at": '\uF10F', "backspace": '\uF3BF', "backspace-outline": '\uF3BE', "bag": '\uF110', "battery-charging": '\uF111', "battery-empty": '\uF112', "battery-full": '\uF113', "battery-half": '\uF114', "battery-low": '\uF115', "beaker": '\uF269', "beer": '\uF26A', "bluetooth": '\uF116', "bonfire": '\uF315', "bookmark": '\uF26B', "bowtie": '\uF3C0', "briefcase": '\uF26C', "bug": '\uF2BE', "calculator": '\uF26D', "calendar": '\uF117', "camera": '\uF118', "card": '\uF119', "cash": '\uF316', "chatbox": '\uF11B', "chatbox-working": '\uF11A', "chatboxes": '\uF11C', "chatbubble": '\uF11E', "chatbubble-working": '\uF11D', "chatbubbles": '\uF11F', "checkmark": '\uF122', "checkmark-circled": '\uF120', "checkmark-round": '\uF121', "chevron-down": '\uF123', "chevron-left": '\uF124', "chevron-right": '\uF125', "chevron-up": '\uF126', "clipboard": '\uF127', "clock": '\uF26E', "close": '\uF12A', "close-circled": '\uF128', "close-round": '\uF129', "closed-captioning": '\uF317', "cloud": '\uF12B', "code": '\uF271', "code-download": '\uF26F', "code-working": '\uF270', "coffee": '\uF272', "compass": '\uF273', "compose": '\uF12C', "connection-bars": '\uF274', "contrast": '\uF275', "crop": '\uF3C1', "cube": '\uF318', "disc": '\uF12D', "document": '\uF12F', "document-text": '\uF12E', "drag": '\uF130', "earth": '\uF276', "easel": '\uF3C2', "edit": '\uF2BF', "egg": '\uF277', "eject": '\uF131', "email": '\uF132', "email-unread": '\uF3C3', "erlenmeyer-flask": '\uF3C5', "erlenmeyer-flask-bubbles": '\uF3C4', "eye": '\uF133', "eye-disabled": '\uF306', "female": '\uF278', "filing": '\uF134', "film-marker": '\uF135', "fireball": '\uF319', "flag": '\uF279', "flame": '\uF31A', "flash": '\uF137', "flash-off": '\uF136', "folder": '\uF139', "fork": '\uF27A', "fork-repo": '\uF2C0', "forward": '\uF13A', "funnel": '\uF31B', "gear-a": '\uF13D', "gear-b": '\uF13E', "grid": '\uF13F', "hammer": '\uF27B', "happy": '\uF31C', "happy-outline": '\uF3C6', "headphone": '\uF140', "heart": '\uF141', "heart-broken": '\uF31D', "help": '\uF143', "help-buoy": '\uF27C', "help-circled": '\uF142', "home": '\uF144', "icecream": '\uF27D', "image": '\uF147', "images": '\uF148', "information": '\uF14A', "information-circled": '\uF149', "ionic": '\uF14B', "ios-alarm": '\uF3C8', "ios-alarm-outline": '\uF3C7', "ios-albums": '\uF3CA', "ios-albums-outline": '\uF3C9', "ios-americanfootball": '\uF3CC', "ios-americanfootball-outline": '\uF3CB', "ios-analytics": '\uF3CE', "ios-analytics-outline": '\uF3CD', "ios-arrow-back": '\uF3CF', "ios-arrow-down": '\uF3D0', "ios-arrow-forward": '\uF3D1', "ios-arrow-left": '\uF3D2', "ios-arrow-right": '\uF3D3', "ios-arrow-thin-down": '\uF3D4', "ios-arrow-thin-left": '\uF3D5', "ios-arrow-thin-right": '\uF3D6', "ios-arrow-thin-up": '\uF3D7', "ios-arrow-up": '\uF3D8', "ios-at": '\uF3DA', "ios-at-outline": '\uF3D9', "ios-barcode": '\uF3DC', "ios-barcode-outline": '\uF3DB', "ios-baseball": '\uF3DE', "ios-baseball-outline": '\uF3DD', "ios-basketball": '\uF3E0', "ios-basketball-outline": '\uF3DF', "ios-bell": '\uF3E2', "ios-bell-outline": '\uF3E1', "ios-body": '\uF3E4', "ios-body-outline": '\uF3E3', "ios-bolt": '\uF3E6', "ios-bolt-outline": '\uF3E5', "ios-book": '\uF3E8', "ios-book-outline": '\uF3E7', "ios-bookmarks": '\uF3EA', "ios-bookmarks-outline": '\uF3E9', "ios-box": '\uF3EC', "ios-box-outline": '\uF3EB', "ios-briefcase": '\uF3EE', "ios-briefcase-outline": '\uF3ED', "ios-browsers": '\uF3F0', "ios-browsers-outline": '\uF3EF', "ios-calculator": '\uF3F2', "ios-calculator-outline": '\uF3F1', "ios-calendar": '\uF3F4', "ios-calendar-outline": '\uF3F3', "ios-camera": '\uF3F6', "ios-camera-outline": '\uF3F5', "ios-cart": '\uF3F8', "ios-cart-outline": '\uF3F7', "ios-chatboxes": '\uF3FA', "ios-chatboxes-outline": '\uF3F9', "ios-chatbubble": '\uF3FC', "ios-chatbubble-outline": '\uF3FB', "ios-checkmark": '\uF3FF', "ios-checkmark-empty": '\uF3FD', "ios-checkmark-outline": '\uF3FE', "ios-circle-filled": '\uF400', "ios-circle-outline": '\uF401', "ios-clock": '\uF403', "ios-clock-outline": '\uF402', "ios-close": '\uF406', "ios-close-empty": '\uF404', "ios-close-outline": '\uF405', "ios-cloud": '\uF40C', "ios-cloud-download": '\uF408', "ios-cloud-download-outline": '\uF407', "ios-cloud-outline": '\uF409', "ios-cloud-upload": '\uF40B', "ios-cloud-upload-outline": '\uF40A', "ios-cloudy": '\uF410', "ios-cloudy-night": '\uF40E', "ios-cloudy-night-outline": '\uF40D', "ios-cloudy-outline": '\uF40F', "ios-cog": '\uF412', "ios-cog-outline": '\uF411', "ios-color-filter": '\uF414', "ios-color-filter-outline": '\uF413', "ios-color-wand": '\uF416', "ios-color-wand-outline": '\uF415', "ios-compose": '\uF418', "ios-compose-outline": '\uF417', "ios-contact": '\uF41A', "ios-contact-outline": '\uF419', "ios-copy": '\uF41C', "ios-copy-outline": '\uF41B', "ios-crop": '\uF41E', "ios-crop-strong": '\uF41D', "ios-download": '\uF420', "ios-download-outline": '\uF41F', "ios-drag": '\uF421', "ios-email": '\uF423', "ios-email-outline": '\uF422', "ios-eye": '\uF425', "ios-eye-outline": '\uF424', "ios-fastforward": '\uF427', "ios-fastforward-outline": '\uF426', "ios-filing": '\uF429', "ios-filing-outline": '\uF428', "ios-film": '\uF42B', "ios-film-outline": '\uF42A', "ios-flag": '\uF42D', "ios-flag-outline": '\uF42C', "ios-flame": '\uF42F', "ios-flame-outline": '\uF42E', "ios-flask": '\uF431', "ios-flask-outline": '\uF430', "ios-flower": '\uF433', "ios-flower-outline": '\uF432', "ios-folder": '\uF435', "ios-folder-outline": '\uF434', "ios-football": '\uF437', "ios-football-outline": '\uF436', "ios-game-controller-a": '\uF439', "ios-game-controller-a-outline": '\uF438', "ios-game-controller-b": '\uF43B', "ios-game-controller-b-outline": '\uF43A', "ios-gear": '\uF43D', "ios-gear-outline": '\uF43C', "ios-glasses": '\uF43F', "ios-glasses-outline": '\uF43E', "ios-grid-view": '\uF441', "ios-grid-view-outline": '\uF440', "ios-heart": '\uF443', "ios-heart-outline": '\uF442', "ios-help": '\uF446', "ios-help-empty": '\uF444', "ios-help-outline": '\uF445', "ios-home": '\uF448', "ios-home-outline": '\uF447', "ios-infinite": '\uF44A', "ios-infinite-outline": '\uF449', "ios-information": '\uF44D', "ios-information-empty": '\uF44B', "ios-information-outline": '\uF44C', "ios-ionic-outline": '\uF44E', "ios-keypad": '\uF450', "ios-keypad-outline": '\uF44F', "ios-lightbulb": '\uF452', "ios-lightbulb-outline": '\uF451', "ios-list": '\uF454', "ios-list-outline": '\uF453', "ios-location": '\uF456', "ios-location-outline": '\uF455', "ios-locked": '\uF458', "ios-locked-outline": '\uF457', "ios-loop": '\uF45A', "ios-loop-strong": '\uF459', "ios-medical": '\uF45C', "ios-medical-outline": '\uF45B', "ios-medkit": '\uF45E', "ios-medkit-outline": '\uF45D', "ios-mic": '\uF461', "ios-mic-off": '\uF45F', "ios-mic-outline": '\uF460', "ios-minus": '\uF464', "ios-minus-empty": '\uF462', "ios-minus-outline": '\uF463', "ios-monitor": '\uF466', "ios-monitor-outline": '\uF465', "ios-moon": '\uF468', "ios-moon-outline": '\uF467', "ios-more": '\uF46A', "ios-more-outline": '\uF469', "ios-musical-note": '\uF46B', "ios-musical-notes": '\uF46C', "ios-navigate": '\uF46E', "ios-navigate-outline": '\uF46D', "ios-nutrition": '\uF470', "ios-nutrition-outline": '\uF46F', "ios-paper": '\uF472', "ios-paper-outline": '\uF471', "ios-paperplane": '\uF474', "ios-paperplane-outline": '\uF473', "ios-partlysunny": '\uF476', "ios-partlysunny-outline": '\uF475', "ios-pause": '\uF478', "ios-pause-outline": '\uF477', "ios-paw": '\uF47A', "ios-paw-outline": '\uF479', "ios-people": '\uF47C', "ios-people-outline": '\uF47B', "ios-person": '\uF47E', "ios-person-outline": '\uF47D', "ios-personadd": '\uF480', "ios-personadd-outline": '\uF47F', "ios-photos": '\uF482', "ios-photos-outline": '\uF481', "ios-pie": '\uF484', "ios-pie-outline": '\uF483', "ios-pint": '\uF486', "ios-pint-outline": '\uF485', "ios-play": '\uF488', "ios-play-outline": '\uF487', "ios-plus": '\uF48B', "ios-plus-empty": '\uF489', "ios-plus-outline": '\uF48A', "ios-pricetag": '\uF48D', "ios-pricetag-outline": '\uF48C', "ios-pricetags": '\uF48F', "ios-pricetags-outline": '\uF48E', "ios-printer": '\uF491', "ios-printer-outline": '\uF490', "ios-pulse": '\uF493', "ios-pulse-strong": '\uF492', "ios-rainy": '\uF495', "ios-rainy-outline": '\uF494', "ios-recording": '\uF497', "ios-recording-outline": '\uF496', "ios-redo": '\uF499', "ios-redo-outline": '\uF498', "ios-refresh": '\uF49C', "ios-refresh-empty": '\uF49A', "ios-refresh-outline": '\uF49B', "ios-reload": '\uF49D', "ios-reverse-camera": '\uF49F', "ios-reverse-camera-outline": '\uF49E', "ios-rewind": '\uF4A1', "ios-rewind-outline": '\uF4A0', "ios-rose": '\uF4A3', "ios-rose-outline": '\uF4A2', "ios-search": '\uF4A5', "ios-search-strong": '\uF4A4', "ios-settings": '\uF4A7', "ios-settings-strong": '\uF4A6', "ios-shuffle": '\uF4A9', "ios-shuffle-strong": '\uF4A8', "ios-skipbackward": '\uF4AB', "ios-skipbackward-outline": '\uF4AA', "ios-skipforward": '\uF4AD', "ios-skipforward-outline": '\uF4AC', "ios-snowy": '\uF4AE', "ios-speedometer": '\uF4B0', "ios-speedometer-outline": '\uF4AF', "ios-star": '\uF4B3', "ios-star-half": '\uF4B1', "ios-star-outline": '\uF4B2', "ios-stopwatch": '\uF4B5', "ios-stopwatch-outline": '\uF4B4', "ios-sunny": '\uF4B7', "ios-sunny-outline": '\uF4B6', "ios-telephone": '\uF4B9', "ios-telephone-outline": '\uF4B8', "ios-tennisball": '\uF4BB', "ios-tennisball-outline": '\uF4BA', "ios-thunderstorm": '\uF4BD', "ios-thunderstorm-outline": '\uF4BC', "ios-time": '\uF4BF', "ios-time-outline": '\uF4BE', "ios-timer": '\uF4C1', "ios-timer-outline": '\uF4C0', "ios-toggle": '\uF4C3', "ios-toggle-outline": '\uF4C2', "ios-trash": '\uF4C5', "ios-trash-outline": '\uF4C4', "ios-undo": '\uF4C7', "ios-undo-outline": '\uF4C6', "ios-unlocked": '\uF4C9', "ios-unlocked-outline": '\uF4C8', "ios-upload": '\uF4CB', "ios-upload-outline": '\uF4CA', "ios-videocam": '\uF4CD', "ios-videocam-outline": '\uF4CC', "ios-volume-high": '\uF4CE', "ios-volume-low": '\uF4CF', "ios-wineglass": '\uF4D1', "ios-wineglass-outline": '\uF4D0', "ios-world": '\uF4D3', "ios-world-outline": '\uF4D2', "ipad": '\uF1F9', "iphone": '\uF1FA', "ipod": '\uF1FB', "jet": '\uF295', "key": '\uF296', "knife": '\uF297', "laptop": '\uF1FC', "leaf": '\uF1FD', "levels": '\uF298', "lightbulb": '\uF299', "link": '\uF1FE', "load-a": '\uF29A', "load-b": '\uF29B', "load-c": '\uF29C', "load-d": '\uF29D', "location": '\uF1FF', "lock-combination": '\uF4D4', "locked": '\uF200', "log-in": '\uF29E', "log-out": '\uF29F', "loop": '\uF201', "magnet": '\uF2A0', "male": '\uF2A1', "man": '\uF202', "map": '\uF203', "medkit": '\uF2A2', "merge": '\uF33F', "mic-a": '\uF204', "mic-b": '\uF205', "mic-c": '\uF206', "minus": '\uF209', "minus-circled": '\uF207', "minus-round": '\uF208', "model-s": '\uF2C1', "monitor": '\uF20A', "more": '\uF20B', "mouse": '\uF340', "music-note": '\uF20C', "navicon": '\uF20E', "navicon-round": '\uF20D', "navigate": '\uF2A3', "network": '\uF341', "no-smoking": '\uF2C2', "nuclear": '\uF2A4', "outlet": '\uF342', "paintbrush": '\uF4D5', "paintbucket": '\uF4D6', "paper-airplane": '\uF2C3', "paperclip": '\uF20F', "pause": '\uF210', "person": '\uF213', "person-add": '\uF211', "person-stalker": '\uF212', "pie-graph": '\uF2A5', "pin": '\uF2A6', "pinpoint": '\uF2A7', "pizza": '\uF2A8', "plane": '\uF214', "planet": '\uF343', "play": '\uF215', "playstation": '\uF30A', "plus": '\uF218', "plus-circled": '\uF216', "plus-round": '\uF217', "podium": '\uF344', "pound": '\uF219', "power": '\uF2A9', "pricetag": '\uF2AA', "pricetags": '\uF2AB', "printer": '\uF21A', "pull-request": '\uF345', "qr-scanner": '\uF346', "quote": '\uF347', "radio-waves": '\uF2AC', "record": '\uF21B', "refresh": '\uF21C', "reply": '\uF21E', "reply-all": '\uF21D', "ribbon-a": '\uF348', "ribbon-b": '\uF349', "sad": '\uF34A', "sad-outline": '\uF4D7', "scissors": '\uF34B', "search": '\uF21F', "settings": '\uF2AD', "share": '\uF220', "shuffle": '\uF221', "skip-backward": '\uF222', "skip-forward": '\uF223', "social-android": '\uF225', "social-android-outline": '\uF224', "social-angular": '\uF4D9', "social-angular-outline": '\uF4D8', "social-apple": '\uF227', "social-apple-outline": '\uF226', "social-bitcoin": '\uF2AF', "social-bitcoin-outline": '\uF2AE', "social-buffer": '\uF229', "social-buffer-outline": '\uF228', "social-chrome": '\uF4DB', "social-chrome-outline": '\uF4DA', "social-codepen": '\uF4DD', "social-codepen-outline": '\uF4DC', "social-css3": '\uF4DF', "social-css3-outline": '\uF4DE', "social-designernews": '\uF22B', "social-designernews-outline": '\uF22A', "social-dribbble": '\uF22D', "social-dribbble-outline": '\uF22C', "social-dropbox": '\uF22F', "social-dropbox-outline": '\uF22E', "social-euro": '\uF4E1', "social-euro-outline": '\uF4E0', "social-facebook": '\uF231', "social-facebook-outline": '\uF230', "social-foursquare": '\uF34D', "social-foursquare-outline": '\uF34C', "social-freebsd-devil": '\uF2C4', "social-github": '\uF233', "social-github-outline": '\uF232', "social-google": '\uF34F', "social-google-outline": '\uF34E', "social-googleplus": '\uF235', "social-googleplus-outline": '\uF234', "social-hackernews": '\uF237', "social-hackernews-outline": '\uF236', "social-html5": '\uF4E3', "social-html5-outline": '\uF4E2', "social-instagram": '\uF351', "social-instagram-outline": '\uF350', "social-javascript": '\uF4E5', "social-javascript-outline": '\uF4E4', "social-linkedin": '\uF239', "social-linkedin-outline": '\uF238', "social-markdown": '\uF4E6', "social-nodejs": '\uF4E7', "social-octocat": '\uF4E8', "social-pinterest": '\uF2B1', "social-pinterest-outline": '\uF2B0', "social-python": '\uF4E9', "social-reddit": '\uF23B', "social-reddit-outline": '\uF23A', "social-rss": '\uF23D', "social-rss-outline": '\uF23C', "social-sass": '\uF4EA', "social-skype": '\uF23F', "social-skype-outline": '\uF23E', "social-snapchat": '\uF4EC', "social-snapchat-outline": '\uF4EB', "social-tumblr": '\uF241', "social-tumblr-outline": '\uF240', "social-tux": '\uF2C5', "social-twitch": '\uF4EE', "social-twitch-outline": '\uF4ED', "social-twitter": '\uF243', "social-twitter-outline": '\uF242', "social-usd": '\uF353', "social-usd-outline": '\uF352', "social-vimeo": '\uF245', "social-vimeo-outline": '\uF244', "social-whatsapp": '\uF4F0', "social-whatsapp-outline": '\uF4EF', "social-windows": '\uF247', "social-windows-outline": '\uF246', "social-wordpress": '\uF249', "social-wordpress-outline": '\uF248', "social-yahoo": '\uF24B', "social-yahoo-outline": '\uF24A', "social-yen": '\uF4F2', "social-yen-outline": '\uF4F1', "social-youtube": '\uF24D', "social-youtube-outline": '\uF24C', "soup-can": '\uF4F4', "soup-can-outline": '\uF4F3', "speakerphone": '\uF2B2', "speedometer": '\uF2B3', "spoon": '\uF2B4', "star": '\uF24E', "stats-bars": '\uF2B5', "steam": '\uF30B', "stop": '\uF24F', "thermometer": '\uF2B6', "thumbsdown": '\uF250', "thumbsup": '\uF251', "toggle": '\uF355', "toggle-filled": '\uF354', "transgender": '\uF4F5', "trash-a": '\uF252', "trash-b": '\uF253', "trophy": '\uF356', "tshirt": '\uF4F7', "tshirt-outline": '\uF4F6', "umbrella": '\uF2B7', "university": '\uF357', "unlocked": '\uF254', "upload": '\uF255', "usb": '\uF2B8', "videocamera": '\uF256', "volume-high": '\uF257', "volume-low": '\uF258', "volume-medium": '\uF259', "volume-mute": '\uF25A', "wand": '\uF358', "waterdrop": '\uF25B', "wifi": '\uF25C', "wineglass": '\uF2B9', "woman": '\uF25D', "wrench": '\uF2BA', "xbox": '\uF30C' };

window.getUniqueId = function (stringPrefix) {
    var datestr = new Date().getTime().toString();
    var randomstr = Math.random().toString().replace('.', '');
    return stringPrefix + '_' + datestr + randomstr;
};

window.getTextWidth = function (text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};

window.drawText = function (ctx, canvas, text, font, color, size) {
    setTimeout(function () {

        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 0;
        ctx.shadowOffsetX = 0;
        ctx.scale(1, 1);
        ctx.fillText(text, canvas.width / 2, canvas.height / 2); // position x, y
    }, 500); // callback when font is loaded needed
};

window.drawIcon = function (ctx, canvas, icon, color, size) {
    setTimeout(function () {
        ctx.font = '240px Ionicons';
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 0;
        ctx.shadowOffsetX = 0;
        ctx.scale(1, 1);

        console.log("icon" + icon);
        if (icon_font[icon]) {
            ctx.fillText(icon_font[icon], canvas.width / 2, canvas.height / 2);
        } else {
            ctx.fillText('?', canvas.width / 2, canvas.height / 2);
        }
    }, 500); // callback when font is loaded needed
};

window.drawLabel = function (ctx, canvas, text, font, color, size) {
    setTimeout(function () {

        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = "left";
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 0;
        ctx.shadowOffsetX = 0;
        ctx.scale(1, 1);
        ctx.fillText(text, canvas.height / 8, canvas.height / 2); // position x, y
    }, 500); // callback when font is loaded needed
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-button', {
    schema: {
        on: { default: 'click' },
        text: { type: 'string', default: 'text' },
        fontColor: { type: 'string', default: key_offwhite },
        fontFamily: { type: 'string', default: 'Helvetica' },
        borderColor: { type: 'string', default: key_offwhite },
        backgroundColor: { type: 'string', default: key_grey },
        hoverColor: { type: 'string', default: key_grey_dark },
        activeColor: { type: 'string', default: key_orange },
        toggle: { type: 'boolean', default: false }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.width * multiplier;
        var canvasHeight = guiItem.height * multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; transparent: true; opacity: 0.5; side:double; color:' + data.backgroundColor + ';');

        drawText(ctx, canvas, data.text, '100px ' + data.fontFamily, data.fontColor, 1);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', 'primitive: box; width: ' + guiItem.width + '; height: ' + guiItem.height + '; depth: 0.02;');
        buttonContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        buttonContainer.setAttribute('rotation', '0 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', 'primitive: box; width: ' + (guiItem.width - 0.025) + '; height: ' + (guiItem.height - 0.025) + '; depth: 0.04;');
        buttonEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
        buttonEntity.setAttribute('rotation', '0 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', 'primitive: plane; width: ' + guiItem.width / 1.05 + '; height: ' + guiItem.height / 1.05 + ';');
        textEntity.setAttribute('material', 'shader: flat; src: #' + canvas.id + '; transparent: true; opacity: 1; side:front;');
        textEntity.setAttribute('position', '0 0 0.041');
        el.appendChild(textEntity);

        ////WAI ARIA Support
        el.setAttribute('role', 'button');

        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            if (!data.toggle) {
                buttonEntity.setAttribute('material', 'color', data.backgroundColor);
            }
        });

        el.addEventListener(data.on, function (evt) {
            data.toggle = !data.toggle;
            buttonEntity.setAttribute('material', 'color', data.activeColor);
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });
    },
    play: function play() {},
    update: function update(oldData) {
        console.log("In button update, toggle: " + this.data.toggle);
    },
    setActiveState: function setActiveState(activeState) {
        console.log("in setActiveState function");
        this.data.toggle = activeState;
        if (!activeState) {
            this.buttonEntity.setAttribute('material', 'color', this.data.backgroundColor);
        } else {}
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-circle-loader', {
    schema: {
        count: { type: 'number', default: '100' },
        fontColor: { type: 'string', default: key_grey },
        fontFamily: { type: 'string', default: 'Helvetica' },
        borderColor: { type: 'string', default: key_offwhite },
        backgroundColor: { type: 'string', default: key_grey },
        hoverColor: { type: 'string', default: key_grey_dark },
        activeColor: { type: 'string', default: key_orange },
        toggle: { type: 'boolean', default: false }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.height * multiplier; //square
        var canvasHeight = guiItem.height * multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');
        el.setAttribute('material', 'shader: flat; transparent: true; opacity: 0.5; side:back; color:' + data.backgroundColor + ';');

        drawText(ctx, canvas, data.count + '%', '110px ' + data.fontFamily, data.fontColor, 1);

        var loaderContainer = document.createElement("a-entity");
        loaderContainer.setAttribute('geometry', 'primitive: cylinder; radius: ' + guiItem.height / 2 + '; height: 0.02;');
        loaderContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        loaderContainer.setAttribute('rotation', '90 0 0');
        loaderContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(loaderContainer);

        var loaderRing = document.createElement("a-ring");
        loaderRing.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor);
        loaderRing.setAttribute('radius-inner', '' + guiItem.height / 3);
        loaderRing.setAttribute('radius-outer', '' + guiItem.height / 2);
        loaderRing.setAttribute('theta-start', '90');
        loaderRing.setAttribute('theta-length', '10'); // this has to count 0 to 360 when loading
        loaderRing.setAttribute('rotation', '0 0 0');
        loaderRing.setAttribute('position', '0 0 0.04');
        loaderRing.id = "loader_ring";
        el.appendChild(loaderRing);

        var countLoaded = document.createElement("a-entity");
        countLoaded.setAttribute('geometry', 'primitive: plane; width: ' + guiItem.height / 1.75 + '; height: ' + guiItem.height / 1.75 + ';');
        countLoaded.setAttribute('material', 'shader: flat; src: #' + canvas.id + '; transparent: true; opacity: 1; side:front;');
        countLoaded.setAttribute('position', '0 0 0.022');
        countLoaded.id = "loader_ring_count";
        el.appendChild(countLoaded);
    },
    play: function play() {},
    update: function update(oldData) {}
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-circle-timer', {
    schema: {
        countDown: { type: 'number', default: '10' },
        fontColor: { type: 'string', default: key_grey },
        fontFamily: { type: 'string', default: 'Helvetica' },
        borderColor: { type: 'string', default: key_offwhite },
        backgroundColor: { type: 'string', default: key_grey },
        hoverColor: { type: 'string', default: key_grey_dark },
        activeColor: { type: 'string', default: key_orange },
        toggle: { type: 'boolean', default: false }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.height * multiplier; //square
        var canvasHeight = guiItem.height * multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');
        el.setAttribute('material', 'shader: flat; transparent: true; opacity: 0.5; side:back; color:' + data.backgroundColor + ';');

        drawText(ctx, canvas, data.countDown, '200px ' + data.fontFamily, data.fontColor, 1);

        var timerContainer = document.createElement("a-entity");
        timerContainer.setAttribute('geometry', 'primitive: cylinder; radius: ' + guiItem.height / 2 + '; height: 0.02;');
        timerContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        timerContainer.setAttribute('rotation', '90 0 0');
        timerContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(timerContainer);

        var timerIndicator1 = document.createElement("a-ring");
        timerIndicator1.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
        timerIndicator1.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerIndicator1.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerIndicator1.setAttribute('theta-start', '-1');
        timerIndicator1.setAttribute('theta-length', '3');
        timerIndicator1.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator1);
        var timerIndicator2 = document.createElement("a-ring");
        timerIndicator2.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
        timerIndicator2.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerIndicator2.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerIndicator2.setAttribute('theta-start', '89');
        timerIndicator2.setAttribute('theta-length', '3');
        timerIndicator2.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator2);
        var timerIndicator3 = document.createElement("a-ring");
        timerIndicator3.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
        timerIndicator3.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerIndicator3.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerIndicator3.setAttribute('theta-start', '179');
        timerIndicator3.setAttribute('theta-length', '3');
        timerIndicator3.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator3);
        var timerIndicator4 = document.createElement("a-ring");
        timerIndicator4.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
        timerIndicator4.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerIndicator4.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerIndicator4.setAttribute('theta-start', '269');
        timerIndicator4.setAttribute('theta-length', '3');
        timerIndicator4.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator4);

        var timerRing = document.createElement("a-ring");
        timerRing.setAttribute('material', 'shader: flat; opacity: 0.75; side:double; color: ' + data.activeColor);
        timerRing.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerRing.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerRing.setAttribute('theta-start', '0');
        timerRing.setAttribute('theta-length', '10'); // this has to increase 0 to 360 when running the countdown
        timerRing.setAttribute('rotation', '0 0 0');
        timerRing.setAttribute('position', '0 0 0.03');
        timerRing.id = "loader_ring";
        el.appendChild(timerRing);

        var countDownLabel = document.createElement("a-entity");
        countDownLabel.setAttribute('geometry', 'primitive: plane; width: ' + guiItem.height / 1.75 + '; height: ' + guiItem.height / 1.75 + ';');
        countDownLabel.setAttribute('material', 'shader: flat; src: #' + canvas.id + '; transparent: true; opacity: 1; side:front;');
        countDownLabel.setAttribute('position', '0 0 0.022');
        countDownLabel.id = "loader_ring_count";
        el.appendChild(countDownLabel);
    },
    play: function play() {},
    update: function update(oldData) {}
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-cursor', {
    schema: {
        cursorColor: { type: 'string', default: key_white },
        cursorActiveColor: { type: 'string', default: key_orange_light }
    },
    init: function init() {
        var cursor = this.cursor = this.el.getAttribute('cursor');
        var fuse = cursor.fuse; // true if cursor fuse is enabled.
        var fuseTimeout = cursor.fuseTimeout; // animation lenght should be based on this value
        var defaultHoverAnimationDuration = 400;
        console.log("fuse: " + fuse + ", fuseTimeout: " + fuseTimeout);

        var el = this.el;
        /*
         var cursorShadow = document.createElement("a-entity");
         cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.5;');
         cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.025; radiusOuter:0.03');
         this.el.appendChild(cursorShadow);
          var hoverGuiAnimationShadow = document.createElement("a-animation");
         hoverGuiAnimationShadow.setAttribute('begin', 'hovergui');
         hoverGuiAnimationShadow.setAttribute('easing', 'linear');
         hoverGuiAnimationShadow.setAttribute('attribute', 'geometry.radiusInner');
         hoverGuiAnimationShadow.setAttribute('fill', 'forwards');
         hoverGuiAnimationShadow.setAttribute('from', '0.025');
         hoverGuiAnimationShadow.setAttribute('to', '0.035');
         hoverGuiAnimationShadow.setAttribute('dur', `${defaultHoverAnimationDuration}`);
         cursorShadow.appendChild(hoverGuiAnimationShadow);
         */

        var hoverGuiAnimation = document.createElement("a-animation");
        hoverGuiAnimation.setAttribute('begin', 'hovergui');
        hoverGuiAnimation.setAttribute('easing', 'linear');
        hoverGuiAnimation.setAttribute('attribute', 'geometry.radiusInner');
        hoverGuiAnimation.setAttribute('fill', 'forwards');
        hoverGuiAnimation.setAttribute('from', '0.000001');
        hoverGuiAnimation.setAttribute('to', '0.025');
        hoverGuiAnimation.setAttribute('dur', '' + defaultHoverAnimationDuration);
        this.el.appendChild(hoverGuiAnimation);

        var hoverGuiAnimation2 = document.createElement("a-animation");
        hoverGuiAnimation2.setAttribute('begin', 'hovergui');
        hoverGuiAnimation2.setAttribute('easing', 'linear');
        hoverGuiAnimation2.setAttribute('attribute', 'geometry.radiusOuter');
        hoverGuiAnimation2.setAttribute('fill', 'forwards');
        hoverGuiAnimation2.setAttribute('from', '0.025');
        hoverGuiAnimation2.setAttribute('to', '0.035');
        hoverGuiAnimation2.setAttribute('dur', '' + defaultHoverAnimationDuration);
        this.el.appendChild(hoverGuiAnimation2);

        var leaveGuiAnimation = document.createElement("a-animation");
        leaveGuiAnimation.setAttribute('begin', 'leavegui');
        leaveGuiAnimation.setAttribute('easing', 'linear');
        leaveGuiAnimation.setAttribute('attribute', 'geometry.radiusInner');
        leaveGuiAnimation.setAttribute('fill', 'forwards');
        leaveGuiAnimation.setAttribute('from', '0.02');
        leaveGuiAnimation.setAttribute('to', '0.000001');
        leaveGuiAnimation.setAttribute('dur', '' + defaultHoverAnimationDuration);
        this.el.appendChild(leaveGuiAnimation);

        var leaveGuiAnimation2 = document.createElement("a-animation");
        leaveGuiAnimation2.setAttribute('begin', 'leavegui');
        leaveGuiAnimation2.setAttribute('easing', 'linear');
        leaveGuiAnimation2.setAttribute('attribute', 'geometry.radiusOuter');
        leaveGuiAnimation2.setAttribute('fill', 'forwards');
        leaveGuiAnimation2.setAttribute('from', '0.035');
        leaveGuiAnimation2.setAttribute('to', '0.025');
        leaveGuiAnimation2.setAttribute('dur', '' + defaultHoverAnimationDuration);
        this.el.appendChild(leaveGuiAnimation2);

        var leaveGuiAnimation3 = document.createElement("a-animation");
        leaveGuiAnimation3.setAttribute('begin', 'leavegui');
        leaveGuiAnimation3.setAttribute('easing', 'linear');
        leaveGuiAnimation3.setAttribute('attribute', 'material.color');
        leaveGuiAnimation3.setAttribute('fill', 'forwards');
        leaveGuiAnimation3.setAttribute('from', this.data.cursorActiveColor);
        leaveGuiAnimation3.setAttribute('to', this.data.cursorColor);
        leaveGuiAnimation3.setAttribute('dur', '0');
        this.el.appendChild(leaveGuiAnimation3);

        var leaveGuiAnimation4 = document.createElement("a-animation");
        leaveGuiAnimation4.setAttribute('begin', 'leavegui');
        leaveGuiAnimation4.setAttribute('easing', 'linear');
        leaveGuiAnimation4.setAttribute('attribute', 'scale');
        leaveGuiAnimation4.setAttribute('fill', 'forwards');
        leaveGuiAnimation4.setAttribute('to', '1 1 1');
        leaveGuiAnimation4.setAttribute('dur', '0');
        this.el.appendChild(leaveGuiAnimation4);

        var leaveGuiAnimation5 = document.createElement("a-animation");
        leaveGuiAnimation5.setAttribute('begin', 'leavegui');
        leaveGuiAnimation5.setAttribute('easing', 'linear');
        leaveGuiAnimation5.setAttribute('attribute', 'geometry.thetaLength');
        leaveGuiAnimation5.setAttribute('fill', 'forwards');
        leaveGuiAnimation5.setAttribute('to', '360');
        leaveGuiAnimation5.setAttribute('dur', '0');
        this.el.appendChild(leaveGuiAnimation5);

        /*
         var fuseScaleAnimation = document.createElement("a-animation");
         fuseScaleAnimation.setAttribute('begin', 'cursor-fusing');
         fuseScaleAnimation.setAttribute('easing', 'linear');
         fuseScaleAnimation.setAttribute('attribute', 'scale');
         fuseScaleAnimation.setAttribute('fill', 'forwards');
         fuseScaleAnimation.setAttribute('from', '1 1 1');
         fuseScaleAnimation.setAttribute('to', '2 2 2');
         fuseScaleAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
         fuseScaleAnimation.setAttribute('dur', '400');
         this.el.appendChild(fuseScaleAnimation);
         */

        var fuseAnimationDuration = fuseTimeout - defaultHoverAnimationDuration;
        var fuseColorAnimation = document.createElement("a-animation");
        fuseColorAnimation.setAttribute('begin', 'cursor-fusing');
        fuseColorAnimation.setAttribute('easing', 'linear');
        fuseColorAnimation.setAttribute('attribute', 'material.color');
        fuseColorAnimation.setAttribute('fill', 'forwards');
        fuseColorAnimation.setAttribute('from', this.data.cursorColor);
        fuseColorAnimation.setAttribute('to', this.data.cursorActiveColor);
        fuseColorAnimation.setAttribute('delay', '' + defaultHoverAnimationDuration);
        fuseColorAnimation.setAttribute('dur', '' + fuseAnimationDuration);
        this.el.appendChild(fuseColorAnimation);

        var fuseFillAnimation = document.createElement("a-animation");
        fuseFillAnimation.setAttribute('begin', 'cursor-fusing');
        fuseFillAnimation.setAttribute('easing', 'linear');
        fuseFillAnimation.setAttribute('attribute', 'geometry.thetaLength');
        fuseFillAnimation.setAttribute('fill', 'forwards');
        fuseFillAnimation.setAttribute('from', '0');
        fuseFillAnimation.setAttribute('to', '360');
        fuseFillAnimation.setAttribute('delay', '' + defaultHoverAnimationDuration);
        fuseFillAnimation.setAttribute('dur', '' + fuseAnimationDuration);
        this.el.appendChild(fuseFillAnimation);

        var clickAnimation = document.createElement("a-animation");
        clickAnimation.setAttribute('begin', 'click');
        clickAnimation.setAttribute('easing', 'ease-in');
        clickAnimation.setAttribute('attribute', 'scale');
        clickAnimation.setAttribute('fill', 'forwards');
        clickAnimation.setAttribute('from', '1 1 1');
        clickAnimation.setAttribute('to', '1.25 1.25 1.25');
        clickAnimation.setAttribute('dur', '300');
        this.el.appendChild(clickAnimation);

        el.addEventListener('mouseenter', function () {
            console.log("in gui-cursor mousenter, el: " + el);
            el.emit('hovergui');
        });

        el.addEventListener('mouseleave', function () {
            console.log("in gui-cursor mouseleave, el: " + el);
            el.emit('leavegui');
        });

        //this.el.addEventListener("mouseenter", this.hovergui());
        //this.el.addEventListener("mouseleave", this.leavegui());
        // this.el.addEventListener("stateremoved", this.reset(this.ev));
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {},
    hovergui: function hovergui() {
        //this.cursor.emit('hovergui');
    },
    leavegui: function leavegui(evt) {
        // this.cursor.emit('leavegui');
    },
    resetcursor: function resetcursor() {
        if (evt.detail.state === 'cursor-fusing') {
            AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
            AFRAME.utils.entity.setComponentProperty(this, "material.color", "#ffffff");
            AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
        }
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

AFRAME.registerComponent('gui-flex-container', {
    schema: {
        flexDirection: { type: 'string', default: 'row' },
        justifyContent: { type: 'string', default: 'flexStart' },
        alignItems: { type: 'string', default: 'flexStart' },
        itemPadding: { type: 'number', default: 0.0 },
        opacity: { type: 'number', default: 0.0 },
        fontColor: { type: 'string', default: key_offwhite },
        borderColor: { type: 'string', default: key_offwhite },
        backgroundColor: { type: 'string', default: key_grey },
        isTopContainer: { type: 'boolean', default: false }
    },
    init: function init() {
        console.log("in aframe-gui-component init for: " + this.el.getAttribute("id"));
        var containerGuiItem = this.el.getAttribute("gui-item");

        if (this.data.isTopContainer) {
            this.setBackground();
        }

        this.el.setAttribute('geometry', 'primitive: plane; height: ' + containerGuiItem.height + '; width: ' + containerGuiItem.width + ';');
        this.el.setAttribute('material', 'shader: flat; transparent: true; opacity: ' + this.data.opacity + '; color: ' + this.data.backgroundColor + '; side:front;');

        this.children = this.el.getChildEntities();
        console.log("childElements: " + this.children);
        console.log("num child Elements: " + this.children.length);

        // coordinate system is 0, 0 in the top left
        var cursorX = 0;
        var cursorY = 0;
        if (this.data.flexDirection == 'row') {
            // first figure out cursor position on main X axis
            if (this.data.justifyContent == 'flexStart') {
                cursorX = 0;
            } else if (this.data.justifyContent == 'center' || this.data.justifyContent == 'flexEnd') {
                var rowWidth = 0;
                for (var i = 0; i < this.children.length; i++) {
                    var childElement = this.children[i];
                    var childGuiItem = childElement.getAttribute("gui-item");
                    rowWidth = rowWidth + childGuiItem.margin.w + childGuiItem.width + childGuiItem.margin.y;
                }
                if (this.data.justifyContent == 'center') {
                    cursorX = (containerGuiItem.width - rowWidth) * 0.5;
                } else if (this.data.justifyContent == 'flexEnd') {
                    cursorX = containerGuiItem.width - rowWidth;
                }
            }
            // then figure out baseline / cursor position on cross Y axis
            if (this.data.alignItems == 'center') {
                cursorY = containerGuiItem.height; // baseline is center
            } else if (this.data.alignItems == 'flexStart') {
                cursorY = 0; // baseline is top of container
            } else if (this.data.alignItems == 'flexEnd') {
                cursorY = containerGuiItem.height; // baseline is bottom of container
            }
        } else if (this.data.flexDirection == 'column') {
            // first figure out cursor position on main Y axis
            if (this.data.justifyContent == 'flexStart') {
                cursorY = 0;
            } else if (this.data.justifyContent == 'center' || this.data.justifyContent == 'flexEnd') {
                var columnHeight = 0;
                for (var i = 0; i < this.children.length; i++) {
                    var childElement = this.children[i];
                    var childGuiItem = childElement.getAttribute("gui-item");
                    columnHeight = columnHeight + childGuiItem.margin.x + childGuiItem.height + childGuiItem.margin.z;
                }
                if (this.data.justifyContent == 'center') {
                    cursorY = (containerGuiItem.height - columnHeight) * 0.5;
                } else if (this.data.justifyContent == 'flexEnd') {
                    cursorY = containerGuiItem.height - columnHeight;
                }
            }
            // then figure out baseline / cursor position on cross X axis
            if (this.data.alignItems == 'flexStart') {
                cursorX = 0; // baseline is left
            } else if (this.data.alignItems == 'center') {
                cursorX = containerGuiItem.width * 0.5; // baseline is center
            } else if (this.data.alignItems == 'flexEnd') {
                cursorX = 0; // baseline is right
            }
        }
        console.log('initial cursor position for ' + this.el.getAttribute("id") + ': ' + cursorX + ' ' + cursorY + ' 0.01');

        // not that cursor positions are determined, loop through and lay out items
        var wrapOffsetX = 0; // not used yet since wrapping isn't supported
        var wrapOffsetY = 0; // not used yet since wrapping isn't supported
        for (var i = 0; i < this.children.length; i++) {
            var childElement = this.children[i];
            // TODO: change this to call gedWidth() and setWidth() of component
            var childPositionX = 0;
            var childPositionY = 0;
            var childPositionZ = 0.01;
            var childGuiItem = childElement.getAttribute("gui-item");

            // now get object position in aframe container cordinates (0, 0 is center)
            if (childGuiItem) {
                if (this.data.flexDirection == 'row') {
                    if (this.data.alignItems == 'center') {
                        childPositionY = 0; // child position is always 0 for center vertical alignment
                    } else if (this.data.alignItems == 'flexStart') {
                        childPositionY = containerGuiItem.height * 0.5 - childGuiItem.margin.x - childGuiItem.height;
                    } else if (this.data.alignItems == 'flexEnd') {
                        childPositionY = -containerGuiItem.height * 0.5 + childGuiItem.margin.z + childGuiItem.height;
                    }
                    childPositionX = -containerGuiItem.width * 0.5 + cursorX + childGuiItem.margin.w + childGuiItem.width * 0.5;
                    cursorX = cursorX + childGuiItem.margin.w + childGuiItem.width + childGuiItem.margin.y;
                } else if (this.data.flexDirection == 'column') {
                    if (this.data.alignItems == 'center') {
                        childPositionX = 0; // child position is always 0 to center
                    } else if (this.data.alignItems == 'flexStart') {
                        childPositionX = -containerGuiItem.width * 0.5 + childGuiItem.margin.w + childGuiItem.width * 0.5;
                    } else if (this.data.alignItems == 'flexEnd') {
                        childPositionX = containerGuiItem.width * 0.5 - childGuiItem.margin.y - childGuiItem.width * 0.5;
                    }
                    childPositionY = containerGuiItem.height * 0.5 - cursorY - -childGuiItem.margin.x - childGuiItem.height * 0.5;
                    cursorY = cursorY + childGuiItem.margin.x + childGuiItem.height + childGuiItem.margin.z;
                }
                console.log('child element position for ' + childElement.id + ': ' + childPositionX + ' ' + childPositionY + ' ' + childPositionZ);
                childElement.setAttribute('position', childPositionX + ' ' + childPositionY + ' ' + childPositionZ);
                childElement.setAttribute('geometry', 'primitive: plane; height: ' + childGuiItem.height + '; width: ' + childGuiItem.width + ';');
                var childFlexContainer = childElement.components['gui-flex-container'];
                if (childFlexContainer) {
                    childFlexContainer.setBackground();
                }
            }
        }
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {},
    getElementSize: function getElementSize() {},
    setBackground: function setBackground() {
        if (this.data.opacity > 0) {
            console.log("panel position: " + JSON.stringify(this.el.getAttribute("position")));
            var guiItem = this.el.getAttribute("gui-item");
            var panelBackground = document.createElement("a-entity");

            panelBackground.setAttribute('geometry', 'primitive: box; height: ' + guiItem.height + '; width: ' + guiItem.width + '; depth:0.025;');
            console.log("about to set panel background color to: : " + this.data.backgroundColor);
            panelBackground.setAttribute('material', 'shader: standard; depthTest: true; opacity: ' + this.data.opacity + '; color: ' + this.data.backgroundColor + ';');
            panelBackground.setAttribute('position', this.el.getAttribute("position").x + ' ' + this.el.getAttribute("position").y + ' ' + (this.el.getAttribute("position").z - 0.0125));
            panelBackground.setAttribute('rotation', this.el.getAttribute("rotation").x + ' ' + this.el.getAttribute("rotation").y + ' ' + this.el.getAttribute("rotation").z);
            this.el.parentNode.insertBefore(panelBackground, this.el);
        }
    }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-icon-button', {
    schema: {
        on: { default: 'click' },
        icon: { type: 'string', default: '' },
        iconActive: { type: 'string', default: '' },
        fontColor: { type: 'string', default: key_offwhite },
        fontFamily: { type: 'string', default: 'Helvetica' },
        borderColor: { type: 'string', default: key_offwhite },
        backgroundColor: { type: 'string', default: key_grey },
        hoverColor: { type: 'string', default: key_grey_dark },
        activeColor: { type: 'string', default: key_orange },
        toggle: { type: 'boolean', default: false }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.height * multiplier; //square
        var canvasHeight = guiItem.height * multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvasIcon');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');
        el.setAttribute('material', 'shader: flat; transparent: true; opacity: 0.5; side:back; color:' + data.backgroundColor + ';');

        drawIcon(ctx, canvas, data.icon, data.fontColor, 1);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', 'primitive: cylinder; radius: ' + guiItem.height / 2 + '; height: 0.02;');
        buttonContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        buttonContainer.setAttribute('rotation', '90 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', 'primitive: cylinder; radius: ' + guiItem.height / 2.05 + '; height: 0.04;');
        buttonEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
        buttonEntity.setAttribute('rotation', '90 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', 'primitive: plane; width: ' + guiItem.height / 2 + '; height: ' + guiItem.height / 2 + ';');
        textEntity.setAttribute('material', 'shader: flat; src: #' + canvas.id + '; transparent: true; opacity: 1; side:front;');
        textEntity.setAttribute('position', '0 0 0.041');
        el.appendChild(textEntity);

        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            if (!data.toggle) {
                buttonEntity.setAttribute('material', 'color', data.backgroundColor);
            }
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            data.toggle = !data.toggle;
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });
    },
    play: function play() {},
    update: function update(oldData) {}
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-icon-label-button', {
    schema: {
        on: { default: 'click' },
        icon: { type: 'string', default: '' },
        iconActive: { type: 'string', default: '' },
        text: { type: 'string', default: 'label' },
        fontColor: { type: 'string', default: key_offwhite },
        fontFamily: { type: 'string', default: 'Helvetica' },
        borderColor: { type: 'string', default: key_offwhite },
        backgroundColor: { type: 'string', default: key_grey },
        hoverColor: { type: 'string', default: key_grey_dark },
        activeColor: { type: 'string', default: key_orange },
        toggle: { type: 'boolean', default: false }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; side:front; color:' + data.backgroundColor + ';');

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', 'primitive: box; width: ' + guiItem.width + '; height: ' + guiItem.height + '; depth: 0.02;');
        buttonContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        buttonContainer.setAttribute('rotation', '0 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', 'primitive: box; width: ' + (guiItem.width - 0.025) + '; height: ' + (guiItem.height - 0.025) + '; depth: 0.04;');
        buttonEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
        buttonEntity.setAttribute('rotation', '0 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;

        var multiplier = 350;

        var iconCanvasWidth = guiItem.height * multiplier; //square
        var iconCanvasHeight = guiItem.height * multiplier;
        var iconCanvas = document.createElement("canvas");
        this.iconCanvas = iconCanvas;
        iconCanvas.setAttribute('width', iconCanvasWidth);
        iconCanvas.setAttribute('height', iconCanvasHeight);
        iconCanvas.id = getUniqueId('canvasIcon');
        document.body.appendChild(iconCanvas);

        var ctxIcon = this.ctxIcon = iconCanvas.getContext('2d');
        drawIcon(ctxIcon, iconCanvas, data.icon, data.fontColor, 1);

        var iconEntityX = -guiItem.width * 0.5 + guiItem.height * 0.5;
        var iconEntity = document.createElement("a-entity");
        iconEntity.setAttribute('geometry', 'primitive: plane; width: ' + guiItem.height / 2 + '; height: ' + guiItem.height / 2 + ';');
        iconEntity.setAttribute('material', 'shader: flat; src: #' + iconCanvas.id + '; transparent: true; opacity: 1; side:front;');
        iconEntity.setAttribute('position', iconEntityX + ' 0 0.041');
        el.appendChild(iconEntity);

        var labelWidth = guiItem.width - guiItem.height;
        var canvasWidth = labelWidth * multiplier;
        var canvasHeight = guiItem.height * multiplier;
        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas;
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvasLabel');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');
        drawLabel(this.ctxLabel, this.labelCanvas, data.text, '100px ' + data.fontFamily, data.fontColor);

        var labelEntityX = guiItem.height * 0.5 - guiItem.width * 0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', 'primitive: plane; width: ' + labelWidth + '; height: ' + guiItem.height / 1.05 + ';');
        labelEntity.setAttribute('material', 'shader: flat; src: #' + labelCanvas.id + '; transparent: true; opacity: 1; side:front;');
        labelEntity.setAttribute('position', labelEntityX + ' 0 0.041');
        el.appendChild(labelEntity);

        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            buttonEntity.setAttribute('material', 'color', data.backgroundColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });
    },
    play: function play() {},
    update: function update(oldData) {}
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-input', {
    schema: {
        on: { default: 'click' },
        inputText: { type: 'string', default: 'Placeholder' },
        fontColor: { type: 'string', default: key_grey_dark },
        fontFamily: { type: 'string', default: 'Helvetica' },
        borderColor: { type: 'string', default: key_grey_dark },
        borderHoverColor: { type: 'string', default: key_grey },
        backgroundColor: { type: 'string', default: key_offwhite },
        hoverColor: { type: 'string', default: key_white },
        activeColor: { type: 'string', default: key_orange },
        toggle: { type: 'boolean', default: false }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.width * multiplier;
        var canvasHeight = guiItem.height * multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; transparent: false; side:front; color:' + data.backgroundColor + ';');

        drawText(ctx, canvas, data.inputText, '100px ' + data.fontFamily, data.fontColor, 1);

        var inputEntity = document.createElement("a-entity");
        inputEntity.setAttribute('geometry', 'primitive: plane; width: ' + guiItem.width / 1.05 + '; height: ' + guiItem.height / 1.05 + ';');
        inputEntity.setAttribute('material', 'shader: flat; src: #' + canvas.id + '; transparent: true; opacity: 1; side:front;');
        inputEntity.setAttribute('position', '0 0 0.01');
        el.appendChild(inputEntity);

        var borderTopEntity = document.createElement("a-entity");
        borderTopEntity.setAttribute('geometry', 'primitive: box; width: ' + guiItem.width + '; height: 0.05; depth: 0.02;');
        borderTopEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        borderTopEntity.setAttribute('position', '0 -' + (guiItem.height / 2 - 0.025) + ' 0.01');
        el.appendChild(borderTopEntity);
        var borderBottomEntity = document.createElement("a-entity");
        borderBottomEntity.setAttribute('geometry', 'primitive: box; width: ' + guiItem.width + '; height: 0.05; depth: 0.02;');
        borderBottomEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        borderBottomEntity.setAttribute('position', '0 ' + (guiItem.height / 2 - 0.025) + ' 0.01');
        el.appendChild(borderBottomEntity);
        var borderLeftEntity = document.createElement("a-entity");
        borderLeftEntity.setAttribute('geometry', 'primitive: box; width: 0.05; height: ' + guiItem.height + '; depth: 0.02;');
        borderLeftEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        borderLeftEntity.setAttribute('position', '-' + (guiItem.width / 2 - 0.025) + ' 0 0.01');
        el.appendChild(borderLeftEntity);
        var borderRightEntity = document.createElement("a-entity");
        borderRightEntity.setAttribute('geometry', 'primitive: box; width: 0.05; height: ' + guiItem.height + '; depth: 0.02;');
        borderRightEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        borderRightEntity.setAttribute('position', guiItem.width / 2 - 0.025 + ' 0 0.01');
        el.appendChild(borderRightEntity);

        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', data.hoverColor);
            borderTopEntity.setAttribute('material', 'color', data.borderHoverColor);
            borderBottomEntity.setAttribute('material', 'color', data.borderHoverColor);
            borderLeftEntity.setAttribute('material', 'color', data.borderHoverColor);
            borderRightEntity.setAttribute('material', 'color', data.borderHoverColor);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('material', 'color', data.backgroundColor);
            borderTopEntity.setAttribute('material', 'color', data.borderColor);
            borderBottomEntity.setAttribute('material', 'color', data.borderColor);
            borderLeftEntity.setAttribute('material', 'color', data.borderColor);
            borderRightEntity.setAttribute('material', 'color', data.borderColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });
    },
    play: function play() {},
    update: function update(oldData) {}
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-interactable', {
    schema: {
        clickAction: { type: 'string' },
        hoverAction: { type: 'string' }
    },
    init: function init() {},
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {}
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-item', {
    schema: {
        type: { type: 'string' },
        width: { type: 'number', default: 1 },
        height: { type: 'number', default: 1 },
        margin: { type: 'vec4', default: '0 0 0 0' }
    },
    init: function init() {},
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {}
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-label', {
    schema: {
        text: { type: 'string', default: 'label text' },
        labelFor: { type: 'selector', default: null },
        fontColor: { type: 'string', default: key_grey_dark },
        fontFamily: { type: 'string', default: 'Helvetica' },
        backgroundColor: { type: 'string', default: key_offwhite }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.width * multiplier;
        var canvasHeight = guiItem.height * multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; side:front; color:' + data.backgroundColor + ';');

        drawText(ctx, canvas, data.text, '100px ' + data.fontFamily, data.fontColor, 1);

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', 'primitive: plane; width: ' + guiItem.width / 1.05 + '; height: ' + guiItem.height / 1.05 + ';');
        textEntity.setAttribute('material', 'shader: flat; src: #' + canvas.id + '; transparent: true; opacity: 1; side:front;');
        textEntity.setAttribute('position', '0 0 0.001');
        el.appendChild(textEntity);

        ////WAI ARIA Support

        if (data.labelFor) {
            // el.setAttribute('role', 'button');
        }
    }
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-progressbar', {
    schema: {
        type: { type: 'string' },
        width: { type: 'number', default: 1 },
        height: { type: 'number', default: 1 },
        backgroundColor: { type: 'string', default: key_grey },
        activeColor: { type: 'string', default: key_orange }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; opacity: 1;  color: ' + data.backgroundColor + '; side:front;');

        var progressMeter = document.createElement("a-entity");
        progressMeter.setAttribute('geometry', 'primitive: box; width: 0.04; height: ' + guiItem.height + '; depth: 0.02;');
        progressMeter.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor);
        progressMeter.setAttribute('position', -guiItem.width / 2 + ' 0 0.01');
        progressMeter.id = "progress_meter";
        el.appendChild(progressMeter);

        // <a-entity id="progress_meter"
        //           geometry="primitive: box; width: 0.04; height: 0.3; depth: 0.004;"
        //           material="shader: flat; opacity: 1; color: blue;"
        //             position="-1.23  0 0.0">
        // </a-entity>
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {}
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-radio', {
    schema: {
        on: { default: 'click' },
        text: { type: 'string', default: 'text' },
        fontColor: { type: 'string', default: key_grey_dark },
        fontFamily: { type: 'string', default: 'Helvetica' },
        hoverColor: { type: 'string', default: key_grey_light },
        color: { type: 'string', default: key_grey },
        borderColor: { type: 'string', default: key_white },
        backgroundColor: { type: 'string', default: key_offwhite },
        activeColor: { type: 'string', default: key_orange },
        opacity: { type: 'number', default: 1.0 },
        active: { type: 'boolean', default: true },
        checked: { type: 'boolean', default: false }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('material', 'shader: flat; depthTest:true;transparent: false; opacity: 1;  color: ' + this.data.backgroundColor + '; side:front;');
        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');

        var radioBoxWidth = 0.50;
        var radioBoxX = -guiItem.width * 0.5 + guiItem.height * 0.5;
        var radioBox = document.createElement("a-cylinder");
        radioBox.setAttribute('radius', '0.17');
        radioBox.setAttribute('height', '0.01');
        radioBox.setAttribute('rotation', '90 0 0');
        radioBox.setAttribute('material', 'color:' + data.color + '; shader: flat;');
        radioBox.setAttribute('position', radioBoxX + ' 0 0');
        el.appendChild(radioBox);

        var radioborder = document.createElement("a-torus");
        radioborder.setAttribute('radius', '0.16');
        radioborder.setAttribute('radius-tubular', '0.01');
        radioborder.setAttribute('rotation', '90 0 0');
        radioborder.setAttribute('material', 'color:' + data.borderColor + '; shader: flat;');
        radioBox.appendChild(radioborder);

        var radioCenter = document.createElement("a-cylinder");
        radioCenter.setAttribute('radius', '0.15');
        radioCenter.setAttribute('height', '0.02');
        radioCenter.setAttribute('rotation', '0 0 0');
        radioCenter.setAttribute('material', 'color:' + data.color + '; shader: flat;');
        radioBox.appendChild(radioCenter);

        var radioColorAnimation = document.createElement("a-animation");
        radioColorAnimation.setAttribute('begin', 'radioAnimation');
        radioColorAnimation.setAttribute('direction', 'alternate');
        radioColorAnimation.setAttribute('attribute', 'material.color');
        radioColorAnimation.setAttribute('from', '' + data.color);
        radioColorAnimation.setAttribute('to', '' + data.activeColor);
        radioColorAnimation.setAttribute('dur', '500');
        radioColorAnimation.setAttribute('easing', 'ease-in-out-cubic');
        radioCenter.appendChild(radioColorAnimation);

        var radioRotationAnimation = document.createElement("a-animation");
        radioRotationAnimation.setAttribute('begin', 'radioAnimation');
        radioRotationAnimation.setAttribute('direction', 'alternate');
        radioRotationAnimation.setAttribute('attribute', 'rotation');
        radioRotationAnimation.setAttribute('from', '0 0 0');
        radioRotationAnimation.setAttribute('to', '-180 0 0');
        radioRotationAnimation.setAttribute('dur', '500');
        radioRotationAnimation.setAttribute('easing', 'ease-in-out-cubic');
        radioCenter.appendChild(radioRotationAnimation);

        var radioShiftOutAnimation = document.createElement("a-animation");
        radioShiftOutAnimation.setAttribute('begin', 'radioAnimation');
        radioShiftOutAnimation.setAttribute('direction', 'normal');
        radioShiftOutAnimation.setAttribute('attribute', 'position');
        radioShiftOutAnimation.setAttribute('from', '0 0 0');
        radioShiftOutAnimation.setAttribute('to', '0 0.3 0 ');
        radioShiftOutAnimation.setAttribute('dur', '300');
        radioShiftOutAnimation.setAttribute('easing', 'ease-in-out-cubic');
        radioCenter.appendChild(radioShiftOutAnimation);

        var radioShiftInAnimation = document.createElement("a-animation");
        radioShiftInAnimation.setAttribute('begin', 'radioAnimation');
        radioShiftInAnimation.setAttribute('direction', 'normal');
        radioShiftInAnimation.setAttribute('attribute', 'position');
        radioShiftInAnimation.setAttribute('from', '0 0.3 0');
        radioShiftInAnimation.setAttribute('to', '0 0 0 ');
        radioShiftInAnimation.setAttribute('delay', '300');
        radioShiftInAnimation.setAttribute('dur', '200');
        radioShiftInAnimation.setAttribute('easing', 'ease-in-out-cubic');
        radioCenter.appendChild(radioShiftInAnimation);

        //        var labelWidth = guiItem.width - radioBoxWidth;
        var labelWidth = guiItem.width - guiItem.height;
        var multiplier = 350;
        var canvasWidth = labelWidth * multiplier;
        var canvasHeight = guiItem.height * multiplier;
        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas;
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvas');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');
        drawLabel(this.ctxLabel, this.labelCanvas, this.data.text, '100px ' + data.fontFamily, this.data.fontColor);

        var labelEntityX = guiItem.height * 0.5 - guiItem.width * 0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', 'primitive: plane; width: ' + labelWidth + '; height: ' + guiItem.height / 1.05 + ';');
        labelEntity.setAttribute('material', 'shader: flat; src: #' + labelCanvas.id + '; transparent: true; opacity: 1;  color: ' + this.data.backgroundColor + '; side:front;');
        labelEntity.setAttribute('position', labelEntityX + ' 0 0.02');
        el.appendChild(labelEntity);

        this.updateToggle(data.active);

        el.addEventListener('mouseenter', function () {
            radioborder.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            radioborder.setAttribute('material', 'color', data.borderColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            data.checked = !data.checked;
            radioColorAnimation.emit('radioAnimation');
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });
    },
    update: function update() {
        var data = this.data;
        this.updateToggle(data.active);
    },

    updateToggle: function updateToggle(active) {

        if (active) {} else {}
    }

});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-slider', {
    schema: {
        percent: { type: 'number', default: '0.5' },
        backgroundColor: { type: 'string', default: key_offwhite },
        barColor: { type: 'string', default: key_grey },
        activeColor: { type: 'string', default: key_orange },
        handleContainerColor: { type: 'string', default: key_grey },
        handleColor: { type: 'string', default: key_white },
        hoverColor: { type: 'string', default: key_grey_light }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');
        el.setAttribute('material', 'shader: flat; opacity: 1;  color: ' + data.backgroundColor + '; side:front;');

        var sliderActiveBar = document.createElement("a-entity");
        sliderActiveBar.setAttribute('geometry', 'primitive: box; width: ' + data.percent * 2 + '; height: 0.05; depth: 0.03;');
        sliderActiveBar.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor + ';');
        sliderActiveBar.setAttribute('position', data.percent - 1 + ' 0 0.02');
        el.appendChild(sliderActiveBar);

        var sliderBar = document.createElement("a-entity");
        sliderBar.setAttribute('geometry', 'primitive: box; width: ' + (2 - data.percent * 2) + '; height: 0.05; depth: 0.03;');
        sliderBar.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.barColor + ';');
        sliderBar.setAttribute('position', data.percent * 1 + ' 0 0.02');
        el.appendChild(sliderBar);

        var handleContainer = document.createElement("a-entity");
        handleContainer.setAttribute('geometry', 'primitive: cylinder; radius: 0.17; height: 0.04;');
        handleContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.handleContainerColor + ';');
        handleContainer.setAttribute('rotation', '90 0 0');
        handleContainer.setAttribute('position', data.percent * 2 - 1 + ' 0 0.03');
        el.appendChild(handleContainer);

        var handle = document.createElement("a-entity");
        handle.setAttribute('geometry', 'primitive: cylinder; radius: 0.13; height: 0.02;');
        handle.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.handleColor + ';');
        handle.setAttribute('position', '0 0.02 0');
        handleContainer.appendChild(handle);

        el.addEventListener('mouseenter', function () {
            handle.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            handle.setAttribute('material', 'color', data.handleColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {}
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-toggle', {
    schema: {
        on: { default: 'click' },
        text: { type: 'string', default: 'text' },
        fontColor: { type: 'string', default: key_grey_dark },
        fontFamily: { type: 'string', default: 'Helvetica' },
        borderColor: { type: 'string', default: key_grey },
        borderWidth: { type: 'number', default: 1 },
        toggleColor: { type: 'string', default: key_offwhite },
        toggleOnColor: { type: 'string', default: key_orange },
        toggleOffColor: { type: 'string', default: key_grey_dark },
        hoverColor: { type: 'string', default: key_grey_light },
        backgroundColor: { type: 'string', default: key_offwhite },
        activeColor: { type: 'string', default: key_orange },
        opacity: { type: 'number', default: 1.0 },
        active: { type: 'boolean', default: true },
        checked: { type: 'boolean', default: false }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('material', 'shader: flat; depthTest:true;transparent: false; opacity: 1;  color: ' + this.data.backgroundColor + '; side:front;');
        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');

        var toggleBoxWidth = guiItem.height / 1.75;
        var toggleBoxX = -guiItem.width * 0.5 + guiItem.height / 2;
        var toggleBox = document.createElement("a-box");
        toggleBox.setAttribute('width', '' + toggleBoxWidth);
        toggleBox.setAttribute('height', '0.35');
        toggleBox.setAttribute('depth', '0.01');
        toggleBox.setAttribute('material', 'color:' + data.toggleOffColor + '; shader: flat;');
        toggleBox.setAttribute('position', toggleBoxX + ' 0 0');
        el.appendChild(toggleBox);

        var toggleColorAnimation = document.createElement("a-animation");
        toggleColorAnimation.setAttribute('begin', 'toggleAnimation');
        toggleColorAnimation.setAttribute('direction', 'alternate');
        toggleColorAnimation.setAttribute('attribute', 'material.color');
        toggleColorAnimation.setAttribute('from', '' + data.toggleOffColor);
        toggleColorAnimation.setAttribute('to', '' + data.toggleOnColor);
        toggleColorAnimation.setAttribute('dur', '500');
        toggleColorAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleBox.appendChild(toggleColorAnimation);

        var toggleHandleWidth = guiItem.height / 6;
        var toggleHandleXStart = -toggleBoxWidth * 0.5 + toggleHandleWidth * 0.5 + 0.05;
        var toggleHandleXEnd = toggleHandleXStart + toggleBoxWidth - toggleHandleWidth - 0.1;
        var toggleHandle = document.createElement("a-box");
        toggleHandle.setAttribute('width', '' + toggleHandleWidth);
        toggleHandle.setAttribute('height', '0.3');
        toggleHandle.setAttribute('depth', '0.02');
        toggleHandle.setAttribute('material', 'color:' + data.toggleColor);
        toggleHandle.setAttribute('position', toggleHandleXStart + ' 0 0.02');
        toggleBox.appendChild(toggleHandle);

        var toggleHandleAnimation = document.createElement("a-animation");
        toggleHandleAnimation.setAttribute('begin', 'toggleAnimation');
        toggleHandleAnimation.setAttribute('direction', 'alternate');
        toggleHandleAnimation.setAttribute('attribute', 'position');
        toggleHandleAnimation.setAttribute('from', toggleHandleXStart + ' 0 0.02');
        toggleHandleAnimation.setAttribute('to', toggleHandleXEnd + ' 0 0.02');
        toggleHandleAnimation.setAttribute('dur', '500');
        toggleHandleAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleHandle.appendChild(toggleHandleAnimation);

        var labelWidth = guiItem.width - guiItem.height;
        var multiplier = 350;
        var canvasWidth = labelWidth * multiplier;
        var canvasHeight = guiItem.height * multiplier;
        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas;
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvas');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');
        drawLabel(this.ctxLabel, this.labelCanvas, this.data.text, '100px ' + data.fontFamily, this.data.fontColor);

        var labelEntityX = guiItem.height * 0.5 - guiItem.width * 0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', 'primitive: plane; width: ' + labelWidth + '; height: ' + guiItem.height / 1.05 + ';');
        labelEntity.setAttribute('material', 'shader: flat; src: #' + labelCanvas.id + '; transparent: true; opacity: 1;  color: ' + this.data.backgroundColor + '; side:front;');
        labelEntity.setAttribute('position', labelEntityX + ' 0 0.02');
        el.appendChild(labelEntity);

        this.updateToggle(data.active);

        el.addEventListener('mouseenter', function () {
            toggleHandle.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            toggleHandle.setAttribute('material', 'color', data.toggleColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            data.checked = !data.checked;
            toggleColorAnimation.emit('toggleAnimation');
            toggleHandleAnimation.emit('toggleAnimation');
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });
    },
    update: function update() {
        var data = this.data;
        this.updateToggle(data.active);
    },

    updateToggle: function updateToggle(active) {

        if (active) {} else {}
    }
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Reset cursor
var cursor = document.querySelector("#cursor");
if (cursor) {
    cursor.addEventListener("stateremoved", function (evt) {
        if (evt.detail.state === 'cursor-fusing') {
            AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
            AFRAME.utils.entity.setComponentProperty(this, "material.color", key_white);
            AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
        }
    });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

// Components
__webpack_require__(0);
__webpack_require__(10);
__webpack_require__(5);
__webpack_require__(11);
__webpack_require__(1);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(15);
__webpack_require__(13);
__webpack_require__(2);
__webpack_require__(12);
__webpack_require__(3);
__webpack_require__(14);
__webpack_require__(8);
__webpack_require__(4);
__webpack_require__(9);
__webpack_require__(16);

/***/ })
/******/ ]);
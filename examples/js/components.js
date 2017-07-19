var normalYPosition = 1.5;
var hiddenYPosition = 1000;

//default colors
var key_orange       = '#ed5b21' // rgb(237, 91, 33) Light orange
var key_orange_light = '#ef8c60' // rgb (239, 140, 96) Extra Light Orange
var key_grey         = '#22252a' // rgb(34, 37, 42) Standard grey
var key_grey_dark    = '#2c3037' // rgb(44, 48, 55) Medium grey
var key_grey_light   = '#606876' // rgb(96, 104, 118) Light grey
var key_offwhite     = '#d3d3d4' // rgb(211, 211, 212) Extra Light grey
var key_white        = '#fff'

//icon font variables
var icon_font = {"alert": "\uf101", "alert-circled": "\uf100", "android-add": "\uf2c7", "android-add-circle": "\uf359", "android-alarm-clock": "\uf35a", "android-alert": "\uf35b", "android-apps": "\uf35c", "android-archive": "\uf2c9", "android-arrow-back": "\uf2ca", "android-arrow-down": "\uf35d", "android-arrow-dropdown": "\uf35f", "android-arrow-dropdown-circle": "\uf35e", "android-arrow-dropleft": "\uf361", "android-arrow-dropleft-circle": "\uf360", "android-arrow-dropright": "\uf363", "android-arrow-dropright-circle": "\uf362", "android-arrow-dropup": "\uf365", "android-arrow-dropup-circle": "\uf364", "android-arrow-forward": "\uf30f", "android-arrow-up": "\uf366", "android-attach": "\uf367", "android-bar": "\uf368", "android-bicycle": "\uf369", "android-boat": "\uf36a", "android-bookmark": "\uf36b", "android-bulb": "\uf36c", "android-bus": "\uf36d", "android-calendar": "\uf2d1", "android-call": "\uf2d2", "android-camera": "\uf2d3", "android-cancel": "\uf36e", "android-car": "\uf36f", "android-cart": "\uf370", "android-chat": "\uf2d4", "android-checkbox": "\uf374", "android-checkbox-blank": "\uf371", "android-checkbox-outline": "\uf373", "android-checkbox-outline-blank": "\uf372", "android-checkmark-circle": "\uf375", "android-clipboard": "\uf376", "android-close": "\uf2d7", "android-cloud": "\uf37a", "android-cloud-circle": "\uf377", "android-cloud-done": "\uf378", "android-cloud-outline": "\uf379", "android-color-palette": "\uf37b", "android-compass": "\uf37c", "android-contact": "\uf2d8", "android-contacts": "\uf2d9", "android-contract": "\uf37d", "android-create": "\uf37e", "android-delete": "\uf37f", "android-desktop": "\uf380", "android-document": "\uf381", "android-done": "\uf383", "android-done-all": "\uf382", "android-download": "\uf2dd", "android-drafts": "\uf384", "android-exit": "\uf385", "android-expand": "\uf386", "android-favorite": "\uf388", "android-favorite-outline": "\uf387", "android-film": "\uf389", "android-folder": "\uf2e0", "android-folder-open": "\uf38a", "android-funnel": "\uf38b", "android-globe": "\uf38c", "android-hand": "\uf2e3", "android-hangout": "\uf38d", "android-happy": "\uf38e", "android-home": "\uf38f", "android-image": "\uf2e4", "android-laptop": "\uf390", "android-list": "\uf391", "android-locate": "\uf2e9", "android-lock": "\uf392", "android-mail": "\uf2eb", "android-map": "\uf393", "android-menu": "\uf394", "android-microphone": "\uf2ec", "android-microphone-off": "\uf395", "android-more-horizontal": "\uf396", "android-more-vertical": "\uf397", "android-navigate": "\uf398", "android-notifications": "\uf39b", "android-notifications-none": "\uf399", "android-notifications-off": "\uf39a", "android-open": "\uf39c", "android-options": "\uf39d", "android-people": "\uf39e", "android-person": "\uf3a0", "android-person-add": "\uf39f", "android-phone-landscape": "\uf3a1", "android-phone-portrait": "\uf3a2", "android-pin": "\uf3a3", "android-plane": "\uf3a4", "android-playstore": "\uf2f0", "android-print": "\uf3a5", "android-radio-button-off": "\uf3a6", "android-radio-button-on": "\uf3a7", "android-refresh": "\uf3a8", "android-remove": "\uf2f4", "android-remove-circle": "\uf3a9", "android-restaurant": "\uf3aa", "android-sad": "\uf3ab", "android-search": "\uf2f5", "android-send": "\uf2f6", "android-settings": "\uf2f7", "android-share": "\uf2f8", "android-share-alt": "\uf3ac", "android-star": "\uf2fc", "android-star-half": "\uf3ad", "android-star-outline": "\uf3ae", "android-stopwatch": "\uf2fd", "android-subway": "\uf3af", "android-sunny": "\uf3b0", "android-sync": "\uf3b1", "android-textsms": "\uf3b2", "android-time": "\uf3b3", "android-train": "\uf3b4", "android-unlock": "\uf3b5", "android-upload": "\uf3b6", "android-volume-down": "\uf3b7", "android-volume-mute": "\uf3b8", "android-volume-off": "\uf3b9", "android-volume-up": "\uf3ba", "android-walk": "\uf3bb", "android-warning": "\uf3bc", "android-watch": "\uf3bd", "android-wifi": "\uf305", "aperture": "\uf313", "archive": "\uf102", "arrow-down-a": "\uf103", "arrow-down-b": "\uf104", "arrow-down-c": "\uf105", "arrow-expand": "\uf25e", "arrow-graph-down-left": "\uf25f", "arrow-graph-down-right": "\uf260", "arrow-graph-up-left": "\uf261", "arrow-graph-up-right": "\uf262", "arrow-left-a": "\uf106", "arrow-left-b": "\uf107", "arrow-left-c": "\uf108", "arrow-move": "\uf263", "arrow-resize": "\uf264", "arrow-return-left": "\uf265", "arrow-return-right": "\uf266", "arrow-right-a": "\uf109", "arrow-right-b": "\uf10a", "arrow-right-c": "\uf10b", "arrow-shrink": "\uf267", "arrow-swap": "\uf268", "arrow-up-a": "\uf10c", "arrow-up-b": "\uf10d", "arrow-up-c": "\uf10e", "asterisk": "\uf314", "at": "\uf10f", "backspace": "\uf3bf", "backspace-outline": "\uf3be", "bag": "\uf110", "battery-charging": "\uf111", "battery-empty": "\uf112", "battery-full": "\uf113", "battery-half": "\uf114", "battery-low": "\uf115", "beaker": "\uf269", "beer": "\uf26a", "bluetooth": "\uf116", "bonfire": "\uf315", "bookmark": "\uf26b", "bowtie": "\uf3c0", "briefcase": "\uf26c", "bug": "\uf2be", "calculator": "\uf26d", "calendar": "\uf117", "camera": "\uf118", "card": "\uf119", "cash": "\uf316", "chatbox": "\uf11b", "chatbox-working": "\uf11a", "chatboxes": "\uf11c", "chatbubble": "\uf11e", "chatbubble-working": "\uf11d", "chatbubbles": "\uf11f", "checkmark": "\uf122", "checkmark-circled": "\uf120", "checkmark-round": "\uf121", "chevron-down": "\uf123", "chevron-left": "\uf124", "chevron-right": "\uf125", "chevron-up": "\uf126", "clipboard": "\uf127", "clock": "\uf26e", "close": "\uf12a", "close-circled": "\uf128", "close-round": "\uf129", "closed-captioning": "\uf317", "cloud": "\uf12b", "code": "\uf271", "code-download": "\uf26f", "code-working": "\uf270", "coffee": "\uf272", "compass": "\uf273", "compose": "\uf12c", "connection-bars": "\uf274", "contrast": "\uf275", "crop": "\uf3c1", "cube": "\uf318", "disc": "\uf12d", "document": "\uf12f", "document-text": "\uf12e", "drag": "\uf130", "earth": "\uf276", "easel": "\uf3c2", "edit": "\uf2bf", "egg": "\uf277", "eject": "\uf131", "email": "\uf132", "email-unread": "\uf3c3", "erlenmeyer-flask": "\uf3c5", "erlenmeyer-flask-bubbles": "\uf3c4", "eye": "\uf133", "eye-disabled": "\uf306", "female": "\uf278", "filing": "\uf134", "film-marker": "\uf135", "fireball": "\uf319", "flag": "\uf279", "flame": "\uf31a", "flash": "\uf137", "flash-off": "\uf136", "folder": "\uf139", "fork": "\uf27a", "fork-repo": "\uf2c0", "forward": "\uf13a", "funnel": "\uf31b", "gear-a": "\uf13d", "gear-b": "\uf13e", "grid": "\uf13f", "hammer": "\uf27b", "happy": "\uf31c", "happy-outline": "\uf3c6", "headphone": "\uf140", "heart": "\uf141", "heart-broken": "\uf31d", "help": "\uf143", "help-buoy": "\uf27c", "help-circled": "\uf142", "home": "\uf144", "icecream": "\uf27d", "image": "\uf147", "images": "\uf148", "information": "\uf14a", "information-circled": "\uf149", "ionic": "\uf14b", "ios-alarm": "\uf3c8", "ios-alarm-outline": "\uf3c7", "ios-albums": "\uf3ca", "ios-albums-outline": "\uf3c9", "ios-americanfootball": "\uf3cc", "ios-americanfootball-outline": "\uf3cb", "ios-analytics": "\uf3ce", "ios-analytics-outline": "\uf3cd", "ios-arrow-back": "\uf3cf", "ios-arrow-down": "\uf3d0", "ios-arrow-forward": "\uf3d1", "ios-arrow-left": "\uf3d2", "ios-arrow-right": "\uf3d3", "ios-arrow-thin-down": "\uf3d4", "ios-arrow-thin-left": "\uf3d5", "ios-arrow-thin-right": "\uf3d6", "ios-arrow-thin-up": "\uf3d7", "ios-arrow-up": "\uf3d8", "ios-at": "\uf3da", "ios-at-outline": "\uf3d9", "ios-barcode": "\uf3dc", "ios-barcode-outline": "\uf3db", "ios-baseball": "\uf3de", "ios-baseball-outline": "\uf3dd", "ios-basketball": "\uf3e0", "ios-basketball-outline": "\uf3df", "ios-bell": "\uf3e2", "ios-bell-outline": "\uf3e1", "ios-body": "\uf3e4", "ios-body-outline": "\uf3e3", "ios-bolt": "\uf3e6", "ios-bolt-outline": "\uf3e5", "ios-book": "\uf3e8", "ios-book-outline": "\uf3e7", "ios-bookmarks": "\uf3ea", "ios-bookmarks-outline": "\uf3e9", "ios-box": "\uf3ec", "ios-box-outline": "\uf3eb", "ios-briefcase": "\uf3ee", "ios-briefcase-outline": "\uf3ed", "ios-browsers": "\uf3f0", "ios-browsers-outline": "\uf3ef", "ios-calculator": "\uf3f2", "ios-calculator-outline": "\uf3f1", "ios-calendar": "\uf3f4", "ios-calendar-outline": "\uf3f3", "ios-camera": "\uf3f6", "ios-camera-outline": "\uf3f5", "ios-cart": "\uf3f8", "ios-cart-outline": "\uf3f7", "ios-chatboxes": "\uf3fa", "ios-chatboxes-outline": "\uf3f9", "ios-chatbubble": "\uf3fc", "ios-chatbubble-outline": "\uf3fb", "ios-checkmark": "\uf3ff", "ios-checkmark-empty": "\uf3fd", "ios-checkmark-outline": "\uf3fe", "ios-circle-filled": "\uf400", "ios-circle-outline": "\uf401", "ios-clock": "\uf403", "ios-clock-outline": "\uf402", "ios-close": "\uf406", "ios-close-empty": "\uf404", "ios-close-outline": "\uf405", "ios-cloud": "\uf40c", "ios-cloud-download": "\uf408", "ios-cloud-download-outline": "\uf407", "ios-cloud-outline": "\uf409", "ios-cloud-upload": "\uf40b", "ios-cloud-upload-outline": "\uf40a", "ios-cloudy": "\uf410", "ios-cloudy-night": "\uf40e", "ios-cloudy-night-outline": "\uf40d", "ios-cloudy-outline": "\uf40f", "ios-cog": "\uf412", "ios-cog-outline": "\uf411", "ios-color-filter": "\uf414", "ios-color-filter-outline": "\uf413", "ios-color-wand": "\uf416", "ios-color-wand-outline": "\uf415", "ios-compose": "\uf418", "ios-compose-outline": "\uf417", "ios-contact": "\uf41a", "ios-contact-outline": "\uf419", "ios-copy": "\uf41c", "ios-copy-outline": "\uf41b", "ios-crop": "\uf41e", "ios-crop-strong": "\uf41d", "ios-download": "\uf420", "ios-download-outline": "\uf41f", "ios-drag": "\uf421", "ios-email": "\uf423", "ios-email-outline": "\uf422", "ios-eye": "\uf425", "ios-eye-outline": "\uf424", "ios-fastforward": "\uf427", "ios-fastforward-outline": "\uf426", "ios-filing": "\uf429", "ios-filing-outline": "\uf428", "ios-film": "\uf42b", "ios-film-outline": "\uf42a", "ios-flag": "\uf42d", "ios-flag-outline": "\uf42c", "ios-flame": "\uf42f", "ios-flame-outline": "\uf42e", "ios-flask": "\uf431", "ios-flask-outline": "\uf430", "ios-flower": "\uf433", "ios-flower-outline": "\uf432", "ios-folder": "\uf435", "ios-folder-outline": "\uf434", "ios-football": "\uf437", "ios-football-outline": "\uf436", "ios-game-controller-a": "\uf439", "ios-game-controller-a-outline": "\uf438", "ios-game-controller-b": "\uf43b", "ios-game-controller-b-outline": "\uf43a", "ios-gear": "\uf43d", "ios-gear-outline": "\uf43c", "ios-glasses": "\uf43f", "ios-glasses-outline": "\uf43e", "ios-grid-view": "\uf441", "ios-grid-view-outline": "\uf440", "ios-heart": "\uf443", "ios-heart-outline": "\uf442", "ios-help": "\uf446", "ios-help-empty": "\uf444", "ios-help-outline": "\uf445", "ios-home": "\uf448", "ios-home-outline": "\uf447", "ios-infinite": "\uf44a", "ios-infinite-outline": "\uf449", "ios-information": "\uf44d", "ios-information-empty": "\uf44b", "ios-information-outline": "\uf44c", "ios-ionic-outline": "\uf44e", "ios-keypad": "\uf450", "ios-keypad-outline": "\uf44f", "ios-lightbulb": "\uf452", "ios-lightbulb-outline": "\uf451", "ios-list": "\uf454", "ios-list-outline": "\uf453", "ios-location": "\uf456", "ios-location-outline": "\uf455", "ios-locked": "\uf458", "ios-locked-outline": "\uf457", "ios-loop": "\uf45a", "ios-loop-strong": "\uf459", "ios-medical": "\uf45c", "ios-medical-outline": "\uf45b", "ios-medkit": "\uf45e", "ios-medkit-outline": "\uf45d", "ios-mic": "\uf461", "ios-mic-off": "\uf45f", "ios-mic-outline": "\uf460", "ios-minus": "\uf464", "ios-minus-empty": "\uf462", "ios-minus-outline": "\uf463", "ios-monitor": "\uf466", "ios-monitor-outline": "\uf465", "ios-moon": "\uf468", "ios-moon-outline": "\uf467", "ios-more": "\uf46a", "ios-more-outline": "\uf469", "ios-musical-note": "\uf46b", "ios-musical-notes": "\uf46c", "ios-navigate": "\uf46e", "ios-navigate-outline": "\uf46d", "ios-nutrition": "\uf470", "ios-nutrition-outline": "\uf46f", "ios-paper": "\uf472", "ios-paper-outline": "\uf471", "ios-paperplane": "\uf474", "ios-paperplane-outline": "\uf473", "ios-partlysunny": "\uf476", "ios-partlysunny-outline": "\uf475", "ios-pause": "\uf478", "ios-pause-outline": "\uf477", "ios-paw": "\uf47a", "ios-paw-outline": "\uf479", "ios-people": "\uf47c", "ios-people-outline": "\uf47b", "ios-person": "\uf47e", "ios-person-outline": "\uf47d", "ios-personadd": "\uf480", "ios-personadd-outline": "\uf47f", "ios-photos": "\uf482", "ios-photos-outline": "\uf481", "ios-pie": "\uf484", "ios-pie-outline": "\uf483", "ios-pint": "\uf486", "ios-pint-outline": "\uf485", "ios-play": "\uf488", "ios-play-outline": "\uf487", "ios-plus": "\uf48b", "ios-plus-empty": "\uf489", "ios-plus-outline": "\uf48a", "ios-pricetag": "\uf48d", "ios-pricetag-outline": "\uf48c", "ios-pricetags": "\uf48f", "ios-pricetags-outline": "\uf48e", "ios-printer": "\uf491", "ios-printer-outline": "\uf490", "ios-pulse": "\uf493", "ios-pulse-strong": "\uf492", "ios-rainy": "\uf495", "ios-rainy-outline": "\uf494", "ios-recording": "\uf497", "ios-recording-outline": "\uf496", "ios-redo": "\uf499", "ios-redo-outline": "\uf498", "ios-refresh": "\uf49c", "ios-refresh-empty": "\uf49a", "ios-refresh-outline": "\uf49b", "ios-reload": "\uf49d", "ios-reverse-camera": "\uf49f", "ios-reverse-camera-outline": "\uf49e", "ios-rewind": "\uf4a1", "ios-rewind-outline": "\uf4a0", "ios-rose": "\uf4a3", "ios-rose-outline": "\uf4a2", "ios-search": "\uf4a5", "ios-search-strong": "\uf4a4", "ios-settings": "\uf4a7", "ios-settings-strong": "\uf4a6", "ios-shuffle": "\uf4a9", "ios-shuffle-strong": "\uf4a8", "ios-skipbackward": "\uf4ab", "ios-skipbackward-outline": "\uf4aa", "ios-skipforward": "\uf4ad", "ios-skipforward-outline": "\uf4ac", "ios-snowy": "\uf4ae", "ios-speedometer": "\uf4b0", "ios-speedometer-outline": "\uf4af", "ios-star": "\uf4b3", "ios-star-half": "\uf4b1", "ios-star-outline": "\uf4b2", "ios-stopwatch": "\uf4b5", "ios-stopwatch-outline": "\uf4b4", "ios-sunny": "\uf4b7", "ios-sunny-outline": "\uf4b6", "ios-telephone": "\uf4b9", "ios-telephone-outline": "\uf4b8", "ios-tennisball": "\uf4bb", "ios-tennisball-outline": "\uf4ba", "ios-thunderstorm": "\uf4bd", "ios-thunderstorm-outline": "\uf4bc", "ios-time": "\uf4bf", "ios-time-outline": "\uf4be", "ios-timer": "\uf4c1", "ios-timer-outline": "\uf4c0", "ios-toggle": "\uf4c3", "ios-toggle-outline": "\uf4c2", "ios-trash": "\uf4c5", "ios-trash-outline": "\uf4c4", "ios-undo": "\uf4c7", "ios-undo-outline": "\uf4c6", "ios-unlocked": "\uf4c9", "ios-unlocked-outline": "\uf4c8", "ios-upload": "\uf4cb", "ios-upload-outline": "\uf4ca", "ios-videocam": "\uf4cd", "ios-videocam-outline": "\uf4cc", "ios-volume-high": "\uf4ce", "ios-volume-low": "\uf4cf", "ios-wineglass": "\uf4d1", "ios-wineglass-outline": "\uf4d0", "ios-world": "\uf4d3", "ios-world-outline": "\uf4d2", "ipad": "\uf1f9", "iphone": "\uf1fa", "ipod": "\uf1fb", "jet": "\uf295", "key": "\uf296", "knife": "\uf297", "laptop": "\uf1fc", "leaf": "\uf1fd", "levels": "\uf298", "lightbulb": "\uf299", "link": "\uf1fe", "load-a": "\uf29a", "load-b": "\uf29b", "load-c": "\uf29c", "load-d": "\uf29d", "location": "\uf1ff", "lock-combination": "\uf4d4", "locked": "\uf200", "log-in": "\uf29e", "log-out": "\uf29f", "loop": "\uf201", "magnet": "\uf2a0", "male": "\uf2a1", "man": "\uf202", "map": "\uf203", "medkit": "\uf2a2", "merge": "\uf33f", "mic-a": "\uf204", "mic-b": "\uf205", "mic-c": "\uf206", "minus": "\uf209", "minus-circled": "\uf207", "minus-round": "\uf208", "model-s": "\uf2c1", "monitor": "\uf20a", "more": "\uf20b", "mouse": "\uf340", "music-note": "\uf20c", "navicon": "\uf20e", "navicon-round": "\uf20d", "navigate": "\uf2a3", "network": "\uf341", "no-smoking": "\uf2c2", "nuclear": "\uf2a4", "outlet": "\uf342", "paintbrush": "\uf4d5", "paintbucket": "\uf4d6", "paper-airplane": "\uf2c3", "paperclip": "\uf20f", "pause": "\uf210", "person": "\uf213", "person-add": "\uf211", "person-stalker": "\uf212", "pie-graph": "\uf2a5", "pin": "\uf2a6", "pinpoint": "\uf2a7", "pizza": "\uf2a8", "plane": "\uf214", "planet": "\uf343", "play": "\uf215", "playstation": "\uf30a", "plus": "\uf218", "plus-circled": "\uf216", "plus-round": "\uf217", "podium": "\uf344", "pound": "\uf219", "power": "\uf2a9", "pricetag": "\uf2aa", "pricetags": "\uf2ab", "printer": "\uf21a", "pull-request": "\uf345", "qr-scanner": "\uf346", "quote": "\uf347", "radio-waves": "\uf2ac", "record": "\uf21b", "refresh": "\uf21c", "reply": "\uf21e", "reply-all": "\uf21d", "ribbon-a": "\uf348", "ribbon-b": "\uf349", "sad": "\uf34a", "sad-outline": "\uf4d7", "scissors": "\uf34b", "search": "\uf21f", "settings": "\uf2ad", "share": "\uf220", "shuffle": "\uf221", "skip-backward": "\uf222", "skip-forward": "\uf223", "social-android": "\uf225", "social-android-outline": "\uf224", "social-angular": "\uf4d9", "social-angular-outline": "\uf4d8", "social-apple": "\uf227", "social-apple-outline": "\uf226", "social-bitcoin": "\uf2af", "social-bitcoin-outline": "\uf2ae", "social-buffer": "\uf229", "social-buffer-outline": "\uf228", "social-chrome": "\uf4db", "social-chrome-outline": "\uf4da", "social-codepen": "\uf4dd", "social-codepen-outline": "\uf4dc", "social-css3": "\uf4df", "social-css3-outline": "\uf4de", "social-designernews": "\uf22b", "social-designernews-outline": "\uf22a", "social-dribbble": "\uf22d", "social-dribbble-outline": "\uf22c", "social-dropbox": "\uf22f", "social-dropbox-outline": "\uf22e", "social-euro": "\uf4e1", "social-euro-outline": "\uf4e0", "social-facebook": "\uf231", "social-facebook-outline": "\uf230", "social-foursquare": "\uf34d", "social-foursquare-outline": "\uf34c", "social-freebsd-devil": "\uf2c4", "social-github": "\uf233", "social-github-outline": "\uf232", "social-google": "\uf34f", "social-google-outline": "\uf34e", "social-googleplus": "\uf235", "social-googleplus-outline": "\uf234", "social-hackernews": "\uf237", "social-hackernews-outline": "\uf236", "social-html5": "\uf4e3", "social-html5-outline": "\uf4e2", "social-instagram": "\uf351", "social-instagram-outline": "\uf350", "social-javascript": "\uf4e5", "social-javascript-outline": "\uf4e4", "social-linkedin": "\uf239", "social-linkedin-outline": "\uf238", "social-markdown": "\uf4e6", "social-nodejs": "\uf4e7", "social-octocat": "\uf4e8", "social-pinterest": "\uf2b1", "social-pinterest-outline": "\uf2b0", "social-python": "\uf4e9", "social-reddit": "\uf23b", "social-reddit-outline": "\uf23a", "social-rss": "\uf23d", "social-rss-outline": "\uf23c", "social-sass": "\uf4ea", "social-skype": "\uf23f", "social-skype-outline": "\uf23e", "social-snapchat": "\uf4ec", "social-snapchat-outline": "\uf4eb", "social-tumblr": "\uf241", "social-tumblr-outline": "\uf240", "social-tux": "\uf2c5", "social-twitch": "\uf4ee", "social-twitch-outline": "\uf4ed", "social-twitter": "\uf243", "social-twitter-outline": "\uf242", "social-usd": "\uf353", "social-usd-outline": "\uf352", "social-vimeo": "\uf245", "social-vimeo-outline": "\uf244", "social-whatsapp": "\uf4f0", "social-whatsapp-outline": "\uf4ef", "social-windows": "\uf247", "social-windows-outline": "\uf246", "social-wordpress": "\uf249", "social-wordpress-outline": "\uf248", "social-yahoo": "\uf24b", "social-yahoo-outline": "\uf24a", "social-yen": "\uf4f2", "social-yen-outline": "\uf4f1", "social-youtube": "\uf24d", "social-youtube-outline": "\uf24c", "soup-can": "\uf4f4", "soup-can-outline": "\uf4f3", "speakerphone": "\uf2b2", "speedometer": "\uf2b3", "spoon": "\uf2b4", "star": "\uf24e", "stats-bars": "\uf2b5", "steam": "\uf30b", "stop": "\uf24f", "thermometer": "\uf2b6", "thumbsdown": "\uf250", "thumbsup": "\uf251", "toggle": "\uf355", "toggle-filled": "\uf354", "transgender": "\uf4f5", "trash-a": "\uf252", "trash-b": "\uf253", "trophy": "\uf356", "tshirt": "\uf4f7", "tshirt-outline": "\uf4f6", "umbrella": "\uf2b7", "university": "\uf357", "unlocked": "\uf254", "upload": "\uf255", "usb": "\uf2b8", "videocamera": "\uf256", "volume-high": "\uf257", "volume-low": "\uf258", "volume-medium": "\uf259", "volume-mute": "\uf25a", "wand": "\uf358", "waterdrop": "\uf25b", "wifi": "\uf25c", "wineglass": "\uf2b9", "woman": "\uf25d", "wrench": "\uf2ba", "xbox": "\uf30c"};

function getUniqueId(stringPrefix) {
    var datestr = new Date().getTime().toString();
    var randomstr = Math.random().toString().replace('.', '');
    return stringPrefix + '_' + datestr + randomstr;
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

AFRAME.registerComponent('gui-item', {
    schema: {
        type: {type: 'string'},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
    },
    init: function () {
    },
    update: function () {
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
});

AFRAME.registerComponent('gui-flex-container', {
  schema: {
      flexDirection: { type: 'string', default: 'row' },
      justifyContent: { type: 'string', default: 'flexStart' },
      alignItems: { type: 'string', default: 'flexStart' },
      itemPadding: { type: 'number', default: 0.0 },
      opacity: { type: 'number', default: 0.0 },
      fontColor: {type: 'string', default: key_offwhite},
      borderColor: {type: 'string', default: key_offwhite},
      backgroundColor: {type: 'string', default: key_grey},
      isTopContainer: {type: 'boolean', default: false},
  },
  init: function () {
      console.log("in aframe-gui-component init for: "+this.el.getAttribute("id"));
      var guiItem = this.el.getAttribute("gui-item");

      if (this.data.isTopContainer) {
          this.setBackground();
      }
      //console.log("container gui-item: "+guiItem);
      
      this.el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
      this.el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.0; color: ${this.data.backgroundColor}; side:back;`);

      this.children = this.el.getChildEntities();
      console.log("childElements: "+this.children);
      console.log("num child Elements: "+this.children.length);

      var cursorX = 0;
      var cursorY = 0;
      if (this.data.flexDirection == 'column') {
          if (this.data.justifyContent == 'flexStart') {
              cursorY = guiItem.height*0.5 - this.data.itemPadding;
          } else if (this.data.justifyContent == 'center') {
              var columnHeight = 0;
              for (var i = 0; i < this.children.length; i++) {
                  if (i > 0) {
                      columnHeight = columnHeight + this.data.itemPadding;
                  }
                  var childElement = this.children[i];
                  var childGuiItem = childElement.getAttribute("gui-item");
                  columnHeight = columnHeight + childGuiItem.height;
              }
              cursorY = columnHeight / 2.0
          }
          if (this.data.alignItems == 'flexStart') {
              // TODO: if alignItems is anything but "center", cursorX will change meaning to be left (flex start) of column instead of center of column.
              // TODO: (cont.) this way when we introduce wrapping it will really be the offset for the next column.
              cursorX = -guiItem.width*0.5 + this.data.itemPadding;
          } else if (this.data.alignItems == 'center') {
              cursorX = 0; // centered implies cursor X  is 0
          }
      } else if (this.data.flexDirection == 'row') {
          if (this.data.justifyContent == 'flexStart') {
              cursorX = -guiItem.width*0.5 + this.data.itemPadding;
          } else if (this.data.justifyContent == 'center') {
              var rowWidth = 0;
              for (var i = 0; i < this.children.length; i++) {
                  if (i > 0) {
                      rowWidth = rowWidth + this.data.itemPadding;
                  }
                  var childElement = this.children[i];
                  var childGuiItem = childElement.getAttribute("gui-item");
                  rowWidth = rowWidth + childGuiItem.width;
              }
              cursorX = rowWidth / 2.0
          }
          if (this.data.alignItems == 'center') {
              cursorY = 0; // centered implies cursor Y  is 0
          } else if (this.data.alignItems == 'flexStart') {
              // TODO: if alignItems is anything but "center", cursorY will change meaning to be top of row instead of center of row.
              // TODO: (cont.) this way when we introduce wrapping it will really be the offset for the next row.
              cursorY = -guiItem.height*0.5 + this.data.itemPadding;
          }
      }
      console.log(`initial cursor position for ${this.el.getAttribute("id")}: ${cursorX} ${cursorY} 0.01`)

	  for (var i = 0; i < this.children.length; i++) {
          var childElement = this.children[i];
          // TODO: change this to call gedWidth() and setWidth() of component
          var childPositionX = 0;
          var childPositionY = 0;
          var childPositionZ = 0.01;
          var childGuiItem = childElement.getAttribute("gui-item");
          //console.log("childElement: "+childElement);
          //console.log("childGuiItem: "+childGuiItem);
		  //console.log("childElement button-text: "+ childElement.getAttribute("button-text"));
          //console.log("childElement data width: "+ childElement.getAttribute("button-text").width);
		  // get object position
          if (childGuiItem) {
              if (this.data.flexDirection == 'column') {
                  if (this.data.justifyContent == 'center') {
                      childPositionX = cursorX; // child position is always 0 to center
                      // TODO: change this in case where child items wrap to 2nd column?
                  } else if (this.data.justifyContent == 'left') {
                      childPositionX = cursorX + childGuiItem.width * 0.5;
                  }
                  var childPositionY = cursorY - childGuiItem.height * 0.5
                  // disable stretch for now
                  /* if (this.data.alignItems == 'stretch') {
                   // stretch width since we are laying out in column
                   childGuiItem.width = guiItem.width - this.data.componentPadding*2;
                   console.log("childElementWidth: "+childGuiItem.width);
                   // TODO: change this to call setWidth() of component
                   } */
                  // going down column so advance cursorY
                  cursorY = cursorY - childGuiItem.height - this.data.itemPadding;
              } else if (this.data.flexDirection == 'row') {
                  if (this.data.alignItems == 'center') {
                      childPositionY = cursorY; // child position is always 0 for center vertical alignment
                  } else if (this.data.alignItems == 'top') {
                      childPositionY = cursorY + childGuiItem.height * 0.5;
                  }
                  var childPositionX = cursorX + childGuiItem.width * 0.5
                  cursorX = cursorX + childGuiItem.width + this.data.itemPadding;
              }
              console.log(`child element position for ${childElement.id}: ${childPositionX} ${childPositionY} ${childPositionZ}`)
              childElement.setAttribute('position', `${childPositionX} ${childPositionY} ${childPositionZ}`)
              childElement.setAttribute('geometry', `primitive: plane; height: ${childGuiItem.height}; width: ${childGuiItem.width};`)
              var childFlexContainer = childElement.components['gui-flex-container']
              if (childFlexContainer) {
                  childFlexContainer.setBackground();
              }
          }
	  }      

  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
  getElementSize: function () {},
    setBackground: function () {
      if (this.data.opacity > 0) {
          console.log("panel position: " + JSON.stringify(this.el.getAttribute("position")));
          var guiItem = this.el.getAttribute("gui-item");
          panelBackground = document.createElement("a-entity");

          panelBackground.setAttribute('geometry', `primitive: box; height: ${guiItem.height}; width: ${guiItem.width}; depth:0.025;`);
          console.log("about to set panel background color to: : " + this.data.backgroundColor);
          panelBackground.setAttribute('material', `shader: standard; depthTest: true; opacity: ${this.data.opacity}; color: ${this.data.backgroundColor};`);
          panelBackground.setAttribute('position', this.el.getAttribute("position").x + ' ' + this.el.getAttribute("position").y + ' ' + (this.el.getAttribute("position").z - 0.0125));
          panelBackground.setAttribute('rotation', this.el.getAttribute("rotation").x + ' ' + this.el.getAttribute("rotation").y + ' ' + this.el.getAttribute("rotation").z);
          this.el.parentNode.insertBefore(panelBackground, this.el);
      }

    },
});


function drawText(ctx, canvas, text, font, color, size) {
    setTimeout(function(){

    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.scale(1, 1);
    ctx.fillText(text, canvas.width/2, canvas.height/2); // position x, y
    
    },500); // callback when font is loaded needed

}

function drawIcon(ctx, canvas, icon, color, size) {
    setTimeout(function(){
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
        if(icon_font[icon]){
            ctx.fillText(icon_font[icon], canvas.width/2, canvas.height/2);
        }else{
            ctx.fillText('?', canvas.width/2, canvas.height/2);
        }

    },500); // callback when font is loaded needed
}


function drawLabel(ctx, canvas, text, font, color, size,) {
    setTimeout(function(){

    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.scale(1, 1);
    ctx.fillText(text, canvas.height/8, canvas.height/2); // position x, y

    },500); // callback when font is loaded needed

}

AFRAME.registerComponent('gui-label', {
    schema: {
        text: {type: 'string', default: 'label text'},
        labelFor: {type: 'selector', default: null},
        fontColor: {type: 'string', default: key_grey_dark},
        fontFamily: {type: 'string', default: 'Helvetica'},
        backgroundColor: {type: 'string', default: key_offwhite},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.width*multiplier;
        var canvasHeight = guiItem.height*multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; side:front; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.text, '100px ' + data.fontFamily, data.fontColor, 1);

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/1.05}; height: ${guiItem.height/1.05};`);
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        textEntity.setAttribute('position', '0 0 0.001');
        el.appendChild(textEntity);

        ////WAI ARIA Support
        
        if(data.labelFor){         
            // el.setAttribute('role', 'button');
        }


    },
});

//  <span class="visuallyhidden">Aria description of element</span>


AFRAME.registerComponent('gui-button', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        fontColor: {type: 'string', default: key_offwhite},
        fontFamily: {type: 'string', default: 'Helvetica'},
        borderColor: {type: 'string', default: key_offwhite},
        backgroundColor: {type: 'string', default: key_grey},
        hoverColor: {type: 'string', default: key_grey_dark},
        activeColor: {type: 'string', default: key_orange},
        toggle: {type: 'boolean', default: false},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.width*multiplier;
        var canvasHeight = guiItem.height*multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:double; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.text, '100px ' + data.fontFamily, data.fontColor, 1);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', `primitive: box; width: ${guiItem.width}; height: ${guiItem.height}; depth: 0.02;`);
        buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        buttonContainer.setAttribute('rotation', '0 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width-0.025)}; height: ${(guiItem.height-0.025)}; depth: 0.04;`);
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        buttonEntity.setAttribute('rotation', '0 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;


        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/1.05}; height: ${guiItem.height/1.05};`);
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        textEntity.setAttribute('position', '0 0 0.041');
        el.appendChild(textEntity);


        ////WAI ARIA Support
        el.setAttribute('role', 'button');


        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            if (!(data.toggle)) {
                buttonEntity.setAttribute('material', 'color', data.backgroundColor);
            }
        });

        el.addEventListener(data.on, function (evt) {
            data.toggle = !(data.toggle);
            buttonEntity.setAttribute('material', 'color', data.activeColor);
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });


    },
    play: function () {

    },
    update: function (oldData) {
        console.log("In button update, toggle: "+this.data.toggle);

    },
    setActiveState: function (activeState) {
        console.log("in setActiveState function");
        this.data.toggle = activeState;
        if (!activeState) {
            this.buttonEntity.setAttribute('material', 'color', this.data.backgroundColor);
        } else {

        }
    },
});

AFRAME.registerComponent('gui-icon-button', {
    schema: {
        on: {default: 'click'},
        icon: {type: 'string', default: ''},
        iconActive: {type: 'string', default: ''},
        fontColor: {type: 'string', default: key_offwhite},
        fontFamily: {type: 'string', default: 'Helvetica'},
        borderColor: {type: 'string', default: key_offwhite},
        backgroundColor: {type: 'string', default: key_grey},
        hoverColor: {type: 'string', default: key_grey_dark},
        activeColor: {type: 'string', default: key_orange},
        toggle: {type: 'boolean', default: false},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.height*multiplier; //square
        var canvasHeight = guiItem.height*multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvasIcon');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:back; color:${data.backgroundColor};`);

        drawIcon(ctx, canvas, data.icon, data.fontColor, 1);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        buttonContainer.setAttribute('rotation', '90 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', `primitive: cylinder; radius: ${(guiItem.height/2.05)}; height: 0.04;`);
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        buttonEntity.setAttribute('rotation', '90 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/2}; height: ${guiItem.height/2};`);
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        textEntity.setAttribute('position', '0 0 0.041');
        el.appendChild(textEntity);


        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            if (!(data.toggle)) {
                buttonEntity.setAttribute('material', 'color', data.backgroundColor);
            }
        });

        el.addEventListener(data.on, function (evt) {
             console.log('I was clicked at: ', evt.detail.intersection.point);
             data.toggle = !(data.toggle);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();

        });


    },
    play: function () {

    },
    update: function (oldData) {
    },
});


AFRAME.registerComponent('gui-icon-label-button', {
    schema: {
        on: {default: 'click'},
        icon: {type: 'string', default: ''},
        iconActive: {type: 'string', default: ''},
        text: {type: 'string', default: 'label'},
        fontColor: {type: 'string', default: key_offwhite},
        fontFamily: {type: 'string', default: 'Helvetica'},
        borderColor: {type: 'string', default: key_offwhite},
        backgroundColor: {type: 'string', default: key_grey},
        hoverColor: {type: 'string', default: key_grey_dark},
        activeColor: {type: 'string', default: key_orange},
        toggle: {type: 'boolean', default: false},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; side:front; color:${data.backgroundColor};`);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', `primitive: box; width: ${guiItem.width}; height: ${guiItem.height}; depth: 0.02;`);
        buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        buttonContainer.setAttribute('rotation', '0 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width-0.025)}; height: ${(guiItem.height-0.025)}; depth: 0.04;`);
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        buttonEntity.setAttribute('rotation', '0 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;

        var multiplier = 350;

        var iconCanvasWidth = guiItem.height*multiplier; //square
        var iconCanvasHeight = guiItem.height*multiplier;
        var iconCanvas = document.createElement("canvas");
        this.iconCanvas = iconCanvas;
        iconCanvas.setAttribute('width', iconCanvasWidth);
        iconCanvas.setAttribute('height', iconCanvasHeight);
        iconCanvas.id = getUniqueId('canvasIcon');
        document.body.appendChild(iconCanvas);

        var ctxIcon = this.ctxIcon = iconCanvas.getContext('2d');
        drawIcon(ctxIcon, iconCanvas, data.icon, data.fontColor, 1);

        var iconEntityX = -guiItem.width*0.5 + guiItem.height*0.5;
        var iconEntity = document.createElement("a-entity");
        iconEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/2}; height: ${guiItem.height/2};`);
        iconEntity.setAttribute('material', `shader: flat; src: #${iconCanvas.id}; transparent: true; opacity: 1; side:front;`);
        iconEntity.setAttribute('position', `${iconEntityX} 0 0.041`);
        el.appendChild(iconEntity);

        var labelWidth = guiItem.width - guiItem.height;
        var canvasWidth = labelWidth*multiplier;
        var canvasHeight = guiItem.height*multiplier;
        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas;
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvasLabel');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');
        drawLabel(this.ctxLabel, this.labelCanvas, data.text, '100px '+ data.fontFamily, data.fontColor);

        var labelEntityX = guiItem.height*0.5 - guiItem.width*0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height/1.05};`);
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1; side:front;`);
        labelEntity.setAttribute('position', `${labelEntityX} 0 0.041`);
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
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });


    },
    play: function () {

    },
    update: function (oldData) {

    },
});


AFRAME.registerComponent('gui-toggle', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        fontColor: {type: 'string', default: key_grey_dark},
        fontFamily: {type: 'string', default: 'Helvetica'},
        borderColor: {type: 'string', default: key_grey},
        borderWidth: {type: 'number', default: 1},
        toggleColor: {type: 'string', default: key_offwhite},
        toggleOnColor: {type: 'string', default: key_orange},
        toggleOffColor: {type: 'string', default: key_grey_dark},
        hoverColor: {type: 'string', default: key_grey_light},
        backgroundColor: {type: 'string', default: key_offwhite},
        activeColor: {type: 'string', default: key_orange},
        opacity: {type: 'number', default: 1.0},
        active: {type: 'boolean', default: true},
        checked: {type: 'boolean', default: false}
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('material', `shader: flat; depthTest:true;transparent: false; opacity: 1;  color: ${this.data.backgroundColor}; side:front;`);
        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);

        var toggleBoxWidth = guiItem.height/1.75;
        var toggleBoxX = -guiItem.width*0.5 + guiItem.height/2;
        var toggleBox = document.createElement("a-box");
        toggleBox.setAttribute('width', `${toggleBoxWidth}`);
        toggleBox.setAttribute('height', '0.35');
        toggleBox.setAttribute('depth', '0.01');
        toggleBox.setAttribute('material', `color:${data.toggleOffColor}; shader: flat;`);
        toggleBox.setAttribute('position', `${toggleBoxX} 0 0`);
        el.appendChild(toggleBox);

        var toggleColorAnimation = document.createElement("a-animation");
        toggleColorAnimation.setAttribute('begin', 'toggleAnimation');
        toggleColorAnimation.setAttribute('direction', 'alternate');
        toggleColorAnimation.setAttribute('attribute', 'material.color');
        toggleColorAnimation.setAttribute('from', `${data.toggleOffColor}`);
        toggleColorAnimation.setAttribute('to', `${data.toggleOnColor}`);
        toggleColorAnimation.setAttribute('dur', '500');
        toggleColorAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleBox.appendChild(toggleColorAnimation);

        var toggleHandleWidth = guiItem.height/6;
        var toggleHandleXStart = -toggleBoxWidth*0.5 + toggleHandleWidth*0.5 + 0.05;
        var toggleHandleXEnd = toggleHandleXStart + toggleBoxWidth - toggleHandleWidth - 0.1;
        var toggleHandle = document.createElement("a-box");
        toggleHandle.setAttribute('width', `${toggleHandleWidth}`);
        toggleHandle.setAttribute('height', '0.3');
        toggleHandle.setAttribute('depth', '0.02');
        toggleHandle.setAttribute('material', `color:${data.toggleColor}`);
        toggleHandle.setAttribute('position', `${toggleHandleXStart} 0 0.02`);
        toggleBox.appendChild(toggleHandle);

        var toggleHandleAnimation = document.createElement("a-animation");
        toggleHandleAnimation.setAttribute('begin', 'toggleAnimation');
        toggleHandleAnimation.setAttribute('direction', 'alternate');
        toggleHandleAnimation.setAttribute('attribute', 'position');
        toggleHandleAnimation.setAttribute('from', `${toggleHandleXStart} 0 0.02`);
        toggleHandleAnimation.setAttribute('to', `${toggleHandleXEnd} 0 0.02`);
        toggleHandleAnimation.setAttribute('dur', '500');
        toggleHandleAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleHandle.appendChild(toggleHandleAnimation);

        var labelWidth = guiItem.width - guiItem.height;
        var multiplier = 350;
        var canvasWidth = labelWidth*multiplier;
        var canvasHeight = guiItem.height*multiplier;
        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvas');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');
        drawLabel(this.ctxLabel, this.labelCanvas, this.data.text, '100px '+ data.fontFamily, this.data.fontColor);


        var labelEntityX = guiItem.height*0.5 - guiItem.width*0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height/1.05};`);
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1;  color: ${this.data.backgroundColor}; side:front;`);
        labelEntity.setAttribute('position', `${labelEntityX} 0 0.02`);
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
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });

    },
    update: function(){
        var data = this.data;
        this.updateToggle(data.active)
    },


    updateToggle: function(active){

        if(active){

        }else{
        }

    },
});


AFRAME.registerComponent('gui-radio', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        fontColor: {type: 'string', default: key_grey_dark},
        fontFamily: {type: 'string', default: 'Helvetica'},
        hoverColor: {type: 'string', default: key_grey_light},
        color: {type: 'string', default: key_grey},
        borderColor: {type: 'string', default: key_white},
        backgroundColor: {type: 'string', default: key_offwhite},
        activeColor: {type: 'string', default: key_orange},
        opacity: {type: 'number', default: 1.0},
        active: {type: 'boolean', default: true},
        checked: {type: 'boolean', default: false}
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('material', `shader: flat; depthTest:true;transparent: false; opacity: 1;  color: ${this.data.backgroundColor}; side:front;`);
        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);

        var radioBoxWidth = 0.50
        var radioBoxX = -guiItem.width*0.5 + guiItem.height*0.5;
        var radioBox = document.createElement("a-cylinder");
        radioBox.setAttribute('radius', '0.17');
        radioBox.setAttribute('height', '0.01');
        radioBox.setAttribute('rotation', '90 0 0');
        radioBox.setAttribute('material', `color:${data.color}; shader: flat;`);
        radioBox.setAttribute('position', `${radioBoxX} 0 0`);
        el.appendChild(radioBox);

        var radioborder = document.createElement("a-torus");
        radioborder.setAttribute('radius', '0.16');
        radioborder.setAttribute('radius-tubular', '0.01');
        radioborder.setAttribute('rotation', '90 0 0');
        radioborder.setAttribute('material', `color:${data.borderColor}; shader: flat;`);
        radioBox.appendChild(radioborder);

        var radioCenter = document.createElement("a-cylinder");
        radioCenter.setAttribute('radius', '0.15');
        radioCenter.setAttribute('height', '0.02');
        radioCenter.setAttribute('rotation', '0 0 0');
        radioCenter.setAttribute('material', `color:${data.color}; shader: flat;`);
        radioBox.appendChild(radioCenter);

        var radioColorAnimation = document.createElement("a-animation");
        radioColorAnimation.setAttribute('begin', 'radioAnimation');
        radioColorAnimation.setAttribute('direction', 'alternate');
        radioColorAnimation.setAttribute('attribute', 'material.color');
        radioColorAnimation.setAttribute('from', `${data.color}`);
        radioColorAnimation.setAttribute('to', `${data.activeColor}`);
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
        var canvasWidth = labelWidth*multiplier;
        var canvasHeight = guiItem.height*multiplier;
        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvas');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');
        drawLabel(this.ctxLabel, this.labelCanvas, this.data.text, '100px '+ data.fontFamily, this.data.fontColor);

        var labelEntityX = guiItem.height*0.5 - guiItem.width*0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height/1.05};`);
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1;  color: ${this.data.backgroundColor}; side:front;`);
        labelEntity.setAttribute('position', `${labelEntityX} 0 0.02`);
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
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });

    },
    update: function(){
        var data = this.data;
        this.updateToggle(data.active)
    },


    updateToggle: function(active){

        if(active){

        }else{
        }

    },


});

AFRAME.registerComponent('gui-circle-loader', {
    schema: {
        count: {type: 'number', default: '100'},
        fontColor: {type: 'string', default: key_grey},
        fontFamily: {type: 'string', default: 'Helvetica'},
        borderColor: {type: 'string', default: key_offwhite},
        backgroundColor: {type: 'string', default: key_grey},
        hoverColor: {type: 'string', default: key_grey_dark},
        activeColor: {type: 'string', default: key_orange},
        toggle: {type: 'boolean', default: false},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.height*multiplier; //square
        var canvasHeight = guiItem.height*multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:back; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.count+'%', '110px ' + data.fontFamily, data.fontColor, 1);

        var loaderContainer = document.createElement("a-entity");
        loaderContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        loaderContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        loaderContainer.setAttribute('rotation', '90 0 0');
        loaderContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(loaderContainer);

        var loaderRing = document.createElement("a-ring");
        loaderRing.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor}`);
        loaderRing.setAttribute('radius-inner', `${guiItem.height/3}`);
        loaderRing.setAttribute('radius-outer', `${guiItem.height/2}`);
        loaderRing.setAttribute('theta-start', '90');
        loaderRing.setAttribute('theta-length', '10'); // this has to count 0 to 360 when loading
        loaderRing.setAttribute('rotation', '0 0 0');
        loaderRing.setAttribute('position', '0 0 0.04');
        loaderRing.id = "loader_ring";
        el.appendChild(loaderRing);

        var countLoaded = document.createElement("a-entity");
        countLoaded.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/1.75}; height: ${guiItem.height/1.75};`);
        countLoaded.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        countLoaded.setAttribute('position', '0 0 0.022');
        countLoaded.id = "loader_ring_count";
        el.appendChild(countLoaded);


    },
    play: function () {

    },
    update: function (oldData) {
    },
});

AFRAME.registerComponent('gui-progressbar', {
    schema: {
        type: {type: 'string'},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        backgroundColor: {type: 'string', default: key_grey},
        activeColor: {type: 'string', default: key_orange}        
    },
    init: function () {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; opacity: 1;  color: ${data.backgroundColor}; side:front;`);


        var progressMeter = document.createElement("a-entity");
        progressMeter.setAttribute('geometry', `primitive: box; width: 0.04; height: ${guiItem.height}; depth: 0.02;`);
        progressMeter.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor}`);
        progressMeter.setAttribute('position', -guiItem.width/2 +' 0 0.01');
        progressMeter.id = "progress_meter";
        el.appendChild(progressMeter);

        // <a-entity id="progress_meter"
        //           geometry="primitive: box; width: 0.04; height: 0.3; depth: 0.004;"
        //           material="shader: flat; opacity: 1; color: blue;"
        //             position="-1.23  0 0.0">
        // </a-entity>

    },
    update: function () {
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
});


AFRAME.registerComponent('gui-circle-timer', {
    schema: {
        countDown: {type: 'number', default: '10'},
        fontColor: {type: 'string', default: key_grey},
        fontFamily: {type: 'string', default: 'Helvetica'},
        borderColor: {type: 'string', default: key_offwhite},
        backgroundColor: {type: 'string', default: key_grey},
        hoverColor: {type: 'string', default: key_grey_dark},
        activeColor: {type: 'string', default: key_orange},
        toggle: {type: 'boolean', default: false},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.height*multiplier; //square
        var canvasHeight = guiItem.height*multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:back; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.countDown, '200px ' + data.fontFamily, data.fontColor, 1);

        var timerContainer = document.createElement("a-entity");
        timerContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        timerContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        timerContainer.setAttribute('rotation', '90 0 0');
        timerContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(timerContainer);

        var timerIndicator1 = document.createElement("a-ring");
        timerIndicator1.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        timerIndicator1.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator1.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator1.setAttribute('theta-start', '-1');
        timerIndicator1.setAttribute('theta-length', '3');
        timerIndicator1.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator1);
        var timerIndicator2 = document.createElement("a-ring");
        timerIndicator2.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        timerIndicator2.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator2.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator2.setAttribute('theta-start', '89');
        timerIndicator2.setAttribute('theta-length', '3');
        timerIndicator2.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator2);
        var timerIndicator3 = document.createElement("a-ring");
        timerIndicator3.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        timerIndicator3.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator3.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator3.setAttribute('theta-start', '179');
        timerIndicator3.setAttribute('theta-length', '3');
        timerIndicator3.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator3);
        var timerIndicator4 = document.createElement("a-ring");
        timerIndicator4.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        timerIndicator4.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator4.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator4.setAttribute('theta-start', '269');
        timerIndicator4.setAttribute('theta-length', '3');
        timerIndicator4.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator4);




        var timerRing = document.createElement("a-ring");
        timerRing.setAttribute('material', `shader: flat; opacity: 0.75; side:double; color: ${data.activeColor}`);
        timerRing.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerRing.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerRing.setAttribute('theta-start', '0');
        timerRing.setAttribute('theta-length', '10'); // this has to increase 0 to 360 when running the countdown
        timerRing.setAttribute('rotation', '0 0 0');
        timerRing.setAttribute('position', '0 0 0.03');
        timerRing.id = "loader_ring";
        el.appendChild(timerRing);

        var countDownLabel = document.createElement("a-entity");
        countDownLabel.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/1.75}; height: ${guiItem.height/1.75};`);
        countDownLabel.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        countDownLabel.setAttribute('position', '0 0 0.022');
        countDownLabel.id = "loader_ring_count";
        el.appendChild(countDownLabel);


    },
    play: function () {

    },
    update: function (oldData) {
    },
});


AFRAME.registerComponent('gui-slider', {
    schema: {
        percent: {type: 'number', default: '0.5'},
        backgroundColor: {type: 'string', default: key_offwhite},
        barColor: {type: 'string', default: key_grey},
        activeColor: {type: 'string', default: key_orange},
        handleContainerColor: {type: 'string', default: key_grey},
        handleColor: {type: 'string', default: key_white},
        hoverColor: {type: 'string', default: key_grey_light},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; opacity: 1;  color: ${data.backgroundColor}; side:front;`);

        var sliderActiveBar = document.createElement("a-entity");
        sliderActiveBar.setAttribute('geometry', `primitive: box; width: ${data.percent*2}; height: 0.05; depth: 0.03;`);
        sliderActiveBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor};`);
        sliderActiveBar.setAttribute('position', `${data.percent-1} 0 0.02`);
        el.appendChild(sliderActiveBar);

        var sliderBar = document.createElement("a-entity");
        sliderBar.setAttribute('geometry', `primitive: box; width: ${2-data.percent*2}; height: 0.05; depth: 0.03;`);
        sliderBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.barColor};`);
        sliderBar.setAttribute('position', `${data.percent*1} 0 0.02`);
        el.appendChild(sliderBar);

        var handleContainer = document.createElement("a-entity");
        handleContainer.setAttribute('geometry', `primitive: cylinder; radius: 0.17; height: 0.04;`);
        handleContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.handleContainerColor};`);
        handleContainer.setAttribute('rotation', '90 0 0');
        handleContainer.setAttribute('position', `${data.percent*2-1} 0 0.03`);
        el.appendChild(handleContainer);

        var handle = document.createElement("a-entity");
        handle.setAttribute('geometry', `primitive: cylinder; radius: 0.13; height: 0.02;`);
        handle.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.handleColor};`);
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
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });


    },
    update: function () {
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
});



AFRAME.registerComponent('gui-input', {
    schema: {
        on: {default: 'click'},
        inputText: {type: 'string', default: 'Placeholder'},
        fontColor: {type: 'string', default: key_grey_dark},
        fontFamily: {type: 'string', default: 'Helvetica'},
        borderColor: {type: 'string', default: key_grey_dark},
        borderHoverColor: {type: 'string', default: key_grey},
        backgroundColor: {type: 'string', default: key_offwhite},
        hoverColor: {type: 'string', default: key_white},
        activeColor: {type: 'string', default: key_orange},
        toggle: {type: 'boolean', default: false},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.width*multiplier;
        var canvasHeight = guiItem.height*multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; transparent: false; side:front; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.inputText, '100px ' + data.fontFamily, data.fontColor, 1);


        var inputEntity = document.createElement("a-entity");
        inputEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/1.05}; height: ${guiItem.height/1.05};`);
        inputEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        inputEntity.setAttribute('position', '0 0 0.01');
        el.appendChild(inputEntity);

        var borderTopEntity = document.createElement("a-entity");
        borderTopEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width)}; height: 0.05; depth: 0.02;`);
        borderTopEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        borderTopEntity.setAttribute('position', `0 -${(guiItem.height/2)-0.025} 0.01`);
        el.appendChild(borderTopEntity);
        var borderBottomEntity = document.createElement("a-entity");
        borderBottomEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width)}; height: 0.05; depth: 0.02;`);
        borderBottomEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        borderBottomEntity.setAttribute('position', `0 ${(guiItem.height/2)-0.025} 0.01`);
        el.appendChild(borderBottomEntity);
        var borderLeftEntity = document.createElement("a-entity");
        borderLeftEntity.setAttribute('geometry', `primitive: box; width: 0.05; height: ${(guiItem.height)}; depth: 0.02;`);
        borderLeftEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        borderLeftEntity.setAttribute('position', `-${(guiItem.width/2)-0.025} 0 0.01`);
        el.appendChild(borderLeftEntity);
        var borderRightEntity = document.createElement("a-entity");
        borderRightEntity.setAttribute('geometry', `primitive: box; width: 0.05; height: ${(guiItem.height)}; depth: 0.02;`);
        borderRightEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        borderRightEntity.setAttribute('position', `${(guiItem.width/2)-0.025} 0 0.01`);
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
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });


    },
    play: function () {

    },
    update: function (oldData) {

    },
});







AFRAME.registerComponent('gui-cursor', {
    schema: {
        cursorColor: {type: 'string', default: key_white},
        cursorActiveColor: {type: 'string', default: key_orange_light},
    },
    init: function () {
        var cursor = this.cursor = this.el.getAttribute('cursor');
        var fuse = cursor.fuse; // true if cursor fuse is enabled.
        var fuseTimeout = cursor.fuseTimeout; // animation lenght should be based on this value
        var defaultHoverAnimationDuration = 400;
        console.log("fuse: "+fuse+", fuseTimeout: "+fuseTimeout);

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
        hoverGuiAnimation.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(hoverGuiAnimation);

        var hoverGuiAnimation2 = document.createElement("a-animation");
        hoverGuiAnimation2.setAttribute('begin', 'hovergui');
        hoverGuiAnimation2.setAttribute('easing', 'linear');
        hoverGuiAnimation2.setAttribute('attribute', 'geometry.radiusOuter');
        hoverGuiAnimation2.setAttribute('fill', 'forwards');
        hoverGuiAnimation2.setAttribute('from', '0.025');
        hoverGuiAnimation2.setAttribute('to', '0.035');
        hoverGuiAnimation2.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(hoverGuiAnimation2);


        var leaveGuiAnimation = document.createElement("a-animation");
        leaveGuiAnimation.setAttribute('begin', 'leavegui');
        leaveGuiAnimation.setAttribute('easing', 'linear');
        leaveGuiAnimation.setAttribute('attribute', 'geometry.radiusInner');
        leaveGuiAnimation.setAttribute('fill', 'forwards');
        leaveGuiAnimation.setAttribute('from', '0.02');
        leaveGuiAnimation.setAttribute('to', '0.000001');
        leaveGuiAnimation.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(leaveGuiAnimation);

        var leaveGuiAnimation2 = document.createElement("a-animation");
        leaveGuiAnimation2.setAttribute('begin', 'leavegui');
        leaveGuiAnimation2.setAttribute('easing', 'linear');
        leaveGuiAnimation2.setAttribute('attribute', 'geometry.radiusOuter');
        leaveGuiAnimation2.setAttribute('fill', 'forwards');
        leaveGuiAnimation2.setAttribute('from', '0.035');
        leaveGuiAnimation2.setAttribute('to', '0.025');
        leaveGuiAnimation2.setAttribute('dur', `${defaultHoverAnimationDuration}`);
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
        fuseColorAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
        fuseColorAnimation.setAttribute('dur', `${fuseAnimationDuration}`);
        this.el.appendChild(fuseColorAnimation);

        var fuseFillAnimation = document.createElement("a-animation");
        fuseFillAnimation.setAttribute('begin', 'cursor-fusing');
        fuseFillAnimation.setAttribute('easing', 'linear');
        fuseFillAnimation.setAttribute('attribute', 'geometry.thetaLength');
        fuseFillAnimation.setAttribute('fill', 'forwards');
        fuseFillAnimation.setAttribute('from', '0');
        fuseFillAnimation.setAttribute('to', '360');
        fuseFillAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
        fuseFillAnimation.setAttribute('dur', `${fuseAnimationDuration}`);
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
            console.log("in gui-cursor mousenter, el: "+el);
            el.emit('hovergui');
        });

        el.addEventListener('mouseleave', function () {
            console.log("in gui-cursor mouseleave, el: "+el);
            el.emit('leavegui');
        });

        //this.el.addEventListener("mouseenter", this.hovergui());
        //this.el.addEventListener("mouseleave", this.leavegui());
        // this.el.addEventListener("stateremoved", this.reset(this.ev)); 

    },
    update: function () {

       
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
    hovergui: function () {
        //this.cursor.emit('hovergui');
    },
    leavegui: function (evt) {
       // this.cursor.emit('leavegui');
    },
    resetcursor: function(){
        if (evt.detail.state === 'cursor-fusing') {
            AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
            AFRAME.utils.entity.setComponentProperty(this, "material.color", "#ffffff");
            AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
        }        
    }
});

AFRAME.registerComponent('gui-interactable', {
    schema: {
        clickAction: {type: 'string'},
        hoverAction: {type: 'string'},
    },
    init: function () {

    },
    update: function () {


    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
});


// Reset cursor
var cursor = document.querySelector("#cursor");
if (cursor) {
  cursor.addEventListener("stateremoved", function (evt) {
    if (evt.detail.state === 'cursor-fusing') {
      AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
      AFRAME.utils.entity.setComponentProperty(this, "material.color", "#ffffff");
      AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
    }
  });
}
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

// Components
require('./scripts/vars.js');
require('./components/item.js');
require('./components/interactable.js');
require('./components/flex-container.js');
require('./components/label.js');
require('./components/button.js');
require('./components/icon-button.js');
require('./components/icon-label-button.js');
require('./components/toggle.js');
require('./components/radio.js');
require('./components/circle-loader.js');
require('./components/progress-bar.js');
require('./components/circle-timer.js');
require('./components/slider.js');
require('./components/vertical-slider.js');
require('./components/input.js');
require('./components/cursor.js');
require('./scripts/reset-cursor.js');

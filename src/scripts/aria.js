/**
 * Here's where the magic happens. Each supported ARIA attribute will be recreated as an aframe component that will add the aframe-aria
 * component to it. This way, the element will be focusable by the cursor which will lead to the screenreader analyzing the element.
 */
var ariaAttributes = [
	'aria-label', 
	'aria-checked', 
	'aria-labelledby', 
	'role'
];

for(var key in ariaAttributes) {
    AFRAME.registerComponent(ariaAttributes[key], {
        schema: { type: 'string' },

        init: function() {
            this.el.setAttribute('aframe-aria', '');
        }
    });
}
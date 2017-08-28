# aframe-gui
Graphical User Interface framework for A-Frame VR

## Use in your AFrame project

Include the following Javascript in the head of the page containing your AFrame scene:

`https://rawgit.com/rdub80/aframe-gui/master/dist/aframe-gui.min.js
`
## Building

Run the following to build to the examples/js folder:

`npm run example`

`npm run example-min`

## Run locally

Run the following start the webpack-dev-server:

`npm start`

The webpack-dev-server should now be running at http://localhost:8080


--- 


## <a-gui-cursor> Component

### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |
| hoverColor  |                                                           | key_white     |
| activeColor |                                                           | key_orange    |
| distance    |                                                           | -1            |
| design      | choose a design: 'dot', 'ring', 'cross' or 'reticle'      | 'dot'         |


```html
		<!-- Camera + cursor. -->
		<a-entity camera>
			<a-entity raycaster="interval: 1000; objects: [gui-interactable]"
					  cursor="fuse: true; fuseTimeout: 2000"
					  gui-cursor="design:reticle;" >
			</a-entity> <!-- /cursor -->
		</a-entity> <!-- /camera -->
```



## <a-gui-button> Component

### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |



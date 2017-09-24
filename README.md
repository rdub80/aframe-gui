# aframe-gui

A graphical User Interface framework for [A-Frame](https://aframe.io).


![](https://lmalave.github.io/aframe-speech-command-component/examples/images/show_hide_menu.png)

The `aframe-gui` components provide layout and gui widgets that can be used
to create a user interface in an A-Frame scene. 

The `dist/aframe-gui.js` file defines the following components:

| Component             | Primitive                | Description |
| --------------------  | ------------------------ | -------------------------------------------------------  |
| gui-button            |  a-gui-button            | Standard button component with text label                |
| gui-circle-loader     | a-gui-circle-loader      | Circular progress meter                                  |
| gui-circle-timer      |  a-gui-circle-timer      | Circular progress meter with timer                       |
| gui-cursor            |   a-gui-cursor           | Cursor used to interact with GUI elements.               |
| gui-flex-container    | a-gui-flex-container     | Layout container with flexbox-inspired     |
| gui-icon-button       | a-gui-icon-button        | Button with icon label instead of text   |
| gui-icon-label-button |  a-gui-icon-label-button | Button with both icon and text labels   |
| gui-input             |  a-gui-input             | Text input field   |
| gui-interactable      |                          | Used by other components to define onclick behavior   |
| gui-item              |                          | Used by other components for common properties like height and width    |
| gui-label             | a-gui-label              | Text label   |
| gui-progress-bar      | a-gui-progress-bar       | Progress bar    |
| gui-radio             | a-gui-radio              | Radio button   |
| gui-slider            |  a-gui-slider            | Slider component   |
| gui-toggle            |  a-gui-toggle            |  Toggle button  |


## Use in your AFrame project

Include the following Javascript in the head of the page containing your AFrame scene:

`https://rawgit.com/rdub80/aframe-gui/master/dist/aframe-gui.min.js
`
## Building

Run the following to build to the examples/js folder:

`npm run dist-example`

`npm run dist-example-min`

## Run locally

Run the following start the webpack-dev-server:

`npm start`

The webpack-dev-server should now be running at http://localhost:8080


## Components


### <a-gui-button> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |




### <a-gui-circle-loader> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |



### <a-gui-circle-timer> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |



### <a-gui-cursor> Component

#### Properties

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


### <a-gui-flex-container> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |



### <a-gui-icon-button> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |



### <a-gui-icon-label-button> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |



### <a-gui-input> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |


### <a-gui-label> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |


### <a-gui-progress-bar> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |


### <a-gui-radio> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |

### <a-gui-slider> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |


### <a-gui-toggle> Component

#### Properties

| Property    | Description                                               | Default Value |
| --------    | -------------------------------------------------------   | ------------- |
| color       |                                                           | key_white     |


//// Global variables used in the program for animation and other stuff.

//// Constants for cases in createFigure ////
const INI_PLOT = 0;																		// Option for plotting the initial figure.
const FIX_PLOT = 1;																		// Option for plotting the fixed dotted image with the original geometry.
const DEF_PLOT = 2;																		// Option for plotting the deformed geometry.
const LAT_PLOT = 3;																		// Option for plotting modified lattices.
const NL_PLOT  = 4;																		// Option for plotting the deformed non-linear geometry.


//// Variables for HTML parts ////
const guicontain = document.getElementById('guidiv');									// Creates an object referencing the container of the controller in the html.
const container  = document.getElementById('render');									// Creates an object referencing the container of the renderer in the html. 
const pnlnfo     = document.getElementById('pnlnfo');									// Creates an object referencing the container of the information panel in the html.


//// Variables for graphics ////
let projector;																			// Creates the THREE element for projecting the image.
let renderer;																			// Creates the THREE element for holding the rendered image.
let controls;																			// Creates the THREE element that gives control functionality to the image.
let camera;																				// Creates the THREE element for visualizing and recalculating the view of the image.
let scene;																				// Creates the THREE element that holds the elements in the renderer.
let stats;																				// Creates the element that tracks the performance of the rendering.


//// Variables for controller ////
let gui;																				// Variable that creates the dat.gui element that will control the parameters.

	
//// Variables used in problem ////
let coors,  coorsNL;																	// Array for holding the coordinates of the drawing (linear and non-linear case).
let conecs, conecsNL;																	// Array for holding the connectivities of the elements (linear and non-linear case).
let deltx,  deltxNL;																	// Array for holding the deformations in case XX (linear and non-linear case).
let delty,  deltyNL;																	// Array for holding the deformations in case YY (linear and non-linear case).
let deltz,  deltzNL;																	// Array for holding the deformations in case ZZ  (linear and non-linear case).
let deltyz, deltyzNL;																	// Array for holding the deformations in case YZ (linear and non-linear case).
let deltxz, deltxzNL;																	// Array for holding the deformations in case XZ (linear and non-linear case).
let deltxy, deltxyNL;																	// Array for holding the deformations in case XY (linear and non-linear case).


//// Variables used in information panel ////
let pnldata;																			// Variable for data to be added as text in the information panel.
let trace1, trace2, trace3, tracePt;													// Variables for defining the different plotsin the information panel.
let layout1, layout2, layout3;															// Layouts for the different plots to be shown.


//// Plot layouts (they are left here for consistency) ////
layout1 = {
	autosize: true,
	font: {family: 'Palanquin', size: 10},
	margin: { t: 10, l: 42, r: 10, b: 35 },
	xaxis: {title: 'PGD modes'},
	yaxis: {title: 'Modal amplitudes (Bm)', type: 'log'}
};

layout2 = {
	autosize: true,
	font: {family: 'Palanquin', size: 11},
	margin: { t: 10, l: 0, r: 0, b: 20 },	
	xaxis: {title: '\\alpha', range: [45 ,135], autorange: false, tickmode: 'linear', tick0: 45,  dtick: 15},
	yaxis: {title: 'a', range: [0.3,0.7], autorange: false, tickmode: 'linear', tick0: 0.3, dtick: 0.1}
};

layout3 = {
	autosize: true,
	font: {family: 'Palanquin', size: 11},
	margin: { t: 10, l: 42, r: 10, b: 35 },
	xaxis: {title: 'Parameter'},
	yaxis: {title: 'Modal function (Gm)'}
};


//// Point definition of the plots ////
tracePt = {
	x: [0],
	y: [0],
	z: [0],
	type: 'scatter3d',
	mode: 'markers',
	marker: {
	  color: 'rgb(255, 0, 0)',
	  size: 8
	}
};
// function onWindowResize()
//
// @Descr Adjusts image size and appearance when window size is altered.
function onWindowResize()
{
	if (_3DPROBL){																															// Updates the size of the camera to avoid distortion.
		camera.left  = -1.5 * Rfigure * container.clientWidth / container.clientHeight;														// In the 3D case, the camera is orthographic, so in order to change proportions, left and right
		camera.right =  1.5 * Rfigure * container.clientWidth / container.clientHeight;														// side of the camera fustrum should be update (see THREE documentation for more information).
	} else {
		camera.aspect = container.clientWidth / container.clientHeight;																		// In the 2D case, perspective camera only calls for an update of the camera aspect.
	}																																		// In both cases, the values are dependent on the container size.
	
	camera.updateProjectionMatrix();																										// Updates the values of the camera.
	
	renderer.setSize(container.clientWidth, container.clientHeight);																		// Resizes the renderer to the one given by the window.
	gui.width = guicontain.clientWidth;																										// Sets the controller width to the one given by the container.
}																																			// Both renderer and controller sizes are defined as percentages of the screen size, hence the update.


// function panelCreate()
//
// @Descr Creates and opens the information panel to the left.
function panelCreate() {
	
	if (pnlnfo === null) {																													// In the case that the HTML element holding the panel does not exists:
		$("body").append('<div id="pnlnfo"> </div>');																						// jQuery is used to insert a new element in the HTML for holding the panel.
		$("#pnlnfo").append('<a id="closePnl" href="#" onclick="panelClose()">x</a>');														// In the recently added panel div, the close button is added.
		$("#pnlnfo").append('<div id="pnldata"> <div id="pnlnm"></div> <div id="pnlplot1"></div> <div id="pnlplot2"></div> </div>');		// Also, in the panel div, the space for the data and plots is added, both empty.
	}

	$("#pnlnfo").addClass("collapse");																										// Class 'collapse' is added to the panel. CSS file dictates that when collapse class is there, the panel should
}																																			// not be visible.


// function panelOpen()
//
// @Descr Creates and opens the information panel to the left.
function panelOpen() {
	
	$("#render").addClass("collapse");																										// Collapse class added to render. CSS changes the size of the render container when the class is present.
	$("#iholder").addClass("collapse");																										// Collapse class added to iholder, creates the same effect. In the HTML, iholder is the div that contains both the
	$("#pnlnfo").removeClass("collapse");																									// render and controller. The collapse class of the panel is removed, making it visible.
	
	if (_3DPROBL) {
		camera.left  = -1.5 * Rfigure * $("#render").innerWidth() / $("#render").innerHeight();												// Camera values are updated since the container is being resized, same as it is done before.
		camera.right =  1.5 * Rfigure * $("#render").innerWidth() / $("#render").innerHeight();
	} else {
		camera.aspect = $("#render").innerWidth() / $("#render").innerHeight();
	}
	
	camera.updateProjectionMatrix();																										// Updates the values of the camera.
	
	renderer.setSize($("#render").innerWidth(), $("#render").innerHeight());																// Sets the size of the renderer, now with values given from the container and not the window.	
}


// function panelClose()
//
// @Descr Closes panel when the button is clicked.
function panelClose() {
	
	$("#render").removeClass("collapse");																									// Collapse class is removed from the render. Opposite effect of the function above happens.
	$("#iholder").removeClass("collapse");																									// Collapse class removed from iholder.
	
	$("#pnlnfo").addClass("collapse");																										// Class 'collapse' is added to the panel. Panel now is set to non visible.
	
	if (_3DPROBL) {
		camera.left  = -1.5 * Rfigure * $("#render").innerWidth() / $("#render").innerHeight();												// Camera values are updated since the container is being resized, same as it is done before.
		camera.right =  1.5 * Rfigure * $("#render").innerWidth() / $("#render").innerHeight();
	} else {
		camera.aspect = $("#render").innerWidth() / $("#render").innerHeight();
	}
	
	camera.updateProjectionMatrix();																										// Updates the values of the camera.

	renderer.setSize($("#render").innerWidth(), $("#render").innerHeight());																// Sets the size of the renderer, now with values given from the container and not the window.	
}


// function panelLoad()
//
// @Descr Loads the information into the panel.
function panelLoad(thing) {
	$('#pnlnm').empty();																													// Any data existing in the div pnlnm is deleted.
	$('#pnlnm').append(thing);																												// New values are injected in the div pnlnm.
}


// function centerCoords()
//
// @Descr centers the coordinates of the image displayed.
function centerCoords() {
	xmax = coors[0][0];																														// Maximum and Minimum coordinates are set in order to find the center of all the coordinates in the figure.
	xmin = coors[0][0];																														// Since the values are not known in the beginnning, both maximum and minimum coordinates are set to
	ymax = coors[0][1];																														// the first node of the figure.
	ymin = coors[0][1];																			
	
	if (_3DPROBL) {
		zmax = coors[0][2];																													// Additional coordinates computation in case of a 3D case.
		zmin = coors[0][2];
	}
	
	for (var ii = 1; ii < NUM_NODES; ii++) {
		if (coors[ii][0] > xmax) xmax = coors[ii][0];																						// To find the mimimum and maximum values of the coordinates, the loop iterates through all the nodes.
		if (coors[ii][0] < xmin) xmin = coors[ii][0];																						// If the new coordinate is bigger than the maximum already set, it replaces the value.
		if (coors[ii][1] > ymax) ymax = coors[ii][1];																						// If the new coordinate is lower than the minimum already set, it replaces the value.
		if (coors[ii][1] < ymin) ymin = coors[ii][1];																						// Any other case leaves the coordinates unchanged.
		
		if (_3DPROBL) {
			if (coors[ii][2] > zmax) zmax = coors[ii][2];																					// Additional coordinates computation in case of a 3D case.
			if (coors[ii][2] < zmin) zmin = coors[ii][2];
		}
	}
	
	xc = (xmax + xmin) / 2;																													// After maximum and minimum values are set, the center is computed as a simple average between
	yc = (ymax + ymin) / 2;																													// both highest and lowest values.
	
	if (_3DPROBL) 
		zc = (zmax + zmin) / 2;																												// Additional coordinates computation in case of a 3D case.
	
	for (var ii = 0; ii < NUM_NODES; ii++) {																								// Looping again over all the nodes.
		coors[ii][0] = coors[ii][0] - xc;																									// All the nodes are shifted an amount from their normal position, corresponding to the central value computad.
		coors[ii][1] = coors[ii][1] - yc;																									// This centers the image in the camera.
		
		if (_3DPROBL) 
			coors[ii][2] = coors[ii][2] - zc;																								// Additional coordinates computation in case of a 3D case.
	}
	
	
}


// function centerFigure()
//
// @Descr recenters image displayed in the camera.
function centerFigure() {
	centerCoords();
	
	if (_3DPROBL) Rfigure = Math.sqrt((xmax - xc) * (xmax - xc) + (ymax - yc) * (ymax - yc) + (zmax - zc) * (zmax - zc));					// It defines the radius of the figure, meaning, describes the circle that circumscribes 
	else      Rfigure = Math.sqrt((xmax - xc) * (xmax - xc) + (ymax - yc) * (ymax - yc));													// the cell or pattern. It is used in order to define the position of the camera.
	
	if (_3DPROBL) {																															// In the 3D case, an orthographic camera is set in order to not have perspective deformation.
		camera = new THREE.OrthographicCamera(-1.5*Rfigure*$("#render").innerWidth() / $("#render").innerHeight(), 
											   1.5*Rfigure*$("#render").innerWidth() / $("#render").innerHeight(), 
											   1.5*Rfigure, -1.5*Rfigure, 1, 1000);
		camera.position.set(Rfigure, Rfigure, Rfigure);																						// Sets the position of the camera from a point shifted equally from the origin. In this case, the camera
		camera.up = new THREE.Vector3(0, 0, 1);																								// position and definition depends on the container, instead of the window, as was defined in init().
		camera.lookAt(0,0,0);
	
	} else {
		camera = new THREE.PerspectiveCamera(10, $("#render").innerWidth() / $("#render").innerHeight(), 1, 1);								// In the 2D case, a perspective camera is defined, since it is defined easier.
		camera.position.set(0.0, 0.0, 15 * Rfigure);																						// Sets the position of the camera at the origin, with a certain height (Z parameter). Again, everything is
		camera.up = new THREE.Vector3(0, 0, 1);																								// defined based on the container and not the window.
	}
	
	if (_3DPROBL) {																															// Controls element needs to be recreated, defined by the new camera.
		controls             = new THREE.OrbitControls(camera, renderer.domElement);														// Set controls panning as horizontal.
		controls.panningMode = THREE.HorizontalPanning;
	} else {
		controls               = new THREE.OrbitControls(camera, renderer.domElement);
		controls.panningMode   = THREE.HorizontalPanning;																					// Set controls panning as horizontal.
		controls.maxPolarAngle = 0;																											// In 2D, setting max and min polar angle prevents the camera from rotating in a plane outside the XY.
		controls.minPolarAngle = 0;		
	}
}


// function updateBtn()
//
// @Descr Gives the functionality to the update button to recreate plot2.
function updateBtn() {
	$("#updateBtn").removeClass("changed");
	calcNuSurf();
}


// function trackChanges()
//
// @Descr Checks if any of the slider values is changed.
function trackChanges(arr) {
	let chk_a, chk_b, chk_al, chk_phi, chk_t, chk_fx, chk_fy, chk_f;
	
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == 'a')     chk_a   = true;
		if (arr[i] == 'b')     chk_b   = true;
		if (arr[i] == 'alpha') chk_al  = true;
		if (arr[i] == 'phi')   chk_phi = true;
		if (arr[i] == 't')     chk_t   = true;
		if (arr[i] == 'fx')    chk_fx  = true;
		if (arr[i] == 'fy')    chk_fy  = true;
		if (arr[i] == 'f')     chk_a   = true;
	}
	
	let chg = 0;
	
	if(chk_b)   chg += B_PM   - Math.round((slider.b - 1)      * 50/0.5);
	if(chk_a)   chg += A_PM   - Math.round((slider.a - 0.3)    * 50/0.4);
	if(chk_al)  chg += AL_PM  - Math.round((slider.alpha - 45) * 90/90);
	if(chk_phi) chg += PHI_PM - Math.round((slider.phi - 0.75) * 50/1.25);
	if(chk_t)   chg += T_PM   - Math.round((slider.t - 0.01)   * 50/0.09);
	if(chk_fx)  chg += FX_PM  - Math.round((slider.defx - 1));
	if(chk_fy)  chg += FY_PM  - Math.round((slider.defy - 1));
	if(chk_f)   chg += F_PM   - Math.round((slider.defy - 1));
	
	if (chg != 0)
		$("#updateBtn").addClass("changed");
}
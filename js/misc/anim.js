//// Core of functions needed for the visualization and animation of the graphics.
//// Contains the functions init() and animate(), which are defined in the THREE library and perform the basic instructions.
//// This file should not be modified, unless new functionability wants to be added.

//// Variables for graphical elements ////
// Variables used when controller is needed
if (_CONTROL) { gui = new dat.GUI({ autoPlace: false, closeOnTop: true, width: guicontain.clientWidth }); }					// Creates the controller object. Parameters given set the position and size of the elements on it.;

// Variables used when graphics are needed
if (_GRAPHIC) {
	projector  = new THREE.Projector();																						// Creates the THREE object projector. The variable is defined in the caseName file.
	renderer   = new THREE.CanvasRenderer();																				// Creates the THREE object renderer. The variable is defined in the caseName file. 
	scene      = new THREE.Scene();																							// Creates the THREE object scene. The variable is defined in the caseName file.
	
	if (_STATPNL) { stats  = new Stats(); }																					// Creates a new instance of the Stats element.
	
// Variables used in problem
	if (_NEWCORS) { coors  = new Array(COORS_T.length); }
	if (_NEWCONN) { conecs = new Array(CONNECT.length); }
	if (_DEFORMS) { deltx  = new Array(COORS_T.length); }
	if (_DEFORMS) { delty  = new Array(COORS_T.length); }
	if (_DSHEARS) { deltxy = new Array(COORS_T.length); }
	if (_NEWCORS && _NONLINR) { coorsNL  = new Array(COORS_TNL.length); }
	if (_NEWCONN && _NONLINR) { conecsNL = new Array(CONNECT.length); }
	if (_DEFORMS && _3DPROBL) { deltz    = new Array(COORS_T.length); }
	if (_DSHEARS && _3DPROBL) { deltyz   = new Array(COORS_T.length); }
	if (_DSHEARS && _3DPROBL) { deltxz   = new Array(COORS_T.length); }
	if (_DEFORMS && _NONLINR) { deltxNL  = new Array(COORS_TNL.length); }
	if (_DEFORMS && _NONLINR) { deltyNL  = new Array(COORS_TNL.length); }
	if (_DSHEARS && _NONLINR) { deltxyNL = new Array(COORS_TNL.length); }
	if (_DEFORMS && _NONLINR && _3DPROBL) { deltzNL  = new Array(COORS_TNL.length); }
	if (_DSHEARS && _NONLINR && _3DPROBL) { deltxzNL = new Array(COORS_TNL.length); }
	if (_DSHEARS && _NONLINR && _3DPROBL) { deltyzNL = new Array(COORS_TNL.length); }
}




//// Functions of the library////
// function init()
//
// @descr Initialize the properties for the animation.
function init() {
	if (_GRAPHIC) {
		//// Initialization of THREE variables ////
		//// SCENE ////
		scene.background = new THREE.Color( 0xffffff );																			// Adds a white background to the scene.
		
		
		//// RENDERER ////
		renderer.setSize(container.offsetWidth, container.offsetHeight);														// Sets the size of the renderer. Arguments passed are width and height of the container.
		container.appendChild(renderer.domElement);																				// Inserts the renderer in the container.
		
		
		//// EVENTS ////
		window.addEventListener('resize', onWindowResize, false);																// Sets the window event for rezising. In case of resizing the browser, calls the function onWindowResize().
	}
	
	
	if (_CONTROL) {
		//// CONTROLLER ////
		guicontain.appendChild(gui.domElement);																					// Inserts the controller into the container.
		createGUI();																											// Initializes the function defined in the caseName file.	
	}
	
	
	if (_STATPNL) {
		// STATS
		stats.domElement.style.position = 'absolute';																			// Sets a position property in the html object.
		stats.domElement.id = "stati";																							// Gives an id to the html object.
		container.appendChild(stats.domElement);																				// Inserts the stats in the container.
	}
	
	
	
	//// Initialization of other variables ////
	// Not al variables are used in every case. When one is needed, it is defined as an empty array in the header of the main caseName file. Every if condition in here checks if the variable
	// was initialized or not, and if it is, it populates it with the corresponding values. This wayof defining ensures that the variables are global, as well as saving resources from unnecesary variables.
	if (_NEWCORS && _NONLINR) {
		for (var i = 0; i < COORS_TNL.length; i++)																				// coorsNL is defined in the same way as coors,but considering the non-linear case.
			coorsNL[i] = COORS_TNL[i].slice();																					// At the moment is only used for the case of non-linear 2D lattice.
	}
	
	if (_NEWCONN) {
		for (var i = 0; i < CONNECT.length; i++)																				// conecs is a dummy variable initialized as a copy of CONNECT, the connectivity matrix. It is used to update the
			conecs[i] = CONNECT[i].slice();																						// connectivity matrix when new lattices are defined, leaving CONNECT as the original one.
	}
	
	if (_NEWCONN  && _NONLINR) {
		for (var i = 0; i < CONNECT.length; i++)																				// Same case as before with coorsNL. In the 2D non-linear lattice, there are two different deformations being shown
			conecsNL[i] = CONNECTNL[i].slice();																					// simultaneously, which calls for two coordinate and two connectivity matrices.
	}
	
	if (_DEFORMS) {
		for (var i = 0; i < COORS_T.length; i++) {																				// Looping through all the nodes.
			if(_3DPROBL) {																											// This initializes the deformation matrix that will be added to the coordinates in order to display the deformated
				deltx[i]  = new Array(6).fill(0);																				// case. In the 2D case, it defines a matrix for cases X, Y and XY. For 3D depends on the case: if there are six
				delty[i]  = new Array(6).fill(0);																				// deformations defined, initializes them (homogenization case). When there is work with lattices, it only initializes
				deltz[i]  = new Array(6).fill(0);																				// the three main cases X, Y and Z.
				
				if (_DSHEARS) {
					deltyz[i] = new Array(6).fill(0);
					deltxz[i] = new Array(6).fill(0);
					deltxy[i] = new Array(6).fill(0);
				}
			} else {
				deltx[i]  = new Array(3).fill(0);
				delty[i]  = new Array(3).fill(0);
				
				if (_DSHEARS)
					deltxy[i] = new Array(3).fill(0);
			}
		}
	}
	
	if (_DEFORMS && _NONLINR) {															
		for (var i = 0; i < COORS_TNL.length; i++) {																			// Same as before, initializes the deformations for the non-linear cases.
			deltxNL[i]  = new Array(3).fill(0);
			deltyNL[i]  = new Array(3).fill(0);
			
			if (_DSHEARS)
				deltxyNL[i] = new Array(3).fill(0);
		}
	}
	
	
	
	//// Initialization of coordinates ////
	if (_GRAPHIC) {
		xmax = COORS_T[0][0];																									// Maximum and Minimum coordinates are set in order to find the center of all the coordinates in the figure.
		xmin = COORS_T[0][0];																									// Since the values are not known in the beginnning, both maximum and minimum coordinates are set to
		ymax = COORS_T[0][1];																									// the first node of the figure.
		ymin = COORS_T[0][1];																									// COORS_T correspond to the original coordinates of the figure, so they are used only here or if original plot is required.
	
		if (_3DPROBL) {
			zmax = COORS_T[0][2];																								// Additional coordinates computation in case of a 3D case.
			zmin = COORS_T[0][2];																		
		}
		
		for (var ii = 0; ii < NUM_NODES; ii++) {																				// To find the mimimum and maximum values of the coordinates, the loop iterates through all the nodes.
			if (COORS_T[ii][0] > xmax) xmax = COORS_T[ii][0];																	// If the new coordinate is bigger than the maximum already set, it replaces the value.
			if (COORS_T[ii][0] < xmin) xmin = COORS_T[ii][0];																	// If the new coordinate is lower than the minimum already set, it replaces the value.
			if (COORS_T[ii][1] > ymax) ymax = COORS_T[ii][1];																	// Any other case leaves the coordinates unchanged.
			if (COORS_T[ii][1] < ymin) ymin = COORS_T[ii][1];											
			
			if (_3DPROBL) {
				if (COORS_T[ii][2] > zmax) zmax = COORS_T[ii][2];																// Additional coordinates computation in case of a 3D case.
				if (COORS_T[ii][2] < zmin) zmin = COORS_T[ii][2];
			}
		}
		
		xc = (xmax + xmin) / 2;																									// After maximum and minimum values are set, the center is computed as a simple average between
		yc = (ymax + ymin) / 2;																									// both highest and lowest values.
		
		if (_3DPROBL) 
			zc = (zmax + zmin) / 2;																								// Additional coordinates computation in case of a 3D case.
		
		for (var ii = 0; ii < NUM_NODES; ii++) {																				// Looping again over all the nodes.
			COORS_T[ii][0] = COORS_T[ii][0] - xc;																				// All the nodes are shifted an amount from their normal position, corresponding to the central value computad.
			COORS_T[ii][1] = COORS_T[ii][1] - yc;																				// This centers the image in the camera.
			
			if (_3DPROBL) 
				COORS_T[ii][2] = COORS_T[ii][2] - zc;																			// Additional coordinates computation in case of a 3D case.
		}

		if (_3DPROBL) Rfigure = Math.sqrt((xmax - xc) * (xmax - xc) + (ymax - yc) * (ymax - yc) + (zmax - zc) * (zmax - zc));	// It defines the radius of the figure, meaning, describes the circle that circumscribes 
		else          Rfigure = Math.sqrt((xmax - xc) * (xmax - xc) + (ymax - yc) * (ymax - yc));								// the cell or pattern. It is used in order to define the position of the camera.
		
		if (_NEWCORS) {
			for (var i = 0; i < COORS_T.length; i++)																			// coors is a dummy variable that it's initialized as a copy of COORS_T. It is used later to update the values
				coors[i] = COORS_T[i].slice();																					// of the coordinate matrix, leaving COORS_T as the original, undeformed coordinates matrix.
		}

		
		
		//// Visualization and control definitions ////
		//// CAMERA ////
		if (_3DPROBL) {																											// In the 3D case, an orthographic camera is set in order to not have perspective deformation.
			camera = new THREE.OrthographicCamera(-1.5*Rfigure*container.clientWidth / container.clientHeight, 1.5*Rfigure*container.clientWidth / container.clientHeight, 1.5*Rfigure, -1.5*Rfigure, 1, 1000);
			camera.position.set(Rfigure, Rfigure, Rfigure);																		// Sets the position of the camera from a point shifted equally from the origin.
			camera.up = new THREE.Vector3(0, 0, 1);																				// Tells the camera that Z axis is the vertical coordinate.
			camera.lookAt(scene.position);																						// Tells the camera to start looking at the position set.
		
		} else {
			camera = new THREE.PerspectiveCamera(10, container.clientWidth / container.clientHeight, 1, 1);						// In the 2D case, a perspective camera is defined, since it is defined easier.
			camera.position.set(0.0, 0.0, 15 * Rfigure);																		// Sets the position of the camera at the origin, with a certain height (Z parameter).
			camera.up = new THREE.Vector3(0, 0, 1);																				// Tells the camera that Z axis is the vertical coordinate (given the camera position, out of plane direction).
		}
		
		
		//// ORBIT CONTROLS ////
		if (_3DPROBL) {
			controls             = new THREE.OrbitControls(camera, renderer.domElement);										// Creates the THREE object controls, that allows the movement of the camera with mouse or finger scrolling.;
			controls.panningMode = THREE.HorizontalPanning;																		// Set controls panning as horizontal.
		} else {
			controls               = new THREE.OrbitControls(camera, renderer.domElement);										// Creates the THREE object controls, that allows the movement of the camera with mouse or finger scrolling.;
			controls.panningMode   = THREE.HorizontalPanning;																	// Set the panning as horizontal.
			controls.maxPolarAngle = 0;																							// In 2D, setting max and min polar angle prevents the camera from rotating in a plane outside the XY.
			controls.minPolarAngle = 0;		
		}
	}
	
	
	//// Information and creation of images ////
	//// PANEL INFORMATION ////
	if (_GRAPHIC) {
		if (_INFOPNL)																											// In case the variable pnldata is defined in the main caseName file, it creates the information panel by
			panelCreate();																										// calling the function defined in the events file.
			
			
		//// INITIALIZATION OF GEOMETRY ////
		createFigure(INI_PLOT);																									// Creates the image and geometries to be displayed in the scene.
		
		
		//// CREATE ANIMATION ////
		animate();																												// Creates the animation of the elements.
	}
}


// function animate()
//
// @descr performs the animation of the elements in an endless loop.
function animate() {
	renderer.render(scene, camera);												// Tells the renderer to display the scene on screen. The arguments to pass are the scene and the camera, already positioned.
	requestAnimationFrame(animate);												// Mandatory function execution, required by THREE.
	stats.update();																// Updates the stats panel. If commented, stats panel shows a static image.
}


// function createFigure(optional)
//
// @Descr Given nodal coordinates and connectivities, plots the bars corresponding to cell or lattice.
// @input Optional: depending on the case, allows to plot with different parameters such as scale or line type.
function createFigure(apt) {
	if (apt != DEF_PLOT && apt != NL_PLOT) while(scene.children.length > 0) scene.remove(scene.children[0]);																// Removes all the elements from the scene.
	
	t_wd = (typeof slider.t !== 'undefined')? Math.round((slider.t - 0.01)*49/0.09)/15+1 : 2;															// Defines linewidth of the line based on the valu of t.
	
	if (_DEFORMS) {
		if (_3DPROBL) {
			if (_DSHEARS)
				delt = math.sum(deltx) + math.sum(delty) + math.sum(deltz) + math.sum(deltyz) + math.sum(deltxz) + math.sum(deltxy);					// delt is a dummy variable that checks if there is any deformation activated.
			else																																		// If the total deformation is different than 0, different color is used for plotting,
				delt = math.sum(deltx) + math.sum(delty) + math.sum(deltz);																				// in order to tell apart the original case from the deformed one.
		} else
			if (_DSHEARS)
				delt = math.sum(deltx) + math.sum(delty) + math.sum(deltxy);
			else
				delt = math.sum(deltx) + math.sum(delty);
	} else
		delt = 0;
	
	if (_NONLINR) {
		deltNL = math.sum(deltxNL) + math.sum(deltyNL);
	}
	
	
	for (var ii = 0; ii < NUM_ELEMS; ii++) {																											// Loop to create the geometry. Iterates in the amount of elements to display.
		let geometry = new THREE.Geometry();																											// Creates a new THREE geometry (object with properties that define the geometry of the element).
		let materia1 = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: t_wd });																// Creates a new THREE line material (object with the basic properties of appearence of a line).
		let materia2 = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: t_wd });																// Creates a new THREE line material (object with the basic properties of appearence of a line).
		let materia3 = new THREE.LineDashedMaterial({ color: 0x0000ff, linewidth: 1, dashSize: 10, gapSize: 8 });										// Creates a new THREE line material (object with the basic properties of appearence of a line).

		if (apt == INI_PLOT) {
			geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][0]-1][0], coors[CONNECT[ii][0]-1][1], coors[CONNECT[ii][0]-1][2]));				// Vertices are added to the geometry. Since it's a line, two vertices must be pushed. The argument passed
			geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][1]-1][0], coors[CONNECT[ii][1]-1][1], coors[CONNECT[ii][1]-1][2]));				// is a 3D vector with the coordinates of each of the vertices.
		
			scene.add(new THREE.Line(geometry, materia1));																								// Geometry is added to the scene. The element passed is a Line, defined by a geometry and a material.
			
		} else if (apt == LAT_PLOT) {
			geometry.vertices.push(new THREE.Vector3(coors[conecs[ii][0]-1][0], coors[conecs[ii][0]-1][1], coors[conecs[ii][0]-1][2]));					// Vertices are added to the geometry. Since it's a line, two vertices must be pushed. The argument passed
			geometry.vertices.push(new THREE.Vector3(coors[conecs[ii][1]-1][0], coors[conecs[ii][1]-1][1], coors[conecs[ii][1]-1][2]));					// is a 3D vector with the coordinates of each of the vertices.
		
			scene.add(new THREE.Line(geometry, materia1));																								// Geometry is added to the scene. The element passed is a Line, defined by a geometry and a material.
			
		} else if (apt == FIX_PLOT) {
			geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][0]-1][0], coors[CONNECT[ii][0]-1][1], coors[CONNECT[ii][0]-1][2]));				// Vertices are added to the geometry. Since it's a line, two vertices must be pushed. The argument passed
			geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][1]-1][0], coors[CONNECT[ii][1]-1][1], coors[CONNECT[ii][1]-1][2]));				// is a 3D vector with the coordinates of each of the vertices.
		
			scene.add(new THREE.Line(geometry, materia3));																								// Geometry is added to the scene. The element passed is a Line, defined by a geometry and a material.
			
		} else if (apt == DEF_PLOT) {
			diffx1 = 0,	diffx2 = 0;																														// Deformations are initialized due to javascript scope of variables (variables defined inside if are
			diffy1 = 0, diffy2 = 0;																														// only valid in the if blck). According to the case calling the function, different sums are computed
			diffz1 = 0,	diffz2 = 0;																														// according to parametersvariavll
			
			if (_3DPROBL) {
				if (_DSHEARS) {																									// Case 3D homogenization
					diffx1 = deltx[CONNECT[ii][0]-1][0]+delty[CONNECT[ii][0]-1][0]+deltz[CONNECT[ii][0]-1][0]+deltyz[CONNECT[ii][0]-1][0]+deltxz[CONNECT[ii][0]-1][0]+deltxy[CONNECT[ii][0]-1][0];
					diffy1 = deltx[CONNECT[ii][0]-1][1]+delty[CONNECT[ii][0]-1][1]+deltz[CONNECT[ii][0]-1][1]+deltyz[CONNECT[ii][0]-1][1]+deltxz[CONNECT[ii][0]-1][1]+deltxy[CONNECT[ii][0]-1][1];
					diffz1 = deltx[CONNECT[ii][0]-1][2]+delty[CONNECT[ii][0]-1][2]+deltz[CONNECT[ii][0]-1][2]+deltyz[CONNECT[ii][0]-1][2]+deltxz[CONNECT[ii][0]-1][2]+deltxy[CONNECT[ii][0]-1][2];
					diffx2 = deltx[CONNECT[ii][1]-1][0]+delty[CONNECT[ii][1]-1][0]+deltz[CONNECT[ii][1]-1][0]+deltyz[CONNECT[ii][1]-1][0]+deltxz[CONNECT[ii][1]-1][0]+deltxy[CONNECT[ii][1]-1][0];
					diffy2 = deltx[CONNECT[ii][1]-1][1]+delty[CONNECT[ii][1]-1][1]+deltz[CONNECT[ii][1]-1][1]+deltyz[CONNECT[ii][1]-1][1]+deltxz[CONNECT[ii][1]-1][1]+deltxy[CONNECT[ii][1]-1][1];
					diffz2 = deltx[CONNECT[ii][1]-1][2]+delty[CONNECT[ii][1]-1][2]+deltz[CONNECT[ii][1]-1][2]+deltyz[CONNECT[ii][1]-1][2]+deltxz[CONNECT[ii][1]-1][2]+deltxy[CONNECT[ii][1]-1][2];
				} else {																																// Case 3D full pattern
					diffx1 = deltx[CONNECT[ii][0]-1][0]+delty[CONNECT[ii][0]-1][0]+deltz[CONNECT[ii][0]-1][0];
					diffy1 = deltx[CONNECT[ii][0]-1][1]+delty[CONNECT[ii][0]-1][1]+deltz[CONNECT[ii][0]-1][1];
					diffz1 = deltx[CONNECT[ii][0]-1][2]+delty[CONNECT[ii][0]-1][2]+deltz[CONNECT[ii][0]-1][2];
					diffx2 = deltx[CONNECT[ii][1]-1][0]+delty[CONNECT[ii][1]-1][0]+deltz[CONNECT[ii][1]-1][0];
					diffy2 = deltx[CONNECT[ii][1]-1][1]+delty[CONNECT[ii][1]-1][1]+deltz[CONNECT[ii][1]-1][1];
					diffz2 = deltx[CONNECT[ii][1]-1][2]+delty[CONNECT[ii][1]-1][2]+deltz[CONNECT[ii][1]-1][2];
				}
			} else {																																	// Cases in 2D
				if (_DSHEARS) {
					diffx1 = deltx[CONNECT[ii][0]-1][0]+delty[CONNECT[ii][0]-1][0]+deltxy[CONNECT[ii][0]-1][0];
					diffy1 = deltx[CONNECT[ii][0]-1][1]+delty[CONNECT[ii][0]-1][1]+deltxy[CONNECT[ii][0]-1][1];
					diffz1 = deltx[CONNECT[ii][0]-1][2]+delty[CONNECT[ii][0]-1][2]+deltxy[CONNECT[ii][0]-1][2];
					diffx2 = deltx[CONNECT[ii][1]-1][0]+delty[CONNECT[ii][1]-1][0]+deltxy[CONNECT[ii][1]-1][0];
					diffy2 = deltx[CONNECT[ii][1]-1][1]+delty[CONNECT[ii][1]-1][1]+deltxy[CONNECT[ii][1]-1][1];
					diffz2 = deltx[CONNECT[ii][0]-1][2]+delty[CONNECT[ii][0]-1][2]+deltxy[CONNECT[ii][0]-1][2];
				} else {
					diffx1 = deltx[CONNECT[ii][0]-1][0]+delty[CONNECT[ii][0]-1][0];
					diffy1 = deltx[CONNECT[ii][0]-1][1]+delty[CONNECT[ii][0]-1][1];
					diffz1 = deltx[CONNECT[ii][0]-1][2]+delty[CONNECT[ii][0]-1][2];
					diffx2 = deltx[CONNECT[ii][1]-1][0]+delty[CONNECT[ii][1]-1][0];
					diffy2 = deltx[CONNECT[ii][1]-1][1]+delty[CONNECT[ii][1]-1][1];
					diffz2 = deltx[CONNECT[ii][0]-1][2]+delty[CONNECT[ii][0]-1][2];
				}
				
			}
			
			geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][0]-1][0]+diffx1, coors[CONNECT[ii][0]-1][1]+diffy1, coors[CONNECT[ii][0]-1][2]+diffz1));		// Vertices are added to the geometry. Since it's a line, two vertices must be pushed.
			geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][1]-1][0]+diffx2, coors[CONNECT[ii][1]-1][1]+diffy2, coors[CONNECT[ii][1]-1][2]+diffz2));
		
			if (delt == 0)																																// Geometry is added to the scene. The element passed is a Line, defined by a geometry and a material.
				scene.add(new THREE.Line(geometry, materia1));																							// Depending if the deformation is 0 or not, different color is plotted.
			else
				scene.add(new THREE.Line(geometry, materia2));
			
		} else if (apt == NL_PLOT) {
			for (var ii = 0; ii < CONNECTNL.length; ii++) {
			
			let scale = 0.5;		
			
			let curve = new THREE.CatmullRomCurve3( [
					new THREE.Vector3(coorsNL[CONNECTNL[ii][0]-1][0]+scale*(deltxNL[CONNECTNL[ii][0]-1][0]+deltyNL[CONNECTNL[ii][0]-1][0]), coorsNL[CONNECTNL[ii][0]-1][1]+scale*(deltxNL[CONNECTNL[ii][0]-1][1]+deltyNL[CONNECTNL[ii][0]-1][1]), 0),
					new THREE.Vector3(coorsNL[CONNECTNL[ii][1]-1][0]+scale*(deltxNL[CONNECTNL[ii][1]-1][0]+deltyNL[CONNECTNL[ii][1]-1][0]), coorsNL[CONNECTNL[ii][1]-1][1]+scale*(deltxNL[CONNECTNL[ii][1]-1][1]+deltyNL[CONNECTNL[ii][1]-1][1]), 0),
					new THREE.Vector3(coorsNL[CONNECTNL[ii][2]-1][0]+scale*(deltxNL[CONNECTNL[ii][2]-1][0]+deltyNL[CONNECTNL[ii][2]-1][0]), coorsNL[CONNECTNL[ii][2]-1][1]+scale*(deltxNL[CONNECTNL[ii][2]-1][1]+deltyNL[CONNECTNL[ii][2]-1][1]), 0),
					new THREE.Vector3(coorsNL[CONNECTNL[ii][3]-1][0]+scale*(deltxNL[CONNECTNL[ii][3]-1][0]+deltyNL[CONNECTNL[ii][3]-1][0]), coorsNL[CONNECTNL[ii][3]-1][1]+scale*(deltxNL[CONNECTNL[ii][3]-1][1]+deltyNL[CONNECTNL[ii][3]-1][1]), 0)
				] );
				
				let points = curve.getPoints(50);
				
				let materia3 = new THREE.LineBasicMaterial({ color: 0x00aa00, linewidth: 3 });
				let geometry = new THREE.BufferGeometry().setFromPoints( points );
				
				if (deltNL == 0)
					scene.add(new THREE.Line(geometry, materia1));
				else
					scene.add(new THREE.Line(geometry, materia3));
			}
		}
	}
}
//// Main functions used in the case ////
// function createGUI()
//
// @Descr Creates the controlling interface for the model.
function createGUI() {
	let f1 = gui.addFolder('Size controls');																					// addFolder method creates one of the folders of the controller, main kind of division.
	
	f1.add(slider, 'b').min(1.0).max(1.5).step(0.010).name('b').onChange( function(value) {remesh()});							// Instead of adding values to the controller (gui object), they are added to the folder object (f1 object).
	f1.add(slider, 'a').min(0.3).max(0.7).step(0.008).name('a').onChange( function(value) {remesh()});							// Controllers are added for each of the values defined in the slider object (in parameters file). Arguments passed are the
	f1.add(slider, 'alpha').min(45).max(135).step(1).name('alpha').onChange( function(value) {remesh()});						// object (slider) and the wanted property. Of the methods, name is mandatory. 
	f1.add(slider, 'phi').min(0.75).max(2.0).step(0.025).name('phi').onChange( function(value) {remesh()});
	f1.open();																													// Method opens the folder. Default folders are created closed.
	
	let f2 = gui.addFolder('Lattice parameters');
	
	f2.add(slider, 'nX').name('X axis repetition').onChange( function(value) {slider.nX = Math.round(value); remesh()});		// Values are added to new folder. Method onChange means that a function is called when values are changed. In this case, the
	f2.add(slider, 'nY').name('Y axis repetition').onChange( function(value) {slider.nY = Math.round(value); remesh()});		// functions just updates the values of the lattice repetition to be drawn.
	f2.add(slider, 'nZ').name('Z axis repetition').onChange( function(value) {slider.nZ = Math.round(value); remesh()});
	f2.open();																													// Opens the new folder.
	
	let f3 = gui.addFolder('Controls');																							// New folder is created.
	
	f3.add(slider, 'rectr').name('Recenter drawing');																			// Adds a button with the property rectr, which is a function that calls for recentering the image.
	f3.open();																													// Opens the new folder.
}


// function remesh()
//
// @Descr Given changes in parameters, recreates the image with the new values. Works with createFigure.
function remesh() {
	A_PM   = Math.round((slider.a - 0.3)    * 50/0.4);																			// Reads the value of the parameter and converts it to the position in the array that corresponds to it.
	B_PM   = Math.round((slider.b - 1)      * 50/0.5);																			// The values are used in order to use in the arrays and retrieve the same values shown in the controller,
	AL_PM  = Math.round((slider.alpha - 45) * 90/90);																			// now in a way that can be applied to the code.
	PHI_PM = Math.round((slider.phi - 0.75) * 50/1.25);
	STH    = 0;	
	
	for (var i = 0; i < STH_ARR.length; i++)																					// Definition of sin(theta) with the SVD modes.
		STH += STH_ARR[i][0]*STH_ARR[i][1][AL_PM]*STH_ARR[i][2][PHI_PM];

	nX    = Math.round(slider.nX);																								// Dummy variables in order to easy the writing in the function.
	nY    = Math.round(slider.nY);
	nZ    = Math.round(slider.nZ);

	NUM_ELEMS = 37 * nY * nX * nZ;																								// Update of the number of elements in the figure, according to the lattice inputted.
	NUM_NODES = 26 * nY * nX * nZ;																								// Update of the number of nodes in the figure, according to the lattice inputted.
	
	coors  = new Array(NUM_NODES);																								// Dummy variable, to separate the original coordinates matrix (COORS_T) from the updated one (coors).
	conecs = new Array(NUM_ELEMS);																								// Dummy variable, to separate the original connectivity matrix (CONNECT) from the updated one (conecs).

	for (var k = 0; k < nZ; k++) {																								// Loop in all the Z elements of the lattice.
		for (var i = 0; i < nY; i++) {																							// Loop in all the Y elements of the lattice.
			for (var j = 0; j < nX; j++) {																						// Loop in all the X elements of the lattice.
				
				for (var u = 0; u < COORS_1.length; u++) {																		// Loop in all nodes.
					coors[26*nX*nY*k+26*nX*i+26*j+u] = new Array(3);															// Set array for each node.
					
					for (var v = 0; v < COORS_1[u].length; v++) {																// Loop in all coordinates.
						
						if (v == 0)																								// Set the coordinates matrix. First and second row is different because of how node numbering is defined.
							coors[26*nX*nY*k+26*nX*i+26*j+u][v] = COORS_1[u][v]*B_ARR[B_PM] + 
							                                      COORS_2[u][v]*A_ARR[A_PM]*CAL_ARR[AL_PM] + 
																  COORS_3[u][v]*A_ARR[A_PM]*SAL_ARR[AL_PM] + 
																  COORS_4[u][v]*A_ARR[A_PM]*PHI_ARR[PHI_PM]*STH + 
																  2*(B_ARR[B_PM]-A_ARR[A_PM]*CAL_ARR[AL_PM])*j;
						else if (v == 1)
							coors[26*nX*nY*k+26*nX*i+26*j+u][v] = COORS_1[u][v]*B_ARR[B_PM] + 
						                                          COORS_2[u][v]*A_ARR[A_PM]*CAL_ARR[AL_PM] + 
																  COORS_3[u][v]*A_ARR[A_PM]*SAL_ARR[AL_PM] + 
																  COORS_4[u][v]*A_ARR[A_PM]*PHI_ARR[PHI_PM]*STH + 
																  2*A_ARR[A_PM]*SAL_ARR[AL_PM]*i;
						else
							coors[26*nX*nY*k+26*nX*i+26*j+u][v] = COORS_1[u][v]*B_ARR[B_PM] + 
						                                          COORS_2[u][v]*A_ARR[A_PM]*CAL_ARR[AL_PM] + 
																  COORS_3[u][v]*A_ARR[A_PM]*SAL_ARR[AL_PM] + 
																  COORS_4[u][v]*A_ARR[A_PM]*PHI_ARR[PHI_PM]*STH + 
																  2*A_ARR[A_PM]*PHI_ARR[PHI_PM]*STH*k;
					}
				}
				
				for (var u = 0; u < CONNECT.length; u++) {																		// Loop in connectivity matrix.
					conecs[37*nX*nY*k+37*nX*i+37*j+u] = new Array(2);															// Set array for each element.
					
					for (var v = 0; v < CONNECT[u].length; v++) 
						conecs[37*nX*nY*k+37*nX*i+37*j+u][v] = CONNECT[u][v] + 26*nX*nY*k+26*nX*i+26*j;							// Adds new elements to the updated connectivity matrix. 
				}
			}
		}
	}
	
	
	
	centerCoords();																												// Centers the coordinates of the image displayed.
	createFigure(LAT_PLOT);																										// Calls the function to recreate the geometry, now with updated values.
}

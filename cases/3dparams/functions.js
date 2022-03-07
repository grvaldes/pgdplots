//// Main functions used in the case ////
// function createGUI()
//
// @Descr Creates the controlling interface for the model.
function createGUI() {
	gui.add(slider, 'b').min(1.0).max(1.5).step(0.01).name('b').onChange(function(value) {remesh()});						// Adds the controller for each of the values. The arguments passed are the object that defines the controls 
	gui.add(slider, 'a').min(0.3).max(0.7).step(0.008).name('a').onChange(function(value) {remesh()});						// (defined in the parameters file) and the wanted property. Depending on the methods which kind of controller
	gui.add(slider, 'phi').min(0.75).max(2.00).step(0.025).name('phi').onChange(function(value) {remesh()});				// appears. Here are sliders defined, so extreme values and steps are defined, as well as a name, which is essential.
	gui.add(slider, 'alpha').min(45).max(135).step(1).name('alpha').onChange(function(value) {remesh()});					// onChange method means that the controller calls a function when moved, passing the current value as an argument.
}


// function remesh()
//
// @Descr Given changes in parameters, recreates the image with the new values. Works with createFigure. 
function remesh() {
	B_PM   = Math.round((slider.b - 1)      * 50/0.5);																		// Reads the value of the parameter and converts it to the position in the array that corresponds to it.
	A_PM   = Math.round((slider.a - 0.3)    * 50/0.4);																		// The values are used in order to use in the arrays and retrieve the same values shown in the controller,
	AL_PM  = Math.round((slider.alpha - 45) * 90/90);																		// now in a way that can be applied to the code.
	PHI_PM = Math.round((slider.phi - 0.75) * 50/1.25);
	
	STH = STH_ARR[0][2]*STH_ARR[0][0][AL_PM]*STH_ARR[0][1][PHI_PM] + 														// Value of sin(theta), as a combination from the SVD.
		  STH_ARR[1][2]*STH_ARR[1][0][AL_PM]*STH_ARR[1][1][PHI_PM] + 
		  STH_ARR[2][2]*STH_ARR[2][0][AL_PM]*STH_ARR[2][1][PHI_PM];	

	for (var i = 0; i < COORS_1.length; i++)																				// Loop that iterates on the coordinates matrix, in order to define the updated coordinates of the cell. IJ are
		for (var j = 0; j < COORS_1[i].length; j++)																			// the positions of the coordinates matrix.
			coors[i][j] = COORS_1[i][j]*B_ARR[B_PM] + 
			              COORS_2[i][j]*A_ARR[A_PM]*CAL_ARR[AL_PM] + 
						  COORS_3[i][j]*A_ARR[A_PM]*CAL_ARR[AL_PM] + 
						  COORS_4[i][j]*A_ARR[A_PM]*SAL_ARR[AL_PM] + 
						  COORS_5[i][j]*A_ARR[A_PM]*PHI_ARR[PHI_PM]*STH;

	createFigure(INI_PLOT);																									// Calls the function to recreate the geometry, now with updated values.
}

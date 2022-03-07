//// Main functions used in the case ////
// function createGUI()
//
// @Descr Creates the controlling interface for the model.
function createGUI() {																															
	gui.add(slider, 'b').min(1.0).max(1.5).step(0.010).name('b').onChange(function(value) {remesh()}); 						// Adds the controller for each of the values. The arguments passed are the object that defines the controls 
	gui.add(slider, 'a').min(0.3).max(0.7).step(0.008).name('a').onChange(function(value) {remesh()}); 						// (defined in the parameters file) and the wanted property. Depending on the methods which kind of controller
	gui.add(slider, 'alpha').min(45).max(135).step(1).name('alpha').onChange(function(value) {remesh()});					// appears. Here are sliders defined, so extreme values and steps are defined, as well as a name, which is essential.
}																															// onChange method means that the controller calls a function when moved, passing the current value as an argument.


// function remesh()
//
// @Descr Given changes in parameters, recreates the image with the new values. Works with createFigure. 
function remesh() {
	A_PM   = Math.round((slider.a - 0.3)    * 50/0.4);																		// Reads the value of the parameter and converts it to the position in the array that corresponds to it.
	B_PM   = Math.round((slider.b - 1)      * 50/0.5);																		// The values are used in order to use in the arrays and retrieve the same values shown in the controller,
	AL_PM  = Math.round((slider.alpha - 45) * 90/90);																		// now in a way that can be applied to the code.

	for (var i = 0; i < COORS_1.length; i++)																				// Loop that iterates on the coordinates matrix, in order
		for (var j = 0; j < COORS_1[i].length; j++)																			// to define the updated coordinates of the cell. IJ are
			coors[i][j] = COORS_1[i][j]*B_ARR[B_PM]*ONE_DIM[A_PM]*ONE_ANG[AL_PM] + 											// the positions of the coordinates matrix.
						  COORS_2[i][j]*ONE_DIM[B_PM]*A_ARR[A_PM]*SAL_ARR[AL_PM] + 
						  COORS_3[i][j]*ONE_DIM[B_PM]*A_ARR[A_PM]*CAL_ARR[AL_PM];		

	createFigure(INI_PLOT);																									// Calls the function to recreate the geometry, now with updated values.
}

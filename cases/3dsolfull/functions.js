//// Main variables used in the case ////
let nus  = new Array(6).fill(0);																			// Array for the real-time values of nu. Defined as global so it's accesible by all functions.
let f1, f3, f4, f5, f5p1, f5p2;																				// Folder structure variables for dat.gui controller.




//// Main functions used in the case ////
// function createGUI()
//
// @Descr Creates the controlling interface for the model.
function createGUI() {
	f1 = gui.addFolder('Size controls');																				// Creates the section that will contain the following controllers.
	
	f1.add(slider, 'b').min(1.0).max(1.5).step(0.010).name('b').onChange(function() {remesh()}); 						// Adds the controller for each of the values. The arguments passed are the object that defines the controls 
	f1.add(slider, 'a').min(0.3).max(0.7).step(0.008).name('a').onChange(function() {remesh()}); 						// (defined in the parameters file) and the wanted property. Depending on the methods which kind of controller
	f1.add(slider, 'alpha').min(45).max(135).step(1).name('alpha').onChange(function() {remesh()});						// appears. Here are sliders defined, so extreme values and steps are defined, as well as a name, which is essential.
	f1.add(slider, 'phi').min(0.75).max(2.0).step(0.025).name('phi').onChange(function() {remesh()});					// onChange method means that the controller calls a function when moved, passing the current value as an argument.
	f1.add(slider, 't').min(0.01).max(0.1).step(0.0018).name('t').onChange(function() {remesh()});
	f1.open();																											// Default position of folders is closed, so this shows it when loading it.
	
	f3 = gui.addFolder('Controls');																						// Creates the section that will contain the following controllers.
	
	f3.add(slider, 'rectr').name('Recenter drawing');																	// Adds a button with the functionalty to recenter the image, defined bya function in the parameters.
	f3.add(slider, 'reslt').name('Show deformations');																	// Adds a button with the functionalty to display results, defined bya function in the parameters.
	f3.open();																											// Default position of folders is closed, so this shows it when loading it.
}


// function remesh()
//
// @Descr Given changes in parameters, recreates the image with the new values. Works with createFigure.
function remesh() {
	trackChanges(['b','phi','t']);																						// Track, for the variables indicated, if the value was changed from the previous position.
	
	// Recalculation of the positions in the array for all variables involved.
	A_PM   = Math.round((slider.a - 0.3)    * 50/0.4);																	
	B_PM   = Math.round((slider.b - 1)      * 50/0.5);
	AL_PM  = Math.round((slider.alpha - 45) * 90/90);
	PHI_PM = Math.round((slider.phi - 0.75) * 50/1.25);
	T_PM   = Math.round((slider.t - 0.01)   * 50/0.09);
	STH    = 0;
	
	// Recalculation of the sin(theta) with the new values.
	for (var i = 0; i < STH_ARR.length; i++)
		STH += STH_ARR[i][0]*STH_ARR[i][1][AL_PM]*STH_ARR[i][2][PHI_PM];

	// Recalculation of the coordinates with the new values.
	for (var i = 0; i < COORS_T.length; i++) {
		for (var j = 0; j < COORS_T[i].length; j++)
			coors[i][j] = COORS_1[i][j]*B_ARR[B_PM] + 
		                  COORS_2[i][j]*A_ARR[A_PM]*CAL_ARR[AL_PM] + 
		                  COORS_3[i][j]*A_ARR[A_PM]*SAL_ARR[AL_PM] + 
		                  COORS_4[i][j]*A_ARR[A_PM]*PHI_ARR[PHI_PM]*STH;
	}
	
	// Centers the coordinates of the image displayed.
	centerCoords();
	
	// Deletes previous deformation matrix.
	for (var i = 0; i < NUM_NODES; i++) {
		for (var j = 0; j < deltx[i].length; j++) {
			deltx[i][j] = 0;
			delty[i][j] = 0;
			deltz[i][j] = 0;
		}
	}
		
	// Recalculates new deformation matrices with new values.
	for (var i = 0; i < NUM_NODES; i++) {
		for (var j = 0; j < deltx[i].length; j++) {
			
				for (var k = 0; k < cxx.length; k++)
					deltx[i][j] += slider.defx*(uxx[k][i][j]*axx[k][A_PM]*bxx[k][B_PM]*alxx[k][AL_PM]*phixx[k][PHI_PM]*txx[k][T_PM]*nuxx[k][NU_PM]*cxx[k]);
			
				for (var k = 0; k < cyy.length; k++)
					delty[i][j] += slider.defy*(uyy[k][i][j]*ayy[k][A_PM]*byy[k][B_PM]*alyy[k][AL_PM]*phiyy[k][PHI_PM]*tyy[k][T_PM]*nuyy[k][NU_PM]*cyy[k]);
				
				for (var k = 0; k < czz.length; k++)
					deltz[i][j] += slider.defz*(uzz[k][i][j]*azz[k][A_PM]*bzz[k][B_PM]*alzz[k][AL_PM]*phizz[k][PHI_PM]*tzz[k][T_PM]*nuzz[k][NU_PM]*czz[k]);
		}
	}
		
	createFigure(FIX_PLOT);																								// Creates the fixed display of the cell.
	createFigure(DEF_PLOT);																								// Creates the deformed display of the cell.
	calcNuVals();																										// Performs the calculation of the values of nu for the determined position.
}


// function result()
//
// @Descr Computes the solution and displays it on screen.
function result() {
	f4  = gui.addFolder('Deformation controls');																									// Creates the section that will contain the following controllers.
	
	f4.add(slider, 'defx').min(0.00).max(1.00).step(0.01).name('X deformation').onChange(function() {remesh()});									// Creates the controllers for the deformations. Each time the deformation is moved, the image
	f4.add(slider, 'defy').min(0.00).max(1.00).step(0.01).name('Y deformation').onChange(function() {remesh()});									// is remeshed in order to include the effects of the deformation. Deformations in here work in an
	f4.add(slider, 'defz').min(0.00).max(1.00).step(0.01).name('Z deformation').onChange(function() {remesh()});									// additive fashion, which could be combined.
	f4.open();
	
	f5   = gui.addFolder('Information controls');
	f5p1 = f5.add(slider, 'plot1', ['xx', 'yy', 'zz']).name('Homogenization case').onChange(function(value) {guiChange(value)});	// Adds the option for modifying the first plot, correspoding to modal amplitudes in all cases.
	f5p2 = f5.add(slider, 'plot2', ['Nu surfaces', 'Modal functions']).name('Information to show').onChange(function(value) {guiChange(value)});	// Adds the option for choosing the second plot, between nu surfaces and modal functions. Default
	f5.open();																																		// is the nu surfaces.
	
	f6   = gui.addFolder('Nu surfaces');
	f6p1 = f6.add(slider, 'plot2cas', ['nu_yx', 'nu_zx']).name('Case').onChange(function() {calcNuSurf()});											// Adds the submenu for choosing the correspondant the nu surfaces (as is the default choice).
	f6.open();
	
	slider.reslt = function() {panelOpen()};																										// Changes the functionality of the button in order to avoid errors.
	
	remesh();																																		// Remeshes to commit the first default changes in the image.
	panelOpen();																																	// Opens the panel with the information.
	calcModAmp();																																	// Calculates the modal amplitudes and the plot.
	calcNuSurf();																																	// Calculates the default nu surface to display.
}


// function guiChange()
//
// @Descr Changes the menus on the screen depending on the cases chosen. Covers any option available in the case.
// @Input apt: parameter passed b the dat.gui element, which is the text value chosen in any of the menus.
function guiChange(apt) {
	
	// Case if the input passed comes from the slider.plot1 variable. It affects all plots since the options shown are only based on homogenization cases.
	if (apt == 'xx' || apt == 'yy' || apt == 'zz') {
		// Remove the menu for plot 2 to be readded.
		f5.remove(f5p2);

		slider.plot2 = 'Nu surfaces';
		f5p2         = f5.add(slider, 'plot2', ['Nu surfaces', 'Modal functions']).name('Information to show').onChange(function(value) {guiChange(value)});
		
		// From before, if the plot to show is chosen as the nu surfaces:
		if (slider.plot2 == 'Nu surfaces'){
			// Recreates the folder with the nu surfaces options, according to the corresponding case.
			gui.removeFolder(f6);
			f6   = gui.addFolder('Nu surfaces');
			
			if (slider.plot1 == 'xx') {
				slider.plot2cas = 'nu_yx';
				f6p1            = f6.add(slider, 'plot2cas', ['nu_yx', 'nu_zx']).name('Case').onChange(function() {calcNuSurf()});
			}
			else if (slider.plot1 == 'yy') {
				slider.plot2cas = 'nu_xy';
				f6p1            = f6.add(slider, 'plot2cas', ['nu_xy', 'nu_zy']).name('Case').onChange(function() {calcNuSurf()});
			}
			else if (slider.plot1 == 'zz') {
				slider.plot2cas = 'nu_xz';
				f6p1            = f6.add(slider, 'plot2cas', ['nu_xz', 'nu_yz']).name('Case').onChange(function() {calcNuSurf()});
			}
			
			// Opens the folder as the default is closed.
			f6.open();
			
			// Computes the default surface to show according to the homogenization case.
			calcNuSurf();
			
		// If the plot chosen is the modal functions:
		} else {
			// Recreates the folder adapted to display the modal functions.
			gui.removeFolder(f6);
			f6 = gui.addFolder('Modal functions');
			
			// Sets default value of parameter to display and the options.
			slider.plot3 = 'a';
			f6.add(slider, 'plot3', ['a', 'b', 'alfa', 'phi', 't']).name('Chosen Parameter').onChange(function() {calcModFunc()});
			
			// Adds a fixed amount of modes to display (set as 9 given that is the minimum amount of modes present in a case).
			for (var i = 0; i < 9; i++) 
				f6.add(slider, 'modes' + i).name('Mode ' + (i+1)).onChange(function() {calcModFunc()});
			
			// Opens the folder as the default is closed.
			f6.open();
			
			// Calculates the default plot to ahow, depending on which modes are selected.
			calcModFunc();
		}
		
		// Computes the modal amplitudes to display according to the case.
		calcModAmp();
	
	// Case when the value passed comes from slider.plot2 (in case of choosing between showing nu surfaces or modal functions).
	} else if (apt == 'Nu surfaces' || apt == 'Modal functions') {
		// If the plot to show was chosen as the surfaces:
		if (apt == 'Nu surfaces'){
			// Recreates the folder with the nu surfaces options, according to the corresponding case.
			gui.removeFolder(f6);
			f6   = gui.addFolder('Nu surfaces');
			
			if (slider.plot1 == 'xx') {
				slider.plot2cas = 'nu_yx';
				f6p1            = f6.add(slider, 'plot2cas', ['nu_yx', 'nu_zx']).name('Case').onChange(function() {calcNuSurf()});
			}
			else if (slider.plot1 == 'yy') {
				slider.plot2cas = 'nu_xy';
				f6p1            = f6.add(slider, 'plot2cas', ['nu_xy', 'nu_zy']).name('Case').onChange(function() {calcNuSurf()});
			}
			else if (slider.plot1 == 'zz') {
				slider.plot2cas = 'nu_xz';
				f6p1            = f6.add(slider, 'plot2cas', ['nu_xz', 'nu_yz']).name('Case').onChange(function() {calcNuSurf()});
			}
			
			// Opens the folder as the default is closed.
			f6.open();
			
			// Computes the default surface to show according to the homogenization case.
			calcNuSurf();
			
		// If the plot chosen is the modal functions:	
		} else {
			// Recreates the folder adapted to display the modal functions.
			gui.removeFolder(f6);
			f6 = gui.addFolder('Modal functions');
			
			// Sets default value of parameter to display and the options.
			slider.plot3 = 'a';
			f6.add(slider, 'plot3', ['a', 'b', 'alfa', 'phi', 't']).name('Chosen Parameter').onChange(function() {calcModFunc()});
			
			// Adds a fixed amount of modes to display (set as 9 given that is the minimum amount of modes present in a case).
			for (var i = 0; i < 9; i++) 
				f6.add(slider, 'modes' + i).name('Mode ' + (i+1)).onChange(function() {calcModFunc()});
			
			// Opens the folder as the default is closed.
			f6.open();
			
			// Calculates the default plot to ahow, depending on which modes are selected.
			calcModFunc();
		}
	}
}


// function calcNuVals()
//
// @Descr Calculates the Ceff matrix components and the nus associated with the cell.
function calcNuVals() {
	let u_xx = new Array(6*NUM_NODES).fill(0); 		// Deformation matrix, now written as vectors.
	let u_yy = new Array(6*NUM_NODES).fill(0); 
	let u_zz = new Array(6*NUM_NODES).fill(0);
	
	// Coordinates of boundaries and dimensions of the lattice.
	XL = coors[0][0], XR = coors[272][0];
	YB = coors[6][1], YT = coors[106][1];
	ZI = coors[0][2], ZF = coors[384][2];
	w0 = XR - XL;
	h0 = YT - YB;
	l0 = ZI - ZF;
	
	// Population of the deformation vectors.
	for (var i = 0; i < NUM_NODES; i++) {
		for (var j = 0; j < deltx[i].length; j++) {
			
				for (var k = 0; k < cxx.length; k++)
					u_xx[6*i+j] += uxx[k][i][j]*axx[k][A_PM]*bxx[k][B_PM]*alxx[k][AL_PM]*phixx[k][PHI_PM]*txx[k][T_PM]*nuxx[k][NU_PM]*cxx[k];
			
				for (var k = 0; k < cyy.length; k++)
					u_yy[6*i+j] += uyy[k][i][j]*ayy[k][A_PM]*byy[k][B_PM]*alyy[k][AL_PM]*phiyy[k][PHI_PM]*tyy[k][T_PM]*nuyy[k][NU_PM]*cyy[k];
				
				for (var k = 0; k < czz.length; k++)
					u_zz[6*i+j] += uzz[k][i][j]*azz[k][A_PM]*bzz[k][B_PM]*alzz[k][AL_PM]*phizz[k][PHI_PM]*tzz[k][T_PM]*nuzz[k][NU_PM]*czz[k];
		}
	}
	
	// Conversion to math.js vectors.
	u_xx = math.matrix(u_xx);
	u_yy = math.matrix(u_yy);
	u_zz = math.matrix(u_zz);
	
	// Computation of the deformed state sizes.
	hx = math.mean(math.add(math.subset(u_xx,math.index(math.add(math.multiply(nodesYT,6),1))),YT))-math.mean(math.add(math.subset(u_xx,math.index(math.add(math.multiply(nodesYB,6),1))),YB));
	lx = math.mean(math.add(math.subset(u_xx,math.index(math.add(math.multiply(nodesZI,6),2))),ZI))-math.mean(math.add(math.subset(u_xx,math.index(math.add(math.multiply(nodesZF,6),2))),ZF));
	
	wy = math.mean(math.add(math.subset(u_yy,math.index(math.add(math.multiply(nodesXR,6),0))),XR))-math.mean(math.add(math.subset(u_yy,math.index(math.add(math.multiply(nodesXL,6),0))),XL));
    ly = math.mean(math.add(math.subset(u_yy,math.index(math.add(math.multiply(nodesZI,6),2))),ZI))-math.mean(math.add(math.subset(u_yy,math.index(math.add(math.multiply(nodesZF,6),2))),ZF));
	
	wz = math.mean(math.add(math.subset(u_zz,math.index(math.add(math.multiply(nodesXR,6),0))),XR))-math.mean(math.add(math.subset(u_zz,math.index(math.add(math.multiply(nodesXL,6),0))),XL));
    hz = math.mean(math.add(math.subset(u_zz,math.index(math.add(math.multiply(nodesYT,6),1))),YT))-math.mean(math.add(math.subset(u_zz,math.index(math.add(math.multiply(nodesYB,6),1))),YB));

	// Computation of nus by comparing stressed and unestressed case.
	nus[0] = Math.round(-10*(hx-h0)/h0*10000)/10000;
	nus[1] = Math.round(-10*(wy-w0)/w0*10000)/10000;
	nus[2] = Math.round(-10*(lx-l0)/l0*10000)/10000;
	nus[3] = Math.round(-10*(wz-w0)/w0*10000)/10000;
	nus[4] = Math.round(-10*(ly-l0)/l0*10000)/10000;
	nus[5] = Math.round(-10*(hz-h0)/h0*10000)/10000;
	
	// Depending on the surface to be shown, the value of nu is chosen to display the red dot on the surface.
	if (slider.plot2cas == 'nu_yx') nut = [nus[1]];
	if (slider.plot2cas == 'nu_zx') nut = [nus[3]];
	if (slider.plot2cas == 'nu_xy') nut = [nus[0]];
	if (slider.plot2cas == 'nu_zy') nut = [nus[5]];
	if (slider.plot2cas == 'nu_xz') nut = [nus[2]];
	if (slider.plot2cas == 'nu_yz') nut = [nus[4]];
	
	// Coordinates of the red dot (BE AWARE to keep the notation as it is, in order for Plotly to work correctly. Respect the double array).
	let update = {
		x: [[slider.alpha]],
		y: [[slider.a]],
		z: [nut]
	}
	
	// If the surface plot is not empty (i.e., exists), updates the position of the red dot.
	if (!$('#pnlplot2').is(':empty')) 
		Plotly.restyle('pnlplot2', update, 0);
	
	// Adds the real-time information to the panel.
	if (slider.plot1 == 'xx') pnldata = ['<table>', '<tr>\n<td>nu_yx = ' + nus[1] + '</td>\n</tr>', '<tr>\n<td>nu_zx = ' + nus[3] + '</td>\n</tr>','</table>'].join('\n');
	if (slider.plot1 == 'yy') pnldata = ['<table>', '<tr>\n<td>nu_xy = ' + nus[0] + '</td>\n</tr>', '<tr>\n<td>nu_zy = ' + nus[5] + '</td>\n</tr>','</table>'].join('\n');
	if (slider.plot1 == 'zz') pnldata = ['<table>', '<tr>\n<td>nu_xz = ' + nus[2] + '</td>\n</tr>', '<tr>\n<td>nu_yz = ' + nus[4] + '</td>\n</tr>','</table>'].join('\n');
	
	panelLoad(pnldata);
}


// function calcModAmp()
//
// @Descr Displays the modal amplitudes in the plot.
function calcModAmp() {
	// Takes thearray for modal amplitudes according to the case.
	let cr = eval('c' + slider.plot1 + '.slice()');
	
	// Creates the plot.
	trace1 = {
		x: linspace(1,cr.length,0),   	// x values.
		y: cr,							// y values.
		type: 'scatter',				// Plot type.
		mode: 'lines',					// Plot mode.
		line: {	dash: 'dashdot' }		// Type of line (dashed).
	};
	
	// Sends the plot to the panel.
	Plotly.newPlot('pnlplot1', [trace1], layout1);
}


// function calcModAmp()
//
// @Descr Calculates and displays the modal functions in the plot.
function calcModFunc() {
	// Initialization of axis values of the plot.
	let pramx = [];
	let pramy = [];
	
	// According to the parameter chosen, sets the values.
	switch (slider.plot3) {
		case 'a':
			pramx = A_ARR.slice();
			pramy = eval('a' + slider.plot1 + '.slice()');
			break;
		case 'b':
			pramx = B_ARR.slice();
			pramy = eval('b' + slider.plot1 + '.slice()');
			break;
		case 'phi':
			pramx = PHI_ARR.slice();
			pramy = eval('phi' + slider.plot1 + '.slice()');
			break;
		case 'alfa':
			pramx = AL_ARR.slice();
			pramy = eval('al' + slider.plot1 + '.slice()');
			break;
		case 't':
			pramx = T_ARR.slice();
			pramy = eval('t' + slider.plot1 + '.slice()');
			break;
	}
	
	// Container for all the lines in the plot.
	trace3 = [];
	
	// If the mode is chosen, pushes the line into the plot.
	for (var i = 0; i < 9; i++) {
		if (eval('slider.modes' + i))
			trace3.push({
				x: pramx,
				y: pramy[i],
				type: 'scatter',
				mode: 'lines', 
				name: 'Mode ' + (i+1)
			});
	}	
	
	// Sets the x axis title according to the chosen parameter.
	layout3.xaxis = {title: 'Parameter, ' + slider.plot3}
	
	// Sends th plot to the panel.
	Plotly.newPlot('pnlplot2', trace3, layout3);
}


// function calcNuSurf()
//
// @Descr Calculates and displays the surface of nus in the plot.
function calcNuSurf() {
	// _sp variables are reduced intervals for the variables a and alfa. They skip some of the values in order to increase computation speed.
	let al_sp = linspace(45,135,31);
	let a_sp  = linspace(0.3,0.7,11);
	
	// Array with the values of nu to be computed. Is a matrix of size a times size alfa, storing all the values of the surface.
	let nusos = new Array(a_sp.length);
	
	// _sp indexes, since some matrices still need to be addressed in full length.
	let i_sp = linspace(0,50,a_sp.length);
	let j_sp = linspace(0,90,al_sp.length);
	
	// Boundaries coordinates and dimensions of the lattice (undeformed).
	XL = COORS_T[0][0], XR = COORS_T[272][0];
	YB = COORS_T[6][1], YT = COORS_T[106][1];
	ZI = COORS_T[0][2], ZF = COORS_T[384][2];
	w0 = XR - XL;
	h0 = YT - YB;
	l0 = ZI - ZF;
	
	// Looping in a_ap
	for (var i = 0; i < a_sp.length; i++) {
		nusos[i] = [];
		
		// Looping in al_sp
		for (var j = 0; j < al_sp.length; j++) {
			// Deformation vectors and stiffness matrix given the current parameters. Changes for different a_sp and alfa_sp.			
			let upxx = new Array(6*NUM_NODES).fill(0);
			let upyy = new Array(6*NUM_NODES).fill(0);
			let upzz = new Array(6*NUM_NODES).fill(0);
			
			// Population of the deformation vectors.
			for (var u = 0; u < NUM_NODES; u++) {	
				for (var v = 0; v < 6; v++) {
					for (var k = 0; k < cxx.length; k++)
						upxx[6*u+v] += uxx[k][u][v]*axx[k][i_sp[i]]*bxx[k][B_PM]*alxx[k][j_sp[j]]*phixx[k][PHI_PM]*txx[k][T_PM]*nuxx[k][NU_PM]*cxx[k];
					
					for (var k = 0; k < cyy.length; k++)
						upyy[6*u+v] += uyy[k][u][v]*ayy[k][i_sp[i]]*byy[k][B_PM]*alyy[k][j_sp[j]]*phiyy[k][PHI_PM]*tyy[k][T_PM]*nuyy[k][NU_PM]*cyy[k];
					
					for (var k = 0; k < czz.length; k++)
						upzz[6*u+v] += uzz[k][u][v]*azz[k][i_sp[i]]*bzz[k][B_PM]*alzz[k][j_sp[j]]*phizz[k][PHI_PM]*tzz[k][T_PM]*nuzz[k][NU_PM]*czz[k];
				}
			}
			
			// Conversion to math.js vectors.
			upxx = math.matrix(upxx);
			upyy = math.matrix(upyy);
			upzz = math.matrix(upzz);
			
			// For each particular case of nu (so only computes once):
			// tracePt: initial position of the red point.
			// nusos: the value of nu for the given point.
			switch (slider.plot2cas) {
				case 'nu_xy':
					tracePt.z = [nus[0]];
					hx = math.mean(math.add(math.subset(upxx,math.index(math.add(math.multiply(nodesYT,6),1))),YT))-math.mean(math.add(math.subset(upxx,math.index(math.add(math.multiply(nodesYB,6),1))),YB));
					nusos[i].push(-10*(hx-h0)/h0);
					break;
					
				case 'nu_xz':
					tracePt.z = [nus[2]];
					lx = math.mean(math.add(math.subset(upxx,math.index(math.add(math.multiply(nodesZI,6),2))),ZI))-math.mean(math.add(math.subset(upxx,math.index(math.add(math.multiply(nodesZF,6),2))),ZF));
					nusos[i].push(-10*(lx-l0)/l0);
					break;
					
				case 'nu_yx':
					tracePt.z = [nus[1]];
					wy = math.mean(math.add(math.subset(upyy,math.index(math.add(math.multiply(nodesXR,6),0))),XR))-math.mean(math.add(math.subset(upyy,math.index(math.add(math.multiply(nodesXL,6),0))),XL));
					nusos[i].push(-10*(wy-w0)/w0);
					break;
					
				case 'nu_zx':
					tracePt.z = [nus[3]];
					wz = math.mean(math.add(math.subset(upzz,math.index(math.add(math.multiply(nodesXR,6),0))),XR))-math.mean(math.add(math.subset(upzz,math.index(math.add(math.multiply(nodesXL,6),0))),XL));
					nusos[i].push(-10*(wz-w0)/w0);
					break;
					
				case 'nu_yz':
					tracePt.z = [nus[4]];
					ly = math.mean(math.add(math.subset(upyy,math.index(math.add(math.multiply(nodesZI,6),2))),ZI))-math.mean(math.add(math.subset(upyy,math.index(math.add(math.multiply(nodesZF,6),2))),ZF));
					nusos[i].push(-10*(ly-l0)/l0);
					break;
					
				case 'nu_zy':
					tracePt.z = [nus[5]];
					hz = math.mean(math.add(math.subset(upzz,math.index(math.add(math.multiply(nodesYT,6),1))),YT))-math.mean(math.add(math.subset(upzz,math.index(math.add(math.multiply(nodesYB,6),1))),YB));
					nusos[i].push(-10*(hz-h0)/h0);
					break;
			}
		}
	}
	
	// Current coordinates of a and alpha given for the red point.
	tracePt.x = [slider.alpha];
	tracePt.y = [slider.a];
	
	// Definition of the plot. Defined twice: once the surface plot and once the grid plot, for aesthetical effect.
	trace2 = [tracePt,{
		x: al_sp,			// x axis values.
		y: a_sp,			// y axis values.
		z: nusos,			// nus values.
		type: 'surface',	// Type of plot
		showscale: false,	// No show the color scale on the side.
		colorscale: 'Jet'	// Color scheme set as jet.
	},{
		x: al_sp,			// x axis values.
		y: a_sp,			// y axis values.
		z: nusos,			// nus values.
		type: 'surface',	// Type of plot
		hidesurface: true,	// Show no surface
		contours: {x: { show: true }, y: { show: true }, z: { show: false }}, // Show contour lines ( mesh-like grid)
		showscale: false	// Hide the color scale.
	}];
	
	// If the container is empty, adds the update button.
	if ($('#pnlplot2').is(':empty')) 
		$("#pnlplot2").append('<span id="updateBtn" onclick="updateBtn()">UPDATE</span>');
	
	// Sends the plot to the panel.
	Plotly.newPlot('pnlplot2', trace2, layout2);
}
//// Main variables used in the case ////
let nus  = new Array(6).fill(0);																			// Array for the real-time values of nu. Defined as global so it's accesible by all functions.
let f1, f3, f4, f5, f5p1, f5p2;																				// Folder structure variables for dat.gui controller.




//// Main functions used in the case ////
// function createGUI()
//
// @Descr Creates the controlling interface for the model.
function createGUI() {
	f1 = gui.addFolder('Size controls');																				// Creates the section that will contain the following controllers.
	
	f1.add(slider, 'a').min(0.3).max(0.7).step(0.008).name('a').onChange(function() {remesh()}); 						// Adds the controller for each of the values. The arguments passed are the object that defines the controls 
	f1.add(slider, 'alpha').min(45).max(135).step(1).name('alpha').onChange(function() {remesh()});						// (defined in the parameters file) and the wanted property. Depending on the methods which kind of controller
	f1.open();																											// appears. Here are sliders defined, so extreme values and steps are defined, as well as a name, which is essential.
	
	f3 = gui.addFolder('Controls');																						// Creates the section that will contain the following controllers.
	
	f3.add(slider, 'rectr').name('Recenter drawing');																	// Adds a button with the functionalty to recenter the image, defined bya function in the parameters.
	f3.add(slider, 'reslt').name('Show deformations');																	// Adds a button with the functionalty to display results, defined bya function in the parameters.
	f3.open();																											// Default position of folders is closed, so this shows it when loading it.
}


// function remesh()
//
// @Descr Given changes in parameters, recreates the image with the new values. Works with createFigure.
function remesh() {
	trackChanges(['fx','fy']);																							// Track, for the variables indicated, if the value was changed from the previous position.
	
	// Recalculation of the positions in the array for all variables involved.
	A_PM  = Math.round((slider.a - 0.3)    * 49/0.4);
	AL_PM = Math.round((slider.alpha - 45) * 90/90);
	FX_PM = Math.round((slider.defx - 1));
	FY_PM = Math.round((slider.defy - 1));

	// Recalculation of the coordinates with the new values.
	for (var i = 0; i < COORS_1.length; i++){
		coors[i] = new Array(3);
		
		for (var j = 0; j < coors[i].length; j++){
			coors[i][j] = COORS_1[i][j] + 
						  COORS_2[i][j]*A_ARR[A_PM]*CAL_ARR[AL_PM] + 
						  COORS_3[i][j]*A_ARR[A_PM]*SAL_ARR[AL_PM];
		}
	}
	
	// Centers the coordinates of the image displayed.
	centerCoords();
	
	// Deletes previous deformation matrix.
	for (var i = 0; i < NUM_NODES; i++) {
		for (var j = 0; j < deltx[i].length; j++) {
			deltx[i][j] = 0;
			delty[i][j] = 0;
		}
	}
	
	// Recalculates new deformation matrices with new values.
	for (var i = 0; i < NUM_NODES; i++) {
		for (var j = 0; j < deltx[i].length; j++) {
			
				for (var k = 0; k < cxx.length; k++)
					deltx[i][j] += uxx[k][i][j]*axx[k][A_PM]*alxx[k][AL_PM]*fxx[k][FX_PM]*cxx[k];
				
				for (var k = 0; k < cyy.length; k++)
					delty[i][j] += uyy[k][i][j]*ayy[k][A_PM]*alyy[k][AL_PM]*fyy[k][FY_PM]*cyy[k];
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
	
	f4.add(slider, 'defx').min(1).max(10).step(1).name('Axial deformation').onChange(function() {remesh()});										// Creates the controllers for the deformations. Each time the deformation is moved, the image
	f4.add(slider, 'defy').min(1).max(10).step(1).name('Radial deformation').onChange(function() {remesh()});										// is remeshed in order to include the effects of the deformation. Deformations in here work in an
	f4.open();																																		// additive fashion, which could be combined.
	
	f5   = gui.addFolder('Information controls');
	f5p1 = f5.add(slider, 'plot1', ['xx', 'rr']).name('Homogenization case').onChange(function(value) {guiChange(value)});					// Adds the option for modifying the first plot, correspoding to modal amplitudes in all cases.
	f5p2 = f5.add(slider, 'plot2', ['Nu surfaces', 'Modal functions']).name('Information to show').onChange(function(value) {guiChange(value)});	// Adds the option for choosing the second plot, between nu surfaces and modal functions. Default
	f5.open();																																		// is the nu surfaces.
	
	f6   = gui.addFolder('Nu surfaces');
	f6p1 = f6.add(slider, 'plot2cas', ['nu_rx']).name('Case').onChange(function() {calcNuSurf()});													// Adds the submenu for choosing the correspondant the nu surfaces (as is the default choice).
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
	if (apt == 'xx' || apt == 'rr') {
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
				f6p1            = f6.add(slider, 'plot2cas', ['nu_rx']).name('Case').onChange(function() {calcNuSurf()});
			}
			else if (slider.plot1 == 'rr') {
				slider.plot2cas = 'nu_xy';
				f6p1            = f6.add(slider, 'plot2cas', ['nu_xr']).name('Case').onChange(function() {calcNuSurf()});
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
			f6.add(slider, 'plot3', ['a', 'alfa']).name('Chosen Parameter').onChange(function() {calcModFunc()});
			
			// Adds a fixed amount of modes to display (set as 8 given that is the minimum amount of modes present in a case).
			for (var i = 0; i < 8; i++) 
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
				slider.plot2cas = 'nu_rx';
				f6p1            = f6.add(slider, 'plot2cas', ['nu_rx']).name('Case').onChange(function() {calcNuSurf()});
			}
			else if (slider.plot1 == 'rr') {
				slider.plot2cas = 'nu_xr';
				f6p1            = f6.add(slider, 'plot2cas', ['nu_xr']).name('Case').onChange(function() {calcNuSurf()});
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
			f6.add(slider, 'plot3', ['a', 'alfa']).name('Chosen Parameter').onChange(function() {calcModFunc()});
			
			// Adds a fixed amount of modes to display (set as 8 given that is the minimum amount of modes present in a case).
			for (var i = 0; i < 8; i++) 
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
	
	// Auxiliary variables for nu surface at f = 0.
	let fx_a, fy_a;
	
	// Choosing the value for fx and fy if f = 0.
	if (FX_PM == 0)
		fx_a = 1;
	else
		fx_a = FX_PM;
	
	if (FY_PM == 0)
		fy_a = 1;
	else
		fy_a = FY_PM;
	
	// Dimensions of the lattice.
	r0 = 0.5*A_ARR[A_PM]*SAL_ARR[AL_PM]/Math.sin(0.5*tht);
	w0 = (1-A_ARR[A_PM]*CAL_ARR[AL_PM])*nX;
	
	// Population of the deformation vectors.
	for (var i = 0; i < NUM_NODES; i++) {
		for (var j = 0; j < deltx[i].length; j++) {
			
				for (var k = 0; k < cxx.length; k++)
					u_xx[6*i+j] += uxx[k][i][j]*axx[k][A_PM]*alxx[k][AL_PM]*fxx[k][fx_a]*cxx[k];
				
				for (var k = 0; k < cyy.length; k++)
					u_yy[6*i+j] += uyy[k][i][j]*ayy[k][A_PM]*alyy[k][AL_PM]*fyy[k][fy_a]*cyy[k];
		}
	}
	
	// Conversion to math.js vectors.
	u_xx = math.matrix(u_xx);
	u_yy = math.matrix(u_yy);
	RadF = math.zeros(nL12);
	
	// Computation of the deformed state sizes.
	for (var i = 0; i < nL12; i++) {
		if (i < nL1) {			
			NodSl_1 = math.subset(NodOnLin1, math.index(math.range(i,math.squeeze(math.size(NodOnLin1)),nL1)));
			EleDofs = math.subset(NodeDofs, math.index(NodSl_1,[1,2]));
			PosInSl = math.subset(math.matrix(coors), math.index(NodSl_1,[1,2]));
		} else {			
			NodSl_2 = math.subset(NodOnLin2, math.index(math.range((i-nL1),math.squeeze(math.size(NodOnLin2)),nL2)));
			EleDofs = math.subset(NodeDofs, math.index(NodSl_2,[1,2]));
			PosInSl = math.subset(math.matrix(coors), math.index(NodSl_2,[1,2]));
		}
		
		EleDofs = math.reshape(EleDofs, [math.prod(math.size(EleDofs))]);
		PosInSl = math.reshape(PosInSl, [math.prod(math.size(PosInSl))]);
		PoSlice = math.add(math.subset(u_xx, math.index(EleDofs)), PosInSl);
		
		RadF.subset(math.index(i), circlefit(math.subset(PoSlice, math.index(math.range(0,math.squeeze(math.size(PoSlice)),2))), math.subset(PoSlice, math.index(math.range(1,math.squeeze(math.size(PoSlice)),2)))));
	}
	
	NodSl_x = math.subset(NodOnLin2, math.index(math.range(nL2-1,math.squeeze(math.size(NodOnLin2)),nL2)));
	EleDofx = math.subset(NodeDofs, math.index(NodSl_x,0));
	PosInSx = math.subset(math.matrix(coors), math.index(NodSl_x,0));

	EleDofx = math.reshape(EleDofx, [math.prod(math.size(EleDofx))]);
	PosInSx = math.reshape(PosInSx, [math.prod(math.size(PosInSx))]);
	PoSlicx = math.add(math.subset(u_yy, math.index(EleDofx)), PosInSx);
	
	// Computation of nus by comparing stressed and unestressed case.
	nus[0] = Math.round(-10*(math.mean(RadF)-r0)/r0*10000)/10000;
	nus[1] = Math.round(-10*(math.mean(PoSlicx)-w0)/w0*10000)/10000;
	
	// Depending on the surface to be shown, the value of nu is chosen to display the red dot on the surface.
	if (slider.plot2cas == 'nu_rx') nut = [nus[1]];
	if (slider.plot2cas == 'nu_xr') nut = [nus[0]];
	
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
	if (slider.plot1 == 'xx') pnldata = ['<table>', '<tr>\n<td>nu_rx = ' + nus[1] + '</td>\n</tr>','</table>'].join('\n');
	if (slider.plot1 == 'rr') pnldata = ['<table>', '<tr>\n<td>nu_xr = ' + nus[0] + '</td>\n</tr>','</table>'].join('\n');
		
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
		case 'alfa':
			pramx = AL_ARR.slice();
			pramy = eval('al' + slider.plot1 + '.slice()');
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
	let a_sp  = linspace(0.3,0.7,8);
	
	// Auxiliary variables for nu surface at f = 0.
	let fx_a, fy_a;
	
	// Array with the values of nu to be computed. Is a matrix of size a times size alfa, storing all the values of the surface.
	let nusos = new Array(a_sp.length);
	
	// _sp indexes, since some matrices still need to be addressed in full length.
	let i_sp = linspace(0,49,a_sp.length);
	let j_sp = linspace(0,90,al_sp.length);
	
	// Choosing the value for fx and fy if f = 0.
	if (FX_PM == 0)
		fx_a = 1;
	else
		fx_a = FX_PM;
	
	if (FY_PM == 0)
		fy_a = 1;
	else
		fy_a = FY_PM;
	
	
	console.log(fx_a, fy_a)
	// Looping in a_sp
	for (var i = 0; i < a_sp.length; i++) {
		nusos[i] = [];
		
		// Looping in al_sp
		for (var j = 0; j < al_sp.length; j++) {	
			// Deformation vectors and stiffness matrix given the current parameters. Changes for different a_sp and alfa_sp.						
			let upxx = new Array(6*NUM_NODES).fill(0);
			let upyy = new Array(6*NUM_NODES).fill(0);
			
			// Population of the deformation vectors.
			for (var u = 0; u < NUM_NODES; u++) {	
				for (var v = 0; v < 6; v++) {
					for (var k = 0; k < cxx.length; k++)
						upxx[6*u+v] += uxx[k][u][v]*axx[k][i_sp[i]]*alxx[k][j_sp[j]]*fxx[k][fx_a]*cxx[k];
					
					for (var k = 0; k < cyy.length; k++)
						upyy[6*u+v] += uyy[k][u][v]*ayy[k][i_sp[i]]*alyy[k][j_sp[j]]*fyy[k][fy_a]*cyy[k];
				}
			}
			
			// Conversion to math.js vectors.
			upxx = math.matrix(upxx);
			upyy = math.matrix(upyy);
			
			// For each particular case of nu (so only computes once):
			// tracePt: initial position of the red point.
			// nusos: the value of nu for the given point.	
			switch (slider.plot2cas) {
				case 'nu_xr':
					tracePt.z = [nus[0]];
					RadF = math.zeros(nL12);
			
					for (var k = 0; k < nL12; k++) {

						if (k < nL1) {			
							NodSl_1 = math.subset(NodOnLin1, math.index(math.range(k,math.squeeze(math.size(NodOnLin1)),nL1)));
							EleDofs = math.subset(NodeDofs, math.index(NodSl_1,[1,2]));
							PosInSl = math.subset(math.matrix(coors), math.index(NodSl_1,[1,2]));
						} else {			
							NodSl_2 = math.subset(NodOnLin2, math.index(math.range((k-nL1),math.squeeze(math.size(NodOnLin2)),nL2)));
							EleDofs = math.subset(NodeDofs, math.index(NodSl_2,[1,2]));
							PosInSl = math.subset(math.matrix(coors), math.index(NodSl_2,[1,2]));
						}
						
						EleDofs = math.reshape(EleDofs, [math.prod(math.size(EleDofs))]);
						PosInSl = math.reshape(PosInSl, [math.prod(math.size(PosInSl))]);
						PoSlice = math.add(math.subset(upxx, math.index(EleDofs)), PosInSl);
						
						RadF.subset(math.index(k), circlefit(math.subset(PoSlice, math.index(math.range(0,math.squeeze(math.size(PoSlice)),2))), math.subset(PoSlice, math.index(math.range(1,math.squeeze(math.size(PoSlice)),2)))));
					}
					nusos[i].push(-10*(math.mean(RadF)-r0)/r0);
					break;
				
				case 'nu_rx':
					NodSl_x = math.subset(NodOnLin2, math.index(math.range(nL2-1,math.squeeze(math.size(NodOnLin2)),nL2)));
					EleDofx = math.subset(NodeDofs, math.index(NodSl_x,0));
					PosInSx = math.subset(math.matrix(coors), math.index(NodSl_x,0));

					EleDofx = math.reshape(EleDofx, [math.prod(math.size(EleDofx))]);
					PosInSx = math.reshape(PosInSx, [math.prod(math.size(PosInSx))]);
					PoSlicx = math.add(math.subset(upyy, math.index(EleDofx)), PosInSx);
					
					nusos[i].push(-10*(math.mean(PoSlicx)-w0)/w0);
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
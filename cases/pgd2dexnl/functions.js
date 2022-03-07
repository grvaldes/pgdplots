// function createGUI()
//
// @Descr Creates the controlling interface for the model.
function createGUI() {
	let f1  = gui.addFolder('Size controls');
	
	f1.add(slider, 'alpha').min(45).max(135).step(90/45).name('alpha').onChange(function() {remesh()});
	f1.open();
	
	let f3 = gui.addFolder('Controls');
	
	f3.add(slider, 'rectr').name('Recenter drawing');
	f3.add(slider, 'reslt').name('Show results');
	f3.open();
}


// function createFigure(optional)
//
// @Descr Given nodal coordinates and connectivities, plots the bars corresponding to cell or lattice.
// @input Optional: depending on the case, allows to plot with different parameters such as scale or line type.
function createFigure(apt) {
	if (apt == 1) while(scene.children.length > 0) scene.remove(scene.children[0]);
	
	if (apt != 3) {
		for (var ii = 0; ii < CONNECT.length; ii++) {
			let geometry = new THREE.Geometry();
			let materia1 = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 });
			let materia2 = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
			let materia3 = new THREE.LineDashedMaterial({ color: 0x0000ff, linewidth: 1, dashSize: 10, gapSize: 8 });

			if (apt == 1) {
				geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][0]-1][0], coors[CONNECT[ii][0]-1][1], 0));
				geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][1]-1][0], coors[CONNECT[ii][1]-1][1], 0));
			
				if (scale == 0)
					scene.add(new THREE.Line(geometry, materia1));
				else
					scene.add(new THREE.Line(geometry, materia3));
			
			} else if (apt == 2) {
				let scale = 0.1*slider.scale;
			
				geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][0]-1][0]+scale*(deltx[CONNECT[ii][0]-1][0]+delty[CONNECT[ii][0]-1][0]), coors[CONNECT[ii][0]-1][1]+scale*(deltx[CONNECT[ii][0]-1][1]+delty[CONNECT[ii][0]-1][1]), 0));
				geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][1]-1][0]+scale*(deltx[CONNECT[ii][1]-1][0]+delty[CONNECT[ii][1]-1][0]), coors[CONNECT[ii][1]-1][1]+scale*(deltx[CONNECT[ii][1]-1][1]+delty[CONNECT[ii][1]-1][1]), 0));
			
				if (scale == 0)
					scene.add(new THREE.Line(geometry, materia1));
				else
					scene.add(new THREE.Line(geometry, materia2));
				
			} else if (apt == 0) {
				geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][0]-1][0], coors[CONNECT[ii][0]-1][1], 0));
				geometry.vertices.push(new THREE.Vector3(coors[CONNECT[ii][1]-1][0], coors[CONNECT[ii][1]-1][1], 0));
			
				scene.add(new THREE.Line(geometry, materia1));
			}
		}
	} else if (apt == 3) {
		for (var ii = 0; ii < CONNECTNL.length; ii++) {
			
			let scale = 0.1*slider.scale;		
			
			let curve = new THREE.CatmullRomCurve3( [
					new THREE.Vector3(coorsNL[CONNECTNL[ii][0]-1][0]+scale*(deltxNL[CONNECTNL[ii][0]-1][0]+deltyNL[CONNECTNL[ii][0]-1][0]), coorsNL[CONNECTNL[ii][0]-1][1]+scale*(deltxNL[CONNECTNL[ii][0]-1][1]+deltyNL[CONNECTNL[ii][0]-1][1]), 0),
					new THREE.Vector3(coorsNL[CONNECTNL[ii][1]-1][0]+scale*(deltxNL[CONNECTNL[ii][1]-1][0]+deltyNL[CONNECTNL[ii][1]-1][0]), coorsNL[CONNECTNL[ii][1]-1][1]+scale*(deltxNL[CONNECTNL[ii][1]-1][1]+deltyNL[CONNECTNL[ii][1]-1][1]), 0),
					new THREE.Vector3(coorsNL[CONNECTNL[ii][2]-1][0]+scale*(deltxNL[CONNECTNL[ii][2]-1][0]+deltyNL[CONNECTNL[ii][2]-1][0]), coorsNL[CONNECTNL[ii][2]-1][1]+scale*(deltxNL[CONNECTNL[ii][2]-1][1]+deltyNL[CONNECTNL[ii][2]-1][1]), 0),
					new THREE.Vector3(coorsNL[CONNECTNL[ii][3]-1][0]+scale*(deltxNL[CONNECTNL[ii][3]-1][0]+deltyNL[CONNECTNL[ii][3]-1][0]), coorsNL[CONNECTNL[ii][3]-1][1]+scale*(deltxNL[CONNECTNL[ii][3]-1][1]+deltyNL[CONNECTNL[ii][3]-1][1]), 0)
				] );
				
				let points = curve.getPoints(50);
				
				let materia3 = new THREE.LineBasicMaterial({ color: 0x00aa00, linewidth: 3 });
				let geometry = new THREE.BufferGeometry().setFromPoints( points );
				
				if (scale == 0)
					scene.add(new THREE.Line(geometry, materia1));
				else
					scene.add(new THREE.Line(geometry, materia3));
		}
	}
}


// function remesh(val)
//
// @Descr Given changes in parameters, recreates the image with the new values. Works with createFigure.
function remesh() {
	AL_PM = Math.floor((slider.alpha - 45) * 45/90);
	ST_PM = Math.round(slider.scale)-1;

	for (var i = 0; i < NUM_NODES; i++) {
		for (var j = 0; j < COORS_1[i].length; j++) {
			coors[i][j] = COORS_1[i][j]*ONE_ANG[AL_PM] + COORS_2[i][j]*CAL_ARR[AL_PM] + COORS_3[i][j]*SAL_ARR[AL_PM];
		}
	}
	
	for (var i = 0; i < NUM_NODESNL; i++) {
		for (var j = 0; j < COORS_1NL[i].length; j++) {
			coorsNL[i][j] = COORS_1NL[i][j]*ONE_NL[AL_PM] + COORS_2NL[i][j]*CAL_NL[AL_PM] + COORS_3NL[i][j]*SAL_NL[AL_PM];
		}
	}
	
	// Centers the coordinates of the image displayed.
	centerCoords();
	
	for (var ii = 0; ii < NUM_NODESNL; ii++) {
		coorsNL[ii][0] = coorsNL[ii][0] - xc;
		coorsNL[ii][1] = coorsNL[ii][1] - yc;
	}
	
	for (var i = 0; i < NUM_NODES; i++) {
		for (var j = 0; j < deltx[i].length; j++) {
			deltx[i][j] = 0;
			delty[i][j] = 0;
		}
	}
	
	for (var i = 0; i < NUM_NODESNL; i++) {
		for (var j = 0; j < deltxNL[i].length; j++) {
			deltxNL[i][j] = 0;
			deltyNL[i][j] = 0;
		}
	}
		
	for (var i = 0; i < NUM_NODES; i++) {
		for (var j = 0; j < COORS_1[i].length; j++) {
			
			if (slider.xx)
				for (var k = 0; k < NumPGDX; k++)
					deltx[i][j] += 0.05*slider.scale*ux[k][i][j]*alx[k][AL_PM]*cx[k];
			
			if (slider.yy)
				for (var k = 0; k < NumPGDY; k++)
					delty[i][j] += 0.05*slider.scale*uy[k][i][j]*aly[k][AL_PM]*cy[k];
		}
	}
	
	for (var i = 0; i < NUM_NODESNL; i++) {
		for (var j = 0; j < COORS_1NL[i].length; j++) {
			
			if (slider.xx)
				for (var k = 0; k < NumPGDXNL; k++)
					deltxNL[i][j] += uxNL[k][i][j]*alxNL[k][AL_PM]*omxNL[k][ST_PM]*cxNL[k];
			
			if (slider.yy)
				for (var k = 0; k < NumPGDYNL; k++)
					deltyNL[i][j] += uyNL[k][i][j]*alyNL[k][AL_PM]*omyNL[k][ST_PM]*cyNL[k];
		}
	}
		
	createFigure(FIX_PLOT);
	if (slider.viwll) createFigure(DEF_PLOT);
	if (slider.viwnl) createFigure(NL_PLOT);
}


// function result()
//
// @Descr Computes the solution and displays it on screen. Requires python.
function result() {
	let f4 = gui.addFolder('Results controls');
	
	f4.add(slider, 'viwll').name('Show linear case').onChange(function() {remesh()});
	f4.add(slider, 'viwnl').name('Show non-linear case').onChange(function() {remesh()});
	f4.add(slider, 'xx').name('X deformation').onChange(function() {remesh()});
	f4.add(slider, 'yy').name('Y deformation').onChange(function() {remesh()});
	f4.add(slider, 'scale').min(0).max(50).step(1).name('Strain (%)').onChange(function() {remesh()});
	f4.open();
	
	remesh();
}

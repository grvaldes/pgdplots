// function createGUI()
//
// @Descr Creates the controlling interface for the model.
function createGUI() {
	let f1  = gui.addFolder('Size controls');
	
	f1.add(slider, 'b').min(1.00).max(1.50).step(0.010).name('b').onChange(function(value) {remesh()});
	f1.add(slider, 'a').min(0.30).max(0.70).step(0.008).name('a').onChange(function(value) {remesh()});
	f1.add(slider, 'alpha').min(45).max(135).step(1).name('alpha').onChange(function(value) {remesh()});
	f1.open();
	
	let f2  = gui.addFolder('Lattice parameters');
	
	f2.add(slider, 'nX').name('Horizontal repetition').onChange( function(value) {slider.nX = Math.round(value); remesh()});
	f2.add(slider, 'nY').name('Circular repetition').onChange( function(value) {slider.nY = Math.round(value); remesh()});
	f2.open();
	
	let f3 = gui.addFolder('Controls');
	
	f3.add(slider, 'rectr').name('Recenter drawing');
	f3.open();
}


// function remesh()
//
// @Descr Given changes in parameters, recreates the image with the new values. Works with createFigure. Works inside main loop.
function remesh() {
	
	A_PM   = Math.round((slider.a - 0.3)    * 50/0.4);
	B_PM   = Math.round((slider.b - 1)      * 50/0.5);
	AL_PM  = Math.round((slider.alpha - 45) * 90/90);
	
	NX_PM  = Math.round(slider.nX);
	NY_PM  = Math.round(slider.nY);
	
	NUM_ELEMS = 8*NY_PM*NX_PM - 2*NY_PM*NX_PM + NX_PM + NY_PM;
	NUM_NODES = (8*NY_PM - 2*(NY_PM - 1))*NX_PM - 2*NY_PM*(NX_PM - 1);
	
	conect = new Array(NUM_ELEMS);
	
	for (var i = 0; i < conect.length; i++) 
		conect[i] = new Array(3);
	
	lin1Sup1 = new Array(2*NX_PM);
	lin1Sup2 = new Array(2*NX_PM);
	lin1Sup3 = new Array(2*NX_PM);
	lin2Sup1 = new Array(2*NX_PM+2);
	lin2Sup2 = new Array(2*NX_PM+2);
	lin2Sup3 = new Array(2*NX_PM+2);

	
	cone1 = new Array(NX_PM);
	cone2 = new Array(NX_PM+1);
	cone3 = new Array(2*NX_PM);
	cone4 = new Array(2*NX_PM);
	
	for (var i = 0; i < cone1.length; i++) 
		cone1[i] = [0,0,2];
	
	cone2[0]     = [0,1,1];
	cone2[NX_PM] = [2*NX_PM,2*NX_PM+1,1];
	for (var i = 1; i < cone2.length-1; i++) 
		cone2[i] = [0,0,2];
	
	for (var i = 0; i < cone3.length; i++) {
		cone3[i] = [0,0,3];
		cone4[i] = [0,0,4];
	}
		
		
	for (var i = 0; i < lin1Sup1.length; i++) {
		lin1Sup1[i] = new Array(2);
		lin1Sup2[i] = new Array(2);
		lin1Sup3[i] = new Array(2);
	}
	
	for (var i = 0; i < lin2Sup1.length; i++) {
		lin2Sup1[i] = new Array(2);
		lin2Sup2[i] = new Array(2);
		lin2Sup3[i] = new Array(2);
	}
	
	
	lin2Sup1[0] = COORS_1[0].slice(); lin2Sup1[2*NX_PM+1][0] = COORS_1[5][0]+2*(NX_PM-1); lin2Sup1[2*NX_PM+1][1] = COORS_1[5][1];
	lin2Sup2[0] = COORS_2[0].slice(); lin2Sup2[2*NX_PM+1][0] = COORS_2[5][0]-2*(NX_PM-1); lin2Sup2[2*NX_PM+1][1] = COORS_2[5][1]; 
	lin2Sup3[0] = COORS_3[0].slice(); lin2Sup3[2*NX_PM+1]    = COORS_3[5].slice(); 
	
	
	
	for (var i = 0; i < NX_PM; i++) {
		cone1[i][0] = 2*i; cone1[i][1] = 2*i+1;
	
		lin1Sup1[2*i] = [COORS_1[2][0]+2*i,COORS_1[2][1]];	lin1Sup1[2*i+1] = [COORS_1[3][0]+2*i,COORS_1[3][1]];
		lin1Sup2[2*i] = [COORS_2[2][0]-2*i,COORS_2[2][1]];	lin1Sup2[2*i+1] = [COORS_2[3][0]-2*i,COORS_2[3][1]];
		lin1Sup3[2*i] = COORS_3[2].slice();					lin1Sup3[2*i+1] = COORS_3[3].slice();
		
		if (i < NX_PM-1) {
			cone2[i+1][0] = 2*(i+1); cone2[i+1][1] = 2*(i+1)+1;
		}
		
		cone3[i][0]       = cone2[i][1]+2*NX_PM;   cone3[i][1]       = cone1[i][0];
		cone3[i+NX_PM][0] = cone1[i][1]+4*NX_PM+2; cone3[i+NX_PM][1] = cone2[i+1][0]+2*NX_PM;
		
		cone4[i][0]       = cone2[i+1][0]+2*NX_PM; cone4[i][1]       = cone1[i][1];
		cone4[i+NX_PM][0] = cone1[i][0]+4*NX_PM+2; cone4[i+NX_PM][1] = cone2[i][1]+2*NX_PM;
		
		lin2Sup1[2*i+1] = [COORS_1[1][0]+2*i,COORS_1[1][1]];	lin2Sup1[2*i+2] = [COORS_1[4][0]+2*i,COORS_1[4][1]];
		lin2Sup2[2*i+1] = [COORS_2[1][0]-2*i,COORS_2[1][1]];	lin2Sup2[2*i+2] = [COORS_2[4][0]-2*i,COORS_2[4][1]];
		lin2Sup3[2*i+1] = COORS_3[1].slice();					lin2Sup3[2*i+2] = COORS_3[4].slice();
	}
	
	NodSup1 = new Array(NUM_NODES);
	NodSup2 = new Array(NUM_NODES);
	NodSup3 = new Array(NUM_NODES);
	
	
	for (var i = 0; i < NY_PM; i++) {
		
		for (var j = 0; j < NX_PM; j++)
			conect[j+i*(2*NX_PM-1)] = [cone1[j][0]+i*(4*NX_PM+2),cone1[j][1]+i*(4*NX_PM+2),cone1[j][2]];
		
		for (var j = NX_PM; j < 2*NX_PM-1; j++)
			conect[j+i*(2*NX_PM-1)] = [cone2[j-NX_PM+1][0]+2*NX_PM+i*(4*NX_PM+2),cone2[j-NX_PM+1][1]+2*NX_PM+i*(4*NX_PM+2),cone2[j-NX_PM+1][2]];
		
		conect[NX_PM+NY_PM*(2*NX_PM-1)+2*i]   = [cone2[0][0]+2*NX_PM+i*(4*NX_PM+2),cone2[0][1]+2*NX_PM+i*(4*NX_PM+2),cone2[0][2]];
		conect[NX_PM+NY_PM*(2*NX_PM-1)+2*i+1] = [cone2[NX_PM][0]+2*NX_PM+i*(4*NX_PM+2),cone2[NX_PM][1]+2*NX_PM+i*(4*NX_PM+2),cone2[NX_PM][2]];
		
		for (var j = 0; j < 2*NX_PM; j++)
			conect[j+NX_PM*(2*i+1)+NY_PM*(2*NX_PM+1)] = [cone3[j][0]+i*(4*NX_PM+2),cone3[j][1]+i*(4*NX_PM+2),cone3[j][2]];
		
		for (var j = 0; j < 2*NX_PM; j++)
			conect[j+NX_PM*(2*i+1)+NY_PM*(2*NX_PM+1)+2*NX_PM*NY_PM] = [cone4[j][0]+i*(4*NX_PM+2),cone4[j][1]+i*(4*NX_PM+2),cone4[j][2]];
		
		
		for (var j = 0; j < 2*NX_PM; j++) {
			NodSup1[j+i*(4*NX_PM+2)] = [lin1Sup1[j][0],lin1Sup1[j][1]];
			NodSup2[j+i*(4*NX_PM+2)] = [lin1Sup2[j][0],lin1Sup2[j][1]];
			NodSup3[j+i*(4*NX_PM+2)] = [lin1Sup3[j][0],lin1Sup3[j][1]-2*i];
		}
		
		for (var j = 0; j < 2*NX_PM+2; j++) {
			NodSup1[j+i*(4*NX_PM+2)+2*NX_PM] = [lin2Sup1[j][0],lin2Sup1[j][1]];
			NodSup2[j+i*(4*NX_PM+2)+2*NX_PM] = [lin2Sup2[j][0],lin2Sup2[j][1]];
			NodSup3[j+i*(4*NX_PM+2)+2*NX_PM] = [lin2Sup3[j][0],lin2Sup3[j][1]-2*i];
		}
	}
	
	for (var j = 0; j < 2*NX_PM; j++) {
		NodSup1[j+NY_PM*(4*NX_PM+2)] = [lin1Sup1[j][0],lin1Sup1[j][1]];
		NodSup2[j+NY_PM*(4*NX_PM+2)] = [lin1Sup2[j][0],lin1Sup2[j][1]];
		NodSup3[j+NY_PM*(4*NX_PM+2)] = [lin1Sup3[j][0],lin1Sup3[j][1]-2*NY_PM];
	}
	
	for (var j = 0; j < NX_PM; j++)
		conect[j+NY_PM*(2*NX_PM-1)] = [cone1[j][0]+NY_PM*(4*NX_PM+2),cone1[j][1]+NY_PM*(4*NX_PM+2),cone1[j][2]];
	
	
	for (var i = 0; i < 2*NX_PM; i++) {
		logic1 = [];
		logic2 = [];
	
		for (var j = 0; j < conect.length; j++){
			if (conect[j][0] == NUM_NODES-2*NX_PM+i)
				logic1.push(j);
			if (conect[j][1] == NUM_NODES-2*NX_PM+i)
				logic2.push(j);
		}
		
		for (var j = 0; j < logic1.length; j++)
			conect[logic1[j]][0] = i;
		
		for (var j = 0; j < logic2.length; j++)
			conect[logic2[j]][1] = i;
			
	}

	coors  = new Array(NUM_NODES-2*NX_PM);
	conecs = new Array(conect.length);

	for (var j = 0; j < conect.length; j++)
		conecs[j] = conect[j].slice();
	
	conecs.splice(NY_PM*(2*NX_PM-1), NX_PM);
	
	for (var i = 0; i < conecs.length; i++)
		for (var j = 0; j < conecs[i].length-1; j++)
			conecs[i][j] = conecs[i][j] + 1;
	
	NodCil1 = new Array(NUM_NODES-2*NX_PM);
	NodCil2 = new Array(NUM_NODES-2*NX_PM);
	NodCil3 = new Array(NUM_NODES-2*NX_PM);
	NodSum  = 0;
	
	for (var i = 0; i < NodCil1.length; i++){
		NodCil1[i] = [0,0,0];
		NodCil2[i] = [0,0,0];
		NodCil3[i] = [0,0,0];
	}
	
	for (var i = 0; i < 2*NY_PM; i++) {
		theta_i = i*Math.PI/NY_PM;
		
		fin = (i%2 == 0) ? 2*NX_PM : 2*NX_PM+2;
		
		for (var j = 0; j < fin; j++) {
			NodCil1[j+NodSum][0] = NodSup1[j+NodSum][0];
			NodCil2[j+NodSum][0] = NodSup2[j+NodSum][0];
			NodCil3[j+NodSum][1] = NY_PM*Math.cos(theta_i)/Math.PI;
			NodCil3[j+NodSum][2] = NY_PM*Math.sin(theta_i)/Math.PI;
		}
		
		NodSum = fin + NodSum;	
	}
	
	for (var i = 0; i < NodCil1.length; i++){
		coors[i] = new Array(3);
		
		for (var j = 0; j < coors[i].length; j++){
			coors[i][j] = NodCil1[i][j]*B_ARR[B_PM] + NodCil2[i][j]*A_ARR[A_PM]*CAL_ARR[AL_PM] + NodCil3[i][j]*A_ARR[A_PM]*SAL_ARR[AL_PM];
		}
	}
	
	
	NUM_NODES = coors.length;
	NUM_ELEMS = conecs.length;
	
	// Centers the coordinates of the image displayed.
	centerCoords();
	
	createFigure(LAT_PLOT);
}



//// Execution of the case ////
init();						 // Initialization of the graphics (function found in js/misc/anim.js).
remesh();					 // Due to the way the case is created, remesh is run before execution to show the correct image (local function)
centerFigure();					 // Centers the image created in order to display the correct image (found in js/misc/events.js)
let NUM_NODES = 8;																							// Number of nodes of the initial system
let NUM_ELEMS = 8;																							// Number of elements of the initial system

const COORS_1 = [[-1, 0], [-0.5, 0], [-0.5, 0], [ 0.5, 0], [ 0.5, 0], [ 1, 0], [ 0.5,  0], [-0.5,  0]];		// Separated coordinates matrices. Constant term to be multiplied by
const COORS_2 = [[ 0, 0],   [ 0, 0],   [ 0, 1],   [ 0, 1], [   0, 0], [ 0, 0], [   0, -1], [   0, -1]];		// values of the chosen parameters (see PGD separation for more details).
const COORS_3 = [[ 1, 0],   [ 1, 0],   [ 0, 0],   [ 0, 0], [  -1, 0], [-1, 0], [   0,  0], [   0,  0]];	

const CONNECT = [[ 1, 2], [2, 3], [3, 4], [5, 4], [5, 6], [7, 5], [8, 7], [8, 2]];							// Connectivity matrix for a unit cell.

const A_ARR   = new Array(51);																				// Initialization of array for parameter a.
const B_ARR   = new Array(51);																				// Initialization of array for parameter b.
const AL_ARR  = new Array(91);																				// Initialization of array for parameter alfa.
const SAL_ARR = new Array(91);																				// Initialization of array for sin(alfa).
const CAL_ARR = new Array(91);																				// Initialization of array for cos(alfa).
const COORS_T = new Array(8);																				// Initialization of matrix for sum of separable coordinate matrices.

let B_PM  = 25; 																							// Index to address array b.
let A_PM  = 25; 																							// Index to address array a.
let AL_PM = 15;																								// Index to address array alfa.

for (var i = 0; i < A_ARR.length; i++) {																	
    A_ARR[i]   = 0.3 + i*(0.7-0.3)/(51-1);																	// Filling of array a. 
    B_ARR[i]   = 1.0 + i*(1.5-1.0)/(51-1);																	// Filling of array b.
}

for (var i = 0; i < AL_ARR.length; i++) {																	
    AL_ARR[i]    = 45 + i*(135-45)/(91-1);																	// Filling of array alfa.
	SAL_ARR[i]   = Math.sin(0.25*Math.PI + 0.5*i*Math.PI/(91-1));											// Filling of array sin(alfa).
	CAL_ARR[i]   = Math.cos(0.25*Math.PI + 0.5*i*Math.PI/(91-1));											// Filling of array cos(alfa).
}

for (var i = 0; i < COORS_1.length; i++) {																	
	COORS_T[i] = new Array(2);																				// Initialization of matrix. 

	for (var j = 0; j < COORS_1[i].length; j++)																
		COORS_T[i][j] = COORS_1[i][j]*B_ARR[B_PM] + 														// Filling of matrix by summing terms. 
	                    COORS_2[i][j]*A_ARR[A_PM]*SAL_ARR[AL_PM] + 										
						COORS_3[i][j]*A_ARR[A_PM]*CAL_ARR[AL_PM];										 
}

let slider = {																								// Object for defining the properties of the controller.
	b:     B_ARR[B_PM],																						// Initial property for controller b.
	a:     A_ARR[A_PM],																						// Initial property for controller a.
	alpha: AL_ARR[AL_PM],																					// Initial property for controller alfa.
	nX:    1,																								// Initial property for horizontal repetition.
	nY:    1,																								// Initial property for vertical repetition.
	rectr: function() {centerFigure()}																			// Function that recenters the image.
};

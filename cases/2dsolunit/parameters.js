const NUM_NODES = 8;
const NUM_ELEMS = 8;

const COORS_1 =  [[-1.0000, 0], [-0.5000, 0], [-0.5000, 0], [ 0.5000, 0], [ 0.5000, 0], [ 1.0000, 0], [ 0.5000, 0], [-0.5000, 0]];
const COORS_2 =  [[0,  0], [0,  0], [0,  1], [0,  1], [0,  0], [0,  0], [0, -1], [0, -1]];
const COORS_3 =  [[ 1, 0], [ 1, 0], [ 0, 0], [ 0, 0], [-1, 0], [-1, 0], [ 0, 0], [ 0, 0]];

const CONNECT = [[ 1,  2], [  2,  3], [  3,  4], [  5,  4], [  5,  6], [  7,  5], [  8,  7], [  8,  2]];

const A_ARR   = new Array(50);
const B_ARR   = new Array(50);
const T_ARR   = new Array(50);
const AL_ARR  = new Array(91);
const CAL_ARR = new Array(91);
const SAL_ARR = new Array(91);
const ONE_DIM = new Array(50);
const ONE_ANG = new Array(91);
const COORS_T = new Array(8);

let A_PM  = 25;
let B_PM  = 25;
let T_PM  = 25;
let AL_PM = 15;

for (var i = 0; i < A_ARR.length; i++) {
	A_ARR[i]   = 0.3  + i*(0.7-0.3)/(50-1);
	B_ARR[i]   = 1.0  + i*(1.5-1.0)/(50-1);
	T_ARR[i]   = 0.01 + i*(0.1-0.01)/(50-1);
}

for (var i = 0; i < AL_ARR.length; i++) {
	AL_ARR[i]    = 45 + i*(135-45)/(91-1);
	SAL_ARR[i]   = Math.sin(0.25*Math.PI + 0.5*i*Math.PI/(91-1));
	CAL_ARR[i]   = Math.cos(0.25*Math.PI + 0.5*i*Math.PI/(91-1));
}

for (var i = 0; i < COORS_T.length; i++) {
	COORS_T[i] = new Array(2);

	for (var j = 0; j < COORS_T[i].length; j++)
		COORS_T[i][j] = COORS_1[i][j]*B_ARR[B_PM] + 
						COORS_2[i][j]*A_ARR[A_PM]*SAL_ARR[AL_PM] + 
						COORS_3[i][j]*A_ARR[A_PM]*CAL_ARR[AL_PM];
}


// Slider control (defines controller object properties)
let slider = {
	a:        A_ARR[A_PM],
	b:        B_ARR[B_PM],
	alpha:    AL_ARR[AL_PM],
	t:        T_ARR[T_PM],
	defx:     0.0000,
	defy:     0.0000,
	defxy:    0.0000,
	plot1:    'xx',
	plot2:    'Nu surfaces',
	plot3:    'a',
	plot2cas: 'nu_yx',
	rectr:    function() {centerFigure()},
	reslt:    function() {result()},
	modes0:   true,
	modes1:   true,
	modes2:   true,
	modes3:   true,
	modes4:   true,
	modes5:   false,
	modes6:   false,
	modes7:   false,
	modes8:   false
};

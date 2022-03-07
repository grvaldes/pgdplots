const NUM_NODES = 120;
const NUM_ELEMS = 160;

const COORS_1 =  [[0,0],[0.5000,0],[0.5000,0],[1.5000,0],[1.5000,0],[1.5000,0],[0.5000,0],[2.5000,0],[2.5000,0],[3.5000,0],[3.5000,0],[3.5000,0],[2.5000,0],[4.5000,0],[4.5000,0],[5.5000,0],[5.5000,0],[5.5000,0],[4.5000,0],[6.5000,0],[6.5000,0],[7.5000,0],[7.5000,0],[7.5000,0],[6.5000,0],[8.5000,0],[8.5000,0],[9.5000,0],[9.5000,0],[10.0000,0],[9.5000,0],[8.5000,0],[0,0],[0.5000,0],[1.5000,0],[1.5000,0],[0.5000,0],[2.5000,0],[3.5000,0],[3.5000,0],[2.5000,0],[4.5000,0],[5.5000,0],[5.5000,0],[4.5000,0],[6.5000,0],[7.5000,0],[7.5000,0],[6.5000,0],[8.5000,0],[9.5000,0],[10.0000,0],[9.5000,0],[8.5000,0],[0,0],[0.5000,0],[1.5000,0],[1.5000,0],[0.5000,0],[2.5000,0],[3.5000,0],[3.5000,0],[2.5000,0],[4.5000,0],[5.5000,0],[5.5000,0],[4.5000,0],[6.5000,0],[7.5000,0],[7.5000,0],[6.5000,0],[8.5000,0],[9.5000,0],[10.0000,0],[9.5000,0],[8.5000,0],[0,0],[0.5000,0],[1.5000,0],[1.5000,0],[0.5000,0],[2.5000,0],[3.5000,0],[3.5000,0],[2.5000,0],[4.5000,0],[5.5000,0],[5.5000,0],[4.5000,0],[6.5000,0],[7.5000,0],[7.5000,0],[6.5000,0],[8.5000,0],[9.5000,0],[10.0000,0],[9.5000,0],[8.5000,0],[0,0],[0.5000,0],[1.5000,0],[1.5000,0],[0.5000,0],[2.5000,0],[3.5000,0],[3.5000,0],[2.5000,0],[4.5000,0],[5.5000,0],[5.5000,0],[4.5000,0],[6.5000,0],[7.5000,0],[7.5000,0],[6.5000,0],[8.5000,0],[9.5000,0],[10.0000,0],[9.5000,0],[8.5000,0]];
const COORS_2 =  [[0,0],[0,0],[-1,0],[-1,0],[-2,0],[-1,0],[-1,0],[-2,0],[-3,0],[-3,0],[-4,0],[-3,0],[-3,0],[-4,0],[-5,0],[-5,0],[-6,0],[-5,0],[-5,0],[-6,0],[-7,0],[-7,0],[-8,0],[-7,0],[-7,0],[-8,0],[-9,0],[-9,0],[-10,0],[-10,0],[-9,0],[-9,0],[0,0],[0,0],[-2,0],[-1,0],[-1,0],[-2,0],[-4,0],[-3,0],[-3,0],[-4,0],[-6,0],[-5,0],[-5,0],[-6,0],[-8,0],[-7,0],[-7,0],[-8,0],[-10,0],[-10,0],[-9,0],[-9,0],[0,0],[0,0],[-2,0],[-1,0],[-1,0],[-2,0],[-4,0],[-3,0],[-3,0],[-4,0],[-6,0],[-5,0],[-5,0],[-6,0],[-8,0],[-7,0],[-7,0],[-8,0],[-10,0],[-10,0],[-9,0],[-9,0],[0,0],[0,0],[-2,0],[-1,0],[-1,0],[-2,0],[-4,0],[-3,0],[-3,0],[-4,0],[-6,0],[-5,0],[-5,0],[-6,0],[-8,0],[-7,0],[-7,0],[-8,0],[-10,0],[-10,0],[-9,0],[-9,0],[0,0],[0,0],[-2,0],[-1,0],[-1,0],[-2,0],[-4,0],[-3,0],[-3,0],[-4,0],[-6,0],[-5,0],[-5,0],[-6,0],[-8,0],[-7,0],[-7,0],[-8,0],[-10,0],[-10,0],[-9,0],[-9,0]];
const COORS_3 =  [[0,0],[0,0],[0,1],[0,1],[0,0],[0,-1],[0,-1],[0,0],[0,1],[0,1],[0,0],[0,-1],[0,-1],[0,0],[0,1],[0,1],[0,0],[0,-1],[0,-1],[0,0],[0,1],[0,1],[0,0],[0,-1],[0,-1],[0,0],[0,1],[0,1],[0,0],[0,0],[0,-1],[0,-1],[0,-2],[0,-2],[0,-2],[0,-3],[0,-3],[0,-2],[0,-2],[0,-3],[0,-3],[0,-2],[0,-2],[0,-3],[0,-3],[0,-2],[0,-2],[0,-3],[0,-3],[0,-2],[0,-2],[0,-2],[0,-3],[0,-3],[0,-4],[0,-4],[0,-4],[0,-5],[0,-5],[0,-4],[0,-4],[0,-5],[0,-5],[0,-4],[0,-4],[0,-5],[0,-5],[0,-4],[0,-4],[0,-5],[0,-5],[0,-4],[0,-4],[0,-4],[0,-5],[0,-5],[0,-6],[0,-6],[0,-6],[0,-7],[0,-7],[0,-6],[0,-6],[0,-7],[0,-7],[0,-6],[0,-6],[0,-7],[0,-7],[0,-6],[0,-6],[0,-7],[0,-7],[0,-6],[0,-6],[0,-6],[0,-7],[0,-7],[0,-8],[0,-8],[0,-8],[0,-9],[0,-9],[0,-8],[0,-8],[0,-9],[0,-9],[0,-8],[0,-8],[0,-9],[0,-9],[0,-8],[0,-8],[0,-9],[0,-9],[0,-8],[0,-8],[0,-8],[0,-9],[0,-9]];

const CONNECT = [[1,2],[2,3],[3,4],[5,4],[6,5],[7,6],[7,2],[5,8],[8,9],[9,10],[11,10],[12,11],[13,12],[13,8],[11,14],[14,15],[15,16],[17,16],[18,17],[19,18],[19,14],[17,20],[20,21],[21,22],[23,22],[24,23],[25,24],[25,20],[23,26],[26,27],[27,28],[29,28],[29,30],[31,29],[32,31],[32,26],[33,34],[34,7],[35,6],[36,35],[37,36],[37,34],[35,38],[38,13],[39,12],[40,39],[41,40],[41,38],[39,42],[42,19],[43,18],[44,43],[45,44],[45,42],[43,46],[46,25],[47,24],[48,47],[49,48],[49,46],[47,50],[50,32],[51,31],[51,52],[53,51],[54,53],[54,50],[55,56],[56,37],[57,36],[58,57],[59,58],[59,56],[57,60],[60,41],[61,40],[62,61],[63,62],[63,60],[61,64],[64,45],[65,44],[66,65],[67,66],[67,64],[65,68],[68,49],[69,48],[70,69],[71,70],[71,68],[69,72],[72,54],[73,53],[73,74],[75,73],[76,75],[76,72],[77,78],[78,59],[79,58],[80,79],[81,80],[81,78],[79,82],[82,63],[83,62],[84,83],[85,84],[85,82],[83,86],[86,67],[87,66],[88,87],[89,88],[89,86],[87,90],[90,71],[91,70],[92,91],[93,92],[93,90],[91,94],[94,76],[95,75],[95,96],[97,95],[98,97],[98,94],[99,100],[100,81],[101,80],[102,101],[103,102],[103,100],[101,104],[104,85],[105,84],[106,105],[107,106],[107,104],[105,108],[108,89],[109,88],[110,109],[111,110],[111,108],[109,112],[112,93],[113,92],[114,113],[115,114],[115,112],[113,116],[116,98],[117,97],[117,118],[119,117],[120,119],[120,116]];

const B_ARR   = new Array(50);
const A_ARR   = new Array(50);
const T_ARR   = new Array(50);
const AL_ARR  = new Array(100);
const SAL_ARR = new Array(100);
const CAL_ARR = new Array(100);
const COORS_T = new Array(NUM_NODES);

const nodesXL = [0,32,54,76,98];
const nodesXR = [29,51,73,95,117];
const nodesYB = [2,3,8,9,14,15,20,21,26,27];
const nodesYT = [101,102,105,106,109,110,113,114,118,119];

let B_PM  = 0;
let A_PM  = 24;
let AL_PM = 17;
let T_PM  = 24;

for (var i = 0; i < A_ARR.length; i++) {
    B_ARR[i]   = 1    + i*0.5/49;
    A_ARR[i]   = 0.3  + i*0.4/49;
	T_ARR[i]   = 0.01 + i*0.09/49;
}

for (var i = 0; i < AL_ARR.length; i++) {
	AL_ARR[i]    = 45 + i*(135-45)/(100-1);
    SAL_ARR[i]   = Math.sin(Math.PI/4 + i*0.5*Math.PI/(100-1));
    CAL_ARR[i]   = Math.cos(Math.PI/4 + i*0.5*Math.PI/(100-1));
}

for (var i = 0; i < COORS_T.length; i++) {
	COORS_T[i] = new Array(2);

	for (var j = 0; j < COORS_1[i].length; j++)	{
		COORS_T[i][j] = COORS_1[i][j]*B_ARR[B_PM] + 
						COORS_2[i][j]*A_ARR[A_PM]*CAL_ARR[AL_PM] + 
						COORS_3[i][j]*A_ARR[A_PM]*SAL_ARR[AL_PM];
	}
}

// Slider control (defines controller object properties)
let slider = {
	b:         B_ARR[B_PM],
	a:         A_ARR[A_PM],
	alpha:     AL_ARR[AL_PM],
	t:         T_ARR[T_PM],
	scale:     0,
	defx:      0.0000,
	defy:      0.0000,
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
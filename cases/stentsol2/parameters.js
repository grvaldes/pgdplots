const NUM_NODES = 220;
const NUM_ELEMS = 310;

const COORS_1 =  [[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[0,0,0],[0.5000,0,0],[1.5000,0,0],[2.5000,0,0],[3.5000,0,0],[4.5000,0,0],[5.5000,0,0],[6.5000,0,0],[7.5000,0,0],[8.5000,0,0],[9.5000,0,0],[10.0000,0,0]];
const COORS_2 =  [[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0],[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0],[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0],[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0],[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0],[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0],[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0],[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0],[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0],[-1,0,0],[-1,0,0],[-3,0,0],[-3,0,0],[-5,0,0],[-5,0,0],[-7,0,0],[-7,0,0],[-9,0,0],[-9,0,0],[0,0,0],[0,0,0],[-2,0,0],[-2,0,0],[-4,0,0],[-4,0,0],[-6,0,0],[-6,0,0],[-8,0,0],[-8,0,0],[-10,0,0],[-10,0,0]];
const COORS_3 =  [[0, 3.1962,0],[0, 3.1962,0],[0, 3.1962,0],[0, 3.1962,0],[0, 3.1962,0],[0, 3.1962,0],[0, 3.1962,0],[0, 3.1962,0],[0, 3.1962,0],[0, 3.1962,0],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 3.0398, 0.9877],[0, 2.5858, 1.8787],[0, 2.5858, 1.8787],[0, 2.5858, 1.8787],[0, 2.5858, 1.8787],[0, 2.5858, 1.8787],[0, 2.5858, 1.8787],[0, 2.5858, 1.8787],[0, 2.5858, 1.8787],[0, 2.5858, 1.8787],[0, 2.5858, 1.8787],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 1.8787, 2.5858],[0, 0.9877, 3.0398],[0, 0.9877, 3.0398],[0, 0.9877, 3.0398],[0, 0.9877, 3.0398],[0, 0.9877, 3.0398],[0, 0.9877, 3.0398],[0, 0.9877, 3.0398],[0, 0.9877, 3.0398],[0, 0.9877, 3.0398],[0, 0.9877, 3.0398],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0, 0.0000, 3.1962],[0,-0.9877, 3.0398],[0,-0.9877, 3.0398],[0,-0.9877, 3.0398],[0,-0.9877, 3.0398],[0,-0.9877, 3.0398],[0,-0.9877, 3.0398],[0,-0.9877, 3.0398],[0,-0.9877, 3.0398],[0,-0.9877, 3.0398],[0,-0.9877, 3.0398],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-1.8787, 2.5858],[0,-2.5858, 1.8787],[0,-2.5858, 1.8787],[0,-2.5858, 1.8787],[0,-2.5858, 1.8787],[0,-2.5858, 1.8787],[0,-2.5858, 1.8787],[0,-2.5858, 1.8787],[0,-2.5858, 1.8787],[0,-2.5858, 1.8787],[0,-2.5858, 1.8787],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.0398, 0.9877],[0,-3.1962, 0.0000],[0,-3.1962, 0.0000],[0,-3.1962, 0.0000],[0,-3.1962, 0.0000],[0,-3.1962, 0.0000],[0,-3.1962, 0.0000],[0,-3.1962, 0.0000],[0,-3.1962, 0.0000],[0,-3.1962, 0.0000],[0,-3.1962, 0.0000],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-3.0398,-0.9877],[0,-2.5858,-1.8787],[0,-2.5858,-1.8787],[0,-2.5858,-1.8787],[0,-2.5858,-1.8787],[0,-2.5858,-1.8787],[0,-2.5858,-1.8787],[0,-2.5858,-1.8787],[0,-2.5858,-1.8787],[0,-2.5858,-1.8787],[0,-2.5858,-1.8787],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-1.8787,-2.5858],[0,-0.9877,-3.0398],[0,-0.9877,-3.0398],[0,-0.9877,-3.0398],[0,-0.9877,-3.0398],[0,-0.9877,-3.0398],[0,-0.9877,-3.0398],[0,-0.9877,-3.0398],[0,-0.9877,-3.0398],[0,-0.9877,-3.0398],[0,-0.9877,-3.0398],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0,-0.0000,-3.1962],[0, 0.9877,-3.0398],[0, 0.9877,-3.0398],[0, 0.9877,-3.0398],[0, 0.9877,-3.0398],[0, 0.9877,-3.0398],[0, 0.9877,-3.0398],[0, 0.9877,-3.0398],[0, 0.9877,-3.0398],[0, 0.9877,-3.0398],[0, 0.9877,-3.0398],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 1.8787,-2.5858],[0, 2.5858,-1.8787],[0, 2.5858,-1.8787],[0, 2.5858,-1.8787],[0, 2.5858,-1.8787],[0, 2.5858,-1.8787],[0, 2.5858,-1.8787],[0, 2.5858,-1.8787],[0, 2.5858,-1.8787],[0, 2.5858,-1.8787],[0, 2.5858,-1.8787],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877],[0, 3.0398,-0.9877]];

const CONNECT = [[1,2,2],[3,4,2],[5,6,2],[7,8,2],[9,10,2],[13,14,2],[15,16,2],[17,18,2],[19,20,2],[23,24,2],[25,26,2],[27,28,2],[29,30,2],[31,32,2],[35,36,2],[37,38,2],[39,40,2],[41,42,2],[45,46,2],[47,48,2],[49,50,2],[51,52,2],[53,54,2],[57,58,2],[59,60,2],[61,62,2],[63,64,2],[67,68,2],[69,70,2],[71,72,2],[73,74,2],[75,76,2],[79,80,2],[81,82,2],[83,84,2],[85,86,2],[89,90,2],[91,92,2],[93,94,2],[95,96,2],[97,98,2],[101,102,2],[103,104,2],[105,106,2],[107,108,2],[111,112,2],[113,114,2],[115,116,2],[117,118,2],[119,120,2],[123,124,2],[125,126,2],[127,128,2],[129,130,2],[133,134,2],[135,136,2],[137,138,2],[139,140,2],[141,142,2],[145,146,2],[147,148,2],[149,150,2],[151,152,2],[155,156,2],[157,158,2],[159,160,2],[161,162,2],[163,164,2],[167,168,2],[169,170,2],[171,172,2],[173,174,2],[177,178,2],[179,180,2],[181,182,2],[183,184,2],[185,186,2],[189,190,2],[191,192,2],[193,194,2],[195,196,2],[199,200,2],[201,202,2],[203,204,2],[205,206,2],[207,208,2],[211,212,2],[213,214,2],[215,216,2],[217,218,2],[11,12,1],[21,22,1],[33,34,1],[43,44,1],[55,56,1],[65,66,1],[77,78,1],[87,88,1],[99,100,1],[109,110,1],[121,122,1],[131,132,1],[143,144,1],[153,154,1],[165,166,1],[175,176,1],[187,188,1],[197,198,1],[209,210,1],[219,220,1],[12,1,3],[14,3,3],[16,5,3],[18,7,3],[20,9,3],[24,13,3],[26,15,3],[28,17,3],[30,19,3],[32,21,3],[34,23,3],[36,25,3],[38,27,3],[40,29,3],[42,31,3],[46,35,3],[48,37,3],[50,39,3],[52,41,3],[54,43,3],[56,45,3],[58,47,3],[60,49,3],[62,51,3],[64,53,3],[68,57,3],[70,59,3],[72,61,3],[74,63,3],[76,65,3],[78,67,3],[80,69,3],[82,71,3],[84,73,3],[86,75,3],[90,79,3],[92,81,3],[94,83,3],[96,85,3],[98,87,3],[100,89,3],[102,91,3],[104,93,3],[106,95,3],[108,97,3],[112,101,3],[114,103,3],[116,105,3],[118,107,3],[120,109,3],[122,111,3],[124,113,3],[126,115,3],[128,117,3],[130,119,3],[134,123,3],[136,125,3],[138,127,3],[140,129,3],[142,131,3],[144,133,3],[146,135,3],[148,137,3],[150,139,3],[152,141,3],[156,145,3],[158,147,3],[160,149,3],[162,151,3],[164,153,3],[166,155,3],[168,157,3],[170,159,3],[172,161,3],[174,163,3],[178,167,3],[180,169,3],[182,171,3],[184,173,3],[186,175,3],[188,177,3],[190,179,3],[192,181,3],[194,183,3],[196,185,3],[200,189,3],[202,191,3],[204,193,3],[206,195,3],[208,197,3],[210,199,3],[212,201,3],[214,203,3],[216,205,3],[218,207,3],[2,211,3],[4,213,3],[6,215,3],[8,217,3],[10,219,3],[13,2,4],[15,4,4],[17,6,4],[19,8,4],[21,10,4],[23,12,4],[25,14,4],[27,16,4],[29,18,4],[31,20,4],[35,24,4],[37,26,4],[39,28,4],[41,30,4],[43,32,4],[45,34,4],[47,36,4],[49,38,4],[51,40,4],[53,42,4],[57,46,4],[59,48,4],[61,50,4],[63,52,4],[65,54,4],[67,56,4],[69,58,4],[71,60,4],[73,62,4],[75,64,4],[79,68,4],[81,70,4],[83,72,4],[85,74,4],[87,76,4],[89,78,4],[91,80,4],[93,82,4],[95,84,4],[97,86,4],[101,90,4],[103,92,4],[105,94,4],[107,96,4],[109,98,4],[111,100,4],[113,102,4],[115,104,4],[117,106,4],[119,108,4],[123,112,4],[125,114,4],[127,116,4],[129,118,4],[131,120,4],[133,122,4],[135,124,4],[137,126,4],[139,128,4],[141,130,4],[145,134,4],[147,136,4],[149,138,4],[151,140,4],[153,142,4],[155,144,4],[157,146,4],[159,148,4],[161,150,4],[163,152,4],[167,156,4],[169,158,4],[171,160,4],[173,162,4],[175,164,4],[177,166,4],[179,168,4],[181,170,4],[183,172,4],[185,174,4],[189,178,4],[191,180,4],[193,182,4],[195,184,4],[197,186,4],[199,188,4],[201,190,4],[203,192,4],[205,194,4],[207,196,4],[211,200,4],[213,202,4],[215,204,4],[217,206,4],[219,208,4],[1,210,4],[3,212,4],[5,214,4],[7,216,4],[9,218,4]];

const A_ARR   = new Array(50);
const T_ARR   = new Array(50);
const FX_ARR  = new Array(10);
const FY_ARR  = new Array(10);
const AL_ARR  = new Array(91);
const SAL_ARR = new Array(91);
const CAL_ARR = new Array(91);
const COORS_T = new Array(NUM_NODES);

let A_PM  = 25;
let AL_PM = 15;
let FX_PM  = 0;
let FY_PM  = 0;
let nX    = 5;
let nR    = 10;
let tht   = Math.PI/nR;

for (var i = 0; i < A_ARR.length; i++)
	A_ARR[i]  = 0.3  + i*(0.7-0.3)/(50-1);	

for (var i = 0; i < FX_ARR.length; i++) {
	FX_ARR[i] = i+1;
	FY_ARR[i] = i+1;
}
	

for (var i = 0; i < AL_ARR.length; i++) {
	AL_ARR[i]  = 45 + i*(135-45)/(91-1);
	SAL_ARR[i] = Math.sin(0.25*Math.PI + 0.5*i*Math.PI/(91-1));
	CAL_ARR[i] = Math.cos(0.25*Math.PI + 0.5*i*Math.PI/(91-1));
}



for (var i = 0; i < COORS_T.length; i++) {
	COORS_T[i] = new Array(3);

	for (var j = 0; j < COORS_T[i].length; j++)
		COORS_T[i][j] = COORS_1[i][j] + 
						COORS_2[i][j]*A_ARR[A_PM]*CAL_ARR[AL_PM] + 
						COORS_3[i][j]*A_ARR[A_PM]*SAL_ARR[AL_PM];
}

// Slider control (defines controller object properties)
let slider = {
	a:        A_ARR[A_PM],
	alpha:    AL_ARR[AL_PM],
	defx:     FX_ARR[FX_PM],
	defy:     FY_ARR[FY_PM],
	plot1:    'xx',
	plot2:    'Nu surfaces',
	plot3:    'a',
	plot2cas: 'nu_rx',
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

// Nodes definition for nu calculation
const Lin1 = math.matrix(linspace(0,2*nX-1,0));
const Lin2 = math.matrix(linspace(2*nX,4*nX+1,0));
const nL1  = 10; 
const nL2  = 12;
const nL12 = nL1+nL2;

const NodOnLin1 = math.zeros(2*nX*nR);
const NodOnLin2 = math.zeros(2*(nX+1)*nR);

for (var i = 0; i < nR; i++) {	
	off = i*(4*nX+2);
	
	NodOnLin1.subset(math.index(math.range(2*i*nX, 2*(i+1)*nX)), math.add(Lin1, off));
	NodOnLin2.subset(math.index(math.range(2*i*(nX+1),2*(i+1)*(nX+1))), math.add(Lin2, off));
}

NodeDofs = math.matrix(linspace(0,6*NUM_NODES-1,0));
NodeDofs = math.reshape(NodeDofs, [NUM_NODES, 6]);
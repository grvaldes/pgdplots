//// DEFINE THE PARTS NEEDED ////
let _GRAPHIC = true;					// TRUE: rendering of graphics is loaded.
let _CONTROL = true;					// TRUE: side controller bar is loaded.
let _INFOPNL = true;					// TRUE: lower information panel is loaded.
let _STATPNL = true;					// TRUE: performance square is loaded.
let _3DPROBL = true;					// TRUE: the problem is defined as a 3D problem. FALSE: works as a 2D problem.
let _NEWCORS = true;					// TRUE: clone of coordinates matrix is created to create modifications. FALSE: only leaves original matrix (doesn't allow modifications).
let _NEWCONN = false;					// TRUE: clone of connectivity matrix is created to create modifications. FALSE: only leaves original matrix (doesn't allow modifications).
let _NONLINR = false;					// TRUE: non-linear problem, creates a second set of matrices for non-linear behavior.
let _DEFORMS = true;					// TRUE: deformation is considered in the problem, creates the appropriate matrices.
let _DSHEARS = true;					// TRUE: shear deformation is considerer in the problem, creates appropriate matrices. FALSE: only considers main deformation cases.

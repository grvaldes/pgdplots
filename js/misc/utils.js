// function barLength(pt1, pt2)
//
// @Descr Computes the length of a bar.
// @Param pt1: point 1 of bar.
// @Param pt2: point 2 of bar.
// @retrn length of bar.
function barLength(pt1, pt2) {
	let sum = 0;
	
	if (pt1.length == pt2.length && pt1.length == 3){
		sum += Math.pow(pt2[0]-pt1[0],2);
		sum += Math.pow(pt2[1]-pt1[1],2);
		sum += Math.pow(pt2[2]-pt1[2],2);
	}
	else if (pt1.length == pt2.length && pt1.length == 2){
		sum += Math.pow(pt2[0]-pt1[0],2);
		sum += Math.pow(pt2[1]-pt1[1],2);
	} else {
		console.log("Sizes not equal or dimension not supported.");
	}
	
	return Math.sqrt(sum);
}


// function linspace(xi,xf,c)
//
// @Descr creates linearly spaced vector.
// @Param xi: initial value of space.
// @Param xf: ending value of space.
// @Param c:  amount of terms in space (if 0, integer linspace).
// @retrn d:  vector output.
function linspace(xi, xf, c) {
	let d;
	
	if (c == 0) {
		aux = xf - xi + 1;
		d   = new Array(aux);
	}
	else
		d = new Array(c);
	
	for (var i = 0; i < d.length; i++)
		d[i] = xi + i*(xf-xi)/(d.length-1);
	
	return d;
}


// function circlefit(x,y)
//
// @Descr creates linearly spaced vector.
// @Param x: x coordinate of the center of the circle.
// @Param y: y coordinate of the center of the circle.
// @retrn R: radius of the circle.
function circlefit(x, y) {
	
	xx = math.dotMultiply(x,x); 
	yy = math.dotMultiply(y,y); 
	xy = math.dotMultiply(x,y);
	
	A  = math.zeros(3,3);
	B  = math.zeros(3);
	
	A.subset(math.index(0,0), math.sum(x)), A.subset(math.index(0,1), math.sum(y)), A.subset(math.index(0,2), math.squeeze(math.size(x))); 
	A.subset(math.index(1,0), math.sum(xy)), A.subset(math.index(1,1), math.sum(yy)), A.subset(math.index(1,2), math.sum(y)); 
	A.subset(math.index(2,0), math.sum(xx)), A.subset(math.index(2,1), math.sum(xy)), A.subset(math.index(2,2), math.sum(x)); 
	
	B.subset(math.index(0), -math.sum(math.add(xx, yy)));
	B.subset(math.index(1), -math.sum(math.add(math.dotMultiply(xx,y), math.dotMultiply(yy,y))));
	B.subset(math.index(2), -math.sum(math.add(math.dotMultiply(xx,x), math.dotMultiply(xy,y))));
	
	C = math.lusolve(A, B);
	
	R = math.sqrt(math.add(math.multiply(0.25, math.add(math.pow(math.subset(C, math.index(0,0)),2), math.pow(math.subset(C, math.index(1,0)),2))), - math.subset(C, math.index(2,0))));

	return R;
}
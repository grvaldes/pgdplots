let panel        = document.getElementById('panel');
let about        = document.getElementById('about');
let footer       = document.getElementById('footer');
let span         = document.getElementById('closeBtn');
let expandButton = document.getElementById('expandButton');

// Gives functionality to the menu button (for portrait mode).
expandButton.addEventListener( 'click', function ( event ) {
	event.preventDefault();
	panel.classList.toggle( 'collapsed' );
	footer.classList.toggle( 'collapsed' );
} );


// function getLinkById(id)
// 
// @Descr loads the corresponding case into the main frame, given the link clicked.
// @input id: given by the link in the html file, unique identifier of the case to load.
function getLinkById(id) {
	
	$('#renderframe').remove();
	let caso = window['_' + id];
	let tfrm = '<iframe id="renderframe" name="renderframe" allowfullscreen allowvr onmousewheel=""></iframe>';
	$("body").append(tfrm);
	
	let headt = [
		'<!DOCTYPE html>',
		'<html lang="en">',

		'<head>',
			'<meta charset="utf-8">',
			'<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">',
			'<link rel="stylesheet" href="css/renderLayoutStyle.css">',
			'<link rel="stylesheet" href="css/lowerPanelStyle.css">',
			'<link rel="stylesheet" href="css/fontsStyle.css">',
		'</head>'].join("\n");
	
	let bodya = [
		'<body>',
			'<div id="iholder">',
				'<div id="render"></div>',
				'<div id="guidiv"></div>',
			'</div>'];
	
	bodya.push('<script type="text/javascript" src="js/misc/vars.js"></script>');
	
	bodya.push('<script type="text/javascript" src="js/core/three.js"></script>');
	bodya.push('<script type="text/javascript" src="js/core/stats.js"></script>');
	bodya.push('<script type="text/javascript" src="js/core/jquery.js"></script>');
	bodya.push('<script type="text/javascript" src="js/core/math.min.js"></script>');
	bodya.push('<script type="text/javascript" src="js/core/Projector.js"></script>');
	bodya.push('<script type="text/javascript" src="js/core/dat.gui.min.js"></script>');
	bodya.push('<script type="text/javascript" src="js/core/OrbitControls.js"></script>');
	bodya.push('<script type="text/javascript" src="js/core/CanvasRenderer.js"></script>');
	bodya.push('<script type="text/javascript" src="js/core/plotly-latest.min.js"></script>');
	
	bodya.push('<script type="text/javascript" src="js/misc/utils.js"></script>');
	bodya.push('<script type="text/javascript" src="js/misc/events.js"></script>');
	
	for (var i = 0; i < caso["includes"].length; i++)
		bodya.push('<script type="text/javascript" src="cases/' + id + '/' + caso["includes"][i] + '.js"></script>');
	
	bodya.push('<script type="text/javascript" src="cases/' + id + '/switches.js"></script>');
	bodya.push('<script type="text/javascript" src="cases/' + id + '/parameters.js"></script>');
	bodya.push('<script type="text/javascript" src="cases/' + id + '/functions.js"></script>');
	
	bodya.push('<script type="text/javascript" src="js/misc/anim.js"></script>');
	
	
	bodya.push('<script>');
	bodya.push('    init();');
	bodya.push('</script>');
	
	bodya.push('</body>');
	bodya.push('</html>');
	let bodyt = bodya.join("\n");
		
	let ifrm = document.getElementById('renderframe').contentWindow;

	ifrm.document.open();
	ifrm.document.write(headt);
	ifrm.document.write(bodyt);
	ifrm.document.close();
	
	panel.classList.add( 'collapsed');
	footer.classList.add('collapsed');
}


// function getDocs()
//
// @Descr loads documentation into main frame of the site.
function getDocs() {
	
	let url = 'docs/documentation.html'
	document.getElementById('renderframe').src = url;
	panel.classList.add( 'collapsed' );
}


function getAbout() {
	about.style.display = "block";
}


function closeAbout() {
	about.style.display = "none";
}


window.onclick = function(event) {
		if (event.target == about) {
			about.style.display = "none";
		}
}
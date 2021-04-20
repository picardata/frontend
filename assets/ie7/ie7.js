/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'picardata\'">' + entity + '</span>' + html;
	}
	var icons = {
		'pdicon-Home': '&#xe900;',
		'pdicon-Alert-info': '&#xe901;',
		'pdicon-Apps': '&#xe902;',
		'pdicon-Back-Arrow': '&#xe903;',
		'pdicon-Check': '&#xe904;',
		'pdicon-Chevron-Down': '&#xe905;',
		'pdicon-Chevron-Left': '&#xe907;',
		'pdicon-Chevron-Right': '&#xe906;',
		'pdicon-Collapse': '&#xe908;',
		'pdicon-Configure': '&#xe909;',
		'pdicon-Cross': '&#xe90a;',
		'pdicon-Delete': '&#xe90b;',
		'pdicon-Expand': '&#xe90d;',
		'pdicon-Forms': '&#xe90c;',
		'pdicon-Logout': '&#xe910;',
		'pdicon-Profile': '&#xe90f;',
		'pdicon-Settings': '&#xe90e;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/pdicon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());

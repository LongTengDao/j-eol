/*!
 * 模块名称：j-eol
 * 模块功能：换行符相关共享实用程序。从属于“简计划”。
   　　　　　EOL util. Belong to "Plan J".
 * 模块版本：1.3.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-eol/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-eol/
 */

var version = '1.3.0';

var toString = Object.prototype.toString;

var isArray = (
	/*! j-globals: Array.isArray (polyfill) */
	Array.isArray || function isArray (value) {
		return typeof value==='object' && /*#__PURE__*/ toString.call(value)==='[object Array]';
	}
	/*¡ j-globals: Array.isArray (polyfill) */
);

var undefined$1 = void 0;

var create = Object.create || (
	/*! j-globals: Object.create (polyfill) */
	/*#__PURE__*/ function () {
		var NULL;
		if ( document.domain ) {
			try { dom = new ActiveXObject('htmlfile'); }
			catch (error) { }
		}
		if ( dom ) {
			dom.write('<script><\/script>');
			dom.close();
			NULL = dom.parentWindow.Object.prototype;
		}
		else {
			dom = document.createElement('iframe');
			dom.setAttribute('style', 'display:none !important;_display:none;');//dom.style.display = 'none';
			var parent = document.body || document.documentElement;
			parent.appendChild(dom);
			dom.src = 'javascript:';
			NULL = dom.contentWindow.Object.prototype;
			parent.removeChild(dom);
		}
		var dom = null;
		delete NULL.constructor;
		delete NULL.hasOwnProperty;
		delete NULL.isPrototypeOf;
		delete NULL.propertyIsEnumerable;
		delete NULL.toLocaleString;
		delete NULL.toString;
		delete NULL.valueOf;
		var Null = function () {};
		Null.prototype = NULL;
		var constructor = function () {};
		function __PURE__ (o, properties) {
			if ( properties!==undefined$1 ) { throw TypeError('CAN NOT defineProperties in ES 3 Object.create polyfill'); }
			if ( o===null ) { return new Null; }
			if ( typeof o!=='object' && typeof o!=='function' ) { throw TypeError('Object prototype may only be an Object or null: '+o); }
			constructor.prototype = o;
			var created = new constructor;
			constructor.prototype = NULL;
			return created;
		}
		return function create (o, properties) {
			return /*#__PURE__*/ __PURE__(o, properties);
		};
	}()
	/*¡ j-globals: Object.create (polyfill) */
);

var assign = Object.assign;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

var defineProperty = Object.defineProperty;

var freeze = Object.freeze;

var seal = Object.seal;

var Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		return /*#__PURE__*/ function Module (exports, addOnOrigin) {
			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(null); }
			if ( assign ) { assign(exports, addOnOrigin); }
			else {
				for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } }
				if ( !{ 'toString': null }.propertyIsEnumerable('toString') ) {
					var keys = [ 'constructor', 'propertyIsEnumerable', 'isPrototypeOf', 'hasOwnProperty', 'valueOf', 'toLocaleString', 'toString' ];
					while ( key = keys.pop() ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } }
				}
			}
			exports['default'] = exports;
			if ( seal ) {
				typeof exports==='function' && exports.prototype && seal(exports.prototype);
				if ( toStringTag ) {
					var descriptor = create(null);
					descriptor.value = 'Module';
					defineProperty(exports, toStringTag, descriptor);
				}
				freeze(exports);
			}
			return exports;
		}(exports, addOnOrigin);
	}
	/*¡ j-globals: default (internal) */
);

/*!
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：6.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var clearRegExp = '$_' in RegExp
	? function () {
		var REGEXP = /^/;
		return function clearRegExp                (value    )                {
			REGEXP.test('');
			return value;
		};
	}()
	: function clearRegExp                (value    )                {
		return value;
	};

var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP        = create(null);

function groupify (branches          , uFlag          , noEscape          )         {
	var group        = create(null);
	var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
	for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index]); }
	return sourcify(group, !noEscape);
}
function appendPointBranch (group       , branch        )       {
	if ( branch ) {
		var char         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
		appendPointBranch(group[char] || ( group[char] = create(null) ), branch.slice(char.length));
	}
	else { group[''] = GROUP; }
}

function appendCodeBranch (group       , branch        )       {
	if ( branch ) {
		var char         = branch.charAt(0);
		appendCodeBranch(group[char] || ( group[char] = create(null) ), branch.slice(1));
	}
	else { group[''] = GROUP; }
}

function sourcify (group       , needEscape         )         {
	var branches           = [];
	var singleCharactersBranch           = [];
	var noEmptyBranch          = true;
	for ( var char in group ) {
		if ( char ) {
			var sub_branches         = sourcify(group[char], needEscape);
			if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(char) ) { char = '\\'+char; }
			sub_branches ? branches.push(char+sub_branches) : singleCharactersBranch.push(char);
		}
		else { noEmptyBranch = false; }
	}
	singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length===1 ? singleCharactersBranch[0] : '['+singleCharactersBranch.join('')+']');
	return branches.length===0
		? ''
		: ( branches.length===1 && ( singleCharactersBranch.length || noEmptyBranch )
			? branches[0]
			: '(?:'+branches.join('|')+')'
		)
		+( noEmptyBranch ? '' : '?' );
}

/*¡ j-regexp */

var FLAGS = /\/([a-fh-z]*)g([a-fh-z]*)$/;

function removeGlobal (regExp        ) {
	var flags = FLAGS.exec(''+regExp);
	return flags ? RegExp(regExp, flags[1]+flags[2]) : regExp;
}

function EOL                     (allow                , disallow_uniform                              , uniform_disallow                              ) {
	
	var DISALLOW        ;
	var FIRST         ;
	if ( typeof disallow_uniform==='object' ) {
		DISALLOW = isArray(disallow_uniform) ? RegExp(groupify(disallow_uniform)) : removeGlobal(disallow_uniform);
		FIRST = !uniform_disallow;
	}
	else if ( typeof uniform_disallow==='object' ) {
		DISALLOW = isArray(uniform_disallow) ? RegExp(groupify(uniform_disallow)) : removeGlobal(uniform_disallow);
		FIRST = !disallow_uniform;
	}
	else {
		FIRST = !( uniform_disallow || disallow_uniform );
	}
	var ALLOW = isArray(allow)
		? FIRST
			? RegExp(groupify(allow))
			: RegExp(groupify(allow), 'g')
		: allow;
	
	return function EOL (string        )           {
		if ( DISALLOW && DISALLOW.test(string) ) { throw clearRegExp(SyntaxError)('存在禁用换行符'); }
		var eols = clearRegExp(string.match(ALLOW))                ;
		if ( !eols ) { return ''; }
		if ( FIRST ) { return eols[0]; }
		var eol = eols[0];
		for ( var length = eols.length, index = 1; index<length; ++index ) { if ( eols[index]!==eol ) { throw SyntaxError('存在多种换行符'); } }
		return eol;
	};
	
}

var LF     = '\n';
var VT     = '\x0B';
var FF     = '\f';
var CRLF       = '\r\n';
var CR     = '\r';
var NEL      = '\x85';
var LS     = '\u2028';
var PS     = '\u2029';
var _export = Default(EOL, {
	version: version,
	EOL: EOL,
	LF: LF,
	VT: VT,
	FF: FF,
	CRLF: CRLF,
	CR: CR,
	NEL: NEL,
	LS: LS,
	PS: PS
});

export default _export;
export { CR, CRLF, EOL, FF, LF, LS, NEL, PS, VT, version };

/*¡ j-eol */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy9jbGVhclJlZ0V4cC50cyIsIi4uLy4uL2otZ3JvdXBpZnkvc3JjL2dyb3VwaWZ5LnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICcxLjMuMCc7IiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxudmFyIGNsZWFyUmVnRXhwID0gJyRfJyBpbiBSZWdFeHBcblx0PyBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIFJFR0VYUCA9IC9eLztcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdFx0UkVHRVhQLnRlc3QoJycpO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH0oKVxuXHQ6IGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFyUmVnRXhwOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgICAgICAgID0gY3JlYXRlKG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgICAgICAgICAgLCB1RmxhZyAgICAgICAgICAsIG5vRXNjYXBlICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBncm91cCAgICAgICAgPSBjcmVhdGUobnVsbCk7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoY2hhci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciAgICAgICAgID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJdIHx8ICggZ3JvdXBbY2hhcl0gPSBjcmVhdGUobnVsbCkgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyAgICAgICAgID0gc291cmNpZnkoZ3JvdXBbY2hhcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXIpICkgeyBjaGFyID0gJ1xcXFwnK2NoYXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcitzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTBcblx0XHQ/ICcnXG5cdFx0OiAoIGJyYW5jaGVzLmxlbmd0aD09PTEgJiYgKCBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCB8fCBub0VtcHR5QnJhbmNoIClcblx0XHRcdD8gYnJhbmNoZXNbMF1cblx0XHRcdDogJyg/OicrYnJhbmNoZXMuam9pbignfCcpKycpJ1xuXHRcdClcblx0XHQrKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5leHBvcnQgeyB2ZXJzaW9uIH07XG5cbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5Pz0nO1xuXG5pbXBvcnQgeyBncm91cGlmeSwgY2xlYXJSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxudmFyIEZMQUdTID0gL1xcLyhbYS1maC16XSopZyhbYS1maC16XSopJC87XG5cbmZ1bmN0aW9uIHJlbW92ZUdsb2JhbCAocmVnRXhwICAgICAgICApIHtcblx0dmFyIGZsYWdzID0gRkxBR1MuZXhlYygnJytyZWdFeHApO1xuXHRyZXR1cm4gZmxhZ3MgPyBSZWdFeHAocmVnRXhwLCBmbGFnc1sxXStmbGFnc1syXSkgOiByZWdFeHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFT0wgICAgICAgICAgICAgICAgICAgICAoYWxsb3cgICAgICAgICAgICAgICAgLCBkaXNhbGxvd191bmlmb3JtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB1bmlmb3JtX2Rpc2FsbG93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFxuXHR2YXIgRElTQUxMT1cgICAgICAgIDtcblx0dmFyIEZJUlNUICAgICAgICAgO1xuXHRpZiAoIHR5cGVvZiBkaXNhbGxvd191bmlmb3JtPT09J29iamVjdCcgKSB7XG5cdFx0RElTQUxMT1cgPSBpc0FycmF5KGRpc2FsbG93X3VuaWZvcm0pID8gUmVnRXhwKGdyb3VwaWZ5KGRpc2FsbG93X3VuaWZvcm0pKSA6IHJlbW92ZUdsb2JhbChkaXNhbGxvd191bmlmb3JtKTtcblx0XHRGSVJTVCA9ICF1bmlmb3JtX2Rpc2FsbG93O1xuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2YgdW5pZm9ybV9kaXNhbGxvdz09PSdvYmplY3QnICkge1xuXHRcdERJU0FMTE9XID0gaXNBcnJheSh1bmlmb3JtX2Rpc2FsbG93KSA/IFJlZ0V4cChncm91cGlmeSh1bmlmb3JtX2Rpc2FsbG93KSkgOiByZW1vdmVHbG9iYWwodW5pZm9ybV9kaXNhbGxvdyk7XG5cdFx0RklSU1QgPSAhZGlzYWxsb3dfdW5pZm9ybTtcblx0fVxuXHRlbHNlIHtcblx0XHRGSVJTVCA9ICEoIHVuaWZvcm1fZGlzYWxsb3cgfHwgZGlzYWxsb3dfdW5pZm9ybSApO1xuXHR9XG5cdHZhciBBTExPVyA9IGlzQXJyYXkoYWxsb3cpXG5cdFx0PyBGSVJTVFxuXHRcdFx0PyBSZWdFeHAoZ3JvdXBpZnkoYWxsb3cpKVxuXHRcdFx0OiBSZWdFeHAoZ3JvdXBpZnkoYWxsb3cpLCAnZycpXG5cdFx0OiBhbGxvdztcblx0XG5cdHJldHVybiBmdW5jdGlvbiBFT0wgKHN0cmluZyAgICAgICAgKSAgICAgICAgICAge1xuXHRcdGlmICggRElTQUxMT1cgJiYgRElTQUxMT1cudGVzdChzdHJpbmcpICkgeyB0aHJvdyBjbGVhclJlZ0V4cChTeW50YXhFcnJvcikoJ+WtmOWcqOemgeeUqOaNouihjOespicpOyB9XG5cdFx0dmFyIGVvbHMgPSBjbGVhclJlZ0V4cChzdHJpbmcubWF0Y2goQUxMT1cpKSAgICAgICAgICAgICAgICA7XG5cdFx0aWYgKCAhZW9scyApIHsgcmV0dXJuICcnOyB9XG5cdFx0aWYgKCBGSVJTVCApIHsgcmV0dXJuIGVvbHNbMF07IH1cblx0XHR2YXIgZW9sID0gZW9sc1swXTtcblx0XHRmb3IgKCB2YXIgbGVuZ3RoID0gZW9scy5sZW5ndGgsIGluZGV4ID0gMTsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBpZiAoIGVvbHNbaW5kZXhdIT09ZW9sICkgeyB0aHJvdyBTeW50YXhFcnJvcign5a2Y5Zyo5aSa56eN5o2i6KGM56ymJyk7IH0gfVxuXHRcdHJldHVybiBlb2w7XG5cdH07XG5cdFxufVxuXG5leHBvcnQgdmFyIExGICAgICA9ICdcXG4nO1xuZXhwb3J0IHZhciBWVCAgICAgPSAnXFx4MEInO1xuZXhwb3J0IHZhciBGRiAgICAgPSAnXFxmJztcbmV4cG9ydCB2YXIgQ1JMRiAgICAgICA9ICdcXHJcXG4nO1xuZXhwb3J0IHZhciBDUiAgICAgPSAnXFxyJztcbmV4cG9ydCB2YXIgTkVMICAgICAgPSAnXFx4ODUnO1xuZXhwb3J0IHZhciBMUyAgICAgPSAnXFx1MjAyOCc7XG5leHBvcnQgdmFyIFBTICAgICA9ICdcXHUyMDI5JztcblxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdChFT0wsIHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0RU9MOiBFT0wsXG5cdExGOiBMRixcblx0VlQ6IFZULFxuXHRGRjogRkYsXG5cdENSTEY6IENSTEYsXG5cdENSOiBDUixcblx0TkVMOiBORUwsXG5cdExTOiBMUyxcblx0UFM6IFBTXG59KTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxjQUFlLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNFdEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLE1BQU07R0FDN0IsWUFBWTtFQUNiLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztFQUNqQixPQUFPLFNBQVMsV0FBVyxpQkFBaUIsS0FBSyxxQkFBcUI7R0FDckUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNoQixPQUFPLEtBQUssQ0FB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
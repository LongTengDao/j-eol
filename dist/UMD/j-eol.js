/*!
 * 模块名称：j-eol
 * 模块功能：换行符相关共享实用程序。从属于“简计划”。
   　　　　　EOL util. Belong to "Plan J".
 * 模块版本：1.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-eol/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-eol/
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.EOL = factory());
}(this, function () { 'use strict';

	var version = '1.2.0';

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
	 * 模块版本：5.3.0
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

	function EOL                     (allow                , disallow_uniform                              , uniform_disallow                              ) {
		
		if ( typeof disallow_uniform==='object' ) {
			DISALLOW = isArray(disallow_uniform) ? new RegExp(groupify(disallow_uniform)) : disallow_uniform;
			FIRST = !uniform_disallow;
		}
		else if ( typeof uniform_disallow==='object' ) {
			DISALLOW = isArray(uniform_disallow) ? new RegExp(groupify(uniform_disallow)) : uniform_disallow;
			FIRST = !disallow_uniform;
		}
		else {
			FIRST = !( uniform_disallow || disallow_uniform );
		}
		var DISALLOW        ;
		var FIRST         ;
		var ALLOW = isArray(allow) ? new RegExp(groupify(allow), FIRST ? '' : 'g') : allow;
		
		return function EOL (string        )           {
			if ( DISALLOW && DISALLOW.test(string) ) { throw clearRegExp(SyntaxError)('存在禁用换行符'); }
			var eols               =                clearRegExp(string.match(ALLOW));
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

	return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy9jbGVhclJlZ0V4cC50cyIsIi4uLy4uL2otZ3JvdXBpZnkvc3JjL2dyb3VwaWZ5LnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICcxLjIuMCc7IiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxudmFyIGNsZWFyUmVnRXhwID0gJyRfJyBpbiBSZWdFeHBcblx0PyBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIFJFR0VYUCA9IC9eLztcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdFx0UkVHRVhQLnRlc3QoJycpO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH0oKVxuXHQ6IGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFyUmVnRXhwOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5cbnZhciBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAgPSAvXlskKCkqK1xcLS4/W1xcXFxcXF1ee3xdLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgICAgICAgID0gY3JlYXRlKG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgICAgICAgICAgLCB1RmxhZyAgICAgICAgICAsIG5vRXNjYXBlICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBncm91cCAgICAgICAgPSBjcmVhdGUobnVsbCk7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoY2hhci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciAgICAgICAgID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJdIHx8ICggZ3JvdXBbY2hhcl0gPSBjcmVhdGUobnVsbCkgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyAgICAgICAgID0gc291cmNpZnkoZ3JvdXBbY2hhcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXIpICkgeyBjaGFyID0gJ1xcXFwnK2NoYXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcitzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTBcblx0XHQ/ICcnXG5cdFx0OiAoIGJyYW5jaGVzLmxlbmd0aD09PTEgJiYgKCBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCB8fCBub0VtcHR5QnJhbmNoIClcblx0XHRcdD8gYnJhbmNoZXNbMF1cblx0XHRcdDogJyg/OicrYnJhbmNoZXMuam9pbignfCcpKycpJ1xuXHRcdClcblx0XHQrKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5leHBvcnQgeyB2ZXJzaW9uIH07XG5cbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5Pz0nO1xuXG5pbXBvcnQgeyBncm91cGlmeSwgY2xlYXJSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuZXhwb3J0IGZ1bmN0aW9uIEVPTCAgICAgICAgICAgICAgICAgICAgIChhbGxvdyAgICAgICAgICAgICAgICAsIGRpc2FsbG93X3VuaWZvcm0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHVuaWZvcm1fZGlzYWxsb3cgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XG5cdGlmICggdHlwZW9mIGRpc2FsbG93X3VuaWZvcm09PT0nb2JqZWN0JyApIHtcblx0XHRESVNBTExPVyA9IGlzQXJyYXkoZGlzYWxsb3dfdW5pZm9ybSkgPyBuZXcgUmVnRXhwKGdyb3VwaWZ5KGRpc2FsbG93X3VuaWZvcm0pKSA6IGRpc2FsbG93X3VuaWZvcm07XG5cdFx0RklSU1QgPSAhdW5pZm9ybV9kaXNhbGxvdztcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHVuaWZvcm1fZGlzYWxsb3c9PT0nb2JqZWN0JyApIHtcblx0XHRESVNBTExPVyA9IGlzQXJyYXkodW5pZm9ybV9kaXNhbGxvdykgPyBuZXcgUmVnRXhwKGdyb3VwaWZ5KHVuaWZvcm1fZGlzYWxsb3cpKSA6IHVuaWZvcm1fZGlzYWxsb3c7XG5cdFx0RklSU1QgPSAhZGlzYWxsb3dfdW5pZm9ybTtcblx0fVxuXHRlbHNlIHtcblx0XHRGSVJTVCA9ICEoIHVuaWZvcm1fZGlzYWxsb3cgfHwgZGlzYWxsb3dfdW5pZm9ybSApO1xuXHR9XG5cdHZhciBESVNBTExPVyAgICAgICAgO1xuXHR2YXIgRklSU1QgICAgICAgICA7XG5cdHZhciBBTExPVyA9IGlzQXJyYXkoYWxsb3cpID8gbmV3IFJlZ0V4cChncm91cGlmeShhbGxvdyksIEZJUlNUID8gJycgOiAnZycpIDogYWxsb3c7XG5cdFxuXHRyZXR1cm4gZnVuY3Rpb24gRU9MIChzdHJpbmcgICAgICAgICkgICAgICAgICAgIHtcblx0XHRpZiAoIERJU0FMTE9XICYmIERJU0FMTE9XLnRlc3Qoc3RyaW5nKSApIHsgdGhyb3cgY2xlYXJSZWdFeHAoU3ludGF4RXJyb3IpKCflrZjlnKjnpoHnlKjmjaLooYznrKYnKTsgfVxuXHRcdHZhciBlb2xzICAgICAgICAgICAgICAgPSAgICAgICAgICAgICAgICBjbGVhclJlZ0V4cChzdHJpbmcubWF0Y2goQUxMT1cpKTtcblx0XHRpZiAoICFlb2xzICkgeyByZXR1cm4gJyc7IH1cblx0XHRpZiAoIEZJUlNUICkgeyByZXR1cm4gZW9sc1swXTsgfVxuXHRcdHZhciBlb2wgPSBlb2xzWzBdO1xuXHRcdGZvciAoIHZhciBsZW5ndGggPSBlb2xzLmxlbmd0aCwgaW5kZXggPSAxOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGlmICggZW9sc1tpbmRleF0hPT1lb2wgKSB7IHRocm93IFN5bnRheEVycm9yKCflrZjlnKjlpJrnp43mjaLooYznrKYnKTsgfSB9XG5cdFx0cmV0dXJuIGVvbDtcblx0fTtcblx0XG59XG5cbmV4cG9ydCB2YXIgTEYgICAgID0gJ1xcbic7XG5leHBvcnQgdmFyIFZUICAgICA9ICdcXHgwQic7XG5leHBvcnQgdmFyIEZGICAgICA9ICdcXGYnO1xuZXhwb3J0IHZhciBDUkxGICAgICAgID0gJ1xcclxcbic7XG5leHBvcnQgdmFyIENSICAgICA9ICdcXHInO1xuZXhwb3J0IHZhciBORUwgICAgICA9ICdcXHg4NSc7XG5leHBvcnQgdmFyIExTICAgICA9ICdcXHUyMDI4JztcbmV4cG9ydCB2YXIgUFMgICAgID0gJ1xcdTIwMjknO1xuXG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQ/PSc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KEVPTCwge1xuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRFT0w6IEVPTCxcblx0TEY6IExGLFxuXHRWVDogVlQsXG5cdEZGOiBGRixcblx0Q1JMRjogQ1JMRixcblx0Q1I6IENSLFxuXHRORUw6IE5FTCxcblx0TFM6IExTLFxuXHRQUzogUFNcbn0pOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGVBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQ0V0QixJQUFJLFdBQVcsR0FBRyxJQUFJLElBQUksTUFBTTtJQUM3QixZQUFZO0dBQ2IsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO0dBQ2pCLE9BQU8sU0FBUyxXQUFXLGlCQUFpQixLQUFLLHFCQUFxQjtJQUNyRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLE9BQU8sS0FBSyxDQUFDO0lBQ2IsQ0FBQztHQUNGLEVBQUU7SUFDRCxTQUFTLFdBQVcsaUJBQWlCLEtBQUsscUJBQXFCO0dBQ2hFLE9BQU8sS0FBSyxDQUFDO0dBQ2IsQ0FBQzs7Q0NWSCxJQUFJLHdCQUF3QixHQUFHLHNCQUFzQixDQUFDO0NBQ3RELElBQUksY0FBYyxHQUFHLGlDQUFpQyxDQUFDO0NBQ3ZELElBQUksS0FBSyxVQUFVLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Q0FFaEMsU0FBd0IsUUFBUSxFQUFFLFFBQVEsWUFBWSxL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
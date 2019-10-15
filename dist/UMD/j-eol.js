﻿/*!
 * 模块名称：j-eol
 * 模块功能：换行符相关共享实用程序。从属于“简计划”。
   　　　　　EOL util. Belong to "Plan J".
 * 模块版本：1.3.1
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

	var version = '1.3.1';

	var toString = Object.prototype.toString;

	var isArray = (
		/*! j-globals: Array.isArray (polyfill) */
		Array.isArray || function isArray (value) {
			return /*#__PURE__*/ toString.call(value)==='[object Array]';
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

	var NULL = (
		/*! j-globals: null.prototype (internal) */
		Object.create
			? /*#__PURE__*/ Object.preventExtensions(Object.create(null))
			: null
		/*¡ j-globals: null.prototype (internal) */
	);

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

	var assign = Object.assign;
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
	 * 模块版本：6.2.1
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
	var GROUP = create(NULL)         ;

	function groupify (branches          , uFlag          , noEscape          )         {
		var group = create(NULL)         ;
		var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
		for ( var length         = branches.length, index         = 0; index<length; ++index ) { appendBranch(group, branches[index]); }
		return sourcify(group, !noEscape);
	}
	function appendPointBranch (group       , branch        )       {
		if ( branch ) {
			var character         = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
			appendPointBranch(group[character] || ( group[character] = create(NULL)          ), branch.slice(character.length));
		}
		else { group[''] = GROUP; }
	}

	function appendCodeBranch (group       , branch        )       {
		if ( branch ) {
			var character         = branch.charAt(0);
			appendCodeBranch(group[character] || ( group[character] = create(NULL)          ), branch.slice(1));
		}
		else { group[''] = GROUP; }
	}

	function sourcify (group       , needEscape         )         {
		var branches           = [];
		var singleCharactersBranch           = [];
		var noEmptyBranch          = true;
		for ( var character in group ) {
			if ( character ) {
				var sub_branches         = sourcify(group[character], needEscape);
				if ( needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(character) ) { character = '\\'+character; }
				sub_branches ? branches.push(character+sub_branches) : singleCharactersBranch.push(character);
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

	return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy9jbGVhclJlZ0V4cC50cyIsIi4uLy4uL2otZ3JvdXBpZnkvc3JjL2dyb3VwaWZ5LnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICcxLjMuMSc7IiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxudmFyIGNsZWFyUmVnRXhwID0gJyRfJyBpbiBSZWdFeHBcblx0PyBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIFJFR0VYUCA9IC9eLztcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdFx0UkVHRVhQLnRlc3QoJycpO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH0oKVxuXHQ6IGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFyUmVnRXhwOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQID0gL15bJCgpKitcXC0uP1tcXFxcXFxdXnt8XS87XG52YXIgU1VSUk9HQVRFX1BBSVIgPSAvXltcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIEdST1VQID0gY3JlYXRlKE5VTEwpICAgICAgICAgO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgICAgICAgICAgLCB1RmxhZyAgICAgICAgICAsIG5vRXNjYXBlICAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBncm91cCA9IGNyZWF0ZShOVUxMKSAgICAgICAgIDtcblx0dmFyIGFwcGVuZEJyYW5jaCA9IHVGbGFnID8gYXBwZW5kUG9pbnRCcmFuY2ggOiBhcHBlbmRDb2RlQnJhbmNoO1xuXHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSBicmFuY2hlcy5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGFwcGVuZEJyYW5jaChncm91cCwgYnJhbmNoZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gc291cmNpZnkoZ3JvdXAsICFub0VzY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmRQb2ludEJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBTVVJST0dBVEVfUEFJUi50ZXN0KGJyYW5jaCkgPyBicmFuY2guc2xpY2UoMCwgMikgOiBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZFBvaW50QnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZShjaGFyYWN0ZXIubGVuZ3RoKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvZGVCcmFuY2ggKGdyb3VwICAgICAgICwgYnJhbmNoICAgICAgICApICAgICAgIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXJhY3RlciAgICAgICAgID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJhY3Rlcl0gfHwgKCBncm91cFtjaGFyYWN0ZXJdID0gY3JlYXRlKE5VTEwpICAgICAgICAgICksIGJyYW5jaC5zbGljZSgxKSk7XG5cdH1cblx0ZWxzZSB7IGdyb3VwWycnXSA9IEdST1VQOyB9XG59XG5cbmZ1bmN0aW9uIHNvdXJjaWZ5IChncm91cCAgICAgICAsIG5lZWRFc2NhcGUgICAgICAgICApICAgICAgICAge1xuXHR2YXIgYnJhbmNoZXMgICAgICAgICAgID0gW107XG5cdHZhciBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoICAgICAgICAgICA9IFtdO1xuXHR2YXIgbm9FbXB0eUJyYW5jaCAgICAgICAgICA9IHRydWU7XG5cdGZvciAoIHZhciBjaGFyYWN0ZXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyYWN0ZXIgKSB7XG5cdFx0XHR2YXIgc3ViX2JyYW5jaGVzICAgICAgICAgPSBzb3VyY2lmeShncm91cFtjaGFyYWN0ZXJdLCBuZWVkRXNjYXBlKTtcblx0XHRcdGlmICggbmVlZEVzY2FwZSAmJiBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAudGVzdChjaGFyYWN0ZXIpICkgeyBjaGFyYWN0ZXIgPSAnXFxcXCcrY2hhcmFjdGVyOyB9XG5cdFx0XHRzdWJfYnJhbmNoZXMgPyBicmFuY2hlcy5wdXNoKGNoYXJhY3RlcitzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXJhY3Rlcik7XG5cdFx0fVxuXHRcdGVsc2UgeyBub0VtcHR5QnJhbmNoID0gZmFsc2U7IH1cblx0fVxuXHRzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCAmJiBicmFuY2hlcy51bnNoaWZ0KHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoPT09MSA/IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2hbMF0gOiAnWycrc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5qb2luKCcnKSsnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyticmFuY2hlcy5qb2luKCd8JykrJyknXG5cdFx0KVxuXHRcdCsoIG5vRW1wdHlCcmFuY2ggPyAnJyA6ICc/JyApO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheT89JztcblxuaW1wb3J0IHsgZ3JvdXBpZnksIGNsZWFyUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbnZhciBGTEFHUyA9IC9cXC8oW2EtZmgtel0qKWcoW2EtZmgtel0qKSQvO1xuXG5mdW5jdGlvbiByZW1vdmVHbG9iYWwgKHJlZ0V4cCAgICAgICAgKSB7XG5cdHZhciBmbGFncyA9IEZMQUdTLmV4ZWMoJycrcmVnRXhwKTtcblx0cmV0dXJuIGZsYWdzID8gUmVnRXhwKHJlZ0V4cCwgZmxhZ3NbMV0rZmxhZ3NbMl0pIDogcmVnRXhwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRU9MICAgICAgICAgICAgICAgICAgICAgKGFsbG93ICAgICAgICAgICAgICAgICwgZGlzYWxsb3dfdW5pZm9ybSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdW5pZm9ybV9kaXNhbGxvdyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcblx0dmFyIERJU0FMTE9XICAgICAgICA7XG5cdHZhciBGSVJTVCAgICAgICAgIDtcblx0aWYgKCB0eXBlb2YgZGlzYWxsb3dfdW5pZm9ybT09PSdvYmplY3QnICkge1xuXHRcdERJU0FMTE9XID0gaXNBcnJheShkaXNhbGxvd191bmlmb3JtKSA/IFJlZ0V4cChncm91cGlmeShkaXNhbGxvd191bmlmb3JtKSkgOiByZW1vdmVHbG9iYWwoZGlzYWxsb3dfdW5pZm9ybSk7XG5cdFx0RklSU1QgPSAhdW5pZm9ybV9kaXNhbGxvdztcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHVuaWZvcm1fZGlzYWxsb3c9PT0nb2JqZWN0JyApIHtcblx0XHRESVNBTExPVyA9IGlzQXJyYXkodW5pZm9ybV9kaXNhbGxvdykgPyBSZWdFeHAoZ3JvdXBpZnkodW5pZm9ybV9kaXNhbGxvdykpIDogcmVtb3ZlR2xvYmFsKHVuaWZvcm1fZGlzYWxsb3cpO1xuXHRcdEZJUlNUID0gIWRpc2FsbG93X3VuaWZvcm07XG5cdH1cblx0ZWxzZSB7XG5cdFx0RklSU1QgPSAhKCB1bmlmb3JtX2Rpc2FsbG93IHx8IGRpc2FsbG93X3VuaWZvcm0gKTtcblx0fVxuXHR2YXIgQUxMT1cgPSBpc0FycmF5KGFsbG93KVxuXHRcdD8gRklSU1Rcblx0XHRcdD8gUmVnRXhwKGdyb3VwaWZ5KGFsbG93KSlcblx0XHRcdDogUmVnRXhwKGdyb3VwaWZ5KGFsbG93KSwgJ2cnKVxuXHRcdDogYWxsb3c7XG5cdFxuXHRyZXR1cm4gZnVuY3Rpb24gRU9MIChzdHJpbmcgICAgICAgICkgICAgICAgICAgIHtcblx0XHRpZiAoIERJU0FMTE9XICYmIERJU0FMTE9XLnRlc3Qoc3RyaW5nKSApIHsgdGhyb3cgY2xlYXJSZWdFeHAoU3ludGF4RXJyb3IpKCflrZjlnKjnpoHnlKjmjaLooYznrKYnKTsgfVxuXHRcdHZhciBlb2xzID0gY2xlYXJSZWdFeHAoc3RyaW5nLm1hdGNoKEFMTE9XKSkgICAgICAgICAgICAgICAgO1xuXHRcdGlmICggIWVvbHMgKSB7IHJldHVybiAnJzsgfVxuXHRcdGlmICggRklSU1QgKSB7IHJldHVybiBlb2xzWzBdOyB9XG5cdFx0dmFyIGVvbCA9IGVvbHNbMF07XG5cdFx0Zm9yICggdmFyIGxlbmd0aCA9IGVvbHMubGVuZ3RoLCBpbmRleCA9IDE7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgaWYgKCBlb2xzW2luZGV4XSE9PWVvbCApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ+WtmOWcqOWkmuenjeaNouihjOespicpOyB9IH1cblx0XHRyZXR1cm4gZW9sO1xuXHR9O1xuXHRcbn1cblxuZXhwb3J0IHZhciBMRiAgICAgPSAnXFxuJztcbmV4cG9ydCB2YXIgVlQgICAgID0gJ1xceDBCJztcbmV4cG9ydCB2YXIgRkYgICAgID0gJ1xcZic7XG5leHBvcnQgdmFyIENSTEYgICAgICAgPSAnXFxyXFxuJztcbmV4cG9ydCB2YXIgQ1IgICAgID0gJ1xccic7XG5leHBvcnQgdmFyIE5FTCAgICAgID0gJ1xceDg1JztcbmV4cG9ydCB2YXIgTFMgICAgID0gJ1xcdTIwMjgnO1xuZXhwb3J0IHZhciBQUyAgICAgPSAnXFx1MjAyOSc7XG5cbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoRU9MLCB7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdEVPTDogRU9MLFxuXHRMRjogTEYsXG5cdFZUOiBWVCxcblx0RkY6IEZGLFxuXHRDUkxGOiBDUkxGLFxuXHRDUjogQ1IsXG5cdE5FTDogTkVMLFxuXHRMUzogTFMsXG5cdFBTOiBQU1xufSk7Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQ0V0QixJQUFJLFdBQVcsR0FBRyxJQUFJLElB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QUFFO0NBQ3pGLEVBQUUsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsaUJBQWlCO0NBQzlELEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7Q0FDN0IsRUFBRSxLQUFLLEtBQUssR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Q0FDbEMsRUFBRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDcEIsRUFBRSxNQUFNLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFO0NBQ25JLEVBQUUsT0FBTyxHQUFHLENBQUM7Q0FDYixFQUFFLENBQUM7Q0FDSDtDQUNBLENBQUM7O0FBRUQsQ0FBTyxJQUFJLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDekIsQ0FBTyxJQUFJLEVBQUUsT0FBTyxNQUFNLENBQUM7QUFDM0IsQ0FBTyxJQUFJLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDekIsQ0FBTyxJQUFJLElBQUksU0FBUyxNQUFNLENBQUM7QUFDL0IsQ0FBTyxJQUFJLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDekIsQ0FBTyxJQUFJLEdBQUcsUUFBUSxNQUFNLENBQUM7QUFDN0IsQ0FBTyxJQUFJLEVBQUUsT0FBTyxRQUFRLENBQUM7QUFDN0IsQ0FBTyxJQUFJLEVBQUUsT0FBTyxRQUFRLENBQUM7QUFDN0IsQUFXQSxlQUFlLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Q0FDNUIsQ0FBQyxPQUFPLEVBQUUsT0FBTztDQUNqQixDQUFDLEdBQUcsRUFBRSxHQUFHO0NBQ1QsQ0FBQyxFQUFFLEVBQUUsRUFBRTtDQUNQLENBQUMsRUFBRSxFQUFFLEVBQUU7Q0FDUCxDQUFDLEVBQUUsRUFBRSxFQUFFO0NBQ1AsQ0FBQyxJQUFJLEVBQUUsSUFBSTtDQUNYLENBQUMsRUFBRSxFQUFFLEVBQUU7Q0FDUCxDQUFDLEdBQUcsRUFBRSxHQUFHO0NBQ1QsQ0FBQyxFQUFFLEVBQUUsRUFBRTtDQUNQLENBQUMsRUFBRSxFQUFFLEVBQUU7Q0FDUCxDQUFDLENBQUM7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvIn0=
﻿/*!
 * 模块名称：j-eol
 * 模块功能：换行符相关共享实用程序。从属于“简计划”。
   　　　　　EOL util. Belong to "Plan J".
 * 模块版本：1.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-eol/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-eol/
 */

var version = '1.0.0';

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
			dom.style.display = 'none';
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
		}
	}()
	/*¡ j-globals: Object.create (polyfill) */
);

/*!
 * 模块名称：j-groupify
 * 模块功能：将一个字符串数组，转化为分支式优化后的正则表达式匹配组。
   　　　　　Transform a string array into a branch-style optimized regExp group.
 * 模块版本：3.4.2
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-groupify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-groupify/
 */

var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]$/;
var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var GROUP = create(null);
function groupify(branches, uFlag, noEscape) {
    var group = create(null);
    var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
    for (var length = branches.length, index = 0; index < length; ++index) {
        appendBranch(group, branches[index]);
    }
    return sourcify(group, !noEscape);
}
function appendPointBranch(group, branch) {
    if (branch) {
        var char = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
        appendPointBranch(group[char] || (group[char] = create(null)), branch.slice(char.length));
    }
    else {
        group[''] = GROUP;
    }
}
function appendCodeBranch(group, branch) {
    if (branch) {
        var char = branch.charAt(0);
        appendCodeBranch(group[char] || (group[char] = create(null)), branch.slice(1));
    }
    else {
        group[''] = GROUP;
    }
}
function sourcify(group, needEscape) {
    var branches = [];
    var singleCharactersBranch = [];
    var noEmptyBranch = true;
    for (var char in group) {
        if (char) {
            var sub_branches = sourcify(group[char], needEscape);
            if (needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(char)) {
                char = '\\' + char;
            }
            sub_branches ? branches.push(char + sub_branches) : singleCharactersBranch.push(char);
        }
        else {
            noEmptyBranch = false;
        }
    }
    singleCharactersBranch.length && branches.unshift(singleCharactersBranch.length === 1 ? singleCharactersBranch[0] : '[' + singleCharactersBranch.join('') + ']');
    return branches.length === 0
        ? ''
        : (branches.length === 1 && (singleCharactersBranch.length || noEmptyBranch)
            ? branches[0]
            : '(?:' + branches.join('|') + ')')
            + (noEmptyBranch ? '' : '?');
}

/*¡ j-groupify */

var hasOwnProperty = Object.prototype.hasOwnProperty;

var freeze = Object.freeze;

var Default = (
	/*! j-globals: default (internal) */
	/*#__PURE__*/ function () {
		var keys = !{ 'toString': null }.propertyIsEnumerable('toString') && [ 'constructor', 'propertyIsEnumerable', 'isPrototypeOf', 'hasOwnProperty', 'valueOf', 'toLocaleString', 'toString' ];
		function Module (module, exports) {
			for ( var key in exports ) { module[key] = exports[key]; }
			if ( keys ) { for ( var index = 7; index--; ) { if ( hasOwnProperty.call(exports, key = keys[index]) ) { module[key] = exports[key]; } } }
			module['default'] = module;
			if ( typeof Symbol==='function' ) { module[Symbol.toStringTag] = 'Module'; }
			freeze && freeze(module);
			return module;
		}
		return function Default (object_function, _functionProperties) {
			return typeof object_function==='function'
				? /*#__PURE__*/ Module(object_function, _functionProperties)
				: /*#__PURE__*/ Module(create(null), object_function);
		};
	}()
	/*¡ j-globals: default (internal) */
);

/*!
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。
   　　　　　More readable way for creating RegExp.
 * 模块版本：5.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var clearRegExp = '$_' in RegExp
    ? function () {
        var REGEXP = /^/;
        return function clearRegExp(value) {
            REGEXP.test('');
            return value;
        };
    }()
    : function clearRegExp(value) {
        return value;
    };

/*¡ j-regexp */

function EOL(allow, disallow_uniform, uniform_disallow) {
    if (typeof disallow_uniform === 'object') {
        DISALLOW = isArray(disallow_uniform) ? new RegExp(groupify(disallow_uniform)) : disallow_uniform;
        FIRST = !uniform_disallow;
    }
    else if (typeof uniform_disallow === 'object') {
        DISALLOW = isArray(uniform_disallow) ? new RegExp(groupify(uniform_disallow)) : uniform_disallow;
        FIRST = !disallow_uniform;
    }
    else {
        FIRST = !(uniform_disallow || disallow_uniform);
    }
    var DISALLOW;
    var FIRST;
    var ALLOW = isArray(allow) ? new RegExp(groupify(allow), FIRST ? '' : 'g') : allow;
    return function EOL(string) {
        if (DISALLOW && DISALLOW.test(string)) {
            throw clearRegExp(SyntaxError)('存在禁用换行符');
        }
        var eols = clearRegExp(string.match(ALLOW));
        if (!eols) {
            return '';
        }
        if (FIRST) {
            return eols[0];
        }
        var eol = eols[0];
        for (var length = eols.length, index = 1; index < length; ++index) {
            if (eols[index] !== eol) {
                throw SyntaxError('存在多种换行符');
            }
        }
        return eol;
    };
}
var LF = '\n';
var VT = '\x0B';
var FF = '\f';
var CRLF = '\r\n';
var CR = '\r';
var NEL = '\x85';
var LS = '\u2028';
var PS = '\u2029';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otZ3JvdXBpZnkvc3JjL2dyb3VwaWZ5LnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiZXhwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICcxLjAuMCc7IiwiaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcblxudmFyIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUCA9IC9eWyQoKSorXFwtLj9bXFxcXFxcXV57fF0kLztcbnZhciBTVVJST0dBVEVfUEFJUiA9IC9eW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG52YXIgR1JPVVAgOkdyb3VwID0gY3JlYXRlKG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBncm91cGlmeSAoYnJhbmNoZXMgOnN0cmluZ1tdLCB1RmxhZz8gOmJvb2xlYW4sIG5vRXNjYXBlPyA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBncm91cCA6R3JvdXAgPSBjcmVhdGUobnVsbCk7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSk7IH1cblx0cmV0dXJuIHNvdXJjaWZ5KGdyb3VwLCAhbm9Fc2NhcGUpO1xufTtcblxuZnVuY3Rpb24gYXBwZW5kUG9pbnRCcmFuY2ggKGdyb3VwIDpHcm91cCwgYnJhbmNoIDpzdHJpbmcpIDp2b2lkIHtcblx0aWYgKCBicmFuY2ggKSB7XG5cdFx0dmFyIGNoYXIgOnN0cmluZyA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcl0gfHwgKCBncm91cFtjaGFyXSA9IGNyZWF0ZShudWxsKSApLCBicmFuY2guc2xpY2UoY2hhci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgOkdyb3VwLCBicmFuY2ggOnN0cmluZykgOnZvaWQge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhciA6c3RyaW5nID0gYnJhbmNoLmNoYXJBdCgwKTtcblx0XHRhcHBlbmRDb2RlQnJhbmNoKGdyb3VwW2NoYXJdIHx8ICggZ3JvdXBbY2hhcl0gPSBjcmVhdGUobnVsbCkgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwIDpHcm91cCwgbmVlZEVzY2FwZSA6Ym9vbGVhbikgOnN0cmluZyB7XG5cdHZhciBicmFuY2hlcyA6c3RyaW5nW10gPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggOnN0cmluZ1tdID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoIDpib29sZWFuID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXIgaW4gZ3JvdXAgKSB7XG5cdFx0aWYgKCBjaGFyICkge1xuXHRcdFx0dmFyIHN1Yl9icmFuY2hlcyA6c3RyaW5nID0gc291cmNpZnkoZ3JvdXBbY2hhcl0sIG5lZWRFc2NhcGUpO1xuXHRcdFx0aWYgKCBuZWVkRXNjYXBlICYmIE5FRURfVE9fRVNDQVBFX0lOX1JFR0VYUC50ZXN0KGNoYXIpICkgeyBjaGFyID0gJ1xcXFwnK2NoYXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcitzdWJfYnJhbmNoZXMpIDogc2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5wdXNoKGNoYXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdIDogJ1snK3NpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykrJ10nKTtcblx0cmV0dXJuIGJyYW5jaGVzLmxlbmd0aD09PTBcblx0XHQ/ICcnXG5cdFx0OiAoIGJyYW5jaGVzLmxlbmd0aD09PTEgJiYgKCBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aCB8fCBub0VtcHR5QnJhbmNoIClcblx0XHRcdD8gYnJhbmNoZXNbMF1cblx0XHRcdDogJyg/OicrYnJhbmNoZXMuam9pbignfCcpKycpJ1xuXHRcdClcblx0XHQrKCBub0VtcHR5QnJhbmNoID8gJycgOiAnPycgKTtcbn1cblxudHlwZSBHcm91cCA9IHsgW2NoYXIgOnN0cmluZ10gOkdyb3VwIH07XG4iLCJpbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuXG52YXIgY2xlYXJSZWdFeHAgPSAnJF8nIGluIFJlZ0V4cFxuXHQ/IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgUkVHRVhQID0gL14vO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjbGVhclJlZ0V4cDxUIGV4dGVuZHMgYW55PiAodmFsdWU/IDpUKSA6dW5kZWZpbmVkIHwgVCB7XG5cdFx0XHRSRUdFWFAudGVzdCgnJyk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSgpXG5cdDogZnVuY3Rpb24gY2xlYXJSZWdFeHA8VCBleHRlbmRzIGFueT4gKHZhbHVlPyA6VCkgOnVuZGVmaW5lZCB8IFQge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xlYXJSZWdFeHA7IiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSZWdFeHAgZnJvbSAnLlJlZ0V4cCc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheT89JztcblxuaW1wb3J0IHsgZ3JvdXBpZnkgfSBmcm9tICdAbHRkL2otZ3JvdXBpZnknO1xuaW1wb3J0IHsgY2xlYXJSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuZXhwb3J0IGZ1bmN0aW9uIEVPTDxFT0wgZXh0ZW5kcyBzdHJpbmc+IChhbGxvdyA6RU9MW10gfCBSZWdFeHAsIGRpc2FsbG93X3VuaWZvcm0/IDpzdHJpbmdbXSB8IFJlZ0V4cCB8IGJvb2xlYW4sIHVuaWZvcm1fZGlzYWxsb3c/IDpib29sZWFuIHwgc3RyaW5nW10gfCBSZWdFeHApIHtcblx0XG5cdGlmICggdHlwZW9mIGRpc2FsbG93X3VuaWZvcm09PT0nb2JqZWN0JyApIHtcblx0XHRESVNBTExPVyA9IGlzQXJyYXkoZGlzYWxsb3dfdW5pZm9ybSkgPyBuZXcgUmVnRXhwKGdyb3VwaWZ5KGRpc2FsbG93X3VuaWZvcm0pKSA6IGRpc2FsbG93X3VuaWZvcm07XG5cdFx0RklSU1QgPSAhdW5pZm9ybV9kaXNhbGxvdztcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHVuaWZvcm1fZGlzYWxsb3c9PT0nb2JqZWN0JyApIHtcblx0XHRESVNBTExPVyA9IGlzQXJyYXkodW5pZm9ybV9kaXNhbGxvdykgPyBuZXcgUmVnRXhwKGdyb3VwaWZ5KHVuaWZvcm1fZGlzYWxsb3cpKSA6IHVuaWZvcm1fZGlzYWxsb3c7XG5cdFx0RklSU1QgPSAhZGlzYWxsb3dfdW5pZm9ybTtcblx0fVxuXHRlbHNlIHtcblx0XHRGSVJTVCA9ICEoIHVuaWZvcm1fZGlzYWxsb3cgfHwgZGlzYWxsb3dfdW5pZm9ybSApO1xuXHR9XG5cdHZhciBESVNBTExPVyA6UmVnRXhwO1xuXHR2YXIgRklSU1QgOmJvb2xlYW47XG5cdHZhciBBTExPVyA9IGlzQXJyYXkoYWxsb3cpID8gbmV3IFJlZ0V4cChncm91cGlmeShhbGxvdyksIEZJUlNUID8gJycgOiAnZycpIDogYWxsb3c7XG5cdFxuXHRyZXR1cm4gZnVuY3Rpb24gRU9MIChzdHJpbmcgOnN0cmluZykgOkVPTCB8ICcnIHtcblx0XHRpZiAoIERJU0FMTE9XICYmIERJU0FMTE9XLnRlc3Qoc3RyaW5nKSApIHsgdGhyb3cgY2xlYXJSZWdFeHAoU3ludGF4RXJyb3IpKCflrZjlnKjnpoHnlKjmjaLooYznrKYnKTsgfVxuXHRcdHZhciBlb2xzIDpFT0xbXSB8IG51bGwgPSA8RU9MW10gfCBudWxsPiBjbGVhclJlZ0V4cChzdHJpbmcubWF0Y2goQUxMT1cpKTtcblx0XHRpZiAoICFlb2xzICkgeyByZXR1cm4gJyc7IH1cblx0XHRpZiAoIEZJUlNUICkgeyByZXR1cm4gZW9sc1swXTsgfVxuXHRcdHZhciBlb2wgPSBlb2xzWzBdO1xuXHRcdGZvciAoIHZhciBsZW5ndGggPSBlb2xzLmxlbmd0aCwgaW5kZXggPSAxOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IGlmICggZW9sc1tpbmRleF0hPT1lb2wgKSB7IHRocm93IFN5bnRheEVycm9yKCflrZjlnKjlpJrnp43mjaLooYznrKYnKTsgfSB9XG5cdFx0cmV0dXJuIGVvbDtcblx0fTtcblx0XG59XG5cbmV4cG9ydCB2YXIgTEYgOkxGID0gJ1xcbic7XG5leHBvcnQgdmFyIFZUIDpWVCA9ICdcXHgwQic7XG5leHBvcnQgdmFyIEZGIDpGRiA9ICdcXGYnO1xuZXhwb3J0IHZhciBDUkxGIDpDUkxGID0gJ1xcclxcbic7XG5leHBvcnQgdmFyIENSIDpDUiA9ICdcXHInO1xuZXhwb3J0IHZhciBORUwgOk5FTCA9ICdcXHg4NSc7XG5leHBvcnQgdmFyIExTIDpMUyA9ICdcXHUyMDI4JztcbmV4cG9ydCB2YXIgUFMgOlBTID0gJ1xcdTIwMjknO1xuXG5leHBvcnQgdHlwZSBMRiA9ICdcXG4nO1xuZXhwb3J0IHR5cGUgVlQgPSAnXFx4MEInO1xuZXhwb3J0IHR5cGUgRkYgPSAnXFxmJztcbmV4cG9ydCB0eXBlIENSTEYgPSAnXFxyXFxuJztcbmV4cG9ydCB0eXBlIENSID0gJ1xccic7XG5leHBvcnQgdHlwZSBORUwgPSAnXFx4ODUnO1xuZXhwb3J0IHR5cGUgTFMgPSAnXFx1MjAyOCc7XG5leHBvcnQgdHlwZSBQUyA9ICdcXHUyMDI5JztcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdChFT0wsIHtcblx0dmVyc2lvbjogdmVyc2lvbixcblx0RU9MOiBFT0wsXG5cdExGOiBMRixcblx0VlQ6IFZULFxuXHRGRjogRkYsXG5cdENSTEY6IENSTEYsXG5cdENSOiBDUixcblx0TkVMOiBORUwsXG5cdExTOiBMUyxcblx0UFM6IFBTXG59KTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxjQUFlLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRXRCLElBQUksd0JBQXdCLEdBQUcsdUJBQXVCLENBQUM7QUFDdkQsSUFBSSxjQUFjLEdBQUcsaUNBQWlDLENBQUM7QUFDdkQsSUFBSSxLQUFLLEdBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWhDLFNBQXdCLFFBQVEsQ0FBRSxRQUFrQixFQUFFLEtBQWUsRUFBRSxRQUFrQjtJQUN4RixJQUFJLEtBQUssR0FBVSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsSUFBSSxZQUFZLEdBQUcsS0FBSyxHQUFHLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO0lBQ2hFLEtBQU0sSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQVcsQ0FBQyxFQUFFLEtBQUssR0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUc7UUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxD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
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

//# sourceMappingURL=index.mjs.map
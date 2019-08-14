import version from './version?text';
export { version };

import SyntaxError from '.SyntaxError';
import RegExp from '.RegExp';
import isArray from '.Array.isArray?=';

import { groupify, clearRegExp } from '@ltd/j-regexp';

var FLAGS = /\/([a-fh-z]*)g([a-fh-z]*)$/;

function removeGlobal (regExp :RegExp) {
	var flags = FLAGS.exec(''+regExp);
	return flags ? RegExp(regExp, flags[1]+flags[2]) : regExp;
}

export function EOL<EOL extends string> (allow :EOL[] | RegExp, disallow_uniform? :string[] | RegExp | boolean, uniform_disallow? :boolean | string[] | RegExp) {
	
	var DISALLOW :RegExp;
	var FIRST :boolean;
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
	
	return function EOL (string :string) :EOL | '' {
		if ( DISALLOW && DISALLOW.test(string) ) { throw clearRegExp(SyntaxError)('存在禁用换行符'); }
		var eols = clearRegExp(string.match(ALLOW)) as EOL[] | null;
		if ( !eols ) { return ''; }
		if ( FIRST ) { return eols[0]; }
		var eol = eols[0];
		for ( var length = eols.length, index = 1; index<length; ++index ) { if ( eols[index]!==eol ) { throw SyntaxError('存在多种换行符'); } }
		return eol;
	};
	
}

export var LF :LF = '\n';
export var VT :VT = '\x0B';
export var FF :FF = '\f';
export var CRLF :CRLF = '\r\n';
export var CR :CR = '\r';
export var NEL :NEL = '\x85';
export var LS :LS = '\u2028';
export var PS :PS = '\u2029';

export type LF = '\n';
export type VT = '\x0B';
export type FF = '\f';
export type CRLF = '\r\n';
export type CR = '\r';
export type NEL = '\x85';
export type LS = '\u2028';
export type PS = '\u2029';

import Default from '.default?=';
export default Default(EOL, {
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
export const version :'1.3.1';

export function EOL<EOL extends string> (allow :EOL[] | RegExp, disallow? :string[] | RegExp, uniform? :boolean) :(string :string) => EOL | '';
export function EOL<EOL extends string> (allow :EOL[] | RegExp, uniform? :boolean, disallow? :string[] | RegExp) :(string :string) => EOL | '';

export var LF :'\n';
export var VT :'\x0B';
export var FF :'\f';
export var CRLF :'\r\n';
export var CR :'\r';
export var NEL :'\x85';
export var LS :'\u2028';
export var PS :'\u2029';

export type LF = '\n';
export type VT = '\x0B';
export type FF = '\f';
export type CRLF = '\r\n';
export type CR = '\r';
export type NEL = '\x85';
export type LS = '\u2028';
export type PS = '\u2029';

export default exports;
declare const exports :typeof EOL & {
	version :typeof version,
	EOL :typeof EOL,
	LF: LF,
	VT: VT,
	FF: FF,
	CRLF: CRLF,
	CR: CR,
	NEL: NEL,
	LS: LS,
	PS: PS,
	default :typeof exports,
};
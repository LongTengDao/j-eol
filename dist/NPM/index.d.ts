export = exports;

declare function exports<EOL extends string> (allow :EOL[] | RegExp, disallow? :string[] | RegExp, uniform? :boolean) :(string :string) => EOL | '';
declare function exports<EOL extends string> (allow :EOL[] | RegExp, uniform? :boolean, disallow? :string[] | RegExp) :(string :string) => EOL | '';

declare namespace exports {
	
	export const version :'1.0.0';
	
	export function EOL<EOL extends string> (allow :EOL[] | RegExp, disallow? :string[] | RegExp, uniform? :boolean) :(string :string) => EOL | '';
	export function EOL<EOL extends string> (allow :EOL[] | RegExp, uniform? :boolean, disallow? :string[] | RegExp) :(string :string) => EOL | '';
	
	export const LF :'\n';
	export const VT :'\x0B';
	export const FF :'\f';
	export const CRLF :'\r\n';
	export const CR :'\r';
	export const NEL :'\x85';
	export const LS :'\u2028';
	export const PS :'\u2029';
	
	export type LF = '\n';
	export type VT = '\x0B';
	export type FF = '\f';
	export type CRLF = '\r\n';
	export type CR = '\r';
	export type NEL = '\x85';
	export type LS = '\u2028';
	export type PS = '\u2029';
	
	export { exports as default };
	
}

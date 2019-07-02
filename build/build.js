'use strict';

require('@ltd/j-dev')(__dirname+'/..')(async ({ build, 龙腾道, get, ful }) => {
	
	const zhs = '换行符相关共享实用程序。从属于“简计划”。';
	const en = 'EOL util. Belong to "Plan J".';
	
	await build({
		NPM: { description: `${en}／${zhs}` },
		UMD: { main_global: 'EOL' },
		ESM: true,
		ES: 3,
		semver: await get('src/version'),
		locate: {
			'@ltd/j-groupify': ful('../../LongTengDao/j-groupify/dist/ESM/.j-groupify'),
			'@ltd/j-regexp': ful('../../LongTengDao/j-regexp/dist/ESM/.j-regexp'),
		},
		name: 'j-eol',
		user: 'LongTengDao@ltd',
		Desc: [ zhs, en ],
		Auth: 龙腾道,
		Copy: 'LGPL-3.0',
		LICENSE_: true,
	});
	
});

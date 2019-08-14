
`@ltd/j-eol`
============

The main export of the module is a function creator, which receives three configuration parameters `allow`, `uniform`, `disallow` (the latter two are optional and sequence insensitive), and returns the newline detection function according to them.

This returned newline detector function accepts a string input and returns the newline characters used in the string (if no newline, returns an empty string).

The first parameter `allow` of the creator, which can be an array of strings or a regular expression, determines the newline character that the detecting function may return.

The second parameter `uniform` of the creator, which is of boolean type, determines whether the detecting function will throw an error (otherwise, it returns the first line break that it encounters), if it finds multiple different line breaks in the input value (if `allow` is a regular expression, it needs to be set to global mode).

The third parameter `disallow` of the creator, which can be an array of strings or a regular expression, throws an error if there is a match in the input value of the detecting function.

```js
const eol = EOL(/\r?\n/g, true, /\r(?!\n)/);
eol('1')////////// ''
eol('1\n2')/////// '\n'
eol('1\r\n2')///// '\r\n'
eol('1\n2\r\n3')// Error
eol('1\r2')/////// Error
```

模块的主导出是一个生成函数，接收三个配置参数 `allow`、`uniform`、`disallow`（后两个是可省的，且顺序不敏感），根据它们返回换行符检测函数。

这个返回的换行符检测函数接受一个字符串输入，返回这个字符串中使用的换行符字符（如果没有则返回空字符串）。

生成函数的第一个参数 `allow`，可以是字符串数组或一个正则表达式，决定了检测函数可能返回的换行符。

生成函数的第二个参数 `uniform`，类型为布尔值，决定了检测函数如果在输入值中发现了多个不同的换行符（`allow` 如果是正则表达式，需要设为全局模式），是否报错（否则返回第一个遇到的换行符了事）。

生成函数的第三个参数 `disallow`，可以是字符串数组或一个正则表达式，检测函数的输入值中如果存在匹配，则抛出错误。

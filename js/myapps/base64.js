
// str.charCodeAt(1) return number
// str.charAt(1)     return char
// String.fromCharCode(charCode);

// base64编码表
var base64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// base64编码表最后两位
var char62 = '+';
var char63 = '/';
base64Table += char62+char63;

/* ascii编码表 映射 ascii编码 到 base64编码表
** @param char
** return integer
*/
function asciiToBase64(code) {
	var char = code.charCodeAt()
	if (char == char62.charCodeAt()) {
		return 62;
	} else if (char == char63.charCodeAt()) {
		return 63;
	} else if (char >= '0'.charCodeAt() && char <= '9'.charCodeAt()) {
		return char+4;
	} else if (char >= 'A'.charCodeAt() && char <= 'Z'.charCodeAt()) {
		return char-65;
	} else if (char >= 'a'.charCodeAt() && char <= 'z'.charCodeAt()) {
		return char-71;
	}
	return 0;
}

// base64 加密
function base64_encode(code) {

}

// base64 解密
function base64_decode(code) {

}

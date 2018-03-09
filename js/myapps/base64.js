/*
** 作者：Weijun Lai
** 时间：2018年3月9日
** 版本：1.0
** 说明：实现Base64编码的加密和解密功能。
**       并未对执行效率，最大处理能力和
**       书写简洁做优化，仅对算法细分解析。
**
*/

// base64编码表
var base64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// base64编码表最后两位
var char62 = '+';
var char63 = '/';
base64Table += char62+char63;

/*
** base64 加密
** @param code String   输入字符串明文
** return encode String 输出字符串密文
*/
function base64_encode(code) {
/*
	加密算法流程
	1.分段处理，每段处理三字节
	以下将每段(8位三字节)转为每段(6位四字节)
	2.处理第1字节
		2.1高位向右移2位
	3.处理第2字节
		3.1高位向左移6位
		3.2高位向右移2位
		3.3高位取最后6位，即 与运算 00111111 (0x3F)
		3.4低位向右移4位
		3.5高低位或运算
	4.处理第3字节
		4.1高位向左移4位
		4.2高位向右移2位
		4.3高位取最后6位，即 与运算 00111111 (0x3F)
		4.4低位向右移6位
		4.5高低位或运算
	5.处理第4字节
		5.5取最后6位，即 与运算 00111111 (0x3F)
	6.处理分段不足三字节长度的填充
		6.1分段内字节数量长度缺2个满足三字节的补2个等号'='
		6.2分段内字节数量长度缺1个满足三字节的补1个等号'='
*/


	var byte1 = 0;   // 寄存处理第1字节的变量
	var byte2 = 0;   // 寄存处理第2字节的变量
	var byte3 = 0;   // 寄存处理第3字节的变量
	var byte4 = 0;   // 寄存处理第4字节的变量
	var encode = ""; // 寄存Base64加密后输出结果的变量

	// 1.分段处理，每段处理三字节
	for (var i=0;i<code.length;i=i+3) {
		// 2.处理第1字节
		byte1 = code[i].charCodeAt(); //获取ascii编码表对应的值
		byte1 = byte1>>2; //2.1高位向右移2位
		byte1 = byte1&0x3F;//2.3高位取最后6位，即 与运算 00111111 (0x3F)
		encode += base64Table[byte1]; //查Base64编码表对应的值
		// 6.处理分段不足三字节长度的填充
		if (i+2-code.length==1) {
			//6.1分段内字节数量长度缺2个字节满足三字节的补2个等号'='
			byte1 = code[i].charCodeAt(); //获取ascii编码表对应的值,记为高位
			byte2 = 0;
			byte1 = byte1<<6;//3.1高位向左移6位
			byte1 = byte1>>2;//3.2高位向右移2位
			byte1 = byte1&0x3F;//3.3高位取最后6位，即 与运算 00111111 (0x3F)
			byte2 = byte2>>4;//3.4低位向右移4位
			byte2 = byte1|byte2;//3.5高低位或运算
			encode += base64Table[byte2]; //查Base64编码表对应的值
			encode += "==";
			break;
		}
		// 处理第2字节
		byte1 = code[i].charCodeAt(); //获取ascii编码表对应的值,记为高位
		byte2 = code[i+1].charCodeAt(); //获取ascii编码表对应的值,记为低位
		byte1 = byte1<<6;//3.1高位向左移6位
		byte1 = byte1>>2;//3.2高位向右移2位
		byte1 = byte1&0x3F;//3.3高位取最后6位，即 与运算 00111111 (0x3F)
		byte2 = byte2>>4;//3.4低位向右移4位
		byte2 = byte1|byte2;//3.5高低位或运算
		encode += base64Table[byte2]; //查Base64编码表对应的值
		// 6.处理分段不足三字节长度的填充
		if (i+2-code.length==0) {
			//6.2分段内字节数量长度缺1个字节满足三字节的补1个等号'='
			byte2 = code[i+1].charCodeAt(); //获取ascii编码表对应的值,记为高位
			byte3 = 0; //记为低位
			byte2 = byte2<<4;//4.1高位向左移4位
			byte2 = byte2>>2;//4.2高位向右移2位
			byte2 = byte2&0x3F;//4.3高位取最后6位，即 与运算 00111111 (0x3F)
			byte3 = byte3>>6;//4.4低位向右移6位
			byte3 = byte2|byte3;//4.5高低位或运算
			encode += base64Table[byte3]; //查Base64编码表对应的值
			encode += "=";
			break;
		} 
		// 处理第3字节
		byte2 = code[i+1].charCodeAt(); //获取ascii编码表对应的值,记为高位
		byte3 = code[i+2].charCodeAt(); //获取ascii编码表对应的值,记为低位
		byte2 = byte2<<4;//4.1高位向左移4位
		byte2 = byte2>>2;//4.2高位向右移2位
		byte2 = byte2&0x3F;//4.3高位取最后6位，即 与运算 00111111 (0x3F)
		byte3 = byte3>>6;//4.4低位向右移6位
		byte3 = byte2|byte3;//4.5高低位或运算
		encode += base64Table[byte3]; //查Base64编码表对应的值
		// 处理第4字节
		byte4 = code[i+2].charCodeAt(); //获取ascii编码表对应的值
		byte4 = byte4&0x3F;//5.5取最后6位，即 与运算 00111111 (0x3F)
		encode += base64Table[byte4]; //查Base64编码表对应的值
	}
	return encode;
}

/* ascii编码表    映射ascii编码 到 base64编码表
** @param char    输入单字符
** return integer 输出整数
*/
function asciiToBase64(code) {
	var char = "";
	try{
		char = code.charCodeAt();
	}catch (e){
		return -1;
	}
	if (char == char62.charCodeAt()) {
		// '+' 的ascii编码映射base64编码
		return 62;
	} else if (char == char63.charCodeAt()) {
		// '-' 的ascii编码映射base64编码
		return 63;
	} else if (char >= '0'.charCodeAt() && char <= '9'.charCodeAt()) {
		// [0-9]范围的ascii编码映射到[0-9]范围的base64编码
		return char+4;
	} else if (char >= 'A'.charCodeAt() && char <= 'Z'.charCodeAt()) {
		// [A-Z]范围的ascii编码映射到[A-Z]范围的base64编码
		return char-65;
	} else if (char >= 'a'.charCodeAt() && char <= 'z'.charCodeAt()) {
		// [a-z]范围的ascii编码映射到[a-z]范围的base64编码
		return char-71;
	}
	return -1;
}

/*
** base64 解密
** @param code String   输入字符串密文
** return encode String 输出字符串明文
*/
function base64_decode(code) {
  /*
  	解密算法流程
  	1.分段处理，每段四字节，将每个加密字节从ascii编码表映射到Base64编码表
  	以下将每段(8位四字节)转为每段(8位三字节)
  	2.处理第1字节
  		2.1高位向左移2位
		2.2高位取最后8位，即 与运算 11111111 (0xFF)
  		2.3低位向右移4位
  		2.4高低位或运算
  	3.处理第2字节
  		3.1高位向左移4位
		3.2高位取最后8位，即 与运算 11111111 (0xFF)
  		3.3低位向右移2位
  		3.4高低位或运算
  	4.处理第3字节
  		4.1高位向左移6位
		4.2高位取最后8位，即 与运算 11111111 (0xFF)
  		4.3低位保留
  		4.4高低位或运算
  	5.处理填充代表等号字符=
  		5.1结束处理
  */
	var byte1 = 0;   // 寄存处理第1字节的变量
	var byte2 = 0;   // 寄存处理第2字节的变量
	var byte3 = 0;   // 寄存处理第3字节的变量
	var byte4 = 0;   // 寄存处理第4字节的变量
	var decode = ""; // 寄存Base64解密后输出结果的变量

	//1.分段处理，每段四字节，将每个加密字节从ascii编码表映射到Base64编码表

	for (var i=0;i<code.length;i=i+4) {
		//5.处理填充代表等号字符=
		if (asciiToBase64(code[i])==-1 ||
			asciiToBase64(code[i+1])==-1) {
		  break;
		}
		//2.处理第1字节
		byte1 = asciiToBase64(code[i]);//获取ascii编码表映射到Base64编码表对应的值,记为高位
		byte2 = asciiToBase64(code[i+1]);//获取ascii编码表映射到Base64编码表对应的值,记为低位
  		byte1 = byte1<<2;//2.1高位向左移2位
		byte1 = byte1&0xFF;//2.2高位取最后8位，即 与运算 11111111 (0xFF)
  		byte2 = byte2>>4;//2.3低位向右移4位
  		byte1 = byte1|byte2;//2.4高低位或运算
		decode += String.fromCharCode(byte1);//查ascii编码表对应的值
		//5.处理填充代表等号字符=
		if (asciiToBase64(code[i+1])==-1 ||
			asciiToBase64(code[i+2])==-1) {
		  break;
		}
		//3.处理第2字节
		byte2 = asciiToBase64(code[i+1]);//获取ascii编码表映射到Base64编码表对应的值,记为高位
		byte3 = asciiToBase64(code[i+2]);//获取ascii编码表映射到Base64编码表对应的值,记为低位
  		byte2 = byte2<<4;//3.1高位向左移4位
		byte2 = byte2&0xFF;//2.3高位取最后8位，即 与运算 11111111 (0xFF)
  		byte3 = byte3>>2;//2.3低位向右移2位
  		byte2 = byte2|byte3;//2.4高低位或运算
		decode += String.fromCharCode(byte2);//查ascii编码表对应的值
		//5.处理填充代表等号字符=
		if (asciiToBase64(code[i+2])==-1 ||
			asciiToBase64(code[i+3])==-1) {
		  break;
		}
		//4.处理第3字节
		byte3 = asciiToBase64(code[i+2]);//获取ascii编码表映射到Base64编码表对应的值,记为高位
		byte4 = asciiToBase64(code[i+3]);//获取ascii编码表映射到Base64编码表对应的值,记为低位
  		byte3 = byte3<<6;//3.1高位向左移6位
		byte3 = byte3&0xFF;//2.3高位取最后8位，即 与运算 11111111 (0xFF)
  		byte4 = byte4;//2.3低位保留
  		byte3 = byte3|byte4;//2.4高低位或运算
		decode += String.fromCharCode(byte3);//查ascii编码表对应的值
  }
  return decode;
}
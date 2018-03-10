var code = "";
var passEBase64 ="";
var decode="";
$(document).ready(function() {
  $('#header,#comments,#footer,.post-meta,.post-footer').addClass('opacity0InOut');
  var localurl = window.location.href;
  // encode both ?[base64-passowrd]?[base64-salt] by base64
  // decode both from base64
  try{
    var encodes = localurl.split('?')[1];
    var codes = decodeBase64(encodes);
    console.log(codes);
    // split code and pass-salt from codes
    // ?[base64-passowrd]?[base64-salt]
    code = codes.split('?')[1];
    passEBase64 = codes.split('?')[2];
  }catch(e){

  }
  if (!code || code.length<1 ) {
    code = "空密码";
  }
  if (!passEBase64 || passEBase64.length<1) {
    passEBase64 = "";
    passDecodeBase64 = "请输入盐";
  } else {
    passDecodeBase64 = decodeBase64(passEBase64);
    decode = decryptAES(code,passDecodeBase64);

    if (decode!="" && decode!="密码错误") {
      $('#webapp').addClass('opacity0InOut');
    }
    $('#result').removeClass('opacity0InOut');
    $('#result').addClass('opacity1InOut');
  }

  // $('#slatText').val(passDecodeBase64);
  $('#resultText').val('加密密文：'+code+'\n加密钥匙：'+passEBase64+'\n解密钥匙：'+passDecodeBase64+'\n原文：'+decode);
  $('#result').html(decode);
});

function onMyClicked() {
  // $('#resultText').val(window.location.href);
  var passDecodeBase64 = $('#slatText').val();
  passEBase64 = encodeBase64(passDecodeBase64);
  decode = decryptAES(code,passDecodeBase64);
  if (decode!="" && decode!="密码错误") {
    $('#webapp').addClass('opacity0InOut');
  }
  $('#resultText').val('加密密文：'+code+'\n加密钥匙：'+passEBase64+'\n解密钥匙：'+passDecodeBase64+'\n原文：'+decode);
  $('#result').html(decode);
  $('#result').removeClass('opacity0InOut');
  $('#result').addClass('opacity1InOut');

}

function decodeBase64(content) {
    content = CryptoJS.enc.Base64.parse(content);
    content = CryptoJS.enc.Utf8.stringify(content);
    content = unescape(content);
    return content;
}

function encodeBase64(content) {
    content = escape(content);
    content = CryptoJS.enc.Utf8.parse(content);
    content = CryptoJS.enc.Base64.stringify(content);
    return content;
}

function decryptAES(code,password) {
  try {
      var content = CryptoJS.AES.decrypt(code, password);
      content = content.toString(CryptoJS.enc.Utf8);
      content = CryptoJS.enc.Base64.parse(content);
      content = CryptoJS.enc.Utf8.stringify(content);
      content = unescape(content);
      if (content == '') {
          // alert("密码错误");
          content="密码错误";
      }
    }catch (e) {
      content="密码错误";
    }
    return content;
}

function encryptAES(content,password) {
  content = escape(content);
  content = CryptoJS.enc.Utf8.parse(content);
  content = CryptoJS.enc.Base64.stringify(content);
  content = CryptoJS.AES.encrypt(content, String(password)).toString();
  return content;
}

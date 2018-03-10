var code = "";
var passEBase64 ="";
var decode="";
var localurl = window.location.href;
var path_root = "http://laiweijun.com";
var path_password = "/password/?";
var passTips = path_root+path_password;
//JTNGVTJGc2RHVmtYMS9VcXZYSk53amxDaVNyVy9mdG9uakgyd3prOXdrczlMTSUzRCUzRk1USXpORFUlM0Q=
// function generatQR(qrid,type,message) {
//   $(qrid).qrcode({
//     render: type,
//     size: 300,
//     // background: "#fff",//背景颜色
//     // fill: "#00BCD4", //前景颜色
//     text: message,
//     mode: 2,
//     label: '获得密码',
//     fontname: 'sans',
//     fontcolor: '#000'
//     // image: null
//   });
// }
// generatQR('#qrcode','image',passTips);

// function loadJS(url){
//   var Script = document.createElement('script');
//   Script.setAttribute('src', url);
//   Script.setAttribute('type', 'text/javascript');
//   document.body.appendChild(Script);
//   return Script;
// }

function loadJS(url, success) {
  var domScript = document.createElement('script');
  domScript.src = url;
  success = success || function () {
      };
  domScript.onload = domScript.onreadystatechange = function () {
    if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
      success();
      this.onload = this.onreadystatechange = null;
      this.parentNode.removeChild(this);
    }
  }
  document.getElementsByTagName('head')[0].appendChild(domScript);
}

$(document).ready(function() {

  //slatText
  if ($('#slatText').length==0 && $('#tips').length==0){
    return;
  }

  passTips = path_root+path_password+$('#tips').val();
  console.log("--passTips:"+passTips);
  // generatQR('#qrcode','image',passTips);
  loadJS("/js/src/jquery-qrcode-0.14.0/jquery-qrcode-0.14.0.min.js",function(){
    generatQR('#qrcode','image',passTips);
  });

  $('#header,#comments,#footer,.post-meta,.post-footer').addClass('opacity0InOut');

  // encode both ?[base64-passowrd]?[base64-salt] by base64
  // decode both from base64

  try{
    var encodes = localurl.split('?')[1];
    var codes = decodeByBase64(encodes);
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
    passDecodeBase64 = decodeByBase64(passEBase64);
    decode = decryptByAES(code,passDecodeBase64);

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

function onClickedDecode() {
  // $('#resultText').val(window.location.href);
  var passDecodeBase64 = $('#slatText').val();
  passEBase64 = encodeByBase64(passDecodeBase64);
  decode = decryptByAES(code,passDecodeBase64);
  if (decode!="" && decode!="密码错误") {
    $('#webapp').addClass('opacity0InOut');
  }
  $('#resultText').val('加密密文：'+code+'\n加密钥匙：'+passEBase64+'\n解密钥匙：'+passDecodeBase64+'\n原文：'+decode);
  $('#result').html(decode);
  $('#result').removeClass('opacity0InOut');
  $('#result').addClass('opacity1InOut');

}

function decodeByBase64(content) {
    content = CryptoJS.enc.Base64.parse(content);
    content = CryptoJS.enc.Utf8.stringify(content);
    content = unescape(content);
    return content;
}

function encodeByBase64(content) {
    content = escape(content);
    content = CryptoJS.enc.Utf8.parse(content);
    content = CryptoJS.enc.Base64.stringify(content);
    return content;
}

function decryptByAES(code,password) {
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

function encryptByAES(content,password) {
  content = escape(content);
  content = CryptoJS.enc.Utf8.parse(content);
  content = CryptoJS.enc.Base64.stringify(content);
  content = CryptoJS.AES.encrypt(content, String(password)).toString();
  return content;
}

var code = "";
var passEBase64 ="";
var decode="";
var encodes ="";
var passDecodeBase64 = "";
var passEBase64 = "";
var qrLabel = "获得密码";
var localurl = (window.location.href).replace(/\s/g,"%20");;
var path_root = "http://laiweijun.com";
var path_password = "/password/?";
var passTips = path_root+path_password;

var errors = new Array(
                      "❌ 盐密不蒸雀🐦",
                      "❌ 盐密不争气",
                      "❌ 盐密扎心了老铁❤️",
                      "❌ 盐密是你个头👋",
                      "❌ 你这是在乱输入么😊",
                      "❌ 你用的是什么输入法😝",
                      //"💢 密码提示：点击赏，有钱能使码推磨",
                      //"㊙️ 今天天气真好，密码就在天上，你却看不到😂",
                      //"🎵 刚才发生了一件搞笑事情，原来你不知道密码，哈哈哈😄",
                      "☎️ 请联系我要盐密吧 ☎️"
                    );

//JTNGVTJGc2RHVmtYMS9VcXZYSk53amxDaVNyVy9mdG9uakgyd3prOXdrczlMTSUzRCUzRk1USXpORFUlM0Q=
function generatQR(qrid,type,message,label) {
  $(qrid).qrcode({
    render: type,
    size: 300,
    background: "#fff",//背景颜色
    fill: "#000A3D", //前景颜色
    text: message,
    ecLevel: 'M',
    mode: 2,
    label: label,
    fontname: 'sans',
    fontcolor: '#000'
    // image: null
  });
}
// generatQR('#qrcode','image',passTips,qrLabel);

// function loadJS(url){
//   var Script = document.createElement('script');
//   Script.setAttribute('src', url);
//   Script.setAttribute('type', 'text/javascript');
//   document.body.appendChild(Script);
//   return Script;
// }
var labelpassmsg = document.getElementById("labelpassmsg");
if ($('#slatText').length==1){
  labelpassmsg.style.color = "green";
  labelpassmsg.style.textAlign="center";
  labelpassmsg.style.margin="auto";
  labelpassmsg.innerHTML = '<img src="/images/balloon.svg" style="border:0px;padding:0px;height:24px;width:24px ;display:inline-block;" />';
  labelpassmsg.innerHTML += "正在解密档案<br/>";
  labelpassmsg.innerHTML += '<img src="/images/loading.svg" style="border:0px;padding:0px;height:64px;width:64px ;display:inline-block;" />';
}

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
  // labelpassmsg = document.getElementById("labelpassmsg");
  $('#webapp').removeClass('opacity0InOut');
  $('#webapp').addClass('opacity1InOut');

  if ($('#slatText').length==1){
    labelpassmsg.style.display = "none";
  }
  //slatText
  if ($('#slatText').length==0 && $('#tips').length==0){
    return;
  }

  if ($('#tips').length==1) {
    tips = unescape($('#tips').val());
    tips = $('#tips').val();
    passTips = path_root+path_password+tips;
    passTips = unescape(passTips);
    passTips = passTips.replace(" ","");
    passTips = passTips.replace(/ /g,"");

    console.log("--passTips:"+passTips);
    // generatQR('#qrcode','image',passTips);
    loadJS("/js/src/jquery-qrcode-0.14.0/jquery-qrcode-0.14.0.min.js",function(){
      generatQR('#qrcode','image',passTips,qrLabel);
    });
  }

  $('#header,#comments,#footer,.post-meta,.post-footer').addClass('opacity0InOut');

  // encode both ?[base64-passowrd]?[base64-salt] by base64
  // decode both from base64

  try{
    // localurl = localurl.replace(/&/g, "%20");
    // localurl = unescape(localurl);
    // localurl = localurl.replace(" ","");
    // localurl = localurl.replace(/ /g,"");

    encodes = localurl.split('?')[1];
    // encodes = encodes.replace(/&/g, "%20");
    // encodes = unescape(encodes);
    // encodes = encodes.replace(" ","");
    // encodes = encodes.replace(/ /g,"");

    encodes = decodeByBase64(encodes);

    codes = encodes;
    console.log("encodes:"+encodes);
    // split code and pass-salt from codes
    // ?[base64-passowrd]?[base64-salt]
    code = encodes.split('?')[0];
    console.log("split code:"+code);
    passEBase64 = encodes.split('?')[1];
    console.log("split passEBase64:"+passEBase64);
  }catch(e){
    console.log("errors:"+e);
  }
  if (!code || code.length<1 ) {
    code = "空密码";
  }
  if (!passEBase64 || passEBase64.length<1) {
    passEBase64 = "";
    passDecodeBase64 = "";
    decode = "请输入盐";
  } else {
    passDecodeBase64 = decodeByBase64(passEBase64);
    decode = decryptByAES(code,passEBase64);

    if (decode!="" && decode!="密码错误") {
      setTimeout(function(){
        $('#webapp').removeClass('opacity1InOut');
        $('#webapp').addClass('opacity0InOut');
      },10000);
    } else {
      var i = Math.floor(Math.random()*errors.length);
      decode = errors[i];
    }
    // $('#result').removeClass('opacity0InOut');
    // $('#result').addClass('opacity1InOut');
  }

  $('#result').removeClass('opacity0InOut');
  $('#result').addClass('opacity1InOut');

  $('#slatText').val(passDecodeBase64);
  $('#resultText').val('加密密文：'+code+'\n加密钥匙：'+passEBase64+'\n解密钥匙：'+passDecodeBase64+'\n原文：'+decode);
  $('#result').html(decode);
});

function generatorEncodedPassword(password,tips){

  console.log("--tips:"+tips);
  tips = encodeByBase64(tips);
  console.log("--tips Base64:"+tips);
  console.log("--password:"+password);
  password = encryptByAES(password,tips);
  console.log("--password Base64 AES:"+password);
  console.log("--addslatCheckbox:"+$('#addslatCheckbox').prop("checked"));

  if (tips.length>1 && $('#addslatCheckbox').prop("checked")){
    password = password + '?' + tips;
  }
  password = encodeByBase64(password);

  console.log("--password tips Base64:"+password);
  return password;
}

function onClickedEncode() {
  // generatorText slatGenText
  var pass = String($('#generatorText').val()).replace(/ /g,"");
  var slat = String($('#slatGenText').val()).replace(/ /g,"");
  var generatorResult = generatorEncodedPassword(pass,slat);//unescape($('#generatorResult').val());
  generatorResult = path_root+path_password+generatorResult;
  // generatorResult = unescape(generatorResult);
  // generatorResult = generatorResult.replace(" ","");
  // generatorResult = generatorResult.replace(/ /g,"");
  // labelGenText
  qrLabel = String($('#labelGenText').val());
  console.log("--generatorResult:"+generatorResult);
  $('#generatorResult').html(generatorResult);
  loadJS("/js/src/jquery-qrcode-0.14.0/jquery-qrcode-0.14.0.min.js",function(){
    generatQR('#qrcode','image',generatorResult,qrLabel);
  });
}

function onClickedDecode() {
  // $('#resultText').val(window.location.href);
  var passDecodeBase64 = $('#slatText').val();
  // passDecodeBase64 = passDecodeBase64.replace(" ","");
  // passDecodeBase64 = passDecodeBase64.replace(/ /g,"");
  // passDecodeBase64 = escape(passDecodeBase64);
  // password = CryptoJS.enc.Utf8.parse(password);
  passEBase64 = encodeByBase64(passDecodeBase64);
  decode = decryptByAES(code,passEBase64);
  if (decode!="" && decode!="密码错误") {
    //setTimeout(function(){
    $('#webapp').removeClass('opacity1InOut');
    $('#webapp').addClass('opacity0InOut');
    //},5000);
  } else {
    var i = Math.floor(Math.random()*errors.length);
    decode = errors[i];
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

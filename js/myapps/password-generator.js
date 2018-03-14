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
var emoji = ["😎","😀","🌞","😁","🙃","🙈","👩","🕵","💤","💣","💥","💎","🌷","🌼","🌻","🌹","💐","🌸","🌳","☘","🌿","🌵","🍭","🍼","🔍"];
var mark = emoji[Math.floor(Math.random()*emoji.length)] ;
var checkMark = emoji[Math.floor(Math.random()*emoji.length)];
var map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=?<>{}-!@~#$%^&*():.,¥®©§∑∏π∫Ω≠Ψζξ";
var errors = new Array(
                      "❌ 密钥不蒸雀🐦",
                      "❌ 密钥不争气😂",
                      "❌ 密钥扎心了老铁❤️",
                      "❌ 密钥是你个头👋",
                      "❌ 你这是在乱输入么😊",
                      "❌ 你用的是什么输入法😝",
                      //"💢 密码提示：点击赏，有钱能使码推磨",
                      //"㊙️ 今天天气真好，密码就在天上，你却看不到😂",
                      //"🎵 刚才发生了一件搞笑事情，原来你不知道密码，哈哈哈😄",
                      "㊙️ 请联系我要密钥吧 ☎️"
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
  labelpassmsg.innerHTML += "正在载入解密器<br/>";
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
  $('#result').html(mark);
  // $('#encrypt-blog').addClass('opacity0InOut');




  if ($('#slatText').length==1){
    labelpassmsg.style.display = "none";
  }
  //slatText
  if ($('#slatText').length==0 && $('#tips').length==0){
    // post-body
    // var postbody = $('#postBody').html();
    // console.log(postbody);
    // animationText('postBody',postbody,1,1,true,100);
    // animationText('encrypt-blog',content,1,1,true,100);
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
    return;
  }
  if (!code || code.length<1 ) {
    code = "空密码";
  }
  if (!passEBase64 || passEBase64.length<1) {
    passEBase64 = "";
    passDecodeBase64 = "";
    decode = "请输入解密钥匙";
    $('#result').html(decode);
  } else {
    passDecodeBase64 = decodeByBase64(passEBase64);
    decode = decryptByAES(code,passEBase64);

    if (decode!="" && decode!="密钥错误") {
      $('#resultMarquee').removeClass('marquee');

      setTimeout(function(){
        $('#webapp').removeClass('opacity1InOut');
        $('#webapp').addClass('opacity0InOut');
      },10000);
      animationText('result',decode,60,10,false);
    } else {
      var i = Math.floor(Math.random()*errors.length);
      decode = errors[i];
      $('#result').html(decode);
    }
    // $('#result').removeClass('opacity0InOut');
    // $('#result').addClass('opacity1InOut');
    //
  }

  $('#result,#resultMarquee').removeClass('opacity0InOut');
  $('#result,#resultMarquee').addClass('opacity1InOut');



  $('#slatText').val(passDecodeBase64);
  $('#resultText').val('加密密文：'+code+'\n加密钥匙：'+passEBase64+'\n解密钥匙：'+passDecodeBase64+'\n原文：'+decode);


  // $("#result").draggable();
});

function animationText(divID,text,delay=50,delaywords=10,showmark=true,wait=3000) {
  var string = "";

  var speed = delay;
  var color ="black";
  var bgColor = "darkgreen";
  var cryptByte = "";
  var lastmarks = "";

  var i = 0,j=0,count=0,deg=0;

  setTimeout(function(){
    var t = setInterval(function(){
      // if(!string  || !text || text==undefined) {
      //   clearInterval(t);
      //   console.log('clearInterval animationText error!');
      //   console.log("string:"+string);
      //   console.log("text:"+text);
      // }
      if (string.length<text.length) {
        string += mark;
        $('#'+divID).html(string);
      }else{
        if ((j++)>delaywords) {
          if (count>=text.length-1) {
            // $('#result').css("transition","transform 3s");
            // $('#result').css("transform","translateX(20%)");
            $('#'+divID).html(text);
            clearInterval(t);
            console.log('clearInterval animationText done!');
          } else {
            // if (showmark) {
              lastmarks =  string.substring(count,string.length);
            // }
            if (count>0) {
              string = string.substring(0,count) + text[count] + lastmarks;
            } else {
              string =  text[count] + string.substring(count,string.length-1);
            }
            count++;
            j=0;
            checkMark = emoji[Math.floor(Math.random()*emoji.length)];
          }

        } else {
          i = Math.floor(Math.random()*map.length);
          lastmarks =  string.substring(count,string.length-count);
          if (showmark) {
            bgColor="inherit";
            deg = 0;//Math.floor(Math.random()*360);
            color="inherit";
          } else {
            deg = 0;//Math.floor(Math.random()*360);
            if(j%10==0){
              bgColor=="black"?bgColor="darkgreen":bgColor="black";
              color=="black"?color="darkgreen":color="black";
            }
            // color=getRandomColor();
          }
          cryptByte='<label style="border-radius: 100px;border: 0px;color:'+color+';background:'+bgColor+';padding:4px;transform: rotate('+deg+'deg);">'+map[i]+'</label>';

          if (count>0) {
            mark = string.substring(0,count) +cryptByte + lastmarks;
          } else {
            mark =  cryptByte + string.substring(count,string.length-count-1);
          }
          // document.getElementById(divID).innerHTML = mark;
          $('#'+divID).html(mark);
          // $('#result').html(string+map[i]);
          // console.log(string+text[i]);
        }

      }
    },speed);
  },wait);
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


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
  $('#result').html(mark);
  // $('#resultText').val(window.location.href);
  var passDecodeBase64 = $('#slatText').val();
  // passDecodeBase64 = passDecodeBase64.replace(" ","");
  // passDecodeBase64 = passDecodeBase64.replace(/ /g,"");
  // passDecodeBase64 = escape(passDecodeBase64);
  // password = CryptoJS.enc.Utf8.parse(password);
  passEBase64 = encodeByBase64(passDecodeBase64);
  decode = decryptByAES(code,passEBase64);
  if (decode!="" && decode!="密钥错误") {
    //setTimeout(function(){
    $('#webapp').removeClass('opacity1InOut');
    $('#webapp').addClass('opacity0InOut');
    $('#resultMarquee').removeClass('marquee');
    //},5000);
    animationText('result',decode);
  } else {
    var i = Math.floor(Math.random()*errors.length);
    decode = errors[i];
    $('#result').html(decode);
  }
  $('#resultText').val('加密密文：'+code+'\n加密钥匙：'+passEBase64+'\n解密钥匙：'+passDecodeBase64+'\n原文：'+decode);
  // $('#result').html(decode);
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
          // alert("密钥错误");
          content="密钥错误";
      }
    }catch (e) {
      content="密钥错误";
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

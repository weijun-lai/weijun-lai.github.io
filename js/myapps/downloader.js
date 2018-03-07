
function decryptAES() {
  try {
      var content = CryptoJS.AES.decrypt(document.getElementById("urlText").innerHTML.trim(), pass);
      content = content.toString(CryptoJS.enc.Utf8);
      content = decodeBase64(content);
      content = unescape(content);
      if (content == '') {
          alert("地址错误");
      }
    } catch (e) {
        alert("地址错误");
        // console.log(e);
    }
}

function htmlDecode (str) {
    var s = "";
    if (str.length == 0) return "";

    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g,   "<");
    s = s.replace(/&gt;/g,   ">");
    s = s.replace(/&nbsp;/g, "    ");
    s = s.replace(/'/g,      "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g,   "\n");
    return s;
}

function decodeBase64(content) {
    content = CryptoJS.enc.Base64.parse(content);
    content = CryptoJS.enc.Utf8.stringify(content);
    return unescape(content);
}

function encodeBase64(content) {
  content = escape(content);
  content = CryptoJS.enc.Utf8.parse(content);
  content = CryptoJS.enc.Base64.stringify(content);
  return content;
}

function getType(content) {
  var codes = content.split(":?");
  if (codes.length==2) {
    // todo 磁力链接格式 magnet:?
    console.log(codes.length);
    console.log(codes);
    return codes;
  }
  codes = content.split("://");
  // if (codes.length==2) {
  //   console.log(codes.length);
  //   console.log(codes);
  // }
  console.log(codes.length);
  console.log(codes);
  return codes;
}

function convertCode() {
  var code = $("#urlText").val();
  var codes = code.split("\n");
  var lines = "";
  var line = "";
  console.log(code.split("\n").length);
  var plainText = "";
  for (var i = 0; i < codes.length; i++) {
    plainText += '----'+(i+1)+'----' +'\n';
    lines = getType(codes[i]);
    line = "";
    try{
      if (lines.length==2) {
        if (lines[0].toUpperCase() == "thunder".toUpperCase()) {
          line = decodeBase64(lines[1]);
          line = line.substring(2,line.length-2);
          plainText += line +'\n';
        }
        if (lines[0].toUpperCase() == "http".toUpperCase() ||
      lines[0].toUpperCase() == "https".toUpperCase()) {
          plainText += 'base64: '+encodeBase64(codes[i])+'\n';
          plainText += 'thunder://' + encodeBase64('AA'+codes[i]+'ZZ')+'\n';
          plainText += 'flashget://' + encodeBase64('[FLASHGET]'+codes[i]+'[FLASHGET]')+'\n';
          plainText += 'qqdl://' + encodeBase64(codes[i])+'\n';
        }
        if (lines[0].toUpperCase() == "flashget".toUpperCase()) {
          line = decodeBase64(lines[1]);
          line = line.replace(/\[FLASHGET\]/g, "");
          plainText += line +'\n';
        }
        if (lines[0].toUpperCase() == "qqdl".toUpperCase()) {
          line = decodeBase64(lines[1]);
          plainText += line +'\n';
        }
      } else {
        plainText += encodeBase64(codes[i])+'\n';
      }
      // plainText += decodeBase64(line)+'\n';
    } catch (e) {
      //console.log(e);
      plainText += encodeBase64(codes[i])+'\n';
    }
  }
  console.log(plainText);
  $("#resultText").val(plainText);
}

function onMyClicked() {
  convertCode();
}

// add enter to decrypt
addLoadEvent(function() {
    console.log('register');
    var code = "";
    var plainText = "";
    document.getElementById("urlText").onkeypress = function(keyPressEvent) {
        //console.log(keyPressEvent.keyCode === 13);
        if (keyPressEvent.keyCode === 13) {
            convertCode();
        }
    };
});

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

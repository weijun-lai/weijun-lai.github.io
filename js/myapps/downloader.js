
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
  console.log(codes.length);
  console.log(codes);
  if (codes.length==2) {
    // todo 磁力链接格式 magnet:?
    console.log(codes.length);
    console.log(codes);
    return codes;
  }
  codes = content.split("://");
  if (codes.length==2) {
    console.log(codes.length);
    console.log(codes);
    return codes;
  }
  codes = content.split(":");
  if (codes.length==2) {
    // todo decode base64
    console.log(codes.length);
    console.log(codes);
    return codes;
  }
  console.log(codes.length);
  console.log(codes);
  return codes;
}

function getXunLeiBTLink(infoHash){
  // 	magnet:?xt=urn:btih:D84ABC1F6605F03BC363E758805EC1A1550DA751
  var link ="";
  if (infoHash.length==32) {
    link ='无';
  }
  if (infoHash.length==40) {
    link = '迅雷种子库:\n'+ 'http://bt.box.n0808.com/'+infoHash.slice(0,2)+'/'+infoHash.slice(38)+'/'+infoHash+'.torrent\n';
    link += '其他种子库:\n'+'http://torrage.com/torrent/'+infoHash+'.torrent\n';
    link += '其他种子库:\n'+'https://torcache.net/torrent/'+infoHash+'.torrent\n';
    link += '其他种子库:\n'+'https://zoink.it/torrent/'+infoHash+'.torrent\n';
    link += '其他种子库:\n'+'http://magnetres.com/h_'+infoHash+'\n';
  }
  return link;
}

function getMagnetToBTLink(content) {
  var infoHash = getMagnetInfoHash(content);
  return getXunLeiBTLink(infoHash);
}

function getMagnetInfoHash(content){
  var dataAnd = content.split('&');
  var dataEQ = "";
  var dataQT = "";
  var infoHash = "";
  console.log(dataAnd);
  for (var i = 0; i < dataAnd.length; i++) {
    dataEQ = dataAnd[i].split('=');
    console.log(dataEQ);
    for (var j = 0; j < dataEQ.length; j++) {
      dataQT = dataEQ[j].split(':');
      console.log(dataQT);
      if (dataQT.length==3) {
        if ( dataQT[1].toUpperCase()== 'btih'.toUpperCase()) {
          infoHash = dataQT[2];
          return infoHash;
        }
      }
    }
  }
  return infoHash;
}

function geted2kToBTLink(content) {
  var data = content.split('|');
  var infoHash = "";
  var fileSize = "";
  var result = "";
  console.log(data.length);
  console.log(data);
  if (data.length==6) {
    fileSize = data[3];
    infoHash = data[4];
  }
  console.log(infoHash);
  result = getXunLeiBTLink(infoHash) + '\n';

  result += 'magnet:?xt=urn:ed2k:'+fileSize+'|'+infoHash+'&xl='+fileSize+'\n';

  return result;
}

function convertCode() {
  var code = $("#urlText").val();
  var codes = code.split("\n");
  var lines = "";
  var line = "";
  console.log(code.split("\n").length);
  var plainText = "";
  for (var i = 0; i < codes.length; i++) {
    if (codes[i].length<1) {
      continue;
    }
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
          plainText += 'base64:'+encodeBase64(codes[i])+'\n';
          plainText += 'thunder://' + encodeBase64('AA'+codes[i]+'ZZ')+'\n';
          plainText += 'flashget://' + encodeBase64('[FLASHGET]'+codes[i]+'[FLASHGET]')+'\n';
          plainText += 'qqdl://' + encodeBase64(codes[i])+'\n';
        }
        if (lines[0].toUpperCase() == "flashget".toUpperCase()) {
          line = decodeBase64(lines[1]);
          line = line.replace(/\[FLASHGET\]/g, "");
          plainText += line +'\n';
        }
        if (lines[0].toUpperCase() == "magnet".toUpperCase()) {
          console.log(lines[1]);
          line = getMagnetToBTLink(lines[1]);
          console.log(line);
          plainText += line +'\n';
        }
        if (lines[0].toUpperCase() == "ed2k".toUpperCase()) {
          console.log(lines[1]);
          line = geted2kToBTLink(lines[1]);
          console.log(line);
          plainText += line +'\n';
        }
        if (lines[0].toUpperCase() == "qqdl".toUpperCase()) {
          line = decodeBase64(lines[1]);
          plainText += line +'\n';
        }
        if (lines[0].toUpperCase() == "base64".toUpperCase()) {
          line = decodeBase64(lines[1]);
          plainText += line +'\n';
        }
      } else {
        plainText += 'base64:'+encodeBase64(codes[i])+'\n';
      }
      // plainText += decodeBase64(line)+'\n';
    } catch (e) {
      //console.log(e);
      plainText += 'base64:'+encodeBase64(codes[i])+'\n';
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

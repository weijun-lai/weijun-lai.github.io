
function decryptAES() {
    var pass = String(document.getElementById("pass").value);
    var labelmsg = document.getElementById("labelmsg");
    var labelpass = document.getElementById("pass");

    try {
        var content = CryptoJS.AES.decrypt(document.getElementById("encrypt-blog").innerHTML.trim(), pass);
        content = content.toString(CryptoJS.enc.Utf8);
        content = decodeBase64(content);
        content = unescape(content);
        if (content == '') {
            // alert("密码错误");
            showErrors();
        } else {
          showOK();

          setTimeout(function(){
            document.getElementById("encrypt-blog").style.display    = "inline";
            document.getElementById("encrypt-blog").innerHTML        = '';
            // use jquery to load some js code
            $("#encrypt-blog").html(content);

            document.getElementById("security").style.display        = "none";

            if (document.getElementById("toc-div")) {
                document.getElementById("toc-div").style.display     = "inline";
            }
          },5000);
        }
    } catch (e) {
        showErrors();
        // alert("密码不争气");
        // console.log(e);
    }
}

function showOK() {
  var labelmsg = document.getElementById("labelmsg");
  var labelpass = document.getElementById("pass");


  $('#header,#comments,#footer,.post-meta,.post-footer').removeClass('opacity0InOut');
  $('#header,#comments,#footer,.post-meta,.post-footer').addClass('opacity1InOut');
  $('#encrypt-blog').removeClass('plaintext');

  labelmsg.style.color = "green";
  labelmsg.style.textAlign="center";
  labelmsg.style.margin="auto";
  labelmsg.innerHTML = '<img src="/images/balloon.svg" style="border:0px;padding:0px;height:24px;width:24px ;display:inline-block;" />';
  labelmsg.innerHTML += "密码正确! 正在解密档案<br/>";
  labelmsg.innerHTML += '<img src="/images/loading.svg" style="border:0px;padding:0px;height:64px;width:64px ;display:inline-block;" />';

  labelpass.value = "*****************";
  labelpass.style.display = "none";
}

function showErrors() {
  var labelmsg = document.getElementById("labelmsg");
  var labelpass = document.getElementById("pass");
  var tips = String(document.getElementById("tips").value);
  var errors = new Array(
                        "❌ 密码不蒸雀🐦",
                        "❌ 密码不争气",
                        "❌ 密码扎心了老铁❤️",
                        "❌ 密码是你个头👋",
                        "❌ 你这是在乱输入么😊",
                        "❌ 你用的是什么输入法😝",
                        "💢 密码提示：点击赏，有钱能使码推磨",
                        "㊙️ 今天天气真好，密码就在天上，你却看不到😂",
                        "🎵 刚才发生了一件搞笑事情，原来你不知道密码，哈哈哈😄",
                        "☎️ 请联系我要密码吧 ☎️"
                      );
    labelmsg.style.color = "red";
    var i = Math.floor(Math.random()*errors.length);
    labelmsg.innerHTML = errors[i];
    labelpass.value = "";
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
    return content;
}



// add enter to decrypt
addLoadEvent(function() {
    // console.log('register');
    document.getElementById("pass").onkeypress = function(keyPressEvent) {
        console.log(keyPressEvent.keyCode === 13);
        if (keyPressEvent.keyCode === 13) {
            decryptAES();
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

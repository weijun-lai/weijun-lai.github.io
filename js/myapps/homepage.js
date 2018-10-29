

function showBlogList() {
  // $('#header,#comments,#footer,#sidebar,.post-meta,.post-footer').css({"display":"block"});
  $('#header,#comments,#footer,#sidebar,.post-meta,.post-footer').css({"opacity":"1"});

  // $('#header,#comments,#footer,.post-meta,.post-footer').removeClass('opacity0InOut');
  // $('#header,#comments,#footer,.post-meta,.post-footer').addClass('opacity1InOut');

  $('#blogContent').css({"display":"block"});
  $('#homeContent').css({"display":"none"});
}

function hideBlogList() {
  // blogContent
  // homeContent
  //
  // $('#header,#comments,#footer,#sidebar,.post-meta,.post-footer').css({"display":"none"});
  $('#header,#comments,#footer,#sidebar,.post-meta,.post-footer').css({"opacity":"0"});

  // $('#header,#comments,#footer,.post-meta,.post-footer').removeClass('opacity1InOut');
  // $('#header,#comments,#footer,.post-meta,.post-footer').addClass('opacity0InOut');
}

function showHomeContent() {
  // $('body').css({"opacity":"1"});
  hideBlogList();
  var imglinks = '<img class="site-author-image" src="/images/avatar.jpg">';
  var blogLinks = '<button type="button" class="btn btn-primary" onclick="showBlogList();" >Blog</button>';
  blogLinks += '<span style="margin-left:20px;border:2px solid black;padding:4px;"><a href="/password" style="border-bottom: 0px;">密码库</a></span>';
  blogLinks += '<span style="margin-left:20px;border:2px solid black;padding:4px;"><a href="/2018/03/07/下载地址解析/" style="border-bottom: 0px;">地址解析</a></span>';
  var greedText = "Welcome to laiweijun.com";
  var text = imglinks+"<br/><h3 id='greed'>Welcome to laiweijun.com</h3><br/><br/>"+blogLinks;
  $('#homeContent').css({"text-align":"center"});
  $('#homeContent').html(text);

  animationText('greed',greedText,10,10,false,1000);
  setTimeout(() => {
    showBlogList()
  }, 5000);
}

// $('body').css({"opacity":"0"});
hideBlogList();

$(document).ready(function() {
  showHomeContent();
  
});

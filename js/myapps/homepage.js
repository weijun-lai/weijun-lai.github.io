

function showBlogList() {
  // $('#header,#comments,#footer,.post-meta,.post-footer').css({"display":"block"});
  $('#header,#comments,#footer,.post-meta,.post-footer').css({"opacity":"1"});

  // $('#header,#comments,#footer,.post-meta,.post-footer').removeClass('opacity0InOut');
  // $('#header,#comments,#footer,.post-meta,.post-footer').addClass('opacity1InOut');

  $('#blogContent').css({"display":"block"});
  $('#homeContent').css({"display":"none"});
}

function hideBlogList() {
  // blogContent
  // homeContent
  //
  // $('#header,#comments,#footer,.post-meta,.post-footer').css({"display":"none"});
  $('#header,#comments,#footer,.post-meta,.post-footer').css({"opacity":"0"});

  // $('#header,#comments,#footer,.post-meta,.post-footer').removeClass('opacity1InOut');
  // $('#header,#comments,#footer,.post-meta,.post-footer').addClass('opacity0InOut');
}

function showHomeContent() {
  // $('body').css({"opacity":"1"});
  hideBlogList();
  var imglinks = '<img class="site-author-image" src="/images/avatar.jpg">';
  var blogLinks = '<button type="button" class="btn btn-primary" onclick="showBlogList();" >Blog</button>';
  $('#homeContent').css({"text-align":"center"});
  $('#homeContent').html(imglinks+"<br/>Welcome to laiweijun.com <br/><br/>"+blogLinks);

}

// $('body').css({"opacity":"0"});
hideBlogList();

$(document).ready(function() {
  showHomeContent();
});

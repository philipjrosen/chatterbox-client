var getChats = function(successCallback) {
  var lastPostTime = $('li span').first().text() || '2014-12-01T00:00:00';
  console.log(lastPostTime);
  // if ($('.post').length) {
  //   lastPostTime = '&where={"createdAt":{"$gte":' + '"' + $lastPostTime + '"' + '}}';
  //   console.log(lastPostTime);
  // }

  // url: 'https://api.parse.com/1/classes/chatterbox' + '?order=-createdAt'+ lastPostTime,
  var url = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt&where={"createdAt":{"$gt":"'+lastPostTime+'"}}';
  console.log(url);

  $.ajax({
    url: url,
    type: 'GET',
    success: function (data) {
      console.log('data results', data.results);
      successCallback(data.results);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
}

var postChat = function(message) {
  $.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log("post:", data);
  },
  error: function (data) {
    console.error('chatterbox: Failed to send message');
  }
});
};

var displayMessages = function(messages) {
  var $ul = $('.chatList');
  _.each(messages, function(message){
    var $li = $('<li class="post"></li>');
    var $user = $('<p class=user></p>');
    var $message = $('<p class="message"></p>');
    var $createdAt = $('<span class="createdAt"></span>');
    $user.text(message.username);
    $message.text(message.text);
    $createdAt.text(message.createdAt);
    $li.append($user, $message, $createdAt);
    $ul.append($li);
  });
};

$(document).ready(function(){
  getChats(displayMessages);

  $('button').on('click', function(){
    getChats(displayMessages);
  });

  $('.postMessage').on('submit', function(e) {
    e.preventDefault();
    var message = {};
    var $text = $(this).find("input[name='message']");
    var $username = $(this).find("input[name='username']");
    message['text'] = $text.val();
    message['username'] = $username.val();
    $text.val('');
    $username.val('');
    postChat(message);
  });

});

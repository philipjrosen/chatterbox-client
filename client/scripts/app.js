
var getChats = function(successCallback) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    success: function (data) {
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
    $user.text(message.username);
    $message.text(message.text);
    $li.append($user, $message);
    $ul.append($li);
  });
}

var displayNewMessages = function(messages) {
  var $length = $('li').length;
  var results = messages.slice($length);
  if ( !results.length ) {
    console.log('displayNewMessages')
  }
  displayMessages(results);
};

$(document).ready(function(){
  getChats(displayMessages);

  $('button').on('click', function(){
    getChats(displayNewMessages);
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

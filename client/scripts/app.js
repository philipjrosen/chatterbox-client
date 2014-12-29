$.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  success: function (data) {
    displayMessages(data);
  },
  error: function (data) {
    console.error('chatterbox: Failed to send message');
  }
});

var displayMessages = function(data) {
  var $ul = $('.chatList');
  _.each(data.results, function(message){
    var $li = $('<li class="post"></li>');
    var $user = $('<p class=user></p>');
    var $message = $('<p class="message"></p>');
    $user.text(message.username);
    $message.text(message.text);
    $li.append($user, $message);
    $ul.append($li);
  });
}

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
    var $li = $('<li></li>');
    $li.text(message.username);
    $ul.append($li);
  });
}

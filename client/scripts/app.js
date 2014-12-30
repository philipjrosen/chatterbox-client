window.app = {
  server: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    app.fetch();
  },

  send: function(message) {
    $.ajax({
      url: app.server,
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
  },

  fetch: function() {
    var lastPostTime = $('li span').first().text() || '2014-12-01T00:00:00';
    $.ajax({
      url: app.server,
      data: 'order=-createdAt&where={"createdAt":{"$gt":"'+lastPostTime+'"}}',
      type: 'GET',
      success: function (data) {
        app.displayMessages(data.results);
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch message');
      }
    });
  },

  displayMessages: function(messages) {
    _.each(messages, function(message){
      app.addMessage(message);
    });
  },

  clearMessages: function() {
    $("#chats").empty();
  },

  addMessage: function(message){
    var arePosts = !!$('.post').length;
    var $ul = $('#chats');
    var $li = $('<li class="post"></li>');
    var $user = $('<p class=user></p>');
    var $message = $('<p class="message"></p>');
    var $createdAt = $('<span class="createdAt"></span>');
    $user.text(message.username);
    $message.text(message.text);
    $createdAt.text(message.createdAt);
    $li.append($user, $message, $createdAt);
    arePosts ? $ul.prepend($li) : $ul.append($li);
  },

  addRoom: function(roomName) {
    var $newRoom = $('<div></div>').addClass('roomName');
    $('#roomSelect').append($newRoom);
  }
};

$(document).ready(function(){
  app.init();

  $('button').on('click', function(){
    app.fetch();
  });

  $('.postMessage').on('submit', function(e) {
    e.preventDefault();
    var message = {};
    var $text = $(this).find("input[name='message']");
    var $username = $(this).find("input[name='username']");
    message['text'] = $text.val();
    message['username'] = $username.val();
    // note, this is hardcoded and shouldn't be
    message['roomname'] = 'defaultRoomName';
    $text.val('');
    $username.val('');
    app.send(message);
  });

});

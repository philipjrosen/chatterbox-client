window.app = {
  server: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    app.fetch();
  },

  send: function(message) {
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
  },

  fetch: function() {
    var lastPostTime = $('li span').first().text() || '2014-12-01T00:00:00';
    var url = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt&where={"createdAt":{"$gt":"'+lastPostTime+'"}}';
    // note: need to account for query options in ajax call
    $.ajax({
      url: app.server,
      type: 'GET',
      success: function (data) {
        app.displayMessages(data.results);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  displayMessages: function(messages) {
    var arePosts = !!$('.post').length;
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
      arePosts ? $ul.prepend($li) : $ul.append($li);
    });
  }
};


// var getChats = function(successCallback) {
//   var lastPostTime = $('li span').first().text() || '2014-12-01T00:00:00';
//   var url = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt&where={"createdAt":{"$gt":"'+lastPostTime+'"}}';

//   $.ajax({
//     url: url,
//     type: 'GET',
//     success: function (data) {
//       successCallback(data.results);
//     },
//     error: function (data) {
//       console.error('chatterbox: Failed to send message');
//     }
//   });
// }

// var postChat = function(message) {
//   $.ajax({
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log("post:", data);
//     },
//     error: function (data) {
//       console.error('chatterbox: Failed to send message');
//     }
//   });
// };

// var displayMessages = function(messages) {
//   var arePosts = !!$('.post').length;
//   console.log(arePosts);
//   var $ul = $('.chatList');
//   _.each(messages, function(message){
//     var $li = $('<li class="post"></li>');
//     var $user = $('<p class=user></p>');
//     var $message = $('<p class="message"></p>');
//     var $createdAt = $('<span class="createdAt"></span>');
//     $user.text(message.username);
//     $message.text(message.text);
//     $createdAt.text(message.createdAt);
//     $li.append($user, $message, $createdAt);
//     arePosts ? $ul.prepend($li) : $ul.append($li);
//   });
// };

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

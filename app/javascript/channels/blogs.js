(function() {
  jQuery(document).on({
    'turbolinks': load
  }, function() {
    var comments;
    comments = $('#comments');
    if (comments.length > 0) {
      App.global_chat = App.cable.subscription.create({
        channel: "BlogsChannel",
        blog_id: comments.data('blog-id')
      }, {
        connected: function() {},
        disconnected: function() {},
        received: function(data) {
          return comments.append(data['comment']);
        },
        send_comment: function(comment, blog_id) {
          return this.perform('send_comment', {
            comment: comment,
            blog_id: blog_id
          });
        }
      });
    }
    return $('#new_comment').submit(function(e) {
      var $this, textarea;
      $this = $(this);
      textarea = $this.find('#comment_content');
      if ($.trim(textarea.val()).length > 1) {
        App.global_chat.send_commen(textarea.val(), comments.data('blog-id'));
        textarea.val('');
      }
      e.preventDefault();
      return false;
    });
  });

}).call(this);

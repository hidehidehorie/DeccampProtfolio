import consumer from "./consumer"

$(document).on('turbolinks:load', function() {
  let comments;
  let consumer_inst;
  comments = $('#comments');
  if (comments.length > 0) {
    consumer_inst = consumer.subscriptions.create({
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
    let $this, textarea;
    $this = $(this);
    textarea = $this.find('#comment_content');
    if ($.trim(textarea.val()).length > 1) {
      consumer_inst.send_comment(textarea.val(), comments.data('blog-id'));
      textarea.val('');
    }
    e.preventDefault();
    return false;
  });
});

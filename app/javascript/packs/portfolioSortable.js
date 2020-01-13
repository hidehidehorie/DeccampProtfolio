let set_positions = function() {
  $('.card').each(i => {
    $(this).attr('data-pos', i + 1);
  });
};

$(document).ready = $(function(){
  set_positions();
  $('.sortable').sortable();
  $('.sortable').sortable().bind('sortupdate', (e, ui) => {
    let updated_order = [];
    set_positions();
    $('.card').each((i, el) => {
      updated_order.push({
        id: $(el).data('id'),
        position: i + 1
      });
    });
    $.ajax({
      type: 'PUT',
      url: '/portfolios/sort',
      data: {
        order: updated_order
      }
    });
  });
});

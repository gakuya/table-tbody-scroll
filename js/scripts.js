$(function() {
  $(".table__fixed-head-foot:last").ready(function() {
    set_table_fixed_head_foot();
  });

  set_table_fixed_head_foot = function() {
    table = $('.table__fixed-head-foot');
    thead = table.find('thead');
    tbody = table.find('tbody');
    tfoot = table.find('tfoot');

    // テーブルが複数ある場合の処理
    table.each(function(i, el) {
      default_height = $(el).closest('.table__fixed-head-foot--wrap').css('height').replace(/px/g, '');

      if (Number(default_height) > $(el).outerHeight()) {
        $(el).closest('.table__fixed-head-foot--wrap').outerHeight($(el).outerHeight());
      }
    });

    tbody.each(function(i_tbody, el_tbody) {
      tbody_row = 'tr:first-child';
      $(el_tbody).find(tbody_row + ' td').each(function(i_col, el_col) {
        $(thead).eq(i_tbody).find(tbody_row + ' th').eq(i_col).css('width', $(el_col).outerWidth() + 'px');
        $(tbody).eq(i_tbody).find(tbody_row + ' td').eq(i_col).css('width', $(el_col).outerWidth() + 'px');
      });
    });

    tfoot.each(function(i_tfoot, el_tfoot) {
      tfoot_col = 'tr:first-child td, tr:first-child th';
      $(el_tfoot).find(tfoot_col).each(function(i_col, el_col) {
        $(tfoot).eq(i_tfoot).find(tfoot_col).eq(i_col).css('width', $(el_col).outerWidth() + 'px');
      });
    });

    thead.css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'z-index': '2000'
    });
    tfoot.css({
      'position': 'absolute',
      'bottom': '0',
      'left': '0',
      'z-index': '2001'
    });

    table.css('margin-top', thead.outerHeight() - 2); // thead の上下ボーダーサイズの合計値を引く
    table.css('margin-bottom', tfoot.outerHeight() - 2);

    $('.table__fixed-head-foot--wrap').scroll(function() {
      table_scroll = $(this).find('.table__fixed-head-foot');
      thead_fixed = table_scroll.find('thead');
      tbody_fixed = table_scroll.find('tbody');
      tfoot_fixed = table_scroll.find('tfoot');
      scroll = $(this).scrollTop();
      table_height = thead_fixed.outerHeight() + tbody_fixed.outerHeight() + tfoot_fixed.outerHeight();
      scroll_max = table_height - $(this).outerHeight();

      if (scroll > scroll_max) {
        scroll = scroll_max
      }

      $(thead_fixed).css('top', scroll + 'px');
      $(tfoot_fixed).css('bottom', '-' + scroll + 'px');
    });
  };
});

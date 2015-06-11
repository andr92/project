$(document).ready(function() {


var counterall=$('#users tr').length;	
$('input#allnumb').val(counterall);



   // По умолчанию все строки имеют класс visible
  $('tbody tr').addClass('visible');
 
  $('#filter').keyup(function(event) {
    // Если нажат Escape или ничего не введено
    if (event.keyCode == 27 || $(this).val() == '') {
      // Если нажат Escape, нужно очистить строку поиска
      $(this).val('');
 
      // Отобразим все строки, так как если
      // ничего не введено, все строки должны быть видны
      $('tbody tr').removeClass('visible').show().addClass('visible');
    }
 
    // Если введён текст, будем фильтровать
 
    else {
      filter('tbody tr', $(this).val());
    }
 });
    // Включим чересполосицу
    $('.visible td').removeClass('odd');
    // Получим все заголовки столбцов
$('thead th').each(function(column) {
 
  $('tbody tr').hover(function(){
  $(this).find('td').addClass('hovered');
}, 
  function(){
  $(this).find('td').removeClass('hovered');
});
});

$(window).scroll(function(){
if ($(this).scrollTop() > 100) {
$('.scrollup').fadeIn();
} else {
$('.scrollup').fadeOut();
}
});
 
$('.scrollup').click(function(){
$("html, body").animate({ scrollTop: 0 }, 600);
return false;
});



// Получим все заголовки столбцов
$('thead th').each(function(column) {
  $(this).addClass('headers').click(function(){
    var findSortKey = function($cell) {
      return $cell.find('.sort-key').text().toUpperCase() + ' ' + $cell.text().toUpperCase();
    };
    var sortDirection = $(this).is('.headers-asc') ? -1 : 1;
 
    // Пройдёмся вверх по дереву, чтобы получить строки с данными для сортировки
    var $rows = $(this).parent().parent().parent().find('tbody tr').get();
 
    // Циклом пройдём по всем строкам в поиске данных
    $.each($rows, function(index, row) {
      row.sortKey = findSortKey($(row).children('td').eq(column));
    });
 
    // Сравнение и алфавитная сортировка строк
    $rows.sort(function(a, b) {
        if (a.sortKey < b.sortKey) return -sortDirection;
        if (a.sortKey > b.sortKey) return sortDirection;
        return 0;
    });
 
    // Добавим строки в правильном порядке в начало таблицы
    $.each($rows, function(index, row) {
        $('tbody').append(row);
        row.sortKey = null;
    });
 
    // Определим порядок сортировки столбца
    $('th').removeClass('headers-asc headers-desc');
    var $sortHead = $('th').filter(':nth-child(' + (column + 1) + ')');
    sortDirection == 1 ? $sortHead.addClass('headers-asc') : $sortHead.addClass('headers-desc');
 
    // Определим столбец, по которому ведётся сортировка
    $('td').removeClass('headers')
                .filter(':nth-child(' + (column + 1) + ')')
                .addClass('headers');
 
    $('.visible td').removeClass('odd');
    zebraRows('.visible:even td', 'odd');
  });
});




}	
);
 $(window).resize(function(){
	DIALOG.setDialogs();
});


// Фильтрация результатов по запросу
function filter(selector, query) {
  query =   $.trim(query); // Обрезать пробелы
  query = query.replace(/ /gi, '|'); // Добавим ИЛИ к регулярному выражению
 
  $(selector).each(function() {
    ($(this).text().search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('visible') : $(this).show().addClass('visible');
  });
  
 
}

$('#filter2').bind("change keyup input click", function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});
$('#filter1').bind("change keyup input click", function() {
    if (this.value.match(/[^A-Za-z]/g)) {
        this.value = this.value.replace(/[^A-Za-zА-Яа-я]/g, '');
    }
});

function confirmDelete() {
if (confirm("Вы подтверждаете удаление?")) {
return true;
} else {
return false;
}
};


function showform(){
    $('#form_container').slideToggle(200);
};

function closeform(){
    $('#form_container').slideUp(200);
    $('.addinput').val('');
};


function closeupdform(){
    $('#updform_container').slideUp(200);
    $('.updinput').val('');
      
};
var DIALOG = {
	current: null,
	delay: 800,
	timer: null,
	setDialogs: function () {
		var screenWidth = $(window).width(),
			screenBottom = $(window).scrollTop() + $(window).height();	
		
		$('.dialog').parent().hover(function(){
			// store the dialog being hovered
			DIALOG.current = $(this);
			DIALOG.timer = setTimeout(function(){
				// find the dialog, 
				DIALOG.current.find(".dialog").fadeIn('fast');
			}, DIALOG.delay);
		}, function(){
			// on mouseout, clear timer and hide dialog
			clearTimeout(DIALOG.timer);
			$(this).find(".dialog").fadeOut('fast');
		}).attr("title", ""); // clear the title to stop browser tooltips
		
		$(".dialog").each(function() { // grab the containing element
			var container = $(this).parent(),
				top = container.height(), // default placement
				totalHeight = top + $(this).outerHeight(),
				width = $(this).outerWidth(),
				offset = container.offset(),
				left = 0;

			// give it relative position if required
			if (container.css('position') != 'absolute' && container.css('position') != 'fixed') {
				container.css({position: 'relative'});
			}

			// re-position if it's off the right of the screen
			if (offset.left + width > screenWidth) {
				left = 0 - width + 42;
				$(this).addClass('left');
			}
			else {
				$(this).removeClass('left');
			}
			
			// re-position if it's off the bottom of the screen
			if (offset.top + totalHeight > screenBottom) {
				top = 0 - $(this).outerHeight();
				$(this).addClass('above');
			} 
			else {
				$(this).removeClass('above');
			}

			// finally set the css properties to position onscreen
			$(this).css({
				"top": top,
				"left": left
			});
		});
	}
};
$(document).ready(function() {
	DIALOG.setDialogs();
	
});

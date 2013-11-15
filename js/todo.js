$(document).ready(function() {
	$("#tabs").tabs();

	$('#button').removeAttr('onclick');

	var $getList = localStorage.getItem("listKey");
	var $getFav = localStorage.getItem('favKey');
	$("#listItems").append($getList);
	$("#listItems2").append($getFav);
   
 
	$('#txt').on('focus keyup', function() {
		var $taskText = $(this).val();

		if ($.trim($taskText).length === 0) {
			$('#button').off('click').addClass('disabled');

		} else {
			/************/
			$('#txt').keypress(function(e) {

				if ((e.which == 13) || (e.keyCode == 13)) {
					e.preventDefault();
					enableClick();
					$('#button').removeClass('disabled');
				}
				$('#button').addClass('enabled');
			});

			/************/
			$('#button').on('click', enableClick).removeClass('disabled').addClass('enabled');

		}
	});

	$('#list').on('click', 'li', function() {
		if ($(this).children().is(':checked')) {
			$(this).remove();
		}
	});
	
	$('#quit').click(function(){	
		window.close();
	});
	
	//store task/fav list before closing
	$(window).on('beforeunload', function() {
		var $listAfter = $("#listItems").html();
		var $favList = $("#listItems2").html();
		localStorage.setItem("listKey", $listAfter);
		localStorage.setItem("favKey", $favList);
		//  return 'saved';
	});

	//favorutes .ui-icon-star
	$('#listItems').on('click', 'img', function() {
		var $img = $(this);

		var $list = $('#listItems2');
		var $taskText = $(this).siblings('span').text();
		if ((checkDuplicates($taskText, $list) == true) || ($('#listItems2').children().length == 0)) {
			$('#listItems2').append('<li class="curItem"><input type="checkbox" class = "item1" value= ""/>' + '<span class="display">'+$taskText+'</span><input type="text" class="edit" style="display:none"/><img src="images/home.png" height="20" width="20" style="display: inline-block"/></li>');

			$img.attr('src', 'images/star-full.png')

		} else {
			alert("this task already exist in your ToDo list ");
		}
	});

	$('#list2').on('click', 'li', function() {
		if ($(this).children().is(':checked')) {
			$(this).remove();
		}
	});

	//fav. task back to item
	$('#listItems2').on('click', 'img', function() {

		var $list = $('#listItems');
		var $taskText = $(this).siblings('span').text();
		if ((checkDuplicates($taskText, $list) == true) || ($('#listItems').children().length == 0)) {

			$('#listItems').append('<li class="curItem"><input type="checkbox" class = "item1" value= ""/>'+'<span class="display">'+ $taskText + '</span><input type="text" class="edit" style="display:none"/><img src="images/star-blank.png" height="20" width="20" style="display: inline-block"/></li>');
		} else {
			alert("duplicate");
		}
	});

	/** edit list on double click *****/

	$('#listItems').on('dblclick', 'span', function() {
		
		$(this).hide().siblings(".edit").show().val($(this).text()).focus();
	});

	$("#listItems").on('focusout', 'input', function() {
		$(this).hide().siblings(".display").show().text($(this).val());
	});

	/******************/

});
$('#listItem').remove();

function enableClick() {
	var $taskText = $('#txt').val();

	var $list = $('#listItems');
	if (!($.trim($taskText).length === 0)) {

		if ((checkDuplicates($taskText, $list) == true) || ($('#listItems').children().length == 0)) {
			$('#listItems').append('<li class="curItem"><input type="checkbox" class = "item1">' + '<span class="display">'+ $taskText+'</span><input type="text" class="edit" style="display:none"/><img src="http://images.all-free-download.com/images/graphiclarge/favorite_93483.jpg" height="20" width="20" style="display: inline-block"/></li>');
			$('#txt').val("");
			$('#button').addClass('disabled');

		} else {
			alert("Duplicate: Task Already Present");
			$('#txt').val("");
			$('#button').addClass('disabled');
			return false;
		}
	}

}

function checkDuplicates($taskText, $list) {
	var $flag = true;
	$($list).find('li>span').each(function() {
		if ($taskText === $(this).text()) {
			$flag = false;
			return $flag;
		} 

	});
	return $flag;
}

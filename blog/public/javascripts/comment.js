$(function() {
	var commentName = $('#commentName');
	var commentText = $('#commentText');
	var commentSend = $('#commentSend');
	$('.comments').click(function(event) {
		var target = $(this);
		var cid = target.data('cid');
		var to = target.data('to');
		if ($('#to').length > 0) {
			$('#to').val(to);
		} else {
			$('<input>').attr({
				type:'hidden',
				id:'to',
				value:to
			}).appendTo($('#commentInput'))
		}
		if ($('#commentId').length > 0) {
			$('#commentId').val(cid);
		} else {
			$('<input>').attr({
				type:'hidden',
				id:'commentId',
				value:cid
			}).appendTo($('#commentInput'))
		}
	})

	
	// commentTo.bind('click',function(event) {
	// 	var target = $(this);

	// })

	commentSend.bind('click',function(event) {
		console.log('click');
		var comment = {
			from:commentName.val(),
			content:commentText.val(),
			cid:$('#commentId').val() || '',
			to:$('#to').val() || ''
		}
		$.ajax({
			type:'post',
			url:'/comment/save',
			data:comment,
			success:function(data) {
				console.log(data);
			}
		})
		return false;
	})
})
$(function () {
	var articleLike = $('.articleLike');
	var LikeBtn = $('.LikeBtn');
	var likeNum = parseInt(articleLike.html());
	LikeBtn.bind('click',function(event) {	
		console.log('click');
		var target = $(this);
		var targetLike = target.parents('div#art').find('div#art-right .articleLike');
		$.ajax({
			type:'get',
			url:target.attr('href'),
			success:function(data) {
				console.log(data.success);
				if (data.success) {
					likeNum ++;
					targetLike.html(likeNum);
				}
			}
		})
		return false;
	})
})
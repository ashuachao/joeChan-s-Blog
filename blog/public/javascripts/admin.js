$(function() {
	var articleMan = $('#articleMan');
	var collectMan = $('#collectMan');
	var commentMan = $('#commentMan');
	var aboutMeMan = $('#aboutMeMan');
	var joelist = $('#joelist');
	var callback   = $('#callback');
	// articleMan.click(function(event) {

	// 	$.pjax(
	// 		{
	// 			// type:'GET', 
	// 			// url:'/admin/articleManage',
	// 			// // dataType:'text/html',
	// 			// beforeSend: function(xhr){
 //    // 				xhr.setRequestHeader('X-PJAX', 'true')
 // 			//  	},
	// 			// success:function(data) {
	// 			// 	callback.html(data);
	// 			// 	history.pushState(null, articleMan.text(), '/admin/articleManage')
	// 			// },
	// 			// error:function() {
	// 			// 	console.log('ajax error');
	// 			// }
	// 			url:'/admin/articleManage',
	// 			container:callback
	// 		});
	// 	return false;
	// });
	// collectMan.click(function(event) {
	// 	$.pjax(
	// 		{
	// 			url:'/admin/collectManage',
	// 			container:callback
	// 			// type:'GET', 
	// 			// url:'/admin/collectManage',
	// 			// // dataType:'text/html',
	// 			// beforeSend: function(xhr){
 //    // 				xhr.setRequestHeader('X-PJAX', 'true')
 // 			//  	},
	// 			// success:function(data) {
	// 			// 	callback.html(data);
	// 			// 	history.pushState(null, collectMan.text(), '/admin/collectManage')
	// 			// },
	// 			// error:function() {
	// 			// 	console.log('ajax error');
	// 			// }
	// 		});
	// 	return false;
	// });
	// // window.addEventListener('popstate',function(e) {
	// // 	console.log(window.location.href);
	// // })
	// aboutMeMan.click(function(event) {
	// 	$.pjax(
	// 		{
	// 			url:'/admin/aboutMeManage',
	// 			container:callback
	// 	})
	// 	return false;
	// });
	joelist.bind('click',function(event) {
		var targetA = event.target;
		var targetLi = $(targetA).parents('li');
		$(targetLi).addClass('active').siblings('li').removeClass('active');
		$.pjax({
			url:targetA.href,
			data:{
				ajax:true
			},
			container:callback
		})
		return false;
	})

})
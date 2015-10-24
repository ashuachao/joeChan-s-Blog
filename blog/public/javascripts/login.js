$(function() {
	var send = $('#send');
	var joelogin = $('#joelogin');
	var inputName = $("#inputName");
	var inputPassword = $('#inputPassword');
	var showerror = $("#showError");
	joelogin.submit(function(event) {
		event.preventDefault();
		$.ajax({
			type:'post',
			url:'/user/signin',
			data:{
				name:inputName.val(),
				password:inputPassword.val()
			},
			success:function(data) {
				var pass = data.pass;
				if (pass) {
					window.location.href = '/admin'
				} else {
					showError();
				}
			}
		});
		function showError() {
			showerror.slideDown();
			setTimeout(function() {
				showerror.fadeOut()
			},2000)
		}
	})
})
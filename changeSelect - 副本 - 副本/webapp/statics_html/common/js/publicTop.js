/*固定导航*/
$(function() {
	$('.navbar').addClass('navbar-fixed-top');
	$('.page-sidebar').addClass('sidebar-fixed');
	$('.page-breadcrumbs').addClass('breadcrumbs-fixed');
	$('.page-header').addClass('page-header-fixed');

	// 修改头像
	$('#saveHeadImage').on('click', function() {
		var formData = new FormData($("#avatarForm")[0]);
		$.ajax({
			url : ctx + "/user/changeHeadImage",
			type : 'POST',
			data : formData,
			async : false,
			cache : false,
			contentType : false,
			processData : false,
			success : function(data) {
				if (data.msg) {
					toastr.error(data.msg);
				} else {
					$('#avatar-modal').modal('hide');
					$('#headImage').attr('src', data.url);
					$('#bigHeadImage').attr('src', data.url);
					toastr.success('修改成功');

				}
			}
		});
		return false;
	});

	// 表单验证
	$('#changePassword').bootstrapValidator({
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			oldPassword : {
				validators : {
					stringLength : {
						min : 6,
						max : 30,
						message : '密码长度必须在6-30位之间'
					},
					regexp : {
						regexp : /^[a-zA-Z0-9_\.]+$/,
						message : '密码只能由数字、字母、下划线组成'
					}
				}
			},
			newPassword : {
				validators : {
					stringLength : {
						min : 6,
						max : 30,
						message : '密码长度必须在6-30位之间'
					},
					regexp : {
						regexp : /^[a-zA-Z0-9_\.]+$/,
						message : '密码只能由数字、字母、下划线组成'
					}
				}
			},
			affirmPassword : {
				validators : {
					identical : {
						field : 'newPassword',
						message : '两次密码输入不一致'
					},
					regexp : {
						regexp : /^[a-zA-Z0-9_\.]+$/,
						message : '密码只能由数字、字母、下划线组成'
					}
				}
			}
		},
		submitHandler : function(validator, form, submitButton) {
			$.ajax({
				url : ctx + "/user/changePwd",
				type : 'POST',
				data : $('#changePassword').serialize(),
				dataType : 'json',
				success : function(data) {
					if (data.msg) {
						toastr.error(data.msg);
					} else {
						$('.changePassword').modal('hide');
						toastr.success('修改成功');
						location.href = ctx + '/login/logout'
					}
				},
				error : function(response) {
					toastr.error("系统错误");
				}
			});
			return false;
		}
	});
	$('#logOut').click(function() {
		$.ajax({
			type : "post",
			url : ctx + "/login/logout",
			success : function(data) {
				
			}
		});
		window.location.href = ctx+"/login/tologin";
	});
});

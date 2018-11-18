$(function () {
    //表单验证
    $('#loginForm').bootstrapValidator({
        fields: {
            account: {
                validators: {
                    notEmpty: {
                    	message: '用户名不能为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名只能由数字、字母、下划线和"."组成'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        //message: '用户名长度必须在2-30位之间'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                    	message:'密码不能为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码只能由数字、字母、下划线和"."组成'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        //message: '密码长度必须在6-30位之间'
                    },
                    different: {
                        field: 'account',
                        message: '密码不能和用户名相同'
                    }
                }
            }
         }
    });
});

$(function () {
    //表单验证
    $('#rule').bootstrapValidator({
        fields: {
            dayInquiries: {
                validators: {
                    notEmpty: {}, /*非空提示*/
                    regexp: {
                        regexp: /^[1-9][0-9]+$/,
                    }
                }
            },
            weekInquiries: {
                validators: {
                    notEmpty: {},
                    regexp: {
                        regexp: /^[1-9][0-9]+$/,
                    }
                }
            },
            monthInquiries: {
                validators: {
                    notEmpty: {},
                    regexp: {
                        regexp: /^[1-9][0-9]+$/,
                    }
                }
            }
        }
    });


    $('#infoFlowRule').bootstrapValidator({

        submitHandler: function (validator, form, submitButton) {


            console.log(form.serialize());

            //return false;

            $.ajax({
                url: ctx + '/bizInquiriesRules/updateRecord',
                data: form.serialize(),
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    if (data.status != "success") {
                        toastr.error(data.msg);
                    } else {

                    }
                },
                error: function () {
                    toastr.error("系统错误");
                }
            });

            return false;
        }
    });

})

$(function () {
    //分校、项目、级别
    $('.branchSchool').chosen({no_results_text: "没有匹配项"});
    $('.project').chosen({no_results_text: "没有匹配项"});
    $('.grade').chosen({no_results_text: "没有匹配项"});

    //富文本编辑器
    KindEditor.ready(function (K) {
        K.create('#professionDetails', {
            allowFileManager: true,
            resizeType: 0
        });
        K.create('#educationDetails', {
            allowFileManager: true,
            resizeType: 0
        });
    });
})


$(function(){
    //初始化日期
    $(".reservation").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView:2
    });

    //富文本框
    var editor = KindEditor.create('.rebuildRemark');

    //下拉框多选
    $('.selectpicker').selectpicker({
        'liveSearch': true,
        'liveSearchPlaceholder': '请输入关键字',
        'actionsBox': true,
        'selectAllText': '全选',
        'deselectAllText': '取消',
        'noneSelectedText': ''
    });
    
    //申请支出
    $('.stucheck').click(function(){
        
        if($(this).is(":checked")){
            console.log(1);
            console.log(editor.html());
            editor.sync();
            
        }else{
            console.log(2);
        }       
    })


})
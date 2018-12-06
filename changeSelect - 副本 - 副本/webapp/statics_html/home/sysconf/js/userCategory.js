$(function(){
    //全选
    $('#userCategory thead .checkAll').on('click', function(){
        if($(this).prop('checked')){
            $('#category tbody .checkchild').prop('checked', true);
        }else{
            $('#category tbody .checkchild').prop('checked', false);
        }
    })
})

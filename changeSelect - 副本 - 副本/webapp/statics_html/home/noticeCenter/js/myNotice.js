$(function(){
    // 日期初始化
    durationDate('.duration','-');

    // 公告查看
    $('#noticeTable').on('click','.view',function(){
        $('.noticeView').modal('show')
    })
})

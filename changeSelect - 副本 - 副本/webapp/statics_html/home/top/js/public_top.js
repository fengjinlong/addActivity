// 导航栏未读提示数量
isReadCount();
function isReadCount(){
	$.ajax({
		'url' : ctx + '/sysAnnouncement/getCounts',
		'type' : 'post',
		'dataType' : 'json',
		'success' : function(info){
			if (info.status == 'success' && info.data != 0 && info.data != undefined) {
				$('span.badge').text(info.data);
			} else {
				$('span.badge').css('display','none');
			}
		}
	})
}
// 点击信箱标识内容简单展示messages-menu
$('.message-li').on('click',function(){ 
	isReadCount();
	$.ajax({
		'url' : ctx + '/sysAnnouncement/getNoticeInfos',
		'type' : 'post',
		'dataType' : 'json',
		'success' : function(info){
			if (info.status == 'success') {
				var liStr = '';
				$.each(info.data,function(i,val){
					var content = val.content?val.content:'';
					liStr += '<li>'+
                        		'<a href="#" class="info-body" data-toggle="modal" data-target=".serviceView">'+
                            		'<div class="message">'+
                            		'<input type="hidden" name="type" value="'+val.type+'"/>'+
                            		'<input type="hidden" name="sysAnnouncementId" value="'+val.sysAnnouncementId+'"/>'+
                                	'<span class="message-subject">'+
                                	val.theme +
	                                '</span>'+
                                	'<span class="message-body">'+
                                	content +
                                	'</span>'+
                            		'</div>'+
                        		'</a>'+
                       		 '</li>';
				})
				if (info.data.length < 1) {
					liStr += '<li>'+
				            		'<a href="#" class="info-body" data-toggle="modal" data-target=".serviceView">'+
				            		'<div class="message">'+
				                	'<span class="message-subject">暂时没有通知'+
				                    '</span>'+
				                	'<span class="message-body">'+
				                	'</span>'+
				            		'</div>'+
				        		'</a>'+
				       		 '</li>';
				}
				$('.messages-menu').html(liStr);
			}
			$('.info-body').on('click',function(){
				// 置空展示栏
				$('#notice-title').html('');
				$('#notice-body').html('');
				$('#notice-title').html($(this).find('span.message-subject').text());
				$('#notice-body').html($(this).find('span.message-body').html());
				var type = $(this).find('input[name="type"]').val();
				var infoId = $(this).find('input[name="sysAnnouncementId"]').val();
				$.ajax({
					'url':ctx+'/sysAnnouncement/readNotice',
					'type':'post',
					'async':'false',
					'dataType':'json',
					'data':{'type':type,'infoId':infoId},
					'success':function(info){
						console.log(info.msg);
						isReadCount();
					}
				})
			})
		}
	})
})

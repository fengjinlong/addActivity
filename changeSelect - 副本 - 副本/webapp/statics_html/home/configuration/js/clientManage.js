$(function () {
    //点击添加一类标签
    var tagKind = '<div class="widget col-sm-3 padding-right-20 clearfix tagKind addItem">'
        + '<div class="widget-header bordered-blue bordered-bottom-2 text-center">'
        + '  <div class="col-sm-6 col-sm-offset-3">'
        + '      <input type="hidden" class="lableId"  value="">'
        + '      <input type="text" class="form-control text-center" value="">'
        + '  </div>'
        + '  <a class="save-btn success" title="保存"><i class="fa fa-save"></i></a>'
        + '</div>'
        + '<div class="widget-body clearfix">'
        + '  <div class="col-sm-12 form-group add-row editing">'
        + '  <div class="col-sm-10 no-padding">'
        + '      <input type="text" class="form-control" value="">'
        + '  </div>'
        + '  <div class="col-sm-3 tagAddBtn text-center no-padding-right">'
        + '      <a class="fa fa-check info confirm-btn"></a>'
        + '      <a class="fa fa-times danger cancel-btn"></a>'
        + '  </div>'
        + '</div>'
        + '</div>'
        + '<div class="widget-footer">'
        + '  <a class="tag-add fa fa-plus blue"></a>'
        + '</div>'
        + '</div>'
    $('.customerTag').on('click', '.add-btn', function () {
        $('.add-container').before(tagKind);
        $('.tagKind').find('input').addClass("input-border");
    })
 
    //添加分类下一个标签
    var addRow = '<div class="col-sm-12 form-group add-row editing">'
        + '<div class="col-sm-10 no-padding">'
        +'<input class="lableId" type="hidden" value=""/>'
        + '<input type="text" class="form-control input-border" value="">'
        + '</div>'
        + '<div class="col-sm-3 tagAddBtn text-center no-padding-right">'
        + '<a class="fa fa-check info edit-confirm-btn"></a>'
        + '<a class="fa fa-times danger cancel-btn"></a>'
        + '</div>'
        + '</div>'
    $('.customerTag').on('click', '.tag-add', function () {
    	if($(this).parent().parent().find(".edit-save-btn").length>0){
    		toastr.error('请将编辑内容保存然后添加!');
    		return
    	}
        $(this).parent().parent().find('.widget-body').prepend(addRow);
    })
    
    var status = '<div class="col-sm-2 text-center no-padding-right">'
        + '<a class="fa fa-check-square-o success status-btn"></a>'
        + '</div>'
   
    //确定
    $('.customerTag').on('click', '.confirm-btn', function () {   	
		var text=$(this).parent().prev().find("input[type=text]").val();
		if(text==""){
			toastr.error('内容不能为空!');
			return
		}
        $(this).parent().parent().removeClass('add-row').append(status);
        $(this).parent().parent().removeClass("editing");
        $(this).parent().parent().find('input').attr('disabled', true).css('border-color', '#e5e5e5');
        $(this).parent().remove();
    })

    //取消
    $('.customerTag').on('click', '.cancel-btn', function () {
        $(this).parent().parent().remove();
    })


    //编辑
    $('.customerTag').on('click', '.edit-btn', function () {
    	var l=$(this).parent().parent().find(".editing").length;
    	if(l>0){
    		toastr.error('请确认数据是否保存!');
    	}else{
	        $(this).parent().parent().find('input').removeAttr('disabled').addClass("input-border");
	        $(this).attr('title', '保存编辑');
	        $(this).removeClass('edit-btn blue').addClass('edit-save-btn success');
	        $(this).find('i').removeClass('fa-pencil').addClass('fa-save');
    	}      
    })
    //状态切换
    $('.customerTag').on('click', '.status-btn', function () {
        if ($(this).hasClass('fa-check-square-o')) {
            $(this).removeClass('success fa-check-square-o').addClass('danger fa-ban');
            $(this).attr('title', '禁用');
        } else {
            $(this).removeClass('danger fa-ban').addClass('success fa-check-square-o');
            $(this).attr('title', '启用');
        }
    })
})

loadData();

//加载页面数据
function loadData(){
	$.ajax({
		"type" : "Post",
		"url" : ctx+"/bizClientManage/load",
		/*"dataType" : "json",*/
		"data" : {},
		"success" : function(data) {
			var html = "";
			for(var i in data){
				html += '<div class="widget col-sm-6 col-md-4 col-lg-3 padding-right-20 clearfix">'
					 +  '	<div class="widget-header bordered-blue bordered-bottom-2 text-center">'
					 +  '		<div class="col-sm-6 col-sm-offset-3">'
					 +  '			<input class="lableId" type="hidden" value="'+data[i][0].lableId+'"/>'
					 +  '			<input type="text" class="form-control text-center" value="'+data[i][0].lableType+'" disabled>'
					 +  '		</div> '
					 +  '		<a class="edit-btn blue" title="编辑">'
					 +  '			<i class="fa fa-pencil"></i>'
					 +  '		</a>'
					 +  '	</div>'
					 +  '	<div class="widget-body clearfix">';
				for(var j in data[i]){
					if(j != 0){
						html +='<div class="col-sm-12 form-group">'
							 + '	<div class="col-sm-10 no-padding">'
							 + '		<input class="lableId" type="hidden" value="'+data[i][j].lableId+'"/>'
							 + '		<input type="text" class="form-control" value="'+data[i][j].lableType+'" disabled>'
						     + '	</div>'
						     + '	<div class="col-sm-2 text-center no-padding-right">'
						     + '		<a class="fa fa-check-square-o success status-btn" title="启用"></a>'
						     + '	</div>'
						     + '</div>';
					}
				}
				html +='	</div>'
					 + '	<div class="widget-footer">'
					 + '		<a class="tag-add fa fa-plus blue"></a>'
					 + '	</div>'
					 + '</div>'
			}
			html +='<div class="widget col-sm-3 padding-right-20 add-container text-center">'
				 + '	<div class="widget-body">'
				 + '		<a class="fa fa-plus add-btn blue"></a>'
				 + '	</div>'
				 + '</div>';
			$("#data").html(html)
		}
	});	
}



/**
 * 小标题添加
 */
$('.customerTag').on('click', '.edit-confirm-btn', function(){
	var status = '<div class="col-sm-2 text-center no-padding-right">'
        + '<a class="fa fa-check-square-o success status-btn"></a>'
        + '</div>'
	var _this=this;
	var lable_id=$(this).parent().parent().parent().prev().find("input[type=hidden]").val();//获取隐藏的lableId
	var chilable_title=$(this).parent().prev().find("input[type=text]").val();
	if(chilable_title==""){
		toastr.error('请输入小标题内容!');
		return
	}
	if($(this).parent().parent().parent().parent().is(".addItem")){
		$(this).parent().parent().removeClass('add-row').append(status);
	    $(this).parent().parent().removeClass("editing");
	    $(this).parent().parent().find('input').attr('disabled', true).css('border-color', '#e5e5e5');
	    $(this).parent().remove();
	    return
	}	
	$.ajax({
		"type" : "Post",
		"url" : ctx+"/bizClientManage/addNewNextRecord",
		/*"dataType" : "text/html",	*/	
		"data" : {
			"parentLableId": lable_id,
			"childLables":chilable_title
		},
		"success" : function(data) {
			toastr.success('小标题成功添加!');
			loadData();		
		}
	});
	
})


/**
 * 页面添加保存数据
 */
$('.customerTag').on('click', '.save-btn', function(){
	var _this=this;
	var l=$(this).parent().parent().parent().find(".editing").length;
	var lable_title=$(this).prev().find("input[type=text]").val();//获取一级标题;	
	if(l>0){
		toastr.error('有数据未保存!');
		return
	}else{	
		if(lable_title==""){
			toastr.error('请输入标题!');
			return		
		}
		var rows = $(this).parent().parent().find('.form-group');
        for (var i = 0; i < rows.length; i++) {
            if(!$(rows[i]).hasClass('add-row')){
                $(rows[i]).find('input').attr('disabled', true).css('border-color', '#e5e5e5');
            }
        }
        $(this).parent().find('input').attr('disabled', true).css('border-color', '#e5e5e5');
        $(this).attr('title', '编辑');
        $(this).prev().find("input[type=text]").removeClass("input-border");
		$(this).parent().next().find("input[type=text]").removeClass("input-border");
		var lable_title=$(this).prev().find("input[type=text]").val();//获取一级标题;
		var chilable_title="";
		//注意这里的名字要和你的对象里面的属性名字一致	
		$(this).parent().next().find("input[type=text]").each(function(i,item){
			var lable_type=$(this).val();//二级标题
			chilable_title = chilable_title + lable_type + "\2";
		});	
		var lable_title=$(this).prev().find("input[type=text]").val();//获取一级标题;
		var chilable_title="";
		//注意这里的名字要和你的对象里面的属性名字一致	
		$(this).parent().next().find("input[type=text]").each(function(i,item){
			var lable_type=$(this).val();//二级标题
			chilable_title = chilable_title + lable_type + "\2";
		});	
		if(lable_title==""){			
			return		
		}
		$.ajax({
			"type" : "Post",
			"url" : ctx+"/bizClientManage/addNewRecord",
			/*"dataType" : "text/html",	*/	
			"data" : {
				"parentLable":lable_title,
				"childLables":chilable_title
			},
			"success" : function(data) {
				toastr.success(data.msg);
				loadData();
			}
		});
	}
})


/**
 * 编辑页面保存
 */
$('.customerTag').on('click', '.edit-save-btn', function () {
	
		var _this=this;
		var lable_id=$(this).prev().find("input[type=hidden]").val();//获取隐藏的lableId
		var lable_title=$(this).prev().find("input[type=text]").val();//获取一级标题
		var childLable_title ="";
		var childLable_parentIds ="";
		if(lable_title==""){
			toastr.error('大标题不能为空!');
			return
		}
		var flag=true;
		//循环获取子标题lableType
		$(this).parent().next().find("input[type=text]").each(function(i,item){
			var lable_type = $(this).val();//获取子标题
			if(lable_type==""){
				flag=false;			
				return
			}
			childLable_title = childLable_title + lable_type + "\2";
		});
		if(!flag){
			toastr.error('小标题不能为空!');
			return
		}
		//循环获取子标题的lableId
		$(this).parent().next().find("input[type=hidden]").each(function(i,item){//通过循环得到子标题lableId
			var childLable_parentId = $(this).val();//获取子标题parent_id
			childLable_parentIds= childLable_parentIds + childLable_parentId + "\2";//依然拼接成字符串
		});
		console.log(lable_title,childLable_parentIds)
		$.ajax({
			"type" : "Post",
			"url" : ctx+"/bizClientManage/updateRecord",
			/*"dataType" : "text/html",*/
			"data" : { 
				"parentLableType": lable_title, 
				"childLableTypes": childLable_title, 
				"parentLableId"  : lable_id,
				"childLableParentIds": childLable_parentIds
			},
			"success" : function(data) {
				toastr.success(data.msg);
				loadData();
				/*$(_this).parent().parent().find('input').attr('disabled', true).css('border-color', '#e5e5e5');
				$(_this).removeClass("success").addClass("blue");		
				$(_this).attr("title","编辑").removeClass("edit-save-btn").addClass("edit-btn");			
				$(_this).prev().find("input[type=text]").removeClass("input-border");
				$(_this).parent().next().find("input[type=text]").removeClass("input-border");
				$(_this).find('i').removeClass('fa-save').addClass('fa-pencil');*/
			}
		});		
})








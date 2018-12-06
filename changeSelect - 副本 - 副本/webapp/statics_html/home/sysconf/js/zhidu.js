$(function(){
	var editor;
	loadDepartment();
	//日期控件
	/*$('#reservation').daterangepicker({
		locale: {
			format: 'YYYY-MM-DD',
			separator: ' 到 ',
			applyLabel: '确定',
			cancelLabel: '取消',
			customRangeLabel: '自定义',
			daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
			monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
				'七月', '八月', '九月', '十月', '十一月', '十二月'],
			firstDay: 1
		},
		ranges: {
			'今天': [moment().startOf('day'), moment()],
			'昨天': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
			'本周': [moment().startOf("week").add(1, 'days'), moment().endOf("week").add(1, 'days')],
			'上周': [moment().subtract(1, 'weeks').startOf("week").add(1, 'days'), moment().subtract(1, 'weeks').endOf("week").endOf("week").add(1, 'days')],
			'本月': [moment().startOf("month"), moment().endOf("month")],
			'上个月': [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
			'最近7天': [moment().subtract(6, 'days'), moment()],
			'最近30天': [moment().subtract(29, 'days'), moment()]
		},
		applyClass: 'btn-primary',
		alwaysShowCalendars: true,
		autoclose: true,
		autoUpdateInput: false,
		showDropdowns: true
	});

	$('#reservation').on('apply.daterangepicker', function (event, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
	});*/

	/*//查看
	$('#myTable').on('click', 'a.check', function(){
		var id = $(this).data('id');
		$.ajax({
			url : ctx + '/institution/getById',
			data : {id:id},
			dataType : 'json',
			type : 'post',
			success : function(data){
				if(data.status != "success"){
					toastr.error(data.msg);
				}else{
					$('#checkModal .modal-title').html(data.record.institutionName);
					$('#checkModal .modal-body').html(data.record.institutionDesc);
					$('#checkModal').modal('show');
				}
			},
			error : function(){
				toastr.error("系统错误");
			}
		});
		
	});*/
	
	
	//多选框
	$(document).on('change', 'input:checkbox.master', function(){
		if($(this).prop('checked')){
			$('input:checkbox.slaver').prop('checked', 'checked');
		}else{
			$('input:checkbox.slaver').prop('checked', '');
		}
	})
	
})


/*数据初始化*/
$("#myTable tbody").html("<tr><td height='300' colspan='13' class='text-center'></td></tr>");
$("#myTable tbody>tr>td").mLoading({
    text: '正在加载中，请稍后......',
    icon: "../statics_html/common/image/loading5.gif"
});
InitiateSimpleDataTable.init();

function retrieveData( sSource, aoData, fnCallback, oSettings ) {  
	
    aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
    aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });  
    aoData.push({ "name": "theme", "value": $('#theme').val() });
    aoData.push({ "name": "type", "value": $('#type').val() });
    /*var dateRange = $('#reservation').val();
    var searchVal = $('#searchVal').val();
    var enable = $('#enable').val();
    
    if(dateRange && dateRange.length != 0){
    	var dataId = $('#dateId').val();
    	if(dataId == ""){
    		toastr.error("请选择日期搜索类型！");
    	}else{
    		aoData.push({ "name": "dataId", "value": dataId });
    		if(dataId == 1){
    			var minDate = trim(dateRange.split("到")[0]);
    	        var maxDate = trim(dateRange.split("到")[1]);
    	        
    	        aoData.push({ "name": "minDate", "value": minDate +" 00:00:00"});
    	        aoData.push({ "name": "maxDate", "value": maxDate +" 23:59:59"});
    	        
        	}else{
        		var minDates = trim(dateRange.split("到")[0]);
                var maxDates = trim(dateRange.split("到")[1]);
                aoData.push({ "name": "minDates", "value": minDates +" 00:00:00"});
                aoData.push({ "name": "maxDates", "value": maxDates +" 23:59:59"});
                
        	}
    	}
    }
  
    if(searchVal && searchVal.length != 0){
    	aoData.push({ "name": "searchVal", "value": searchVal });
    }
    
    if(enable == 0 || enable == 1){
    	aoData.push({ "name": "enable", "value": enable });
    }*/
    $.ajax( {  
        "url": sSource,  
        "data": aoData,  
        "cache": false,  
        "dataType": 'json', 
        "type": "POST", 
        "success" :function(response) {  
        	fnCallback(response.returnObject);
        	$('[data-toggle="tooltip"]').tooltip()
        }  
    } );  
}  

//新增或编辑 确定
function addOrUpdateRecord(){
	
	$('#addForm').find('textarea[name="content"]').val(editor.html());
	console.log($())
	$.ajax({
		url : ctx + '/sysAnnouncement/add',
		data : $('#addForm').serialize(),
		dataType : 'json',
		type : 'post',
		success : function(data){
			if(data.status != "success"){
				swal('',data.msg,'error');
			}else{
				swal('',data.msg,'success');
				$('#myModel').modal('hide');
				InitiateSimpleDataTable.init();
			}
		},
		error : function(){
			toastr.error("系统错误");
		}
	});
	
	return false;
}

//新增
$(document).on('click', '#add', function(){
	var _this=this;
	var typee=$(this).attr("typee");
	if(typee!=1){
		return ;
	}
	$('#addForm').find('input[type="hidden"], input[type="text"], select, textarea').val('');//每次新增前，清空modal
	editor.html('');
	$('#myModel').modal('show');
});

//编辑
$('#myTable').on('click', 'a.edit', function(){
	var _this=this;
	var typee=$(this).attr("typee");
	if(typee!=1){
		return ;
	}
	$(this).attr("typee","0");
	var id = $(this).attr('value');
	$.ajax({
		url : ctx + '/sysAnnouncement/selectOne',
		data : {'sysAnnouncementId':id},
		dataType : 'json',
		type : 'post',
		success : function(data){
			if(data.status != "success"){
				$(_this).attr("typee","1");
				swal('',"加载失败",'error');
			}else{
				$(_this).attr("typee","1");
				$('#addForm input[name="sysAnnouncementId"]').val(data.data.sysAnnouncementId);
				$('#addForm input[name="theme"]').val(data.data.theme);
				$('#addForm [name="department"]').val(data.data.department.split(","));
				$('#addForm').find("[name='department']").selectpicker('refresh');
				$('#addForm [name="type"]').val(data.data.type);
				editor.html(data.data.content);
				$('#myModel').modal('show');
			}
		},
		error : function(){
			$(_this).attr("typee","1");
			toastr.error("系统错误");
		}
	});
	
});

//废除
$('#myTable').on('click', 'a.delete', function(){
	var _this=this;
	var typee=$(this).attr("typee");
	if(typee!=1){
		return ;
	}
	$(this).attr("typee","0");
	var id = $(this).attr('value');
	$.ajax({
		url : ctx + '/sysAnnouncement/update',
		data : {sysAnnouncementId:id,enable:0,deleteMark:0},
		dataType : 'json',
		type : 'post',
		success : function(data){
			$(_this).attr("typee","1");
			if(data.status != "success"){
				swal('',"删除失败",'error');
			}else{
				swal('',"删除成功",'success');
				InitiateSimpleDataTable.init();
			}
		},
		error : function(){
			$(_this).attr("typee","1");
			toastr.error("系统错误");
		}
	});
	
});
//回车搜索
function search(){
	if(event.keyCode==13){
		InitiateSimpleDataTable.init();
	}
}

//加载部门option
function loadDepartment(){
	$('#myTable').find("a.edit").attr("typee","0");
	$('#add').attr("typee","0")
	$.post(ctx + '/department/getAllOption',{},function(data){
		if(data.status=='success'){
			var str='';
			$.each(data.list,function(index,option){
				str+='<option value="'+option.departmentId+'">'+option.fullName+'</option>';
			})
			$('#addForm').find("[name='department']").html(str);
			$('#addForm').find("[name='department']").selectpicker('refresh');
			$('#myTable').find("a.edit").attr("typee","1");
			$('#add').attr("typee","1")
		}else{
			swal('',"加载失败",'error');
		}
	},"json")
}

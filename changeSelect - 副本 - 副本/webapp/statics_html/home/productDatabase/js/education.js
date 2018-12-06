$(function(){
	$("#init tbody").html("<tr><td height='300' colspan='7' class='text-center'></td></tr>");
	$("#init tbody>tr>td").mLoading({
		text: '正在加载中，请稍后......',
		icon: "../statics_html/common/image/loading5.gif"
	});
	init();
})

/**
 * 回车检索
 * @returns
 */
function search(){
	if(event.keyCode==13){
		toSearch();
	}
}
function toSearch(){
    init();
}

/**
 * 回调函数
 * @param sSource
 * @param aoData
 * @param fnCallback
 * @returns
 */
function retrieveData(sSource, aoData, fnCallback, oSettings ){
	/**
	 * 参数添加
	 */
	aoData.push( { "name": "pageNum", "value": (Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength )+1) });
	aoData.push( { "name": "pageSize", "value": oSettings._iDisplayLength });	
	aoData.push( { "name": "searchVal", "value": $("#searchVal").val()} );
	$.ajax({
		"type" : "Post",
		"url" : sSource,
		"dataType" : "json",
		"data" : aoData,
		"success" : function(resp) {
			fnCallback(resp.returnObject);
			$('[data-toggle="tooltip"]').tooltip();
		}
	});
}
/**
 * 初始化数据
 * @returns
 */
function init (){
	var init = $('#init').dataTable({
		"bAutoWidth" : false,
		"bFilter" : false,
		//"iDisplayLength": 10, 
		"bPaginate":true,
        "bSort": false, //是否支持排序功能
		"bLengthChange": true, 
		"oLanguage" : {
			"sLengthMenu" : "每页显示 _MENU_ 条记录",
			"sZeroRecords" : "抱歉， 没有找到",
			"sInfo" : "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
			"sInfoEmpty" : "",
			"sInfoFiltered" : "",
			"oPaginate" : {
				"sFirst": "首页",
				"sPrevious" : "前一页",
				"sNext" : "后一页",
				"sLast" : "尾页"
			},
			"sProcessing" : ""
		},
		"sAjaxSource" : ctx+'/education/getAll',
		"bDestroy" : true,
		"bRetrieve" : false,
		"bServerSide" : true,
		"fnServerData" : retrieveData,
		"aoColumns" : [
			{"mDataProp" : "deptName","bSortable": false,'sClass': "text-center"},
			{"mDataProp" : "schoolName","bSortable": false,'sClass': "text-center"},
            {"mDataProp" : "levelName","bSortable": false,'sClass': "text-center"},
            {"mDataProp" : "educationForm","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
            	if(data == 1){
            		return "自考";
            	}else if(data == 2){
            		return "远程";
            	}else if(data == 3){
            		return "成考";
            	}
            }},
            {"mDataProp" : "price","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
            	if(data){
            		var aa = eval("(" + data + ")");
            		var price = 0;
            		$(aa).each(function(i,n){
            			var pri = n.price;
            			if(!pri){
            				pri = 0;
            			}
            			price += pri;
            		})
            		return '<span onclick="getPriceInfo(this)" data-record=\''+JSON.stringify(full)+'\' class="blue">'+price+'</span>';
            	}
            }},
            {"mDataProp" : "enable","bSortable": false,'sClass': "text-center","mRender":function(data,type,full){
            	if(data == 1){
            		return "招生";
            	}else if(data == 0){
            		return "封班";
            	}
            }},
            {"mDataProp" : "","bSortable": false,'sClass': "text-center","mRender": function ( data, type, full ) {
            		return 	'<a  data-record=\''+JSON.stringify(full)+'\' data-type="1" class="check"><i class="fa fa-search warning"  data-toggle="tooltip" data-placement="top" data-original-title="查看" title="查看"></i></a>';
            }}],
		"aoColumnDefs" : [{
            sDefaultContent: '',
            aTargets: [ '_all' ]
   	      }]
	});
	//每页显示记录数
	$('.dataTables_info').parent().append($('.dataTables_length'));

}

$("#init").on('click','.check',function(){
	var record = $(this).data('record');
	$("#checkModal").modal('show');
	$("#checkModal .modal-title").text("学历招生简章");
	$("#checkModal .modal-body").text(record.content);
})

function getPriceInfo(val){
	
	$("#priceInfo").modal('show');
	
	var html = "";
	
	var record = $(val).data("record");
	var price = eval("(" + record.price + ")");
	var fudaofei = 0;
	$(price).each(function(i,n){
		var price = n.price;
		price = price == null ? 0 : price;
		if(n.name != '辅导费'){
			html += '<div class="form-group col-sm-6">'+
						'<label class="control-label col-md-3 no-padding-right no-padding-left">'+n.name+'</label>'+
						'<div class="pull-left col-md-9">'+
							'<input type="text" class="form-control" disabled value="'+price+'">'+
						'</div>'+
					'</div>';
		}else{
			html += '<div class="form-group col-sm-6">'+
						'<label class="control-label col-md-3 no-padding-right no-padding-left">'+n.name+'</label>'+
						'<div class="pull-left col-md-9">'+
							'<input type="text" class="form-control" disabled value="'+price+'">'+
						'</div>'+
					'</div>';
					}
		var child = n.childs;
		if(child){
			$(child).each(function(j,m){
				var childPrice = m.price;
				childPrice = childPrice == null ? 0 : childPrice;
				html += '<div class="form-group col-sm-6">'+
				'<label class="control-label col-md-3 no-padding-right no-padding-left">'+m.name+'</label>'+
				'<div class="pull-left col-md-9">'+
				'<input type="text" class="form-control" disabled value="'+childPrice+'">'+
						'</div>'+
						'</div>';
			})
		}
	})
	
	$("#priceInfo .form-horizontal").html(html);
}

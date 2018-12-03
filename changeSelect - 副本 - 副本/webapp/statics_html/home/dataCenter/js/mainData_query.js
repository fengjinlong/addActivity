
$(function(){
	
	/**
	 * 组织页面参数
	 * @returns
	 */
	function organizeParams(){
		var selectedFenxiaoIdArray = new Array();
		var selectedBrandIdArray = new Array();
		var selectedProjectIdArray = new Array();
		
		var selectedFenxiaoObj = $("#fenXiaoList :selected");
		var selectedBrandObj = $("#brandList :selected");
		var selectedProjectObj = $("#projectList :selected");
		
		$.each(selectedFenxiaoObj, function(i, n){
			selectedFenxiaoIdArray.push($(n).val());
		});
		
		$.each(selectedBrandObj, function(i, n){
			selectedBrandIdArray.push($(n).val());
		});
		
		$.each(selectedProjectObj, function(i, n){
			selectedProjectIdArray.push($(n).val());
		});
		
		var timeDiffStr = $("#timeQuantum").val();
		var cycle = $("#cycleChoseBtn .active").attr("cycle");
		
		var sendData = {
			"timeDiffStr":timeDiffStr,
			"cycle":cycle,
			"fenxiaoId[]":selectedFenxiaoIdArray,
			"brandId[]":selectedBrandIdArray,
			"projectId[]":selectedProjectIdArray
		};
		
		return sendData;
	}
	
	/**
	 * 查询按钮点击事件
	 */
	$("#querySummaryBtn").click(function(){
		var sendData = organizeParams();
		
		$.post(ctx + "/consultCenter/queryBasicInfo", sendData, function(data){
			if(data.success==true){
				//遍历汇总数据信息
				$.each(data.summary, function(key, val){
					$("[sum_"+key+"]").text(val);
				});
				//加载详细列表
				if($("#queryDetailBtn").hasClass("fa-minus-square-o")){
					loadDepartDetailTable();
				}
				//加载图表信息
				var selectElem = $("[chartLoadSelect]");
				$.each(selectElem, function(i, n){
					refreshChart($(n));
				});
			}
		});
		
	});
	
	/**
	 * 加载详细信息
	 */
	$("#queryDetailBtn").click(function(){
		if(!$(this).hasClass("fa-minus-square-o")){
			loadDepartDetailTable();
		}
	});
	
	/**
	 * 加载详细列表信息
	 * @returns
	 */
	function loadDepartDetailTable(){
		var sendData = organizeParams();
		$("#fenxiaoDetailCon").html("<tr><td height='300' colspan='14'><img src='../statics_html/home/dataCenter/image/loading.gif'> 数据正在拼命加载中...</td></tr>");
		$.post(ctx + "/consultCenter/queryDetailInfo", sendData, function(data){
			if(data.success==true){
				//遍历分校汇总信息
				if(data.details.length>0){
					var html = "";
					$.each(data.details, function(key, n){
						html += "<tr>"
							  + "<td>"+n.fenxiaoInfo.fullName+"</td>"
							  + "<td>"+n.adsFee+"</td>"
							  + "<td>"+n.consultCount+"</td>"
							  + "<td>"+n.primeCost+"</td>"
							  + "<td>"+n.achievementAmount+"</td>"
							  + "<td>"+n.feePercent+"</td>"
							  + "<td>"+n.compensationFee+"</td>"
							  + "<td>"+n.groupRevenue+"</td>"
							  + "<td>"+n.visitCount+"</td>"
							  + "<td>"+n.enlistCount+"</td>"
							  + "<td>"+n.dianZhuan+"</td>"
							  + "<td>"+n.mianZhuan+"</td>"
							  + "<td>"+n.zongZhuan+"</td>"
							  + "<td>"+n.perTicket+"</td>"
							  + "</tr>";
					});
					$("#fenxiaoDetailCon").html(html);
				}
			}
		});
	}
	
	
	/**
	 * 维度更换
	 */
	$("[chartLoadSelect]").change(function(){
		refreshChart($(this));
	});
	
	/**
	 * 刷新图表
	 * @param selectObj
	 * @returns
	 */
	function refreshChart(selectObj){
		var item = $(selectObj).val();
		var idx = $(selectObj).attr("chartLoadSelect");
		var sendData = organizeParams();
		sendData["item[]"] = item;
		
		$.post(ctx + "/consultCenter/queryForItems", sendData, function(data){
			if(data.success==true){
				var originHeader = data.originHeader;
				var originData = data["origin_"+item];
				var beforeHeader = data.beforeHeader;
				var beforeData = data["before_"+item];
				
				if(idx==1){
					refreshChart_1(originHeader, originData, beforeHeader, beforeData);
				}else if(idx==2){
					refreshChart_2(originHeader, originData, beforeHeader, beforeData);
				}else if(idx==3){
					refreshChart_3(originHeader, originData, beforeHeader, beforeData);
				}else if(idx==4){
					refreshChart_4(originHeader, originData, beforeHeader, beforeData);
				}
				
				var originValue = originData[originData.length-1];
				var beforeValue = beforeData[beforeData.length-1];
				
				$(selectObj).parent().parent().next().find(".dimensionTotals").text(originValue);
				
				var comparison = "-";
            	if(typeof(beforeValue)=="number" && typeof(originValue)=="number" && beforeValue!=0){
            		comparison = (100*(originValue - beforeValue)/beforeValue).toFixed(2);
            	}
            	if (comparison <= 0) {
            		$(selectObj).parent().parent().next().find(".reduced-value").removeClass("up").addClass("down").text(comparison+"%");
                } else {
                	$(selectObj).parent().parent().next().find(".reduced-value").removeClass("down").addClass("up").text(comparison+"%");
                }
			}
		});
		
	}
	
	
	init();
	
	/**
	 * 初始化页面首屏数据
	 * @returns
	 */
	function init(){
		//$(".bs-select-all").click();
		$("#querySummaryBtn").click();
	}
});




var query_performanceConversionRate;
var query_selectDepartmentBingTotalMoney;
var query_selectDepartmentTotalMoney;

$(function(){
	
	/**
	 * 搜索按钮点击事件
	 */
	$("#searchResultBtn").click(function(){
		selectTotalMoney();
	});
	
	/**
	 * 选择的 项目类型 改变
	 */
	$("#projectType").change(function(){
		changeProjectType();
	});
	
	/**
	 * 选择的 部门 改变
	 */
	$("#departmentselect").change(function(){
		changeDepartment();
	});
	
	$("#companyTypes").change(function(){
		changeDepartmentType();
	});
	
	setTimeout(function(){
		selectTotalMoney();
	}, 200);
	
	/**
	 * 按照条件查询
	 */
	function selectTotalMoney(){
		var sendData = collectParams();
		$.ajax({
			url : ctx + '/consultAnalyze/loadHeadCountInfo',
			type : 'POST',
			data: sendData,
			dataType : 'json',
			success : function(data) {
				// 项目数据加载
				$("#totalConsultInfo").html("");
				
				if(data.vo!=null){
					var totalmoney;
					if(data.vo.concultMoney==null){
						totalmoney=0;
					}else{
						totalmoney=data.vo.concultMoney;
					}
					
				    var feePer;
					if(totalmoney==0&&data.vo.adMoney==0){
						feePer=0;
				    }else if(totalmoney==0&&data.vo.adMoney>0){
				    	feePer=100;
				    } else{
				    	 feePer=Math.floor(data.vo.adMoney/data.vo.concultMoney*10000)/100;
				    }
					
					var  dianPer;
					var mianPer;
					if(data.vo.consultPeopleNum==0&&data.vo.shangPeopleNum==0){
						dianPer=0;
					}else if(data.vo.consultPeopleNum==0&&data.vo.shangPeopleNum>0){
						
						dianPer=100;
					}else{
						dianPer=Math.floor(data.vo.shangPeopleNum/data.vo.consultPeopleNum*10000)/100;
					}
					
					if(data.vo.baoPeolpeNum==0&&data.vo.shangPeopleNum==0){
						mianPer=0;
					}else if(data.vo.shangPeopleNum==0&&data.vo.baoPeolpeNum>0){
						mianPer=100
					}else{
						mianPer=Math.floor(data.vo.baoPeolpeNum/data.vo.shangPeopleNum*10000)/100;
					}
					
					var baseMoneyPer;
					if(data.vo.consultPeopleNum==0&&data.vo.adMoney==0){
						baseMoneyPer=0;
					}else if(data.vo.consultPeopleNum==0&&data.vo.adMoney>0){
						baseMoneyPer=100
					}else{
						baseMoneyPer=Math.floor(data.vo.adMoney/data.vo.consultPeopleNum*10000)/100;
					}
					var opt;
					opt=' <td><i class="fa collapse-btn fa-plus-square-o"></i></td><td>'+data.vo.consultPeopleNum+'</td><td>'+totalmoney+'</td><td>'+data.vo.shangPeopleNum+'</td><td>'+data.vo.baoPeolpeNum+'</td><td>'+dianPer+'%</td><td>'+mianPer+'%</td><td>'+data.vo.adMoney+'</td><td>'+baseMoneyPer+'%</td><td>'+feePer+'%</td>';
					
					$("#totalConsultInfo").html(opt);
				}else{
					$("#totalConsultInfo").html('<td><i class="fa collapse-btn fa-plus-square-o"></i></td><td colspan=\'9\'>抱歉,暂无数据</td>');
				}
				
				
			},
			error : function(response) {
				toastr.error("系统错误");
			}

		});
		//重新查询，收起咨询师统计
		
		$(".aggregate-data .collapse-btn").removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
		$('.aggregate-data .campusData').slideUp();
		       
		//报表查询
		refreshAllChartInfoFunc();
	}
	
	/**
	 * 业绩转换率数据查询
	 * 
	 * @returns
	 */
	query_performanceConversionRate = function(){
		
		var sendData = collectParams();
		$.post(ctx + "/consultChart/selectPerformanceConversionRate", sendData, function(data){
			if(data.status=="success"){
				var dataHeader = data.dataHeader;
				var dianContent = new Array();
				var mianContent = new Array();
				var moneyContent = new Array();
				if(data.list.length>0){
					for (var i = 0; i < data.list.length; i++) {
						dianContent.push(data.list[i].dianZhuan);;
						mianContent.push(data.list[i].mianZhuan); 
						moneyContent.push(data.list[i].totalMoney);
					}
				}
				//业绩转换率报表
				chart_performanceConversionRateChart(dataHeader, moneyContent, dianContent, mianContent);
			}
		});
		
	}
	
	/**
	 * 咨询团队业绩占比数据
	 */
	query_selectDepartmentBingTotalMoney = function(){
		
		var sendData = collectParams();
		$.post(ctx + "/consultChart/selectDepartmentBing", sendData, function(data){
			if(data.status=="success"){
				var departmentNameArray = data.departmentNameList;
				
				var tmp = new Array();
				$.each(data.quanInfo, function(key,val){
					tmp.push({"name":key,"value":val});
				});
				chart_departmentBingChart(departmentNameArray, tmp);
			}
		});
		
	}
	
	/**
	 * 各组业绩查询
	 */  
	query_selectDepartmentTotalMoney = function(){

		var sendData = collectParams();
		$.post(ctx + "/consultChart/departmentTotalMoney", sendData, function(data){
			if(data.status=="success"){
				var departmentNameArray =data.departmentNameList;
				var departmentMoneyArray =data.departmentMoneyList;
				
				chart_departmentChart(departmentNameArray, departmentMoneyArray);
			}
		});
		
	}
	
	/**
	 * 收集页面参数信息
	 * @returns
	 */
	function collectParams(){
		var dateRange = $('#timeQuantum').val();
	    var patt = new RegExp('[0-9]{4}\-[0-1][0-9]\-[0-3][0-9]', 'g');
	    var startDate = patt.exec(dateRange);
	    var endDate = patt.exec(dateRange);
	    
	    //归属
	    var companyIds = null;
	    var selectCompanyObj=$("#companyTypes :selected");
	    $.each(selectCompanyObj, function(i, n){
			if(companyIds==null){
				companyIds = $(n).val();
			}else{
				companyIds = companyIds+','+$(n).val();
			}
		});
	    if(companyIds!=null&&companyIds.indexOf(",")!=-1){
	    	
	    	companyIds=null;
	    }
	    
	    //项目类型
	    var projectTypes = new Array();
		$.each($("#projectType :selected"), function(i, n){
				projectTypes .push( $(n).val());
		});
		
		//部门
	    var selecteddepartmentObj = $("#departmentselect :selected");
		var departmentId=new Array();
		$.each(selecteddepartmentObj, function(i, n){
			//if(departmentId==null){
				departmentId.push( $(n).val());
			/*}else{
				departmentId = departmentId+','+$(n).val();
			}*/
		});
		
		//咨询师
		var selectedUserObj = $("#sysuserselect :selected");
		var selecteduserIds=new Array();
		$.each(selectedUserObj, function(i, n){
			//if(selecteduserIds==null){
				selecteduserIds .push( $(n).val());
			/*}else{
				selecteduserIds = selecteduserIds+','+$(n).val();
			}*/
		});
		
		//项目
		var selectedprojectObj = $("#bizprojectselect :selected");
		var selectedprojectIds=new Array();
		$.each(selectedprojectObj, function(i, n){
		//	if(selectedprojectIds==null){
				selectedprojectIds .push( $(n).val());
			/*}else{
				selectedprojectIds = selectedprojectIds+','+$(n).val();
			}*/
		});
		
		//分校
		var selectedfenObj = $("#fendepartmentselect :selected");
		var selectedfenIds=new Array();
		$.each(selectedfenObj, function(i, n){
			//if(selectedfenIds==null){
				selectedfenIds.push( $(n).val());
			/*}else{
				selectedfenIds = selectedfenIds+','+$(n).val();
			}*/
		});
		
		//缴费类别
		var selectedmoneyObj = $("#moneyType :selected");
		var selectedfenmoneyIds=null;
		$.each(selectedmoneyObj, function(i, n){
			if(selectedfenmoneyIds==null){
				selectedfenmoneyIds = $(n).val();
			}else{
				selectedfenmoneyIds = selectedfenmoneyIds+','+$(n).val();
			}
		});
		
		//缴费形式
		var selectedpayObj = $("#payType :selected");
		var selectedpayIds=null;
		$.each(selectedpayObj, function(i, n){
			if(selectedpayIds==null){
				selectedpayIds = $(n).val();
			}else{
				selectedpayIds = selectedpayIds+','+$(n).val();
			}
		});
		
		var cycle = $("#cycleChoseBtn .active").attr("cycle");
		
		var isDimission = $("[name='mustPay']:checked").val();
		var sendData = {
			"companyIds": companyIds,//归属
			"departementIds[]": departmentId,//部门ID
			"counselorIds[]": selecteduserIds,//咨询师ID
			"projectIds[]": selectedprojectIds,//项目ID
			"fendepartmentIds[]": selectedfenIds,//分校ID
			"projectTypes[]": projectTypes,//项目类型
			"isDimission": isDimission,//在职状态
			"payFrom": selectedpayIds,//缴费形式
			"moneyType": selectedfenmoneyIds,//缴费类别
			"startDate": startDate[0],//开始时间
			"endDate": endDate[0],//结束时间
			"cycle": cycle
		}
		
		return sendData;
	}
	
	/**
	 * 业绩-面转 趋势
	 */
	query_yejiMianZhuanQuShi = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/chart_04", sendData, function(data){
			if(data.status=="success"){
				var xData = data.departNameList;
				var yejihejiData = data.achieveAmountList;
				var mianZhuanData = data.mianZhuanList;
				var mianZhuanHegeData = new Array();
				$.each(mianZhuanData, function(i,n){
					mianZhuanHegeData.push(70);
				});
				chart_deedsCollapse(xData, yejihejiData, mianZhuanData, mianZhuanHegeData);
			}
		});
	}
	
	/**
	 * 业绩-成本 趋势
	 */
	query_yejiChengBenQuShi = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/chart_05", sendData, function(data){
			if(data.status=="success"){
				var xData = data.departNameList;
				var adsFeeData = data.adsFeeAmountList;
				var chengBenData = data.primeCostList;
				var yejiHeJiData = data.achieveAmountList;
				var chengBenBiaoZhunData = new Array();
				$.each(chengBenData, function(i,n){
					chengBenBiaoZhunData.push(100);
				});
				chart_deedsCost(xData, adsFeeData, yejiHeJiData, chengBenData, chengBenBiaoZhunData);
			}
		});
	}
	
	/**
	 * 业绩-投入产出趋势
	 */
	query_yejiTouRuChanChuQuShi = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/chart_06", sendData, function(data){
			if(data.status=="success"){
				var xData = data.chartHeader;
				var adsFeeData = data.adsFeeAmountList;
				var yejiHeJiData = data.achieveAmountList;
				var inOutRateData = data.adsFeeAndAchieveRateList;
				var inOutHeGeData = new Array();
				$.each(inOutRateData,function(i,n){
					inOutHeGeData.push(2.5);
				});
				
				chart_deedsInput(xData, adsFeeData, yejiHeJiData, inOutRateData, inOutHeGeData);
			}
		});
	}
	
	/**
	 * 业绩-咨询量 趋势
	 */
	query_yejiZiXunLiangQuShi = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/chart_07", sendData, function(data){
			if(data.status=="success"){
				var xData = data.chartHeader;
				var ziXunLiangData = data.consultCountList;
				var yejiHeJiData = data.achieveAmountList;
				chart_deedsInquiries(xData, yejiHeJiData, ziXunLiangData);
			}
		});
	}
	
	/**
	 * 业绩- 损耗比 趋势
	 */
	query_yejiSunHaoBiQuShi = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/chart_08", sendData, function(data){
			if(data.status=="success"){
				var xData = data.chartHeader;
				var yejiHeJiData = data.achieveAmountList;
				var sunHaoRateData = data.lossRateList;
				var sunHaoHeGeData = new Array();
				$.each(sunHaoRateData,function(i,n){
					sunHaoHeGeData.push(0.5);
				});
				chart_deedsLossRatio(xData, yejiHeJiData, sunHaoRateData, sunHaoHeGeData);
			}
		});
	}
	
	/**
	 * 咨询师业绩排名
	 */
	query_ziXunShiYejiPaiMing = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/selectConsultorMoney", sendData, function(data){
			if(data.status=="success"){
				var consultNameArray = new Array();
				var consultMoneyArray = new Array();
				
				$.each(data.list, function(i, n){
					consultNameArray.push(n.counselorName);
					consultMoneyArray.push(n.concultMoney);
				});
				
				chart_counselorDeeds1(consultNameArray, consultMoneyArray);
			}
		});
	}
	
	/**
	 * 咨询师 业绩 - 转化率 关系
	 */
	query_ziXunShiYeji_zhuanHuaLv = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/selectConsultorMoneyAndRate", sendData, function(data){
			if(data.status=="success"){
				var consultNameArray = new Array();
				var consultMoneyArray = new Array();
				var dianZhuanDataArray = new Array();
				var mianZhuanDataArray = new Array();
				$.each(data.list, function(i, n){
					consultNameArray.push(n.counselorName);
					consultMoneyArray.push(n.concultMoney);
					dianZhuanDataArray.push(n.dianZhuan);
					mianZhuanDataArray.push(n.mianZhuan);
				});
				chart_counselorDeeds2(consultNameArray, consultMoneyArray, dianZhuanDataArray, mianZhuanDataArray);
			}
		});
	}
	
	/**
	 * 各项目 业绩 排名
	 */
	query_geXiangMuYejiPaiMing = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/selectConsultProject", sendData, function(data){
			if(data.status=="success"){
				var projectNameArray = new Array();
				var projectConsultMoney = new Array();
				$.each(data.list, function(i, n){
					projectNameArray.push(n.projectName);
					projectConsultMoney.push(n.consultMoney);
				});
				chart_projectDeeds(projectNameArray, projectConsultMoney);
			}
		});
	}
	
	/**
	 * 各项目业绩
	 */
	query_geXiangMuYeji = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/selectConsultProjectDetail", sendData, function(data){
			if(data.status=="success"){
				var legendData = data.departmentList;
				var yData = data.projectList;
				var seriesData = new Array();
				$.each(data.departProjectMap, function(key, val){
					seriesData.push({
						name: key,
						type: "bar",
						stack: "总量",
						data: val
					});
				});
				chart_projectDeeds1(legendData, yData, seriesData);
			}
		});
	}
	
	/**
	 * 各项目组 分时间段 业绩及 转化率情况
	 */
	query_geXiangMuZu_fenShijianDuan_yejiZhuanHuaLv = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/selectDepartmentDianAndMian", sendData, function(data){
			if(data.status=="success"){
//				console.info(data);
//				var xData = data.dataHeader;
				
				var xData = data.dataHeader;
				
				var dianZhuanList = data.dianZhuanList;
				
				var mianZhuanList = data.mianZhuanList;
				
				var fenxiaoNameList = data.fenxiaoNameList;
				
				var seriesData = new Array();
				
				$.each(fenxiaoNameList, function(i, n){
					seriesData.push({
						name:n,
						type:"bar",
						data:data.fenXiaoMap[n]
					});
				});
				
				seriesData.push({
					name:"电转",
					type:"line",
					symbol: 'circle',
					yAxisIndex: 1,
					data:dianZhuanList
				});
				
				seriesData.push({
					name:"面转",
					type:"line",
					symbol: 'circle',
					yAxisIndex: 1,
					data:mianZhuanList
				});
				
				fenxiaoNameList.push("电转");
				fenxiaoNameList.push("面转");
				
				chart_counselorDeeds3(fenxiaoNameList, xData, seriesData);
			}
		});
	}
	
	/**
	 * 咨询团队 电转 排名
	 */
	query_ziXunTuanDuiDianZhuanPaiMing = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/selectDepartmentDianZhuan", sendData, function(data){
			if(data.status=="success"){
				var departDataArray = new Array();
				var ziXunLiangArray = new Array();
				var dianZhuanArray = new Array();
				$.each(data.list, function(i, n){
					departDataArray.push(n.departmentName);
					ziXunLiangArray.push(n.consultPeopleNum);
					dianZhuanArray.push(n.dianZhuan);
				});
				chart_teamPhone(departDataArray, ziXunLiangArray, dianZhuanArray);
			}
		});
	}
	
	/**
	 * 销售团队数据对比
	 */
	query_xiaoShouTuanDuiShujuDuibi = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/selectDepartmentSale", sendData, function(data){
			if(data.status=="success"){
				var html = "";
				$.each(data.list, function(i, n){
					html += "<tr><td>"+n.departmentName+"</td>" +
							"<td>"+n.consultMoney+"</td>" +
							"<td>"+n.perPersonMoney+"</td>" +
							"<td>"+n.peopleNum+"</td>" +
							"<td>"+n.perPersonZixun+"</td></tr>";
				});
				$("#salesDetailTableInfo").html(html);
			}
		});
//		consultTuanDuiShujuTable.init();
	}
	
	/**
	 * 合格与不合格 面转校区
	 */
	query_heGeMianZhuanXiaoQu = function(){
		var sendData = collectParams();
		$.post(ctx + "/consultChart/chart_latest", sendData, function(data){
			if(data.status=="success"){
				var xData1 = data.departNameList_qualified;
				var mianZhuanData1 = data.mianZhuanList_qualified;
				
				var xData2 = data.departNameList_unqualified;
				var mianZhuanData2 = data.mianZhuanList_unqualified;
				
				chart_qualifiedCollapse(xData1, mianZhuanData1);
				chart_disqualificationCollapse(xData2, mianZhuanData2);
			}
		});
	}
	
	/**
	 * 销售团队数据对比 表格展示
	 */
//	var consultTuanDuiShujuTable = function () {
//    
//        return {
//            init: function () {
//                var cTable = $('#consultTeamDetail').dataTable({
//                    "bPaginate": true,  //是否显示分页
//                    "iDisplayLength": 20,
//                    "bLengthChange": false,//每页显示的记录数
//                    "bFilter": false, //搜索栏
//                    "bSort": true, //是否支持排序功能
//                    "bInfo": true, //显示表格信息
//                    "bAutoWidth": false,  //自适应宽度
//                    "bStateSave": true, //保存状态到cookie *************** 很重要 ， 当搜索的时候页面一刷新会导致搜索的消失。使用这个属性就可避免了
//                    //"sPaginationType": "", //分页，一共两种样式，full_numbers和two_button(默认)
//                    "sAjaxSource": ctx + '/consultChart/selectDepartmentSale',
//                    "fnServerData": consultTeamRetrieveData,//用于替换默认发到服务端的请求操作
//                    "bServerSide": true,
//                    "bDestroy": true,
//                    "bRetrieve": false,
//                    "oLanguage": {
//                        "sLengthMenu": "每页显示 _MENU_ 条记录",
//                        "sZeroRecords": "抱歉， 没有找到",
//                        "sInfo": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
//                        "sInfoEmpty": "找不到相关数据",
//                        "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
//                        "sProcessing": "正在加载中...",
//                        "sSearch": "搜索",
//                        "oPaginate": {
//                            "sFirst": "首页",
//                            "sPrevious": "前一页",
//                            "sNext": "后一页",
//                            "sLast": "尾页"
//                        },
//                    },
//                    "aoColumns": [
//                        {"mData": "departmentName", 'sClass': "text-center"},
//                        {"mData": "consultMoney", 'sClass': "text-center"},
//                        {"mData": "perPersonMoney", 'sClass': "text-center"},
//                        {"mData": "peopleNum", 'sClass': "text-center"},
//                        {"mData": "perPersonZixun", 'sClass': "text-center"}
//                        ],
//                    "aoColumnDefs": [{
//                        sDefaultContent: '',
//                        aTargets: ['_all']
//                    }],
//                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
//                       
//                        return nRow;
//                    },
//                });
//            }
//        }
//    }();
	
    
//    /**
//    * 查询咨询师分校的详细
//    */
//    function  consultTeamRetrieveData(sSource, aoData, fnCallback, oSettings){
//    	var sendData = collectParams();
//		sendData["pageNum"] = (Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1);
//		sendData["pageSize"] = oSettings._iDisplayLength;
//		
//		$.each(aoData, function(i,n){
//			sendData[n.name] = n.value;
//		});
//		
//		$.post(sSource, sendData, function(response){
//			fnCallback(response.returnObject);
//		});
//    }
    
});

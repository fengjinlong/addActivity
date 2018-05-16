$(function() {
	$("#input-8").fileinput({
		showCaption : true,
		allowedFileExtensions : [ 'xls', 'xlsx' ],// 接收的文件后缀
		showUpload : false, // 是否显示上传按钮
		showRemove : true,
		showPreview : false
	});
	var fileInvalidate = false; // 文件是否验证
	$('#input-8').click(function(){
		fileInvalidate = false;
		document.getElementById('start-checkData-btn').disabled = false;
		$('#resultReport table tbody').find('tr').remove();
	});
	//效验文件
	$('#start-checkData-btn').click(function() {
		$('#resultReport table tbody').find('tr').remove();
		var filename = $('#input-8').val();
		if (filename == ""||filename==null) {
			alert("请先选择excel文件");
			return;
		}
		var index = filename.lastIndexOf(".");
		if (index == -1) {
			alert('上文的文件以.xls或xlsx为后缀名');
			return;
		}
		var suffixname = filename.substring(index + 1, filename.length);
		if (suffixname == 'xls' || suffixname == 'xlsx') {
			document.getElementById('start-checkData-btn').disabled=true;
			document.getElementById('submit').disabled=true;
			uploadFile(false);
			return;
		}

	});
	$('#exceptionData').click(function() {
		window.open(ctx+"/import/display",'_blank');
	});
	//提交文件
	$('#submit').click(
		function() {
			if (!fileInvalidate) {
				alert('文件未通过验证,请先验证文件');
			} else {
				uploadFile(true);
			}
	});
	
	function uploadFile(flag){
		var formData = new FormData($("#inquiries")[0]);
		var url =ctx; 
		if(!flag){
			url +="/import/consultInfo?checkFile=true";
		}else{
			url +="/import/consultInfo";
		}
		$.ajax({
		    url: url,
		    type: 'POST',
		    data: formData,
		    async: false,
		    cache: false,
		    contentType: false,
		    processData: false,
		    success: function (data) {
				document.getElementById('start-checkData-btn').disabled = false;
				document.getElementById('submit').disabled=false;
				var dataObject = data;
				if(!flag){
					if(dataObject.result=='success'){//提交文件先验证Excel表头
						fileInvalidate = true;
						document.getElementById('start-checkData-btn').disabled = true;
						alert('文件效验成功,可以上传文件');
					}else{
						var msg = dataObject.result=='rowTooMuch'?"Excel数据最多1000行":dataObject.result=='lackHead'?"Excel表头缺失":dataObject.result=='emptyData'?"数据为空":"数据不合法";
						alert(msg);
						if(msg=='数据不合法'||msg=='Excel表头缺失'){
							$('#resultReport table tbody').find('tr').remove();
							for(var key in dataObject){
								if(key=='result') continue;
								if(msg=='数据不合法'){
									$('#resultReport table tbody').append('<tr role="row" class="text-center"><td class="text-center">第'+key+'行</td><td>'+dataObject[key]+'</td></tr>');
								}else{
									$('#resultReport table tbody').append('<tr role="row" class="text-center" class="text-center"><td colSpan="2">'+'缺失的字段:'+dataObject['headLackList']+'</td><tr>');
								}
								
							}
						}
						
				}
			}else{
				fileInvalidate = false;
				 if (dataObject.noData) {
					alert("无数据");
				} else {
					$('#resultReport table tbody').find('tr').remove();
					$('#resultReport table tbody').append('<tr role="row" class="text-center"><td colSpan="2" class="text-center">'+dataObject['success']+'</td><tr>');
					for(var key in dataObject){
						if(key=='success') continue;
						$('#resultReport table tbody').append('<tr role="row" class="text-center"><td class="text-center">第'+key+'行</td><td>'+dataObject[key]+'</td></tr>');
					}
				}
				 $('#input-8').clear();
			  }
		    },
		    error: function (data) {
		    	alert(data.msg);
		    }
		  });
	}
})
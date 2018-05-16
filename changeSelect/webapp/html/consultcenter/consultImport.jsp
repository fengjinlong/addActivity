<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>中和教育集团--咨询工作台导入管理</title>
	<%@ include file="../common/public_header_main.jsp"%>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="shortcut icon" href="${ctx_static }/dep/assets/img/favicon.png"
          type="image/x-icon">

    <!--Basic Styles-->
    <link href="${ctx_static }/dep/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link id="bootstrap-rtl-link" href="" rel="stylesheet"/>
    <link href="${ctx_static }/dep/assets/css/font-awesome.min.css" rel="stylesheet"/>

    <!--Beyond styles-->
    <link id="beyond-link" href="${ctx_static }/dep/assets/css/beyond.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="${ctx_static }/dep/assets/css/animate.min.css" rel="stylesheet"/>
    <link id="skin-link" href="" rel="stylesheet" type="text/css"/>
    <link href="${ctx_static }/common/css/common.css" rel="stylesheet">
    <link href="${ctx_static }/home/consultcenter/css/consultImport.css" rel="stylesheet">
    <script src="${ctx_static }/dep/assets/js/skins.js"></script>
</head>
<!-- Body -->
<body>
<!-- Loading Container -->
<div class="loading-container">
    <div class="loading-progress">
        <div class="rotator">
            <div class="rotator">
                <div class="rotator colored">
                    <div class="rotator">
                        <div class="rotator colored">
                            <div class="rotator colored"></div>
                            <div class="rotator"></div>
                        </div>
                        <div class="rotator colored"></div>
                    </div>
                    <div class="rotator"></div>
                </div>
                <div class="rotator"></div>
            </div>
            <div class="rotator"></div>
        </div>
        <div class="rotator"></div>
    </div>
</div>
<!--新增-->
<div class="" id="Scoresofnew" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bordered-blue bordered-bottom-2">
                <!-- <button type="button" class="close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button> -->
                <span class="widget-caption">咨询工作台批量导入</span>
            </div>
            <div class="modal-body clearfix">
                <form class="form-horizontal" id="inquiries">
                    <div class="form-group col-md-12 col-sm-12 Bulkimport">
                        <label class="control-label">批量导入<a href="#">（模板下载）:</a></label>
                    </div>
                    <div class="form-group col-md-12 col-sm-12" style="text-align:center;display:inline;">
                        <label class="control-label">
                            <div class="col-md-12">
                                <input id="input-8" name="uploadFile" type="file" multiple class="file-loading">
                            </div>
                        </label>
                        <label class="control-label">
							<div class="col-md-9">
								<span  class="btn btn-primary"
									id="start-checkData-btn">开始校验数据</span>
							</div>
						</label>
						 <label class="control-label">
							<div class="col-md-9">
								<span  class="btn btn-primary"
									id="exceptionData">异常数据</span>
							</div>
						</label>
                    </div>
					<div class="form-group col-md-12 col-sm-12"  id="resultReport" >
                       <table class="table table-striped table-hover table-bordered dataTable no-footer">
                           <thead>
                           <tr role="row" class="text-center">
                               <th class="text-center">位置</th>
                               <th class="text-center">结果</th>
                           </tr>
                           </thead>
                           <tbody>
                           </tbody>
                       </table>
                   </div>
                </form>
                 <div class="form-group col-md-12 col-sm-12 modal-footer">
                        <div class="col-sm-2 col-sm-offset-5">
                            <button type="submit" class="btn btn-info form-control creation-btn" 
                              id="submit" >确定
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
<!--Basic Scripts-->
<script src="${ctx_static }/dep/assets/js/jquery-2.0.3.min.js"></script>
<script src="${ctx_static }/dep/assets/js/bootstrap.min.js"></script>

<!--Beyond Scripts-->
<script src="${ctx_static }/dep/assets/js/beyond.min.js"></script>

<!--上传文件插件-->
<script src="${ctx_static }/dep/uploader/uploader_bootstrap.js"></script>
<script src="${ctx_static }/dep/uploader/fileinput.min.js"></script>

<script src="${ctx_static }/home/consultcenter/js/consultImport.js"></script>

</body>
</html>


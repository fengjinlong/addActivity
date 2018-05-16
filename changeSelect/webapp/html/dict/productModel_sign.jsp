<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/public_header_main.jsp"%>
<%@ include file="../common/public_header.jsp"%>
<head>
<meta charset="utf-8" />
<link href="${ctx_static }/home/dataDictionary/css/productModel.css" rel="stylesheet">
</head>

<div class="modal fade entryFormModel in" tabindex="-1" role="dialog"
	aria-labelledby="mySmallModalLabel" aria-hidden="true"
	data-backdrop="static" style="display: block;">
	<div class="modal-dialog modal-lg" style="margin: 10px auto 100px;">
		<div class="modal-content">
			<div class="modal-body clearfix sign_form">
				${content }
			</div>
		</div>
	</div>
</div>


</body>
<!--Basic Scripts-->
<script src="${ctx_static }/dep/assets/js/jquery-2.0.3.min.js"></script>
<script src="${ctx_static }/dep/assets/js/bootstrap.min.js"></script>

<!--Beyond Scripts-->
<script src="${ctx_static }/dep/assets/js/beyond.min.js"></script>
</html>

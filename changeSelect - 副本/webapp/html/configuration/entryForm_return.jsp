<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div id="education" class="tab-pane clearfix">
		<button class="btn increase pull-right add-line-edu"
			data-toggle="modal" data-backdrop="static">
			<i class="fa fa-plus"></i> 新增
		</button>
	<form action="" class="col-sm-12">
		<table
			class="table table-bordered table-hover dataTable no-footer add-table add-table-edu text-center">
			<thead>
				<tr role="row">
					<th>内容</th>
					<th width="20%">操作</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${list1 }" var="item">
					<tr>
						<td class="id" style="display: none">${item.configId }</td>
						<td class="desc text-left">${item.configDesc }</td>
						<td>
								<a data-configid="${item.configId }" class="edit"><i
									class="fa fa-edit blue" data-toggle="tooltip"
									data-placement="top" data-original-title="编辑" title="编辑"></i></a>
								<a data-configid="${item.configId }" class="delete"><i
									class="fa fa-trash-o danger" data-toggle="tooltip"
									data-placement="top" data-original-title="删除" title="删除"></i></a>
							</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</form>
</div>
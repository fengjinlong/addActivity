<template>
    <div class="createCourse-main">
        <Row>
            <Col span="24">
            <Card>
                <p slot="title">
                    创建课程
                </p>
                <Steps :current="current" style="margin-left: 10px">
                    <Step title="基本信息"></Step>
                    <Step title="课程详情"></Step>
                    <Step title="创建录播视频"></Step>
                </Steps>
                <Row class="margin-top-30 ivu-tabs" style="overflow: hidden">
                    <div class="ivu-tabs-content">
                        <div class="ivu-tabs-tabpane" v-show="current==0">
                            <Row>
                                <Col span="14" offset="2">
                                <Form  ref="formCourseInfo" :rules="formCourseInfoRules" :model="formCourseInfo" :label-width="150">
                                    <FormItem label="课程分类" required prop="courseTypeId">
                                        <course-type
                                                :data="treeData"
                                                ref="update"
                                                v-model="formCourseInfo.courseTypeId"
                                                :courseTypeName="formCourseInfo.courseTypeAlias"
                                        ></course-type>
                                    </FormItem>
                                    <FormItem label="课程名称" required prop="courseName">
                                        <Input  type="text" v-model="formCourseInfo.courseName" placeholder="请输入课程名称"/>
                                    </FormItem>
                                    <FormItem label="描述">
                                        <Input v-model="formCourseInfo.courseDesc" type="textarea" :rows="4" placeholder="请输入课程描述"/>
                                    </FormItem>
                                    <FormItem label="购买课程" required>
                                        <RadioGroup v-model="formCourseInfo.courseIsEnableBuy">
                                            <Radio label="1">开启</Radio>
                                            <Radio label="0">关闭</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem label="定价" required prop="coursePrice">
                                        <Input type="text" v-model="formCourseInfo.coursePrice" placeholder="请输入价格"/>
                                    </FormItem>
                                    <FormItem label="优惠价" required prop="courseDiscountPrice">
                                        <Input type="text" v-model="formCourseInfo.courseDiscountPrice" placeholder="请输入优惠价"/>
                                    </FormItem>
                                    <FormItem label="购买基数" required prop="courseBuyCount">
                                        <Input type="text" v-model="formCourseInfo.courseBuyCount" placeholder="请输入购买基数"/>
                                    </FormItem>
                                    <FormItem label="课程有效天">
                                        <Input type="text" v-model="formCourseInfo.courseEffectDays" placeholder="请输入课程有效天"/>
                                    </FormItem>
                                    <FormItem label="设置购买人数">
                                        <Input type="text" v-model="formCourseInfo.courseBuyCountLimit" placeholder="请设置购买人数"/>
                                    </FormItem>
                                    <FormItem label="授课方式">
                                        <Button type="success" v-if="formCourseInfo.courseTeachType==1" size="small">视频</Button>
                                        <Button type="success" v-if="formCourseInfo.courseTeachType==2" size="small">直播</Button>
                                        <Button type="success" v-if="formCourseInfo.courseTeachType==3" size="small">混合</Button>
                                    </FormItem>

                                    <FormItem label="资料上传" required>
                                        <RadioGroup v-model="formCourseInfo.stuInfo">
                                            <Radio label="0">关闭</Radio>
                                            <Radio label="1">开启</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                   <!-- <FormItem label="资料类型" required>
                                        <CheckboxGroup v-model="materialTypeArray">
                                          <Checkbox   v-for="item in examtimeList" :key="item.examtimeId" :label="item.examtimeId"  :disabled="item.isCheck" style="width:80px">
                                            {{item.examtimeName}}
                                          </CheckBox>
                                            <Radio label="1">允许</Radio>
                                        </CheckboxGroup>
                                    </FormItem>-->
                                    <FormItem label="转班" required>
                                        <RadioGroup v-model="formCourseInfo.chgClass">
                                            <Radio label="0">关闭</Radio>
                                            <Radio label="1">开启</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem>
                                        <Button @click="handleSubmit" :loading="loading" type="primary">下一步</Button>
                                        <Button type="ghost" style="margin-left: 8px" @click="lastStep">上一步</Button>
                                    </FormItem>
                                </Form>
                                </Col>
                            </Row>
                        </div>
                        <div class="ivu-tabs-tabpane" v-show="current==1">
                            <Row>
                                <Col span="14" offset="2">
                                <Form :model="formCourseDetail" ref="formCourseDetail" :rules="formCourseDetailRules" :label-width="150">
                                    <FormItem label="课程封面" required style="text-align: center">
                                        <div class="showImg margin-bottom-20" v-if="uploadList.length>0">
                                            <img :src="uploadList[0].url">
                                        </div>
                                        <Upload
                                                ref="upload"
                                                :headers="headers"
                                                :show-upload-list="false"
                                                :on-success="handleSuccess"
                                                :format="['jpg','jpeg','png']"
                                                :max-size="1024"
                                                :on-format-error="handleFormatError"
                                                :on-exceeded-size="handleMaxSize"
                                                :before-upload="handleBeforeUpload"
                                                :action="UploadUrl()
												">
                                            <Button type="ghost" icon="ios-cloud-upload-outline">上传封面</Button>
                                        </Upload>
                                        <p style="padding-top:10px;line-height: 22px;">你可以上传jpg, gif, png格式的文件, 图片推荐尺寸为228x195。<br>文件大小不能超过<strong>1M</strong>。</p>
                                    </FormItem>
                                    <FormItem label="教师" required prop="teacherIdArray">
                                        <Select v-model="formCourseDetail.teacherIdArray" filterable multiple>
                                            <Option v-for="item in teacherList" :value="item.teacherId" :key="item.teacherId">{{ item.teacherNickName }}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="课程详情" required prop="courseDetailText">
                                        <div class="editor-container">
                                            <u-meditor :content="formCourseDetail.courseDetailText"
                                                       :config="ue.config"
                                                       :toolbar="ue.toolbar"
                                                       ref="umeditor"></u-meditor>
                                        </div>
                                    </FormItem>
                                    <FormItem>
                                        <Button @click="handleSubmit2" :loading="loading" type="primary">下一步</Button>
                                        <Button type="ghost" style="margin-left: 8px" @click="lastStep">上一步</Button>
                                    </FormItem>
                                </Form>
                                </Col>
                            </Row>
                        </div>
                        <div class="ivu-tabs-tabpane" v-show="current==2">
                            <Row>
                                <Button type="success" @click="addParentCatalog">新增章节</Button>
                            </Row>
                          <Row :gutter="20">

                            <Col span="8" style="height:500px;">
                              <Card style="height:500px;">
                                <ul  class="sortable ui-sortable">
                                   <li class="ui-sortable-handle"  v-for="item in stateTree" :id="item.catalogId">
                                       <div class="father clearfix" >
                                           <span class="pull-left" @click.prevent="editCatalogItem(item)">第{{stateTree.indexOf(item)+1}}章</span>
                                           <div class="action-btn pull-right">
                                               <a href="javascript:;" @click.prevent="addItem(item)">
                                                  <Icon type="plus"></Icon>
                                               </a>
                                               <a href="javascript:;" @click.prevent="delItem(item)">
                                                  <Icon type="trash-a"></Icon>
                                               </a>
                                           </div>
                                       </div>

                                       <ul   class="sortable ui-sortable" v-show="item.expand">
                                           <li class="ui-sortable-handle"  v-for="childItem in item.catalogChildren" :id="childItem.catalogId">
                                               <div class="father clearfix" >
                                                   <span class="pull-left" @click.prevent="editCatalogItem(childItem)">第{{item.catalogChildren.indexOf(childItem)+1}}节</span>
                                                   <div class="action-btn pull-right">
                                                       <a href="javascript:;" @click.prevent="delItem(childItem)">
                                                           <Icon type="trash-a"></Icon>
                                                       </a>
                                                   </div>
                                               </div>

                                           </li>
                                       </ul>
                                       <!--<ul   class="sortable ui-sortable">
                                       <Tree-node
                                               v-for="(childItem, i) in item.catalogChildren"
                                               :key="i"
                                               :data="childItem"
                                       ></Tree-node>
                                       </ul>-->
                                   </li>
                                </ul>
                              </Card>
                            </Col>
                            <Col span="10"  offset="3">
                               <Card style="height:500px;">
                                   <div id="parentDiv" v-show="isAdd">
                                       <Form ref="catalogform" :model="catalogform" :label-width="120" :rules="formParentCourseCatalogRules">
                                           <FormItem label="课时名称" prop="catalogName" required>
                                               <Input v-model="catalogform.catalogName" type="text" placeholder="请输入章节名称..." style="width: 250px" />
                                           </FormItem>

                                           <FormItem>
                                               <Button type="primary" @click="saveData()">保存</Button>
                                           </FormItem>
                                       </Form>
                                   </div>
                                   <div  id="childDiv" v-show="!isAdd">
                                       <Form ref="catalogform" :model="catalogform" :label-width="120" :rules="formCourseCatalogRules">
                                           <FormItem label="课时名称" prop="catalogName" required>
                                               <Input v-model="catalogform.catalogName" type="text" placeholder="请输入章节名称..." style="width: 250px" />
                                           </FormItem>
                                           <FormItem label="公开视频" prop="catalogType" required>
                                               <RadioGroup v-model="catalogform.catalogType">
                                                   <Radio label="0">免费视频</Radio>
                                                   <Radio label="1">试听</Radio>
                                               </RadioGroup>
                                           </FormItem>
                                           <FormItem label="视频来源" prop="thirdType" required>
                                               <RadioGroup v-model="catalogform.thirdType" @on-change="changeThirdType">
                                                   <Radio label="2">优酷</Radio>
                                                   <Radio label="1">CC</Radio>
                                               </RadioGroup>
                                           </FormItem>
                                           <FormItem label="视频地址" prop="catalogUrl" required v-show="isYouku">
                                               <Input v-model="catalogform.catalogUrl" type="text" placeholder="请输入视频地址..." style="width: 300px" />
                                               <input type="button" @click="crawlerVideoId" value="转换"/>
                                           </FormItem>
                                           <FormItem label="视频Id" prop="thirdVideoId" required>
                                               <Input v-model="catalogform.thirdVideoId" type="text" placeholder="请输入视频Id..." style="width: 300px"/>
                                           </FormItem>
                                           <FormItem label="视频时长" prop="catalogTimeLength" required>
                                               <Input v-model="catalogform.catalogTimeLength" type="text"  placeholder="时长必须为整数" style="width: 300px"/>
                                           </FormItem>
                                           <FormItem label="建议时长" prop="suggestStudyTime">
                                               <Input v-model="catalogform.suggestStudyTime" type="text"  placeholder="如未设置，则默认学习时长为视频时长2倍取整" style="width: 300px"/>
                                           </FormItem>
                                           <FormItem>
                                               <Button type="primary" @click="saveData()">保存</Button>
                                           </FormItem>
                                       </Form>
                                   </div>

                               </Card>
                            </Col>
                              <Modal v-model="layerModal" width="360">
                                  <p slot="header" style="color:#f60;text-align:center">
                                      <Icon type="information-circled"></Icon>
                                      <span>删除确认</span>
                                  </p>
                                  <div style="text-align:center">
                                      <p>你确定要删除此项吗</p>
                                  </div>
                                  <div slot="footer">
                                      <Button type="error" size="large" long :loading="loading" @click="del">删除</Button>
                                  </div>
                              </Modal>
                          </Row>

                        </div>

                    </div>
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>

/* import TreeNode from './node.vue'; */
export default {
  name: 'createVideoCourse',
  data () {
    return {
      current: 0,
      isAdd: false,
      isYouku: false,
      loading: false,
      layerModal: false,
      catalogId: null,
      treeData: [],
      addChildCatalog: true,
      materialTypeArray: [],
      stateTree: [],
      formCourseInfo: {
        courseTypeId: '',
        courseTypeAlias: '',
        courseName: '',
        courseDesc: null,
        courseIsEnableBuy: 1,
        coursePrice: '',
        courseDiscountPrice: '',
        courseBuyCount: '',
        courseEffectDays: null,
        courseTeachType: 1,
        courseBuyCountLimit: null,
        stuInfo: 0,
        chgClass: 0
      },
      formCourseInfoRules: {
        courseName: [
          { required: true, message: '课程名称不能为空！', trigger: 'blur' }
        ],
        coursePrice: [
          { required: true, message: '请输入定价！', trigger: 'blur' }
        ],
        courseDiscountPrice: [
          { required: true, message: '请输入优惠价！', trigger: 'blur' }
        ],
        courseBuyCount: [
          { required: true, message: '请输入购买基数！', trigger: 'blur' }
        ]
      },
      formParentCourseCatalogRules: {
        courseName: [
          { required: true, message: '课程名称不能为空！', trigger: 'blur' }
        ]
      },
      ue: {
        config: { // 配置项，详见umeditor.config.js
          imagePath: '',
          imageFieldName: 'uploadFile',
          zIndex: 900, // 非模态框，默认值
          maximumWords: 200,
          initialFrameHeight: 500
        },
        toolbar: [
          'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
          'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize',
          '| justifyleft justifycenter justifyright justifyjustify |',
          'link unlink | emotion image video  | map',
          '| horizontal print preview fullscreen', 'drafts', 'formula'
        ]
        // 工具栏设置，非空则完全覆盖默认工具栏，详见umeditor.config.js
      },
      catalogform: {
        catalogName: '',
        catalogType: 0,
        auditionTime: 0,
        catalogUrl: '',
        thirdVideoId: null,
        thirdType: 0,
        catalogTimeLength: 0,
        suggestStudyTime: 0,
        parentId: '',
        isParent: null,
        catalogId: null,
        catalogNumId: 0
      },
      formCourseCatalogRules: {

        catalogName: [
          { required: true, message: '课时名称不能为空！', trigger: 'blur' }
        ],
        catalogUrl: [
          { required: true, message: '请添写视频地址！', trigger: 'blur' }
        ],
        thirdVideoId: [
          { required: true, message: '请添写视频Id！', trigger: 'blur' }
        ],
        catalogTimeLength: [
          { required: true, message: '请输入视频时长！', trigger: 'blur' }
        ]
      },
      seletedExamTime: '',

      editIndex: '',

      m_loading: false

    }
  },
  components: {
    courseType,
    UMeditor/*,
            TreeNode */
  }
}
</script>

<style>
    .showImg img{
        width: 180px;
    }
    .setGitExam-con{
        margin-left: 40px;
        padding-left: 10px;
        height: 100px;
        border-left: 1px dashed #ebe9f3;
        overflow: hidden;
    }
    .setGitExam-enter{
        height: 0;
    }
    .setGitExam-enter-active, .setGitExam-leave-active{
        transition: height .3s;
    }
    .setGitExam-enter-to{
        height: 100px;
    }
    .setGitExam-leave{
        height: 100px;
    }
    .setGitExam-leave-to{
        height: 0;
    }
    .ivu-transfer-list{
        width:216px;
    }
     .sortable {
         width: 100%;
         padding: 0 0 0 35px;
     }
    .father {
        cursor: pointer;
        color: inherit;
        background: #f3f3f4;
        padding: 8px 15px;
    }
    .father .pull-left{
        float: left;
    }
    .father .pull-right{
        float: right;
    }
    .sortable li{
        margin-top: 10px;
    }
    .father span{
        display: inline-block;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        border: 1px solid #f3f3f4;
        padding:0 7px;
    }
</style>
<style>
    .father .ivu-input{
        height: 26px;
    }
</style>

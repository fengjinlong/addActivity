$(function(){

    //富文本框
    KindEditor.create('.content');

    //日期选择
    durationDate('.paymentTime','-');
    
    $(".form_datetime").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView:2
    });


    var index = 1;
    $('.cost').on('click', '.glyphicon-plus-sign', function () {
        index++;
        var tHtml = `
            <div class="cost-content col-sm-12 no-padding form_margin">
                <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <select class="form-control">
                        <option value="Xj">现金</option>
                        <option value="Sk">刷卡</option>
                        <option value="Zp">支票</option>
                        <option value="Weixin">汇款-微信</option>
                        <option value="Zfb">汇款-支付宝</option>
                        <option value="Wl">汇款-网络</option>
                        <option value="Zz">银行转账</option>
                        <option value="Fq">分期</option>
                    </select>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <input class="form-control" type="number" min="0" onkeyup="bufei(this)">
                </div>
                <label class="control-label no-padding-right">
                    <a href="#" class="add-cost blue">
                        <i class="glyphicon glyphicon-minus-sign"></i>
                    </a>
                </label>
            </div>
            `
            //添加行
        $(this).parent().parent().parent().append(tHtml)
       
    })

    //删除行
    $('.cost').on("click",'.glyphicon-minus-sign', function(){
        $(this).parent().parent().parent().remove();
    })


    $('.inverted1').click(function(){
        if(this.checked == true){
            $('.discounts-form').show(); 
        }else{
            $('.discounts-form').hide();
        }
    }) 
    

    $('input[name="checkboxname"]').click(function(){
        if(this.checked == true){
           
            var trHtml = `
                <tr class=" ${$(this).attr('class')+ "1"} ">
                    <th scope="row"> ${$(this).siblings('.text').html()} </th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `
            $('.creatTr').append(trHtml);
        }else{
            var service = '.' + $(this).attr('class')+ "1";
            $(service).remove();
        }
        
    })


    //进度显示隐藏

    $('.plan-hover').mouseover(function(){
        $(this).children(".hover-show").css({
            'display':'block'
        })
    })

    $('.plan-hover').mouseout(function(){
        $(this).children(".hover-show").css({
            'display':'none'
        })
    })

})


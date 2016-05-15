//step01 定义JQuery的作用域
(function ($) {
    //step02 插件的扩展方法名称
    $.fn.keySearch = function (opt) {
        //step03-a 插件的默认值属性
        var defaults = {
            intData: '', //数组！
            limitNum: '5', //限制数量
            getDataFn: function(event){} //动态返回数组
        };
        //step03-b 合并用户自定义属性，默认属性
        var opt = $.extend(defaults, opt);
        var self = $(this);
        var _ipt = self.find('input');
        self.css('position','relative');

        // 触发
        _ipt.on('click keyup',function() {
            var par = $(this).parent(),
                txt = $(this).val(),
                data = opt.intData || opt.getDataFn(txt),
                num = opt.limitNum,
                str = '';
            $('#j-keySearchDrop').remove();
            if(data.length) {
                // 过滤出数组
                if(txt && opt.intData) {
                    var data = data.filter(function(x) {
                        var hasTxt = eval('/'+txt+'/');
                        return hasTxt.test(x);
                    })
                }
                // 遍历拼装
                if(data.length) {
                    str+= '<div id="j-keySearchDrop" style="position: absolute;top:100%;left: 0;width:100%;box-shadow:0 5px 5px #ccc;background: #fff;text-indent:5px;z-index: 1;">';
                    data.forEach(function(v,i,arr) {
                        if(i<num) {
                            str+= '<div class="it" style="line-height:2;border-bottom:1px solid #ccc;color:#333;">'+ v +'</div>';
                        }
                    });
                    str+= '</div>';
                    par.append(str);
                }else{
                    hideDrop();
                }
            }
            return false;
        });
        // 点击选择
        self.on('click','.it',function() {
            var ipt = $(this).parent().siblings('input'),
                txt = $(this).text();
            ipt.val(txt);
            hideDrop();
        })
        $(document).on('click',function() {
            hideDrop();
        });
        // Fn
        function hideDrop() {
            self.find('#j-keySearchDrop').remove();
        }
    }
})(jQuery);
function AliPw(pwid) {
    var bd = $('#'+pwid),
        it = bd.find('i'),
        bb = bd.find('b'),
        sp = bd.find('span'),
        ipt = bd.find('input'),
        ml = it.length,
        iw = it.outerWidth();
    ipt.css({
    	'position':'absolute',
    	'top':'0',
    	'right':'0',
    	'bottom':'0',
    	'left':'0',
    	'width':'100%',
    	'margin': '0',
    	'opacity': '0'
    });
    ipt.on('focus',function() {
        var l = fn();
        if(l>ml-1) {
            sp.css('visibility','visible');
        }
        ipt.css('margin-left','-9999px');
    });
    ipt.on('blur',function() {
        it.removeClass("active");
        sp.css('visibility','hidden');
        ipt.css('margin-left','0');
    });
    ipt.on('keyup',function() {
        var l = fn();
        if(l>ml-1) {
            ipt.blur();
        }
    })
    this.val = function() {
    	return ipt.val();
    }
    function getfocus() {
        ipt.focus();
    }
    function lg(l) {
        var l = l>ml? ml : l;
        var myval = ipt.val().substr(0,ml);
        ipt.val(myval);
    }
    function fn() {
        var l = ipt.val().length,
            lf = l<ml ? l*iw : (ml-1)*iw;
        lg();
        it.slice(0,l).find('b').css('visibility','visible');
        it.eq(l).find('b').css('visibility','hidden');
        it.eq(l).addClass("active").siblings().removeClass("active");
        sp.css('visibility','visible').animate({'left':lf},200);
//        console.info(ipt.val());
        return l;
    }
};
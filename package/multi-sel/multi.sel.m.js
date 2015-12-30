'use ctrict'
function MultiSel(el) {
    this.sel = document.querySelector(el);
    this.arg = this.int();
    this.watch();
}
MultiSel.prototype.int = function() {
    var sel = this.sel,
        box = document.createElement('div'),
        ipt = document.createElement('div'),
        opt = sel.options || [],
        opl = opt.length,
        txt = '请选择';
    box.style.position = 'relative';
    box.style.display = 'inline-block';
    box.style.boxSizing = 'border-box';
    box.style.width = '100%';
    ipt.setAttribute('contenteditable','true');
    sel.parentNode.insertBefore(box,sel);
    box.appendChild(sel);
    box.appendChild(ipt);
    sel.style.position = 'absolute';
    sel.style.width = '100%';
    sel.style.height = '100%';
    sel.style.opacity = '0';
    sel.style.zIndex = '1';
    return [opt,opl,ipt];
}
MultiSel.prototype.watch = function() {
	var that = this;
	saveVal(that.arg);
    this.sel.addEventListener('change',function() {
        saveVal(that.arg);
    },false);
}
MultiSel.prototype.addClass = function(cla) {
    this.sel.nextSibling.setAttribute('class',cla);
}
MultiSel.prototype.css = function(obj) {
    toStyle(this.sel.nextSibling,obj);
}
// 选中值赋值
function saveVal(args) {
    var opt = args[0],
    opl = args[1],
    ipt = args[2],
    arr = [],
    str = '';
    for(var i = 0; i < opl; i++) {
    	if(opt[i].selected) {
        	arr.push(opt[i].innerHTML);
    	}
    }
    str = arr.length > 0 ? arr.join('、') : '请选择(可多选)';
    ipt.innerHTML = str;
}
function toStyle(el,cssobj) {
    for(var x in cssobj) {
        if(cssobj.hasOwnProperty(x)) {
            el.style[x] = cssobj[x];
        }
    }
}

'use ctrict'
function MultiSel(el) {
	this.sel = document.querySelector(el);
	this.int();
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
	saveVal(opt,opl,ipt);
	sel.addEventListener('change',function() {
		var opt = this.options,
			opl = opt.length,
			ipt = this.nextSibling;
		saveVal(opt,opl,ipt);
	},false);
}
MultiSel.prototype.refresh = function() {
	var opt = this.sel.options,
		opl = opt.length,
		ipt = this.sel.nextSibling;
	saveVal(opt,opl,ipt);
}
MultiSel.prototype.addClass = function(cla) {
	this.sel.nextSibling.setAttribute('class',cla);
}
MultiSel.prototype.css = function(obj) {
	toStyle(this.sel.nextSibling,obj);
}
// 选中值赋值
function saveVal(opt,opl,ipt) {
	var str = '';
	while(opl>0) {
		opl--;
		if(opt[opl].selected) {
			console.info(opt[opl].innerHTML);
			str += opt[opl].innerHTML+',';
		}
	}
	str.length > 0 ? str = str.substring(0,str.length-1) : str = '请选择(可多选)';
	ipt.innerHTML = str;
}
function toStyle(el,cssobj) {
	for(var x in cssobj) {
		if(cssobj.hasOwnProperty(x)) {
			el.style[x] = cssobj[x];
		}
	}
}

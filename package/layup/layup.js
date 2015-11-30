function Layup(id) {
	this.bd = $('#'+id);
};
// 点击阴影可关闭弹层
Layup.prototype.bgBtn = function() {
	var self = this;
	this.bd.on('click','.g-laybg',function() {
		self.close();
	})
};
// 显示弹层 //bl参数
Layup.prototype.show = function(bl) {
	this.bd.addClass("z-crt");
	this.hideFn();
	return this;
};
// 关闭弹层
Layup.prototype.close = function() {
	this.bd.removeClass("z-crt");
	return this;
};
// 对应data-layfn触发点击事件
Layup.prototype.hideFn = function() {
	var self = this;
	this.bd.on('click','[data-layfn]',function() {
		var data = $(this).data('layfn');
		if(data === 'hide') {
			self.close();
		}
	})
};


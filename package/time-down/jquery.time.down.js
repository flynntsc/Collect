function DownTime(el) {
	var that = this;
		this.arr = {};
	$.each($(el),function(i,v) {
		that.arr[i+'bd'] = $(v);
		that.arr[i+'dt'] = that.arr[i+'bd'].data('time');
		that.arr[i+'h'] = that.arr[i+'bd'].find('.j-h');
		that.arr[i+'m'] = that.arr[i+'bd'].find('.j-m');
		that.arr[i+'s'] = that.arr[i+'bd'].find('.j-s');
		that.toHms(that.arr[i+'dt'],i);
	})
}
DownTime.prototype = {
	int: function() {
		// this.toHms(this.dt);
	},
	arr: function() {
		return [];
	},
	setTime: function(value,i) {
		this.arr[i+'bd'].data('time',value);
	},
	toHms:function(value,i) {
		var time = value >= 0 ? value : 0;
		var h = Math.floor(time / 3600000);
		var m = Math.floor((time - h * 3600000)/60/1000);
		var s = Math.floor((time - h * 3600000)/1000%60);
		this.arr[i+'h'].html(this.dbNum(h));
		this.arr[i+'m'].html(this.dbNum(m));
		this.arr[i+'s'].html(this.dbNum(s));
		this.down(time,i);
	},
	down: function(value,i) {
		var self = this;
		if(value > 0) {
			var downFn = setTimeout(function() {
				self.toHms(value - 1000,i);
			},1000)
		}else{
			clearTimeout(downFn);
			self.onEnd();
		}
	},
	dbNum: function(num) {
		return num < 10 ? '0' + num : num;
	},
	onEnd: function() {
		// console.info('已结束');
	}
}

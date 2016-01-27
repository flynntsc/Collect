(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
function DownTime(el) {
	var that = this;
	this.arr = {};
	this.bd = $(el);

	$.each($(el),function(i,v) {
		that.arr[i+'bd'] = $(v);
		that.arr[i+'dt'] = that.arr[i+'bd'].data('time');
		// that.arr[i+'h'] = that.arr[i+'bd'].find('.j-h');
		// that.arr[i+'m'] = that.arr[i+'bd'].find('.j-m');
		// that.arr[i+'s'] = that.arr[i+'bd'].find('.j-s');
		// that.arr[i+'x'] = that.arr[i+'bd'].find('.j-x');
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
		var h = this.dbNum(Math.floor(time / 3600000));
		var m = this.dbNum(Math.floor((time - h * 3600000)/60/1000));
		var s = this.dbNum(Math.floor((time - h * 3600000)/1000%60));
		var x = this.dbNum(Math.floor((time - h * 3600000)%1000/10));
		// console.info(x);
		itime = this.iTemp(h,m,s,x) || h+':'+m+':'+s+':'+x;
		this.arr[i+'bd'].html(itime);
		// this.arr[i+'h'].html(this.dbNum(h));
		// this.arr[i+'m'].html(this.dbNum(m));
		// this.arr[i+'s'].html(this.dbNum(s));
		// this.arr[i+'x'].html(this.dbNum(x));
		this.down(time,i);
	},
	down: function(value,i) {
		var self = this;
		if(value > 0) {
			var downFn = requestAnimationFrame(function() {
				self.toHms(value - 10,i);
			},10)
			// 这10的间隔？？！！！
		}else{
			clearTimeout(downFn);
			self.onEnd();
		}
	},
	dbNum: function(num) {
		return num < 10 ? '0' + num : num;
	},
	// 可更改输出形式
	iTemp: function() {
		return;
	},
	onEnd: function() {
		// console.info('已结束');
	}
}

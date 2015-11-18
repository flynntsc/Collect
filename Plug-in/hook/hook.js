function Hook(id) {
        this.wrap = $('#'+id);
        this.scroll = this.wrap.wrapInner('<div id="hookScroll" />');
        this.loadStyle = 'height:40px;line-height:40px;margin-bottom:20px;text-align:center;color:#333;';
        this.loading = '<div class="hookLoading" style="'+ this.loadStyle +'">松开加载更多...</div>';
        this.ifLoad = true;
        this.minMoveTime = 50; // 最小移动时间
        this.minMovePx = 20; // 最小移动距离
        // this.timeStart = 0; // 移动开始时间
        // this.timeEnd = 0; // 移动结束时间
        // this.posStart = 0; // 移动开始坐标
        // this.posEnd = 0; // 移动结束坐标
    }
    // 滚动条高度
    Hook.prototype.scrollHeight = function() {
        return this.scroll.outerHeight() - this.wrap.outerHeight();
    };
    // 移动动作消耗时间
    Hook.prototype.moveTime = function() {
        return this.timeEnd - this.timeStart;
    };
    // 移动距离
    Hook.prototype.movePx = function() {
        return this.posStart - this.posEnd;
    };
    // 触碰到时
    Hook.prototype.onTouch = function() {};
    // 移动时
    Hook.prototype.onMove = function() {};
    // 移动到顶触发
    Hook.prototype.onTop = function() {};
    // 关闭加载事件
    Hook.prototype.offLoad = function() {
        this.loading = this.loading = '<div class="hookLoading" style="'+ this.loadStyle +'">没有更多内容了</div>';
        this.ifLoad = false;
    };
    Hook.prototype.int = function() {
        var self = this;
        this.wrap.on('touchstart',function(e) {
            self.onTouch();
            self.timeStart = e.timeStamp;
            self.posStart = e.originalEvent.changedTouches[0].clientY;
            self.scroll.append(self.loading);
        });
        this.wrap.on('touchmove',function(e) {
            self.onMove();
            e.stopPropagation();
        });
        this.wrap.on('touchend',function(e) {
            self.timeEnd = e.timeStamp;
            self.posEnd = e.originalEvent.changedTouches[0].clientY;
            self.scroll.find('.hookLoading').remove();
            if(self.ifLoad && self.movePx() > self.minMovePx && self.moveTime() > self.minMoveTime && self.wrap.scrollTop() >= self.scrollHeight() - 2) {
                self.onTop();
            }
        });
        return this;
    }
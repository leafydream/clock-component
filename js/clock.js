(function(win){
    var leafClock = {
        init:function(clockDom,options){
            var opts = mix({},leafClock.methods,leafClock.defaults,options);
            var clockDom = opts.template(clockDom,opts);
            opts.rotate(opts);
            opts.position(clockDom);
            opts.resize(clockDom);
            if(opts.drag)opts.dragclock(clockDom);
        }
    };
    leafClock.methods = {
        template:function(clockDom,opts){
            var scalehtml = "";
            var html = "";
            for(var i=0;i<60;i++){
                scalehtml += "<li style='transform:rotate("+(i * 6)+"deg)'></li>";
            };
            html += "<ul id='scale'>"+scalehtml+"</ul>"+
                        "<div id='hour'></div>"+
                        "<div id='min'></div>"+
                        "<div id='sec'></div>"+
                        "<div class='radius'></div>";
            clockDom.innerHTML = html;
            return clockDom;
        },
        rotate:function(opts){
            //时分秒针
            var secDom = getdom("sec");
            var minDom = getdom("min");
            var hourDom =getdom("hour");
            secDom.style.background = opts.secbg;
            minDom.style.background = opts.minbg;
            hourDom.style.background = opts.hourbg;
            function drawDate(){
                var date = new Date();
                //秒
                var sec = date.getSeconds();
                //分
                var min = date.getMinutes() + sec/60;
                //时
                var hour = date.getHours() + min/60;
                secDom.style.transform = "rotate("+(sec * 6)+"deg)";
                minDom.style.transform = "rotate("+(min * 6)+"deg)";
                hourDom.style.transform = "rotate("+(hour * 30)+"deg)";
            };
            drawDate();
            setInterval(drawDate,1000);
        },
        position:function(clockDom){
            var left = (window.innerWidth - clockDom.offsetWidth)/2;
            var top = (window.innerHeight - clockDom.offsetHeight)/2;
            clockDom.style.left = left+"px";
            clockDom.style.top = top+"px";
        },
        resize:function(clockDom){
            var $this = this;
            window.onresize = function(){
                $this.position(clockDom);
            }
        },
        dragclock:function(clockDom){
            var mark = false;
            clockDom.onmousedown = function(e){
                this.style.cursor = "move";
                mark = true;
                var pos = getXY(e);
                var left = clockDom.offsetLeft;
                var top = clockDom.offsetTop;
                var maxW = window.innerWidth - clockDom.offsetWidth;
                var maxH = window.innerHeight- clockDom.offsetHeight;
                document.onmousemove = function(e){
                    if(mark){
                        var npos = getXY(e);
                        var nleft = npos.x - pos.x + left;
                        var ntop = npos.y - pos.y + top;
                        if(nleft<0)nleft = 0;
                        if(ntop<0)ntop = 0;
                        if(nleft>maxW)nleft = maxW;
                        if(ntop>maxH)ntop = maxH;
                        clockDom.style.left = nleft+"px";
                        clockDom.style.top = ntop+"px";
                    }
                },
                document.onmouseup = function(){
                    clockDom.style.cursor = "default";
                    mark = false;
                    this.onmousemove = null;
                    this.onmouseup = null;
                }
            }
        }
    };
    leafClock.defaults = {
        secbg:"",
        minbg:"",
        hourbg:"",
        drag:false
    };
    win.clock = leafClock;
})(window);
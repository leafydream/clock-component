    function getdom(id){
        return document.getElementById(id);
    }

    function mix(target,source){
        var arr = [];
        var args = arr.slice.call(arguments);
        var i = 1;
        if(args.length==1){
            return target;
        };
        while((source = args[i++])){
            for(var key in source){
                if(source.hasOwnProperty(key)){
                    target[key] = source[key];
                }
            }
        }
        return target;
    };

    function getXY(e){
        var ev = e || window.event;
        var sleft = document.body.scrollLeft || document.documentElement.scrollLeft;
        var stop = document.body.scrollTop || document.documentElement.scrollTop;
        var x = ev.pageX || (ev.clientX + sleft);
        var y = ev.pageY || (ev.clientY + stop);
        return {x:x,y:y};
    }

    function getdates(){
        var html = "";
        html+= "<span>" + getTime().year + "-" + getTime().month + "-" + getTime().day + "&nbsp;&nbsp;" + getTime().hour + ":" + getTime().min+  ":" + getTime().sec + " </span>";
        getdom("time").innerHTML=html;
    }

    function getTime(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        (month<10)?month="0"+month:month;
        (day<10)?month="0"+day:day;
        (hour<10)?hour="0"+hour:hour;
        (min<10)?min="0"+min:min;
        (sec<10)?sec="0"+sec:sec;
        return {
            year:year,
            month:month,
            day:day,
            hour:hour,
            min:min,
            sec:sec
        }
    }
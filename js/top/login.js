/**
 * Created by Administrator on 2016/4/28.
 */
document.addEventListener("DOMContentLoaded", function () {
    (function () {
        var login = document.getElementById("login");
        var divLogin = document.getElementsByClassName("divLogin")[0];
        var  wrap=DOM.byClassName("wrap")[0];
        // 事件委托 绑定事件
        wrap.onmouseover = function (e) {
            e=e||window.event;
            var target=e.target;
            if(!target)return
            if(target.id==="divLogin"||target.id==="shiny"||target.id==="touchD"){
                divLogin.style.display = "block"
                if (divLogin.style.display === "none") {
                    divLogin.style.display = "block"
                }
            }

        }
        wrap.onmouseleave = function (e) {
                divLogin.style.display = "none"

        }
        // 关于top的显示与隐藏
        var scrollTop1=document.getElementById("scrollTop1");
        window.onscroll=function() {
            var h = (document.documentElement.scrollTop || document.body.scrollTop) + (document.documentElement.clientHeight || document.body.clientHeight);
            var h1 =  (document.documentElement.clientHeight || document.body.clientHeight);
            if (h1<h) {
                scrollTop1.style.display = "block";
            } else {
                scrollTop1.style.display = "none";
            }
        }
        function offset(ele) {
           var  t=ele.offsetTop;
            var l=ele.offsetLeft;
            var p=ele.offsetParent;
            while(p){
                if(window.navigator.userAgent.indexOf("MSIE 8")==-1){
                    // 不是ie8 的话 offsetTop和offsetLeft 是不包括 margin的 但是clientTop包括margin
                    t+=p.offsetTop+p.clientTop;
                    l+=p.offsetLeft+p.clientLeft;
                }else{
                    t+=p.offsetTop;
                    l+=p.offsetLeft;
                }
                p=p.offsetParent
            }
           return{l:l,t:t};
        }


    })()
},false)


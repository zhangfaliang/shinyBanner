/**
 * Created by Administrator on 2016/4/24.
 */
/*
 inner_scroll inner_scroll_left*/
document.addEventListener("DOMContentLoaded",function () {
    (function () {
        var inner_scroll=document.getElementById("inner_scroll");
        var  inner_scroll_left=document.getElementById("inner_scroll_left");
        var  inner_scroll_right=document.getElementById("inner_scroll_right");


        var firstChild=DOM.children(inner_scroll,"ul")[0];
        firstChild=firstChild.cloneNode(true);
       // firstChild.style.background="royalblue";
        inner_scroll.appendChild(firstChild);
        inner_scroll.style.width=inner.offsetWidth+firstChild.clientWidth+"px";
        var  timer=null;
        var step=0;
        var  oUls=inner_scroll.getElementsByTagName("ul");
        event2.on(inner_scroll_left,"click",outLeft);
        event2.on(inner_scroll_right,"click",outRight);
        function outRight() {
            step--
            if(step<0){
                inner_scroll.style.left="-2732px";
                step=3;
            }
            animate(inner_scroll,{left:step*-673},2000,3);
        }
        /*  timer=setInterval(outRight,2005);*/
        function outLeft() {
            step++
            if(step==5){
                inner_scroll.style.left="0px";
                step=1;
            }
            animate(inner_scroll,{left:step*-673},2000,3);
        }




    })()

},false)

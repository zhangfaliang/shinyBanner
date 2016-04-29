/**
 * Created by Administrator on 2016/4/29.
 */
document.addEventListener("DOMContentLoaded",function () {
    (function () {
        var oAsynca=document.getElementById("asynca");
        var bottom_playLeft=document.getElementById("bottom_play");
        var n=0;
        oAsynca.onclick=function(){
            //background-position: -100px -380px;
            if(n%2===0){
                this.style.backgroundPosition="-100px -380px";
                bottom_playLeft.style.webkitTransform="translate(0,0)";
            }else{
                var h =  (document.documentElement.clientHeight || document.body.clientHeight);
                this.style.backgroundPosition="-80px -380px";
                bottom_playLeft.style.webkitTransform="translate(0,40px)";

            }

            n++;
        }
       /* oAsynca.onmouseover=function(){
            bottom_playLeft.style.webkitTransform="translate(0,40px)";
        }*/
       /*  oAsynca.onmouseleave=function(){
             if(flag){
                 bottom_playLeft.style.webkitTransform="translate(0,0)";

             }
         }*/
    })()
    
},false)

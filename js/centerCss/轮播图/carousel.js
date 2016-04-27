/**
 * Created by Administrator on 2016/4/8.
 */
;(function () {
    var oDivs=document.getElementById("inner").getElementsByTagName("div");
    var  innerDiv=document.getElementById("inner");
    var divWidth=(document.documentElement.clientWidth||document.body.clientWidth);
    var oUl=document.getElementById("but");
    var oLis=oUl.getElementsByTagName("li");
    var n=0;
    var timer=null;
    var btnl=document.getElementById("btnl");
    var btnr=document.getElementById("btnr");
    event2.on(oUl,"click",liClick);
    function step() {
        clearInterval(timer);
        n++;
        if(n>7){
            n=0;
        }
        animate(innerDiv,{left:divWidth*(-n)});
       /* animate(DOM.children(innerDiv,"div")[n+1>7?0:n+1],{opacity:0});*/
       /* animate(innerDiv,{opacity:1});*/
        timer=setTimeout(step,3000);
        currentCss(undefined,"selectli",n);
    }
    step();
    function liClick(e) {
        var target=e.target;
        if(target.tagName="LI"&&target.parentNode.id=="but"){
            //在这一步得到当前li的索引
            clearInterval(timer);
            timer=null;
            var index= DOM.getIndex(target);
            currentCss(target,"selectli");
            animate(innerDiv,{left:divWidth*(-index)});
            timer=setInterval(step,3000)
            n=index;

        }

    }
    btnl.onclick=autoLeft;
    btnr.onclick=autoRight;
     function autoLeft() {
         clearInterval(timer);
         timer=null;
         n--;
         if(n<0){
             n=7;
         }
         animate(innerDiv,{left:divWidth*(-n)});
         timer=setInterval(step,3000)
         currentCss(undefined,"selectli",n);
     }
    function autoRight() {
        clearInterval(timer);
        timer=null;
        n++;
        if(n>7){
            n=0;
        }
        animate(innerDiv,{left:divWidth*(-n)},0,2);
        timer=setInterval(step,3000)
        currentCss(undefined,"selectli",n);
    }


    function currentCss(target,className,index) {
        if(target){
            target.className=className;
            var oLis1=DOM.siblings(target);
            for(var i=0;i<oLis1.length;i++){
                oLis1[i].className="";
            }
        }else{
            for(var i=0;i<oLis.length;i++){
                oLis[i].className="";
            }
            oLis[index].className=className;
        }

    }
  
})()

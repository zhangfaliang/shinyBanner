/**
 * Created by Administrator on 2016/4/29.
 */
document.addEventListener("DOMContentLoaded",function () {
    // 事件委托绑定
    var divLogin=document.getElementById("divLogin");
    divLogin.onclick=function (e) {
        var  index=null;
        e=e||window.event;
        var target=e.target;
        if(target.tagName&&target.tagName.toLocaleLowerCase()==="p"||target.tagName.toLocaleLowerCase()==="div"){
            target=target.parentNode;
            index=target.getAttribute("index");
        }else  if(target.tagName&&target.tagName.toLocaleLowerCase()==="li"){
            index=target.getAttribute("index");
        }
        index=parseFloat(index);
        switch (index){
            //手机登录
            case 1:
                createUserDiv()
                break;
            // 微信
            case 2:
                createUserDiv()
                break;
            // qq
            case 3:
                createUserDiv()
                break;
            case 4:
                createUserDiv()
                break;
            case 5:
                createUserDiv(5)
                break;
        }

    }

 // 创建登录图层的div
    function createUserDiv(flag) {
        var divBg=document.createElement("div");
        var body=document.documentElement||document.body;
        var winH=document.documentElement.clientHeight||document.body.clientHeight;
        var winW=document.documentElement.clientWidth||document.body.clientWidth;
        divBg.style.width=(winW+50)+"px";
        divBg.style.height=(winH-20)+"px";
        divBg.style.zIndex=9999;
        divBg.id="bgDiv"
        //position: fixed;
        divBg.style.position="fixed"
        divBg.style.top="0";
        body.appendChild(divBg)
        var userlogin=document.createElement("div");
        //530 310
        userlogin.className="userlogin";
        userlogin.style.width="530px";
        userlogin.style.height="310px";
        userlogin.style.position="relative"
        userlogin.style.top=""+(winH-310)/2+"px";
        userlogin.style.left=""+(winW-530)/2+"px"
        divBg.appendChild(userlogin);
        divBg.style.zIndex=99999;
        /* top*/
        var userloginTop=document.createElement("div");
        userloginTop.className="userloginTop";
        userloginTop.style.width="530px";
        userloginTop.style.height="38px";
        userloginTop.style.float="right";
        userloginTop.style.backgroundColor="black";
        userlogin.appendChild(userloginTop);
        var strTop="";
      var  innerHTML= flag=="5"?'网易邮箱账号登录':'手机登录';
        strTop+="<div class='userloginTopHtml' id='userloginTopHtml'>"+innerHTML+"</div>";
        strTop+="<div class='userloginTopErrror' id='userloginTopErrror'>×</div>";
        userloginTop.innerHTML=strTop;
        /*center*/
        var userloginCenter=document.createElement("div");
        userloginCenter.style.width="220px";
        userloginCenter.style.height="222px";
        userloginCenter.style.margin="auto";
        userloginCenter.style.clear="both"
        userloginCenter.id="userloginCenter";
        userlogin.appendChild(userloginCenter);
        strTop="";
        strTop+="<div id='userNameDiv' class='userNameDiv'>"

        strTop+="<input type='text' id='userNameInp' class='userName' name='userName' value='请输入号码'>"
        strTop+="<input id='passWrordInp' class='passWrord' name='passWrord' value='请输入密码'>"
        strTop+="<div class='label'><label for=''><input  type='checkbox' value=1> 自动登陆</label>  <a href='javascript:;'>忘记密码？</a> <div class='submitBu'> <a href='javascript:;'>登录</a></div></div>"


        strTop+="</div>"
        userloginCenter.innerHTML=strTop;
        /*bottom*/
        var userloginBotton=document.createElement("div");
        userloginBotton.style.width="528px";
        userloginBotton.style.height="49px";
        userloginBotton.style.backgroundColor="whitesmoke";
        userlogin.appendChild(userloginBotton);
        strTop="";
        strTop+="<div class='userloginBottonCenter'>";
        strTop+="<div class='userloginBottonCenterLeft'><a href='javascipt:;'>&lt;其他方式登录</a></div>";
        strTop+="<div class='userloginBottonCenterRight'><a href='javascipt:;'>没有帐号？免费注册&gt;</a></div>";
        strTop+="</div>";

        userloginBotton.innerHTML=strTop;
        cealerDiv();
        function cealerDiv() {
            var userloginTopErrror =document.getElementById("userloginTopErrror");
            userloginTopErrror.onclick=function () {
                body.removeChild(document.getElementById("bgDiv"));
            }

        }
        /*得到焦点失去焦点判断*/
        foucsInput("userNameInp");
        foucsInput("passWrordInp");
        function foucsInput(id) {
            var oFoucs=document.getElementById(id);
            oFoucs.onfocus=function (e) {
                e=e||window.event;
                var target=e.target;
                console.log(oFoucs)
                if(this.defaultValue===this.value){
                    this.value="";
                }

                oFoucs.onblur=onblurFn;
            }

        }
        // 失去焦点
        function onblurFn() {
            // 定义一个去空格的正则
            var regTrim=/ +/g;
            this.value=this.value.replace(regTrim,"");
            if(this.defaultValue===this.value||this.value===""){
                this.value=this.defaultValue;
            }
        }

    }
    // 大的div

},false)

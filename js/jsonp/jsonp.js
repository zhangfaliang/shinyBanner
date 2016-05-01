/**
 * 把一系列的jsonp操作封装到一起
 */
(function () {
    /*   网易音乐搜索API
     http://s.music.163.com/search/get/
     获取方式：GET
     参数：
     src: lofter //可为空
     type: 1
     filterDj: true|false //可为空
     s: //关键词
     limit: 10 //限制返回结果数
     offset: 0 //偏移
     callback: //为空时返回json，反之返回jsonp callback*/
    //http://s.music.163.com/search/get/?type=1&s=%E6%9C%B4%E6%A0%91&limit=2&jsonp=callback

    // 先定义一个明明空间
    var namespace = {};
    // 向外暴露的全局函数名
    var globalName = 'x';
    /**
     * jsonp操作
     * @param {string} url 请求jsonp接口
     * @param {*} data 发送的参数
     * @param {string} jsonpcallback 只是一个笼统的名称，表示server定义好的参数名
     * @param {Function} callback 回调函数
     */
    var jsonp = function (url, data, jsonpcallback, callback) {
        // 定义回调函数名称 函数名是累加的 第一次 cb1 第二次 cb2
        // 一直累加是为了防止缓存
        var cbName = 'cb' + jsonp.count++;
        // 定义全局函数名 因为jsonp必须需要一个全局函数名
        var callbackName = 'window.x.jsonp.' + cbName;
        // 定义全局函数体
        window.x.jsonp[cbName] = function (data) {
            try {
                callback(data);
            } finally {
                // 为什么把script删掉，没有删掉数据嘞？
                // 答：因为script只负责获取js数据。获取完成之后，script标签就没有任何用处。
                // 获取过来的数据和script也没有了半毛钱关系。所以删掉script不会对数据构成任何影响
                // script只是负责获取数据，不负责保存数据。
                script.parentNode.removeChild(script);
                delete window.x.jsonp[cbName];
            }
        };
        // 因为jsonp的原理就是通过script标签去请求server的
        var script = document.createElement('script');
        // 如果有参数，把参数格式化为uri string
        if (data) {
            data = tool.encodeToURIString(data);
        }
        // jsonpcallback是否为字符串，把jsonpcallback和已经定义好的全局函数名拼接到一起
        if (typeof jsonpcallback === 'string') {
            //把func和server定义好的参数名(val)一起拼接到url的后 http://localhost:8080?val=func
            var canshu = jsonpcallback + '=' + callbackName;
        }
        // 拼接参数
        url = tool.hasSearch(url, data);
        // 拼接jsonpcallback和已经定义好的全局函数名
        url = tool.hasSearch(url, canshu);
        // 把最终得到的完整的url 赋值到script标签的src属性上
        script.src = url;
        // 把script标签添加到body上，这样script才会去请求自己的src。
        document.body.appendChild(script);
    };
    jsonp.count = 0;
    namespace.jsonp = jsonp;
    // 暴露到全局变量上 x
    this[globalName] = namespace;
    var tool = {
        encodeToURIString: function (data) {
            if (!data) return '';
            if (typeof data === 'string') return data;
            var arr = [];
            for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
            }
            return arr.join('&');
        },
        hasSearch: function (url, padString) {
            if (!padString) return url;
            if (typeof padString !== 'string') return url;
            return url + (/\?/.test(url) ? '&' : '?') + padString;
        }
    }

})();
(function () {
    var resultSongs = document.querySelector("#resultSongs");
    //得到搜索 searchInput
    var searchInput = document.querySelector("#searchInput");
    searchInput.onkeyup=function () {
        var _that=this;
            if (_that.value === _that.defaultValue)_that.value = "";
            var value = _that.value.replace(/ +/g, "");
            /*   if (!(/^(单曲\/歌手\/专辑\/歌单\/MV\/用户)|$/.test(value))) {*/
            if(!("单曲/歌手/专辑/歌单/MV/用户"==value||value=="")){
                window.x.jsonp('http://s.music.163.com/search/get', {
                    type: 1,
                    s: "" + value + "",
                    limit: 10
                }, "callback", fn);
// 得到大的resultSongs
                function fn(data) {
                    resultSongs.style.display="block"
                    var songsInfo = null;
                    var songsProperInfor = null;
                    var songsNameInfor = null;
                    var artists = null;//艺术家
                    var album = null;//唱片
                    if (data.code == 200) {
                        songsInfo = data.result
                        if (!songsInfo)return;
                        songsInfo = songsInfo.songs;
                        var str="";
                        var flag=true;
                        var flag1=true;
                        for (var i = 0, len = songsInfo.length; i < 4; i++) {
                            var currSongsInfo = songsInfo[i];//得到每个人唱的同一首哥
                            songsProperInfor = songsInfo[i]["artists"][0]["name"];//艺术家
                            songsNameInfor = songsInfo[i]["name"]// 得到歌名
                            album = songsInfo[i]["album"]["name"]// 唱片
                            if(!songsNameInfor) continue;
                            if(i==0) {
                                str += '<div class="resultSongsTop">搜<label style="color: #00A5FF">' + value + '</label>相关用户&gt;</div>'
                                str += '<div class="resultSongsLeft">'
                                str += '<div class="oneSongs0" id="oneSongs0">'
                                str += ' <div class="oneSongsDiv">'
                                str += ' <a href="javascript:;"></a>'
                                str += ' <p>单曲</p>'
                                str += ' </div>'
                                str += ' </div>'
                                str += ' <div class="songsName0" id="songsName0">'
                                str += ' <div class="oneSongsDiv">'
                                str += ' <a href="javascript:;"></a>'
                                str += ' <p>歌手</p>'
                                str += ' </div>'
                                str += ' </div>'
                                if (album) {
                                    str += ' <div class="songsMore0" id="songsMore0">'
                                    str += ' <div class="oneSongsDiv">'
                                    str += ' <a href="javascript:;"></a>'
                                    str += ' <p>专辑</p>'
                                    str += ' </div>'
                                    str += '</div>'
                                }
                                str+='</div>'
                                str+='<div class="resultSongsRight">'
                                str+='<ul class="oneSongs" id="oneSongs">'
                                str+='<li class="li1"><a href="javascript:;">'+songsNameInfor+"--"+songsProperInfor+'</a></li>'
                                str+='</ul>'

                                str+='<ul class="songsName" id="songsName">'
                                str+='<li class="li1"><a href="javascript">'+songsProperInfor+"--"+songsProperInfor+'</a></li>'
                                str+='</ul>'
                              if(album){
                                  str+='<ul class="songsMore" id="songsMore">'
                                  str+='<li class="li1"><a href="javascript:;">'+album+'</a></li>'
                                  str+='</ul>'
                              }
                                str += '</div>'
                            }else {
                                //创建右边的区域
                                var  a1=document.createElement("a");
                                var  a2=document.createElement("a");
                                var  a3=document.createElement("a");
                                var li1=document.createElement("li");
                                li1.appendChild(a1);
                                var li2=document.createElement("li");
                                li2.appendChild(a2);
                                if(album) {
                                    var li3 = document.createElement("li");
                                    li3.appendChild(a3);
                                    a3.href="javascript:;"
                                    a3.innerHTML=album+"--"+songsProperInfor;
                                }
                                a1.href="javascript:;"
                                a1.innerHTML=songsNameInfor;
                                a2.href="javascript:;"
                                a2.innerHTML=songsProperInfor+"--"+songsProperInfor;
                            }
                        }

                        resultSongs.innerHTML=str

                        setTimeout(function (){
                            var oneSongs=document.getElementById("oneSongs");
                            var songsName=document.getElementById("songsName");
                            var songsMore=document.getElementById("songsMore");
                            var oneSongs0=document.getElementById("oneSongs0");
                            var songsMore0=document.getElementById("songsMore0");
                            var songsName0=document.getElementById("songsName0");
                            if(songsMore){
                                songsMore0.style.height=i*10+"px";
                            }
                            if(songsName){
                                songsName0.style.height="10px";
                            }
                            //  songsName.appendChild(li2)
                            if(oneSongs){
                                oneSongs.appendChild(li1)
                                oneSongs0.style.height=i*10+"px";
                            }

                        },200)
                    }

                }

            }

    }


    searchInput.onfocus = function (e) {
        if (this.value === this.defaultValue)this.value = "";
    }


    searchInput.onblur = function () {
        if (!this.value) {
            this.value = this.defaultValue;
            this.style.color = '#999'
        }
        setTimeout(function () {
            resultSongs.style.display="none"
        },3000)
    }

})()


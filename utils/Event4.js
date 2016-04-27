/**
 * Created by Administrator on 2016/4/3.
 */
/*主要写了三套事件绑定
记住 这里面的方法只是方法的定义  还有方法里面的this和定义在那没有关系 只是和执行在那有关系
 还有 方法的作用域是和方法的第一有关系的
只是用来事件绑定 事件执行 和移除的
1 可以结合面向过程话（主要是自定义事件）
2 可以结合面向对象使用（主要使用浏览器事件绑定 ）
* 1 自定义
* 2 标准
* 3 ie
* 辅助 是两个改变this的方法
* 这里面的关键点是 （原则）this统一 就是当前的元素 因为一个对上上面可以添加很多的自定义属性 便于操作
* 缺点大家都操作的话就会出乱
* 可以考虑使用闭包
* */
var event2 = {
    /**
     * processThis改变this的方法 有两个参数一个是fn 一个是content（上下行文）
     *fn改变this的方法 obj一个是content
     * 返回一个改变this的放法
     */
    processThis:  function processThis(fn,obj) {
            return function (e) { fn.call(obj,e)}
        },
    /*原生的bind方法  体现预处理思想 */
    bind:function processThis(fn,obj) {
        return fn.bind(obj)// 原生的功能
    },
    /*绑定事件方法
    * 参数 ele  type fn
    * 这里面有三种绑定
    * 1 自定义 记得事件约定type 要一直 这样在selfRan（selfType,e）要一致
    * 2 ie 绑定
    * 3 标准绑定
    * 主要功能就是添加程序池 记事本的功能 解决了 重复绑定
    * */
    on: function on(ele, type, fn) {
        // 以selef 是自定义开头的
        if(/^self/.test(type)){//事件池就是一个数组 不要和其他元素重复就行了
            if(!ele["aSelf"+type])ele["aSelf"+type]=[];
            var a=ele["aSelf"+type];
            for(var  i=0;i<a.length;i++){
                if(a[i]==fn)return;
            }
            a.push(fn);
            return;//不写return 会执行下去
        }


        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false);
            return;
        }
        if (!ele["onEvent" + type]) {//可以同种事件设定不同的 方法和设置不同的事件
            ele["onEvent" + type] = [];
            //了解了 只执行一次的原理  还有这些方法自定义都是 ele当前元素上是共享的 run可以实现循环执行方法
            ele.attachEvent("on" + type, function () {run.call(ele)//就是为了实现bind打的this关键字的问题
            });
        }
        var a = ele["onEvent" + type];//“div.onEventmouseover=[] div.onEventmouseout=[] ”
        for (var i = 0; i < a.length; i++) {//累赘就是  多次判断
            if (a[i] == fn)return;
        }
        a.push(fn);
    },
    /*这个run方法只是运行了ie的绑定的事件
    * 里面有一个关键点就是 执行程序池 执行的时候改变程序的this和给了一个e事件对象的接口
    * 解决了 执行顺序和this执行（ie 还有5个小的兼容问题）
    *ie 走这条路线 里面的this已经在on的时候放生改变 run的this就是当前的对象 这个是自动运行
    * 不需要手动添加
    * */
    run: function run(e) {
        e = e || window.event;
        //程序池
        if (!e.target) {
            //加了一步预处理
            var e = window.event;
            e.target = e.srcElement;
            e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
            e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
            e.preventDefault = function () {
                e.returnValue = false;
            }
            e.stopPropagation = function () {
                e.cancelBubble = true
            }
        }

        var type = e.type;
        var a = this["onEvent" + type];
        if(a&&a.length){
            for (var i = 0; i < a.length;) {
                if (typeof a[i] == "function") {
                    // 保证用的是同一个事件对象 用于绑定的方法的事件对象
                    a[i].call(this, e);
                    i++;
                } else {
                    a.splice(i, 1);
                }
            }
        }


    },
    /*
     off方法和on是一个对头 on是记事本 off是橡皮擦 可以擦掉on记得事件
    * */
    off: function off(ele, type, fn) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn, false);
            return;
        }
        var a = ele["onEvent" + type];
        if (a && a.length) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] == fn) {
                    a[i] = null;
                }
            }
        }
    },
/* 这个就是在执行主题方法的时候附加通知的 他的selfType 一定和你on时添加的type一致
* 这个方法是自己定义的所以要在执行主题方法的时候运行这个方法 记得在执行这个方法的时候改变里面的this*/
    selfRun: function (selfType,e) {
    var a=this["aSelf"+selfType];//和保存的时候一样的 取出这个属性
    if(a){
        for(var  i=0;i<a.length;i++){
            if(typeof  a[i]=="function"){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
            }

        }
    }

},
    /*这是就是和自定义on的对头  执行的时候可需要传入三个参数 一个是ele要解绑事件的元素 一个是 类型（自定义的类型） 一个是要解绑的事件*/
    selfOff:function (ele, type, fn){
    var a = ele["aSelf" + type];
    if (a && a.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) {
                a[i] = null;
            }
        }
    }
}
}
// selfType 是自定义的事件类型 e是事件对象



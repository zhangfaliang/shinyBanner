/**
 * Created by Administrator on 2016/3/21.
 */
var DOM = {
    //目前18个方法
    /** 1
     * byClassName  通过类名获取元素集合
     * @param classNames 类名
     * @param content  上下文（可有可无）
     * 此方法的 原理就是 不断的筛选一个元素集合 直到符合条件
     * 返回的是一个 元素数组
     *   by shiny 2016/03/21
     */
    byClassName: function byClassName(classNames, content) {
        if(typeof classNames!="string")throw new Error("classNames参数有问题");
       // if(typeof  content=="object"?(content instanceof Element ?0:1):1)throw  new Error("content参数出错");
        //第一步 去头去尾（空格） 把类名变成数组的每一项
        classNames = classNames.replace(/^ +| +$/, ""), className = classNames.split(/ +/);
        // 2 得到 上下文 判断content是否传入 从上下文中得到所有元素集合
        content = content || document;
        var eles = content.getElementsByTagName("*");
        // 4 循环类名 开始筛选
        for (var i = 0, l = className.length; i < l; i++) {
            // 4.1 创建一个 正则用于筛选  创建一个临时的仓库 放每次创建的结果
            var reg = new RegExp("(^| )" + className[i] + "( |$)"), ary = [];
            // 4 .2循环元素 开始筛选
            for (var j = 0, k = eles.length; j < k; j++) {
                if (reg.test(eles[j].className))ary.push(eles[j]);
            }
            eles = ary;//深藏功与名 就在这 不断的筛选
        }
        return eles;
    },
    /**
     * 2
     * insertBefore 重写dom的 方法向一指定元素的后面添加一个元素
     * @param newEle 要添加的元素
     * @param oldEle 指定的元素
     * 无返回值
     *    by shiny no 2016/03/21
     */
    insertBefore: function insertBefore(newEle, oldEle) {
        /*注意 insertBefore的第二个参数为null的时候就会使用 appendChild方法*/
        if(typeof  newEle=="object"?(newEle instanceof Element ?0:1):1)throw  new Error("newEle参数出错")
        if(typeof  oldEle=="object"?(oldEle instanceof Element ?0:1):1)throw  new Error("oldEle参数出错")
        oldEle.parentNode.insertBefore(newEle, oldEle);
    },
    /**
     * 3
     * insertAfter 重写dom的方法向一指定元素的前面面添加一个元素
     * @param newEle 要添加的元素
     * @param oldEle 指定的元素
     * 原理就是向 oldEle的上一个哥哥节点的后面添加一个元素
     * 无返回值
     * by shiny no 2016/03/21
     */
    insertAfter: function insertBefore(newEle, oldEle) {
        if(typeof  newEle=="object"?(newEle instanceof Element ?0:1):1)throw  new Error("newEle参数出错")
        if(typeof  oldEle=="object"?(oldEle instanceof Element ?0:1):1)throw  new Error("oldEle参数出错")
        /*注意 insertBefore的第二个参数为null的时候就会使用 appendChild方法*/
        oldEle.parentNode.insertBefore(newEle, oldEle.previousSibling);
    },
    /**
     * 4
     * appendChild  重写dom的 方法向一指定容器中添加一个元素 位于第最后的孩子的后面
     * @param ele 指定容器
     * @param childEle
     * 无返回值
     * by shiny no 2016/03/21
     */
    appendChild: function appendChild(ele, childEle) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        if(typeof  childEle=="object"?(childEle instanceof Element ?0:1):1)throw  new Error("childEle参数出错")
        ele.appendChild(childEle);
    },
    /**
     * 5
     * prepan 重写dom的 方法向一指定容器中添加一个元素 位于第最前面的孩子的前面
     * @param ele 指定容器
     * @param childEle
     * 原理就是 使用给第一个孩子的前面添加孩子
     * 无返回值
     * by shiny no 2016/03/21
     */
    prepan: function prepan(ele, childEle) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        if(typeof  childEle=="object"?(childEle instanceof Element ?0:1):1)throw  new Error("childEle参数出错")
        ele.appendChild(childEle);
        /*注意 insertBefore的第二个参数为null的时候就会使用 appendChild方法*/
        ele.insertBefore(childEle, ele.firstChild);
    },
    /**
     * 6
     * listToArray 把一个类数组集合变成 数组的方法 要判断 就是为了ie不支持元素集合和call配合
     * @param list 类数组集合
     * 原理就是 使用[].slice.call(argument) 和 深度复制一个数组原理（try{}catch（e）{}机制）
     * 返回的是一个 元素数组
     * by shiny no 2016/03/21
     */
    listToArray: function listToArray(list) {
        //if(typeof  list=="object"?(list instanceof Element ?0:1):1)throw  new Error("list参数出错")
        try {
            return [].slice.call(arguments);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < arguments.length; i++)ary[ary.length] = arguments[1];
            // 为了ie
            return ary;
        }
    },
    /**
     * 7
     * jsonParson 把json格式的字符串变成json对象
     * @param str
     * @returns {Object}
     * 原理就是 使用三部运算符
     * by shiny no 2016/03/21
     */
    jsonParson: function jsonParson(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");//深藏功与名
    },
    /**
     * 8
     * addClassName 给一个元素添加类名
     * @param ele
     * @param str
     * 原理 先判断是或否存在 不存就添加
     * 无返回值
     * by shiny no 2016/03/21
     */
    addClassName: function addClassName(ele, str) {
        //定义一个正则 正则判断
        if(typeof str!="string")throw new Error("str参数有问题")
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        var reg = new RegExp("(^| )" + str + "( |$)");
        if (!reg.test(ele.className))ele.className += " " + str;
    },
    /**
     * 9
     * removeClassName 给一个元素移除类名
     * @param ele
     * @param str
     * 原理 先判断是或否存在 存在就移除 实现了掺水计划
     * 无返回值
     * by shiny no 2016/03/21
     */
    removeClassName: function removeClassName(ele, str) {
        if(typeof str!="string")throw new Error("str参数有问题")
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        //定义一个正则 正则判断
        var reg = new RegExp("(^| )" + str + "( |$)", "g");
        if (reg.test(ele.className)) {
            ele.className = ele.className.replace(/ /g, "   ");//掺水计划
            ele.className = ele.className.replace(reg, " ");
        }
    },
    /**
     * 10
     * previousEleSibling 得到当前元素所有的哥哥元素节点
     * @param ele
     * @returns {Array}
     * by shiny no 2016/03/21
     */
    previousEleSibling: function previousEleSibling(ele) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        var ary = [];
        if (ele.previousElementSibling) {
            for (var p = ele.previousElementSibling; p; p = p.previousElementSibling) {
                ary.push(p);
            }
        } else {
            for (var p = ele.previousSibling; p; p = p.previousSibling) {
                if (p.nodeType === 1)  ary.push(p);
            }
        }
        return ary;
    },
    /**
     * 11
     * nextEleSibling 得到当前元素所有的弟弟元素节点
     * @param ele
     * @returns {Array}
     * by shiny no 2016/03/21
     */
    nextEleSibling: function nextEleSibling(ele) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        var ary = [];
        if (ele.nextElementSibling) {
            for (var p = ele.nextElementSibling; p; p = p.nextElementSibling) {
                ary.push(p);
            }
        } else {
            for (var p = ele.nextSibling; p; p = p.nextSibling) {
                if (p.nodeType === 1)  ary.push(p);
            }
        }
        return ary;
    },
    siblings:function (ele) {
        return this.previousEleSibling(ele).concat(this.nextEleSibling(ele));

    },
    /**
     * 12
     * prev 得到当前元素最近的哥哥元素节点
     * @param ele
     * @returns {Array}
     * by shiny no 2016/03/21
     */
    prev: function prev(ele) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        if (ele.previousElementSibling) {
            return ele.previousElementSibling;
        } else {
            for (var p = ele.previousSibling; p && p.nodeType !== 1; p = p.previousSibling);
        }
        return p;
    },
    /**
     * 13
     * next 得到当前元素z最近的元素弟弟节点
     * @param ele
     * @returns {Array}
     * by shiny no 2016/03/21
     */
    next: function next(ele) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        if (ele.nextElementSibling) {
            return ele.nextElementSibling
        } else {
            for (var p = ele.nextSibling; p && p !== 1; p = p.nextSibling) ;
            return p;
        }
    },
    /**
     * 14
     * getIndex 得到当前元素的索引
     * @param ele
     * @returns {string|Number}
     * by shiny no 2016/03/21
     */
    getIndex: function getIndex(ele) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        return this.previousEleSibling(ele).length;//有几个哥哥就当前元素的索引

    },
    /**
     * 15
     * sibling得到一个元素的所有元素节点
     * @param ele
     * @returns {Array.<T>}
     * 原理 所有的哥哥元素节点加上所有的弟弟节点
     * by shiny no 2016/03/21
     */
    sibling: function sibling(ele) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        return this.previousEleSibling(ele).concat(this.nextEleSibling(ele));

    },
    /**
     * 16
     * firPreAndFirNex 得到相邻的哥哥元素节点和弟弟元素节点
     * @param ele
     * @returns {Array.<T>}
     * by shiny no 2016/03/21
     */
    firPreAndFirNex: function firPreAndFirNex(ele) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        return this.prev(ele).concat(this.next(ele));

    },
    /**
     * 17
     *children 找到一个元素下面的所有孩子节点
     * @param ele
     * @param label
     * return 一个数组
     * by shiny no 2016/03/21
     */
    children: function children(ele, label) {
        //if(typeof label!="string")throw new Error("label参数有问题")
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        var ary = [], eles = ele.children;//children只有在ie的下文本节点当作元素节点
        if (typeof  label == "string") {
            for (var i = 0, l = eles.length; i < l; i++) {
                if (eles[i].nodeType === 1 && eles[i].nodeName.toLocaleLowerCase() === label.toLocaleLowerCase()) {
                    ary.push(eles[i]);
                }
            }

        } else {
            for (var i = 0, l = eles.length; i < l; i++) {
                if (eles[i].nodeType === 1) {
                    ary.push(eles[i]);
                }
            }
        }

        return ary;
    },
    /**
     * 18
     * offset 计算一个元素到body的偏移量
     * @param ele
     * @returns {{t: (Number|number), l: (Number|number)}}
     * by shiny no 2016/03/21
     */
    offset: function offset(ele) {
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        var p = ele.offsetParent, l = ele.offsetLeft, t = ele.offsetTop;
        //注意 ie 8 下面是没有 clientTop 和 clientLeft的 标准浏览器是有的
        if (window.navigator.userAgent.indexOf("MSIE 8") == -1) {
            l += p.offsetLeft + p.clientLeft;
            t += p.offsetTop + p.clientTop;
        } else {
            l += p.offsetLeft;
            t += p.offsetTop;
        }
        return {t: t, l: l}
    },
    /** 19
     * getClassStyle 得到一个css设置样式值
     * @param ele
     * @param attr
     * @returns {*}
     *  by shiny no 2016/03/21
     *
     */
    getClassStyle:function getClassStyle(ele,attr) {
        if(typeof str!="string")throw new Error("attr参数有问题")
        if(typeof  ele=="object"?(ele instanceof Element ?0:1):1)throw  new Error("ele参数出错")
        //第一步 判断是不是ie浏览器 4种 只针对这个方法 1 if（window.getComputedStyle） 2 if(typeOf getComputedStyle ==“function”) 3 if("getComputedStyle" in window 4 try{} catch(e){} 是个方法
        try{
            //可以取得伪类的样式值
            return getComputedStyle(ele)[attr];
        }catch (e){
            //不可以得到伪类样式
         return ele.currentStyle[attr];
        }

    }

}

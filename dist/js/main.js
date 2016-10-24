/**
 * test
 * (c) 2016 Yiiu
 * @license MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

window.slider = function(el, options){
    var this$1 = this;

    this.default = {

        // 是否自动播放，默认不自动播放
        autoplay: false,

        // 幻灯片延迟事件
        delay: 3000,

        // 动画速度
        delay: 3000,

    };

    this.$state = false;         // 幻灯片状态

    this.$el = el;

    this.options = {};
    /*
     初始化的设置之类的

     初始执行
     */
    this.init = function (options) {
        console.log(options);

        this$1.current = 0;
        this$1.initDom();
        this$1.initSize();
        this$1.initNav();
    };

    // 初始dom的属性
    this.initDom = function () {
        // el的宽高就是幻灯片的宽高
        var els = this$1.$el.innerHTML;

        // 幻灯片数量
        this$1.length = this$1.$el.children.length;

        // 幻灯片容器
        var box = document.createElement("div");

        box.className = "y-slider-box";

        box.innerHTML = els;

        this$1.$el.innerHTML = "";

        this$1.$el.appendChild(box);

        this$1.$el.box = box;

        for(var i = 0; i<this$1.$el.box.children.length; i++){
            this$1.$el.box.children[i].className += " y-slider-list";
        }

        return this$1

    };

    this.initSize = function () {
        this$1.$el.style.overflow = "hidden";

        this$1.$el.box.style.width = (100 * this$1.length) + "%";

        for(var i = 0; i<this$1.$el.box.children.length; i++){
            this$1.$el.box.children[i].style.width = (100 / this$1.length) + "%";
        }

        return this$1
    };
    // 初始nav
    this.initNav = function () {
        var self = this$1;
        var nav = document.createElement("nav");
        nav.className = "y-slider-nav";
        for(var i = 0; i<this$1.length; i++) {
            nav.innerHTML += "<a data-nav=\"" + i + "\">" + (i+1) + "</a>";
        }
        this$1.$el.appendChild(nav);
        this$1.$el.nav = nav;

        this$1.$el.nav.children[this$1.current].className = "active";

        this$1.$el.addEventListener("click", function (e) {
            if(e.target.nodeName === "A") {
                self.current = e.target.getAttribute("data-nav");
                self.animation();
                self.navEvent();
            }
        });
    };

    this.navEvent = function () {
        this$1.$el.nav.getElementsByClassName("active")[0].removeAttribute("class");
        this$1.$el.nav.children[this$1.current].className = "active";
    };
    this.next = function () {
        this$1.current += 1;

        if(this$1.current >= this$1.length){
            this$1.current = 0;
        }
        return this$1.animation()
    };

    this.prev = function () {
        this$1.current -= 1;

        if(this$1.current < 0){
            this$1.current = this$1.length - 1;
        }
        return this$1.animation()
    };

    this.animation = function () {
        this$1.navEvent();
        this$1.$el.box.style.transition = ".5s transform";
        this$1.$el.box.style.transform = "translateX(" + (-this$1.$el.offsetWidth * this$1.current) + "px)";

        this$1.$el.box.addEventListener("transitionend", this$1.end);
    };

    this.end = function () {
        this$1.$el.box.style.transition = "none";
    };


    return this.init(options)
};

})));
//# sourceMappingURL=main.js.map

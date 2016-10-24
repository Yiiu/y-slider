window.slider = function(el, options){
    this.default = {

        // 是否自动播放，默认不自动播放
        autoplay: false,

        // 幻灯片延迟事件
        delay: 3000,

        // 动画速度
        delay: 3000,

    }

    this.$state = false         // 幻灯片状态

    this.$el = el

    this.options = {}
    /*
     初始化的设置之类的

     初始执行
     */
    this.init = (options) => {
        console.log(options)

        this.current = 0
        this.initDom()
        this.initSize()
        this.initNav()
    }

    // 初始dom的属性
    this.initDom = () => {
        // el的宽高就是幻灯片的宽高
        let els = this.$el.innerHTML

        // 幻灯片数量
        this.length = this.$el.children.length

        // 幻灯片容器
        let box = document.createElement("div")

        box.className = "y-slider-box"

        box.innerHTML = els

        this.$el.innerHTML = ""

        this.$el.appendChild(box)

        this.$el.box = box

        for(var i = 0; i<this.$el.box.children.length; i++){
            this.$el.box.children[i].className += " y-slider-list"
        }

        return this

    }

    this.initSize = () => {
        this.$el.style.overflow = "hidden"

        this.$el.box.style.width = `${100 * this.length}%`

        for(var i = 0; i<this.$el.box.children.length; i++){
            this.$el.box.children[i].style.width = `${100 / this.length}%`
        }

        return this
    }
    // 初始nav
    this.initNav = () => {
        let self = this
        let nav = document.createElement("nav")
        nav.className = "y-slider-nav"
        for(let i = 0; i<this.length; i++) {
            nav.innerHTML += `<a data-nav="${i}">${i+1}</a>`
        }
        this.$el.appendChild(nav)
        this.$el.nav = nav

        this.$el.nav.children[this.current].className = "active"

        this.$el.addEventListener("click", (e) => {
            if(e.target.nodeName === "A") {
                self.current = e.target.getAttribute("data-nav")
                self.animation()
                self.navEvent()
            }
        })
    }

    this.navEvent = () => {
        this.$el.nav.getElementsByClassName("active")[0].removeAttribute("class")
        this.$el.nav.children[this.current].className = "active"
    }
    this.next = () => {
        this.current += 1;

        if(this.current >= this.length){
            this.current = 0
        }
        return this.animation()
    }

    this.prev = () => {
        this.current -= 1;

        if(this.current < 0){
            this.current = this.length - 1
        }
        return this.animation()
    }

    this.animation = () => {
        this.navEvent()
        this.$el.box.style.transition = `.5s transform`
        this.$el.box.style.transform = `translateX(${-this.$el.offsetWidth * this.current}px)`

        this.$el.box.addEventListener("transitionend", this.end)
    }

    this.end = () => {
        this.$el.box.style.transition = `none`
    }


    return this.init(options)
}

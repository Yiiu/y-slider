window.slider = function(el, options){
    this.default = {

        // 是否自动播放，默认不自动播放
        autoplay: false,

        // 幻灯片延迟事件
        delay: 3000,

        // 动画速度
        delay: 3000,

    }
    this.$el = el

    this.options = {}
    /*
     初始化的设置之类的

     初始执行
     */
    this.init = (options) => {
        this.current = 0
        this.initDom()
        this.initSize()
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

    this.next = () => {
        this.current += 1;

        if(this.current >= this.length){
            this.current = 0
        }
        return this.animation()
    }

    this.prev = () => {
        this.current -= 1;

        if(this.current <= 0){
            this.current = this.length
        }
        return this.animation()
    }

    this.animation = () => {
        
        console.log(this.current)
        
    }

    return this.init(options)
}

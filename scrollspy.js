
var VanillaScrollspy = function() {
    "use strict";
    class e {
        constructor({menu: e, speed: t=2e3, easing: n="easeOutSine"}) {
            this.$menu = e,
            this.speed = t,
            this.easing = n
        }
        scrollToY(e=0) {
            let t = 0;
            const n = e
              , o = window.scrollY || document.documentElement.scrollTop
              , s = Math.max(.1, Math.min(Math.abs(o - n) / this.speed, .8))
              , i = {
                easeOutSine: e=>Math.sin(e * (Math.PI / 2)),
                easeInOutSine: e=>-.5 * (Math.cos(Math.PI * e) - 1),
                easeInOutQuint: e=>(e /= .5) < 1 ? .5 * e ** 5 : .5 * ((e - 2) ** 5 + 2)
            }
              , c = ()=>{
                t += 1 / 60;
                const e = t / s
                  , r = i[this.easing](e);
                if (e < 1)
                    return window.requestAnimationFrame(c),
                    void window.scrollTo(0, o + (n - o) * r);
                window.scrollTo(0, n)
            }
            ;
            c()
        }
        menuControl() {
            const e = this.$menu.querySelectorAll('a[href^="#"]')
              , t = window.scrollY || document.documentElement.scrollTop;
            e.forEach((e=>{
                const n = document.querySelector(e.getAttribute("href"));
                return n.offsetTop <= t && n.offsetTop + n.clientHeight > t ? e.classList.add("active") : e.classList.remove("active")
            }
            ))
        }
        animated() {
            const e = this.$menu.querySelectorAll('a[href^="#"]')
              , t = this;
            function n(e) {
                e.preventDefault();
                const n = document.querySelector(this.hash);
                t.scrollToY(n.offsetTop)
            }
            e.forEach((e=>e.addEventListener("click", n)))
        }
        init() {
            this.animated(),
            document.addEventListener("scroll", (()=>this.menuControl()))
        }


 
        
    }
    return function(...t) {
        return new e(...t)
    }






   
}();

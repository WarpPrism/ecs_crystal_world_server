(function($) {
    var module = {};
    getHitokoto();
    fAutoResize();
    window.onresize = fAutoResize;
    // [].forEach.call(document.querySelectorAll('*'),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})
    
    function getHitokoto() {
        $.ajax({
            url: 'https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=200&encode=json&source=0',
            method: 'GET',
            success: function(res) {
                console.log(res);
                if (res.hitokoto) {
                    module.hitokotoObj = res;
                    $('.hitokoto-txt').html(res.hitokoto);
                }
            }
        })
    }
    function fAutoResize() {
        var availWidth = document.documentElement.clientWidth || window.screen.width;
        var newFontSize = Math.round(16 * (availWidth / 1920));
        
        document.documentElement.style.fontSize = newFontSize + 'px';
        var realfz = ~~(+(window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px',''))*10000)/10000;
        // console.log(newFontSize, realfz);
        document.documentElement.style.fontSize = newFontSize*(newFontSize/realfz) + 'px';
    }
    
})($ || window.jQuery);
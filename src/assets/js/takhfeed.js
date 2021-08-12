// // very simple to use!
// $(document).ready(function () {
//     setTimeout(function () {
//         $('.js-activated').dropdownHover().dropdown();
//     },5000);
//     });
// //  }, 10000);
! function ($, n, e) {
    // //debugger;
    var o = $();
    $.fn.dropdownHover = function (e) {
        return "ontouchstart" in document ? this : (o = o.add(this.parent()), this.each(function () {
            function t(e) {
                o.find(":focus").blur(), h.instantlyCloseOthers === !0 && o.removeClass("open"), n.clearTimeout(c), i.addClass("open"), r.trigger(a)
            }
            var r = $(this),
                i = r.parent(),
                d = {
                    delay: 100,
                    instantlyCloseOthers: !0
                },
                s = {
                    delay: $(this).data("delay"),
                    instantlyCloseOthers: $(this).data("close-others")
                },
                a = "show.bs.dropdown",
                u = "hide.bs.dropdown",
                h = $.extend(!0, {}, d, e, s),
                c;
            i.hover(function (n) {
                return i.hasClass("open") || r.is(n.target) ? void t(n) : !0
            }, function () {
                c = n.setTimeout(function () {
                    i.removeClass("open"), r.trigger(u)
                }, h.delay)
            }), r.hover(function (n) {
                return i.hasClass("open") || i.is(n.target) ? void t(n) : !0
            }), i.find(".dropdown-submenu").each(function () {
                var e = $(this),
                    o;
                e.hover(function () {
                    n.clearTimeout(o), e.children(".dropdown-menu").show(), e.siblings().children(".dropdown-menu").hide()
                }, function () {
                    var t = e.children(".dropdown-menu");
                    o = n.setTimeout(function () {
                        t.hide()
                    }, h.delay)
                })
            })
        }))
    }, $(document).ready(function () {
        $('[data-hover="dropdown"]').dropdownHover()
    })
}(jQuery);
$('body').flowtype({
    minimum: 500,
    maximum: 1200,
    minFont: 12,
    maxFont: 20,
    fontRatio: 30
});
$(document).ready(function () {
    $('.js-activated').dropdownHover().dropdown();
    $('#media').carousel({
        pause: true,
        interval: false,
    });
});


var elm = document.querySelector('input');
var container = elm.parentNode;
/////////////////////////////////////////////////
// var values = "";
// if(elm.getAttribute('data-values') != null){
   var values = elm.getAttribute('data-values').split(' ');


//////////////////////////////////////////////////////////////////////
values.forEach(function (value, i, values) {
    var rangePart = elm.cloneNode();
    rangePart.type = 'range';
    rangePart.removeAttribute('data-values');
    rangePart.value = value;
    rangePart = container.insertBefore(rangePart, elm);
});
//}
elm.remove();
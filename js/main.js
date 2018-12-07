// JavaScript Document

/*点赞功能*/
var count = 124;
function likeOver(obj) {
    obj.innerHTML = "+ " + count;
}
function likeOut(obj) {
    obj.innerHTML = "Like it";
}
function likeClick(obj) {
    if ( count == 124 ) {
        count++;
		ks.notice("祝武大生日快乐！", {
			color: "blue",
			time: 2000
		});
        obj.innerHTML = "+" + count;
    }
    else {
		ks.notice("你已经点过赞了哟。", {
			color: "red",
			time: 2000
		});
	}
}

/*调整大小*/
$(window).resize(function () {
	"use strict";
	$(".main-intro").css("height",$(window).height());
	$(".main-full").css("height",$(window).height());
});

$(document).ready(function () {
	"use strict";
	var hideimg = 0;
	$(".main-intro").css("height",$(window).height());
	$(".main-full").css("height",$(window).height());
	/*导航栏样式随滚动变换*/
	$(document).scroll(function () {
        if ($(document).scrollTop() > 0) {
            $(".head-bg").addClass("menu-roll");
        } else if ($(document).scrollTop() == 0) {
            $(".head-bg").removeClass("menu-roll");
        }
	});
	$("#btn0").click(function () {
        $("html,body").animate({scrollTop: 0}, 1000);
    });
	$("#btn1").click(function () {
		$("html,body").animate({scrollTop: $("#1").offset().top - 60}, 1000);
	});
	$("#btn2").click(function () {
		$("html,body").animate({scrollTop: $("#2").offset().top - 60}, 1000);
	});
	$("#btn3").click(function () {
		$("html,body").animate({scrollTop: $("#3").offset().top - 60}, 1000);
	});
	$("#btn4").click(function () {
		$("html,body").animate({scrollTop: $("#4").offset().top - 60}, 1000);
	});
	/*查看更多图片（功能实现中）*/
	$('#viewmore').click(function(){
		if (hideimg === 0){
			$("hide-img").css("display","block");
			$("#viewmore").text("隐藏图片");
			hideimg = 1;
		} else {
            $("hide-img").css("display","none");
            $("#viewmore").text("更多图片");
            hideimg = 0;
		}
	})
});

function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
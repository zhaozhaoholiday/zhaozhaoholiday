window.onload = function(){
	var oPre = $("#pre");
	var oNext = $("#next");
	var oUl = $('#picList');
	var aBtn = $('.btn');
	var oPicList = $('#picList');
	var aSmallPic = $('.smallPic');
	var aOverride = $('.override');
	var oContainer = $('#lunbo1');
	var oWrapper = $('#lunbo2');
	var picNum = aBtn.length;
	var num = 1;
	oPicList.width(505*picNum+'px');//若要加图片，动态设置容纳图片的盒子宽度
	var li_width = oUl.width()/picNum;
	var isMoving = false;  
	
	var index = 1;
	var timer1 = null;
	var timer2 = null;
	
	 
	oPre.click(moveLeft);
	oNext.click(moveRight);
	function moveLeft(){
		move(li_width);
	}
	function moveRight(){
		move(-li_width);
	}
	//边界判定利用的是图片张数，不是用的偏移量
	function move(offset,e){
		if (num == picNum && offset>0 && !e) {
			oUl.animate({"left":"0px"},"normal");
			num = 1;
		}else if(num == 1 && offset<0 && !e){
			oUl.animate({"left":"-1515px"},"normal");
			num = 4;
		}else{
			oUl.animate({"left":"-="+offset},"normal");
			if (!e) {
				num = offset>0?++num:--num;
			};
			
		}
		showBtn();
	}
	function showBtn(){
		aBtn.eq(num-1).addClass('on').siblings().removeClass('on');
	}
	//用的事件委托，需要if判定所点击的元素是否为希望点击的元素
	$("#spot").click(function(e){
		var e = e || window.event;
		var t = e.target||e.srcElement;

		var newNum = Array.prototype.indexOf.call($("#spot .btn"),t)+1;
		if (newNum == 0) {  //若点到#spot，却没点到.btn，则返回
			return;
		};
		console.log(Array.prototype.indexOf.call($("#spot .btn"),t));
		var dis = newNum - num;
		num = newNum;
		move(dis*505,1);

	});

	showBtn();
}

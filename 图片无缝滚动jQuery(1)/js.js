$(function(){
	var pre = $("#pre");
	var next = $("#next");
	var ul = $("#content_ul");
	var container = $("#container");
	var htm = ul.html()+ul.html();
	ul.html(htm);
	var timer = null;
	var iSpeed = 0;
	var isMoving = false;
	//注意position()offset()的区别，它们都只有两个属性值，即top left，只能取值，不能设置值
	function move(){
		ul.css({"left":ul.position().left+iSpeed+'px'});
			if (ul.position().left <= -ul.width()/2) {
				ul.css({"left":'0px'});
			}else if (ul.position().left >=0) {
				ul.css({"left":-ul.width()/2 + 'px'});
			}
	}
	pre.click(function(){
		clearInterval(timer);
		iSpeed = 2;
		timer = setInterval(move,20);
	});
	next.click(function(){
		clearInterval(timer);
		iSpeed = -2;
		timer = setInterval(move,20);
	});
	//利用事件委托，get()或用下标取的元素是DOM元素，不再是jQuery对象了
	$("#spotSpan").click(function(e){
		var spots = $(".spot");
		var e = e || window.event;
		var target = e.target || e.srcElement;
		var index = Array.prototype.indexOf.call(spots,target);
		showBtn(spots,index);
	});
	function showBtn(spots,index){
		var lis = ul.children();
		for (var i = 0; i < spots.length; i++) {
			lis[i].style.border = "";
			spots[i].style.background = "";
		};
		spots[index].style.background = "orange";
		lis[index].style.border = "2px solid orange";
	}
})
window.onload = function(){
	//利用util.js封装的$()函数获取元素
	var oPre = $("#pre");
	var oNext = $("#next");
	var oUl = $('#picList');
	var aBtn = $('.btn');
	var oPicList = $('#picList');
	var aSmallPic = $('.smallPic');
	var aOverride = $('.override');
	var oContainer = $('#lunbo1');
	var oWrapper = $('#lunbo2');
	var isMoving = false;  
	var picNum = aBtn.length;
	var index = 1;
	var timer1 = null;
	var timer2 = null;
	oPicList.style.width = 505*(picNum+2)+'px'; //若要加图片，动态设置容纳图片的盒子宽度
	addHandle('click', oPre, leftArrow);
	addHandle('click', oNext, rightArrow);
	for (var i = 0; i < aBtn.length; i++) {
		addHandle('click',aBtn[i],moveByBtn);
		addHandle('click',aSmallPic[i],moveBySmallPic);
		addHandle('mouseover',aOverride[i],function(){this.style.background='none';});
		addHandle('mouseout',aOverride[i],function(){this.style.background='rgba(0,0,0,0.4)';})
	};
	//下面两个函数，判定左右边界值
	function judgeBorder1(){
		if(oUl.offsetLeft<-505*picNum){
			oUl.style.left = '-505px';
		}
	}
	function judgeBorder2(){
		if (oUl.offsetLeft>-505) {    //边界值判定
			oUl.style.left = -505*picNum+'px';
		};
	}
	function moveByElse(nowIndex){
		if (isMoving==true) {return}; //避免两张图片抢着移动
		var dis = nowIndex - index;
		if (dis==0) {return;};  //优化
		//判断边界，防止点小圆点时出现空白
		judgeBorder1();
		judgeBorder2();
		move(dis*(-505));
		index = nowIndex;
		showBtn();
		showSmallPic();
	}
	//按小圆点选图片
	function moveByBtn(){
		var nowIndex = this.id;
		moveByElse(nowIndex);
	}
	//按缩图选图片
	function moveBySmallPic(){
		//var nowIndex = this.dataset.index;  IE不兼容
		var nowIndex = this.getAttribute("data-index");
		moveByElse(nowIndex);
	}
	//图片缓慢移动
	function move(moveDis){
		var iInterval = 101; //选适当的值，避免出现误差

		var target = oUl.offsetLeft+moveDis;
		var iSpeed = moveDis/iInterval; 
		timer1 = setInterval(function(){	
			oUl.style.left = oUl.offsetLeft + iSpeed + 'px';
			isMoving = true;
			if (moveDis<0&&oUl.offsetLeft<=target || moveDis>0&&oUl.offsetLeft>=target) {
				clearInterval(timer1);
				isMoving = false;
			 }
		},20);	
	}
	//点击右键
	function rightArrow(){
		if (isMoving==true) {return;};
		judgeBorder1();
		move(-505);
		if (index==picNum) {
			index=0;
		};
		index++;
		showBtn();
		showSmallPic();
	}
	//点击左键
	function leftArrow(){
		if (isMoving==true) {return;};
		judgeBorder2();
		move(505);
		
		if (index==1) {  //边界值判定
			index=picNum+1;
		};
		index--;
		showBtn();
		showSmallPic();
	}
	function show(arr, oldCol, newCol, op){
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].style.background = newCol){
				arr[i].style.background = oldCol;
				if (op) {
		 			arr[i].style.opacity = op;
		 		};
		 	};
		 };
		 arr[index-1].style.background = newCol;	
	}
	//变小圆点的颜色
	function showBtn(){
		show(aBtn, "black", "rgb(117,184,107)");
	}
	//变缩略图的颜色
	 function showSmallPic(){
	 	show(aOverride, "black","none",0.6);
	 }
	
	function play(){
		timer2 = setInterval(rightArrow,1000);
	}
	function stop(){
		clearInterval(timer2);
	}
	 addHandle("mouseover",oContainer,stop);
	 addHandle("mouseout",oContainer,play);
	 addHandle("mouseover",oWrapper,stop);
	 addHandle("mouseout",oWrapper,play);

	 showBtn();
	 showSmallPic();
	 play();

	 addHandle("click",tip,function(){
	 	var oHide = $('#hide');
	 	oHide.style.display = "block";
	 });
}

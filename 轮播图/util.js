//工具包
function $(s){
	var s1 = s.slice(0,1);
	var s2 = s.slice(1);
	if (s1=="#") {
		return document.getElementById(s2);
	}else if(s1=="."&& document.getElementsByClassName){
		return document.getElementsByClassName(s2);
	}else if(s1=="."&& !document.getElementsByClassName){
		return getElementsByClassname(s2);
	}else{
		return;
	}	
}
//IE8及以下的不支持document.getElementsByClassName()
function getElementsByClassname(s2){
	var arr = document.getElementsByTagName('*');
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].className == s2){
			newArr.push(arr[i]);
		}
	};
	return newArr;
}
function addHandle(type, ele, handle){
	if (ele.addEventListener) {
		ele.addEventListener(type,handle,true);
	}else if (ele.attachEvent) {
		ele.attachEvent('on'+type,handle);
	}else{
		ele['on'+type]=handle;
	}
}
function removeHandle(type, ele, handle){
	if (ele.removeEventListener) {
		ele.removeEventListener(type,handle,true);
	}else if (ele.detachEvent) {
		ele.detachEvent('on'+type,handle);
	}else{
		ele['on'+type]=null;
	}
}

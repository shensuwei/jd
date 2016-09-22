// 1.通过类名获取元素
function getClass(select,obj){
	// 确定获取元素的范围
	var obj=obj?obj:document;

	// 判断浏览器
	if(document.getElementsByClassName){
		// w3c
		return obj.getElementsByClassName(select);
	}else{
		// IE6-8
		// 获取页面中所有元素
		var all=obj.all;
		// 定义一个空数组，用于存放类名为select的元素
		var arr=[];
		// 遍历页面中的每一个元素的类名属性
		for(var i=0;i<all.length;i++){
		// 与自己想要找的类名进行匹配
		// if(all[i].className==select){
			// 	arr.push(all[i]);
		// }

			// 处理一个元素有多个类名的情况
			if(checkClass(all[i].className,select)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}
	// 处理包含多个类名的元素的函数
	// search--->获取到的每个元素的类名
	// select--->要筛选出的类名

	function checkClass(search,select){
		// 将包含多个类名的字符串用空格分割成数组
		var brr=search.split(" ");

		// 遍历新数组中的每一个因素(类名)
		for(var i=0;i<brr.length;i++){
		// 与自己想要筛选的类名进行匹配
			if(brr[i]==select){
				return true;
			}
		}
		return false;
	}

// 2.操作文本内容
function handleText(obj,value){
	if(obj.innerText){
		if(value==undefined){
			return obj.innerText;
		}else{
			obj.innerText=value;
		}
	}else{
		if(value==undefined){
			return obj.textContent;
		}else{
			obj.textContent=value;
		}
	}
}

function handleText(obj,value){
	if(obj.textContent){
		if(value!=undefined){
			obj.textContent=value;
		}else{
			return obj.textContent;
		}
	}else{
		if(value!=undefined){
			obj.innerText=value;
		}else{
			return obj.innerText;
		}
	}
}

//3. $函数(获取元素、页面加载)
function $(selector,obj){
	if(typeof selector=="string"){
		// 1.实现获取元素的功能
		// 确定获取元素的范围
		var obj=obj||document;

		// 去空
		var selector=trim(selector);

		// 通过判断字符串的首个字符确定获取元素的方式
		if(selector.charAt(0)=="."){
			// 通过类名获取元素
			return getClass(selector.slice(1),obj);
		}else if(selector.charAt(0)=="#"){
			// 通过id获取元素
			return document.getElementById(selector.slice(1));			//不用改成obj也行
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,9}$/.test(selector)){
			// 通过标签获取元素
			return obj.getElementsByTagName(selector);
		}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,9}>$/.test(selector)){
			// 创建元素节点(去掉尖括号)
			return document.createElement(selector.slice(1,-1));
		}
	}else if(typeof selector=="function"){
		// 函数重载(参数不同，实现的功能不同)
		// 2.实现页面加载的功能(给window添加onload事件)
		// window.onload=function(){
		// 	selector();		//回调函数
		// }	
		// window.onload=selector;
		
		// 3.一个事件绑定多个事件处理程序
		addEvent(window,"load",selector);

	}
}

// 去空
function trim(str,type){
	var type=type||"both";
	if(type=="left"){
		var reg=/^\s*/;
		return str.replace(reg,"");
	}else if(type=="right"){
		var reg=/\s*$/;
		return str.replace(reg,"");
	}else if(type=="both"){
		var reg=/^\s*|\s*$/g;
		return str.replace(reg,"");
	}else if(type=="all"){
		var reg=/\s*/g;
		return str.replace(reg,"");
	}
}

// 4.获取样式
function getStyle(obj,style){
	// 判断浏览器
	if(obj.currentStyle){
		//IE
		return obj.currentStyle[style];			//字符串必须写在方括号中
	}else{
		//w3c
		return getComputedStyle(obj,null)[style];
	}
}

/*
5.获取指定元素的子节点
	obj:指定的对象
	type:获取子节点的类型
	
	获取的只是元素节点  true		--->不传参或传true
	获取的既可以是元素节点;也可以是文本节点   false				--->传false
*/
function getChilds(obj,type){
	// 判断获取的是什么类型的有意义子节点(这样写不好理解所以摒弃)
	// var type=(type==undefined)?true:type;
	
	// 获取指定父节点的所有的子节点
	var childs=obj.childNodes;
	
	// 定义一个空数组，用于存放有意义的子节点
	var arr=[];
	
	// 遍历所有获取到的子节点
	for(var i=0;i<childs.length;i++){
		
		// 判断获取的是什么类型的有意义子节点
		if(type==undefined){
			if(childs[i].nodeType==1){
				arr.push(childs[i]);
			}
		}else if(type==true){
			// 第一种方式
			// if(childs[i].nodeType==1||childs[i].nodeType==3&&!(/^\s+$/.test(childs[i].nodeValue))){
			// 	arr.push(childs[i]);
			// }

			// 第二种方式
			if(childs[i].nodeType==1||childs[i].nodeType==3&&trim(childs[i].nodeValue,"all")){
				arr.push(childs[i]);
			}
		}
	}
	return arr;
}

// 6.获取第一个子节点
function getFirst(obj,type){
	return getChilds(obj,type)[0];
}

// 7.获取最后一个子节点
function getLast(obj,type){
	// 获取所有子节点的长度,用于定义最后一个子节点的下标(第一种方式)
	// var length=getChilds(obj,type).length;
	// return getChilds(obj,type)[length-1];

	// 获取所有子节点(第二种方式)
	var childs=getChilds(obj,type);
	return childs[childs.length-1];
}

// 8.获取随机子节点
function randomChild(obj,type,num){
	// 第一种方式
	return getChilds(obj,type)[num];

	// 第二种方式
	// var childs=getChilds(obj,type);
	// return childs[num];

}

// 9.获取下一个兄弟节点(元素节点或非空文本节点)
function getNext(obj){
	// 获取指定对象的下一个兄弟节点
	var next=obj.nextSibling;

	// 判断next是否存在
	if(next==null){
		return next;
	}

	// 当下一个兄弟节点是注释节点或空文本时继续获取下一个兄弟节点
	while(next.nodeType==8||next.nodeType==3&&(trim(next.nodeValue)=="")){
		// 更新next
		next=next.nextSibling;

		// 每次更新完再判断一次next是否存在
		if(next==null){
			return false;
		}
	}
	return next;		//最后返回next
}

// 10.获取上一个兄弟节点(元素节点或非空文本节点)
function getPrev(obj){
	// 获取指定元素的上一个兄弟节点
	var prev=obj.previousSibling;

	// 判断是否有上一个兄弟节点
	if(prev==null){
		return false;
	}

	// 当上一个兄弟节点是注释节点或空文本时继续获取上一个兄弟节点
	while(prev.nodeType==8||prev.nodeType==3&&(/^\s+$/.test(prev.nodeValue))){
		// 更新prev
		prev=prev.previousSibling;

		// 每次更新完再判断一次是否有上一个兄弟节点
		if(prev==null){
			return false;
		}
	}
	return prev;		//最后返回prev
}

// 11.插入到父元素中某个子节点之前
function insertBefore(obj,before){
	// obj--->要插的对象
	// before--->被插的对象
	// 获取父元素
	var parent=before.parentNode;
	parent.insertBefore(obj,before);
}

// 12.插入到父元素中某个子节点之后
function insertAfter(obj,after){
	// obj--->要插的对象
	// after--->被插的对象

	// 获取被插子节点的下一个兄弟节点
	var next=getNext(after);

	// 获取被插对象的父元素
	var parent=after.parentNode;

	// 判断被插的子节点是否有下一个兄弟节点
	// 有就插到下一个兄弟节点之前
	// 没有就追加到父元素的最后
	if(next){
		insertBefore(obj,next);
	}else{
		parent.appendChild(obj);
	}
}

// 13.插入到父元素的最前面(即父元素中第一个子节点之前)
function appendBefore(obj,parent){
	// 获取父元素的第一个子节点
	var first=getFirst(parent);

	// 判断父元素是否有子节点
	// 有就插入到父元素的第一个子节点之前
	// 没有就追加到父元素中

	if(first){
		insertBefore(obj,first);
	}else{
		parent.appendChild(obj);
	}
}

// 14.添加事件
function addEvent(obj,type,fn){
	if(obj.attachEvent){
		obj.attachEvent("on"+type,fn);
	}else{
		obj.addEventListener(type,fn,false);
	}
}

// 15.删除事件
function removeEvent(obj,type,fn){
	if(obj.detachEvent){
		obj.detachEvent("on"+type,fn);
	}else{
		obj.removeEventListener(type,fn,false);
	}
}

// 16.银泰的线
function line(obj){
	var left=$(".l",obj)[0];
	var right=$(".r",obj)[0];
	var top=$(".t",obj)[0];
	var bottom=$(".b",obj)[0];

	// 获取元素实际宽高
	var bw=obj.offsetWidth;
	var bh=obj.offsetHeight;

	obj.onmouseover=function(){
		animate(left,{width:bw});
		animate(top,{height:bh});
		animate(right,{width:bw});
		animate(bottom,{height:bh});
	}

	obj.onmouseout=function(){
		animate(left,{width:0});
		animate(top,{height:0});
		animate(right,{width:0});
		animate(bottom,{height:0});
	}
}

// 17.获取元素(这个元素可能会有很多父元素)相对于浏览器的位置
// obj--->子元素本身
function offset(obj){
	// 一.前期准备
	// 1.创建一个对象
	var result={left:0,top:0};
	// 2.定义一个空数组，用于存放所有具有定位属性的父元素
	var arr=[];
	// 3.把子元素本身推进数组中，为之后求自身的offsetLeft做准备
	arr.push(obj);

	// 二.获取所有具有定位属性的父元素
	var parent=obj.parentNode;

	// 1.当父元素是body时停止
	while(parent.nodeName!="BODY"){
		// 2.判断父元素是否有定位属性
		// 因为默认每个元素都会有position: 样式
		if(getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute"){
			//3. 把满足条件的父元素推进数组中
			arr.push(parent);
		}
		// 4 更新父元素
		parent=parent.parentNode;
	}

	// 三.所有父元素的offsetLeft+(border-left)+自身的offsetLeft
	// 遍历数组
	for(var i=0;i<arr.length;i++){
		// 1.获取数组中所有元素的offsetLeft
		var left=arr[i].offsetLeft;
		var top=arr[i].offsetTop;


		// 2.获取数组中所有元素的border-left
		// 3.首先要判断数组中的元素有没有左边框
		var borderLeft=getStyle(arr[i],"borderLeftWidth")?parseInt(getStyle(arr[i],"borderLeftWidth")):0;
					
		var borderTop=getStyle(arr[i],"borderTopWidth")?parseInt(getStyle(arr[i],"borderTopWidth")):0;
					
		// 4.去掉子元素的左边框
		if(i==0){
			borderLeft=0;
			borderTop=0;
		}
					
		// 5.相加
		result.left+=left+borderLeft;
		result.top+=top+borderTop;
	}
	return result;
}

// 18.鼠标滚轮事件
function mouseWheel(obj,funUp,funDown){
	if(document.attachEvent){
		obj.attachEvent("onmousewheel",scrollFn);		//IE
	}else if(document.addEventListener){
		obj.addEventListener("mousewheel",scrollFn,false);		//谷歌
		obj.addEventListener("DOMMouseScroll",scrollFn,false);		//火狐
	}

	// 写滚动事件处理函数
	function scrollFn(e){
		// 兼容不同浏览器获取事件对象的方式
		var ev=e||window.event;
		// 兼容不同浏览器获取事件对象的方向属性
		var direction=ev.wheelDelta||ev.detail;

		//阻止浏览器默认动作，滚轮在页面中某个元素身上滚动时不会让屏幕变化(变色)
		if(ev.preventDefault){
			ev.preventDefault();		//W3C
		}else{
			ev.returnValue=false;		//IE
		}

		if(direction==120||direction==-3){
			funUp.call(obj);		//冒充后
				// funUp();--->冒充前
		}else if(direction==-120||direction==3){
			funDown.call(obj);		//冒充后
				// funDown();--->冒充前
		}
	}
}




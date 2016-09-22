// 1.head 选项卡(不对)
$(function(){
	var citys=$("a",$(".city")[0]);
	for(var i=0;i<citys.length;i++){
		citys[i].index=i;
		citys[i].onclick=function(){
			citys[0].style.background="#fff";
			citys[0].style.color="#666";
			citys[this.index].style.background="#C81623";
			citys[this.index].style.color="#fff";
		}
		citys[i].onmouseout=function(){
			citys[this.index].style.background="#fff";
			citys[this.index].style.color="#666";
		}
	}
});

// 2.topgg点击关闭
$(function(){
	var close=$(".close")[0];
	var topgg=$(".topgg")[0];
	close.onclick=function(){
		topgg.style.display="none";
	}
});

// 3.banner左侧选项卡
$(function(){
	var types=$(".type");
	var details=$(".detail");

	for(var i=0;i<types.length;i++){
		types[i].index=i;
		types[i].onmouseover=function(){
			details[this.index].style.display="block";
		}
		types[i].onmouseout=function(){
			details[this.index].style.display="none";
		}
	}
});

// 4.banner层级轮播
$(function(){
	// 获取元素
	var imgs=$("a",$(".banner")[0]);
	var cirs=$("li",$(".cirs")[0]);
	var win=$(".window")[0];
	var btn=$(".btn")[0];
	var btnL=$(".btnL")[0];
	var btnR=$(".btnR")[0];

	// 定义开关
	// 一张图片动画结束才让下一张图片出现
	var flag=true;

	// 状态初始化
	imgs[0].style.zIndex=1;
	cirs[0].style.background="#B61B1F";

	//记录当前是哪张图片
	var n=0;

	// 时间间隔函数
	var t=setInterval(move,2000);

	// 整合后的函数
	function move(type){
		var type=type||"r";
		
		if(type=="l"){
			// 更新下标，切换状态
			n--;

			// 判断n是否越界
			if(n<0){
				n=imgs.length-1;
			}

		}else{
			// 更新下标，切换状态
			n++;

			// 判断n是否越界
			if(n==imgs.length){
				n=0;
			}
		}
		
		// 遍历将所有图片层级调低
		for(var i=0;i<imgs.length;i++){
			animate(imgs[i],{opacity:0});
			cirs[i].style.background="#3E3E3E";
		}
		// 将当前图片层级调高
		animate(imgs[n],{opacity:1},function(){
			flag=true;
		});
		cirs[n].style.background="#B61B1F";

	}

	// 添加鼠标移入事件使轮播停止
	win.onmouseover=function(){
		clearInterval(t);
		btn.style.display="block";
	}

	// 添加鼠标移出事件使轮播继续
	win.onmouseout=function(){
		t=setInterval(move,2000);
		btn.style.display="none";
	}

	// 点击小圆，显示相应图片--->选项卡
	for(var i=0;i<cirs.length;i++){
		//给每个小圆定义下标属性
		cirs[i].index=i;		
		
		cirs[i].onmouseover=function(){
			for(var i=0;i<imgs.length;i++){
				animate(imgs[i],{opacity:0});
				cirs[i].style.background="#3E3E3E";
				
			}
			animate(imgs[this.index],{opacity:1},function(){
				flag=true;
			});
			cirs[this.index].style.background="#B61B1F";

			// 更新n状态
			n=this.index;
		}
	}

	// 给按钮添加点击事件
	btnR.onclick=function(){
		if(flag){
			flag=false;
			move("r");
		}
	}
	btnL.onclick=function(){
		if(flag){
			flag=false;
			move("l");
		}
	}
});

// 5.节点轮播
$(function(){
	// (一)获取元素
	// 窗口
	var ck=$(".ck")[0];

	// 调用封装的节点轮播函数
	nodeScroll(ck,4);

	// obj--->代表窗口
	// num--->代表每次要移动几张图片的宽度
	function nodeScroll(obj,num){
		// 1.获取动的盒子(里面包着所有的节点)
		var hz=$(".hz")[0];
		
		// 2.获取盒子中所有的节点
		var nodes=$("a",hz);
		
		// 3.获取盒子中包含的节点的个数
		var len=nodes.length;
		
		// 4.获取每个节点的宽度
		var k=parseInt(getStyle(nodes[0],"width"));
		
		// 5.状态初始化--->窗口的宽度(让节点把盒子的宽度撑开，节点个数不同，盒子宽度不同)
		hz.style.width=k*len+"px";

		// 6.左右按钮
		var an=$(".an")[0];
		var anL=$(".anL")[0];
		var anR=$(".anR")[0];
	
		// (二)时间间隔函数
		var t=setInterval(moveL,2500);

		// (三)
		// 1.moveL函数(点击左按钮--->向右动)
		function moveR(){
			for(var i=0;i<num;i++){
				// 把最后一个子节点放到盒子的最前面
				var last=getLast(hz);
				appendBefore(last,hz);
				hz.style.left=-k*num+"px";
				animate(hz,{left:0},300,function(){
					flag=true;
				});
			}
		}

		// 2.moveR函数(点击右按钮--->向左动)
		function moveL(){
			animate(hz,{left:-k*num},300,function(){
				for(var i=0;i<num;i++){
					var first=getFirst(hz);
					hz.appendChild(first);
					hz.style.left=0;
					flag=true;
				}
			});
		}


		// (四)
		// 1.鼠标移入大盒子轮播停止
		obj.onmouseover=function(){
			clearInterval(t);
			an.style.display="block";
		}

		// 2.鼠标移出大盒子轮播继续
		obj.onmouseout=function(){
			t=setInterval(moveL,2500);
			an.style.display="none";
		}

		// (五)
		// 1.定义开关
		var flag=true;
	
		// 2.添加点击左按钮的事件
		anL.onclick=function(){
			if(flag){
				flag=false;
				moveL();
			}
		}
		// 3.添加点击左按钮的事件
		anR.onclick=function(){
			if(flag){
				flag=false;
				moveR();
			}
		}
	}
});

// 6.楼层双下标轮播
$(function(){
	/*四.楼层双下标轮播开始-------------------------------------------------------------------------------*/
	var sxb=$(".slb");
	for(var i=0;i<sxb.length;i++){
		if(i==10){
			continue;
		}
		shuang(sxb[i]);
	}

	function shuang(obj){
		// 1.获取元素
		var pics=$(".pic",obj);
		var yuans=$(".scir",obj);
		var an=$(".sbtn",obj)[0];
		var anL=$(".sbtnL",obj)[0];
		var anR=$(".sbtnR",obj)[0];
		var kuan=parseInt(getStyle(pics[0],"width"));
	
		// 2.状态初始化
		// (1)图片位置
		for(var i=0;i<pics.length;i++){
			if(i==0){
				continue;
			}
			pics[i].style.left=kuan+"px";
		}
		// (2)小点背景颜色
		yuans[0].style.background="#B61B1F";


		// 3.记录下标
		var index=0;		//当前显示的图片
		var next=0;			//接下来会显示的图片

		// 4.时间间隔函数
		var t=setInterval(dongR,2300);

		// 4.鼠标移入窗口按钮出现
		obj.onmouseover=function(){
			clearInterval(t);
			an.style.display="block";
		}

		// 5.鼠标移出窗口按钮消失
		obj.onmouseout=function(){
			t=setInterval(dongR,2300);
			an.style.display="none";
		}

		// 6.move函数
		// (1)点击右按钮执行的函数
		function dongR(){
			// 更新下标
			next++;

			// 判断边界
			if(next==pics.length){
				next=0;
			}
		
			// 动画执行之前先让下一张图片就位
			pics[next].style.left=kuan+"px";
		
			// 小点背景颜色随图片运动而变化
			yuans[index].style.background="#3E3E3E";
			yuans[next].style.background="#B61B1F";
		
			// 动画执行
			animate(pics[index],{left:-kuan});
			animate(pics[next],{left:0},function(){
				sflag=true;
			});

			// 动画执行完后更新下标
			index=next;
		}


		// (2)点击左按钮执行的函数
		function dongL(){
			// 更新下标
			next--;

			// 判断边界	
			if(next<0){
				next=pics.length-1;
			}
		
			// 动画执行之前先让下一张图片就位
			pics[next].style.left=-kuan+"px";
		
			// 小点背景颜色随图片运动而变化
			yuans[index].style.background="#3E3E3E";
			yuans[next].style.background="#B61B1F";
		

			// 动画执行
			animate(pics[index],{left:kuan});
			animate(pics[next],{left:0},function(){
				sflag=true;
			});
	
			// 动画执行完后更新下标
			index=next;
		}

		// 7.定义开关
		var sflag=true;

		// 8.给右按钮添加点击事件
		anR.onclick=function(){
			if(sflag){
				sflag=false;
				dongR();
			}
		}		

		// 9.给左按钮添加点击事件
		anL.onclick=function(){
			if(sflag){
				sflag=false;
				dongL();
			}
		}

		// 10.给小点添加点击事件(选项卡)
		for(var i=0;i<yuans.length;i++){
			yuans[i].index=i;
			yuans[i].onmouseover=function(){
				// (1)当前显示的图片和点击的小点一致时，不执行下面的动画
				if(this.index==index){
					return;		//停止并跳出当前函数，不执行后面的函数体
				}
			
				// (2)动画执行前让小点就位
				// A.当前小点为灰色
				yuans[index].style.background="#3E3E3E";
				// B.点击的小点为红色pic
				yuans[this.index].style.background="#B61B1F";
			
				// (3)分情况判断点击不同方向的小点时，动画执行的方向不同
				if(this.index>index){
					// A.动画执行前让图片就位
					pics[this.index].style.left=kuan+"px";
					// B.动画执行
					animate(pics[index],{left:-kuan});
					animate(pics[this.index],{left:0},function(){
						sflag=true;
					});
				}	
				if(this.index<index){
					// A.动画执行前让图片就位
					pics[this.index].style.left=-kuan+"px";
					// B.动画执行：
					animate(pics[index],{left:kuan});
					animate(pics[this.index],{left:0},function(){
						sflag=true;
					});
				}		
			
			
				// (4)动画执行完后更新下标：
				// this.index--->代表点的那个
				// index--->代表当前显示的
				next=this.index;
				index=this.index;
			}
		}
	}
/*楼层双下标轮播结束-----------------------------------------------------------------------------------------------------------------------*/ 
});

// 7.节点轮播
$(function(){
	// (一)获取元素
	// 窗口
	var ck=$(".window",$(".ttdj")[0])[0];

	// 调用封装的节点轮播函数
	nodeScroll(ck,1);

	// obj--->代表窗口
	// num--->代表每次要移动几张图片的宽度
	function nodeScroll(obj,num){
		// 1.获取动的盒子(里面包着所有的节点)
		var hz=$(".box",$(".ttdj")[0])[0];
		
		// 2.获取盒子中所有的节点
		var nodes=$("li",hz);
		
		// 3.获取盒子中包含的节点的个数
		var len=nodes.length;
		
		// 4.获取每个节点的宽度
		var h=parseInt(getStyle(nodes[0],"height"))+20;
		
		// 5.状态初始化--->窗口的宽度(让节点把盒子的宽度撑开，节点个数不同，盒子宽度不同)
		hz.style.height=h*len+"px";
		
		// 6.时间间隔函数
		var t=setInterval(move,2500);

		// 7.moveR函数(点击右按钮--->向左动)
		function move(){
			animate(hz,{top:-h*num},300,function(){
				for(var i=0;i<num;i++){
					var first=getFirst(hz);
					hz.appendChild(first);
					hz.style.top=35+"px";
				}
			});
		}
	}
});

// 8.鼠标经过向左移(有问题)
$(function(){
	// var tus=$(".tu",$(".ttdj")[0]);
	// for(var i=0;i<tus.length;i++){
	// 	tus[i].index=i;
	// 	tus[i].onmouseover=function(){
	// 		tus[this.index].style.marginLeft=10+"px";
	// 	}
	// }
})

// 9.楼层跳转
$(function(){
	// (一)获取元素
	// 1.浏览器窗口的高度
	var ch=document.documentElement.clientHeight;

	// 2.获取每个楼层
	var floors=$(".floor");

	// 3.获取每个楼层距离最顶端的高度
	// (1)定义一个空数组，用于保存每个楼层距离最顶端的高度
	var floorArr=[];
	// (2)遍历每个楼层
	for(var i=0;i<floors.length;i++){
		floorArr.push(floors[i].offsetTop);
	}

	// 4.获取右导航
	var leftnav=$(".leftnav")[0];

	// 5.获取楼层按钮
	var dump=$("li",leftnav);
	var words=$(".bt");
	var nums=$(".num");
	var hhj=$(".hhj")[0];
	console.log(hhj);

// (二)状态初始化
	leftnav.style.opacity=0;
	hhj.style.opacity=0;

// (三)定义开关
	var lflag=true;
	var bflag=true;

// (四)给window添加鼠标滚轮滑动的事件

	window.onscroll=function(){
		// 1.判断浏览器做兼容
		var obj=document.body.scrollTop?document.body:document.documentElement;
		// 2.实时获取滚动条距离最顶端的位置
		var scrolltop=obj.scrollTop;

		// 鼠标滚动到一定程度，出现搜索框
		if(scrolltop>=1650){
			if(lflag){
				lflag=false;
				animate(leftnav,{opacity:1});
				animate(hhj,{opacity:1});
			}
		}else{
			if(!lflag){
				lflag=true;
				animate(leftnav,{opacity:0});
				animate(hhj,{opacity:0});
			}
		}

		if(!bflag) return;
		// 滚动时让相应楼层的图片变成字
		for(var i=0;i<floors.length;i++){
			if(ch+scrolltop>=floorArr[i]+500){
				for(var j=0;j<words.length;j++){
					words[j].style.display="none";
					nums[j].style.display="block";
				}
				words[i].style.display="block";
				nums[i].style.display="none";
			}
		}
	}

// (五)鼠标经过每个按钮时，图片变成字
	// for(var i=0;i<dump.length;i++){
	// 	dump[i].index=i;
	// 	dump[i].onmouseover=function(){
	// 		for(var j=0;j<words.length;j++){
	// 			words[j].style.display="none";
	// 		}
	// 		words[this.index].style.display="block";
	// 	}
	// 	dump[i].onmouseout=function(){
	// 		for(var j=0;j<words.length;j++){
	// 			words[j].style.display="block";
	// 		}
	// 		words[this.index].style.display="none";
	// 	}
	// }



// (六)遍历按钮添加点击事件
	for(var i=0;i<dump.length;i++){
		dump[i].index=i;
		dump[i].onclick=function(){
			bflag=false;
			for(var j=0;j<words.length;j++){
				words[j].style.display="none";
			}
			words[this.index].style.display="block";
			
			animate(document.body,{scrollTop:floorArr[this.index]},function(){
				bflag=true;
			});
			animate(document.documentElement,{scrollTop:floorArr[this.index]},function(){
				bflag=true;
			});
		}
	}
})


// 10.rightbar
$(function(){
	var rightbar=$(".rightbar")[0];
	var lis=$("li",rightbar);
	var items=$(".item");
	console.log(items.length);

	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onmouseover=function(){
			animate(items[this.index],{right:34},500);
		}
		lis[i].onmouseout=function(){
			animate(items[this.index],{right:-30},500);
		}
	}
})

// 11.楼层选项卡
$(function(){
	var redlines=$(".redline");
	var xuans=$(".xuan");
	var xxks=$(".xxk");

	xuans[0].style.display="block";
	xxks[0].style.display="block";

	for(var i=0;i<xuans.length;i++){
		xuans[i].index=i;
		xuans[this.index].onmouseover=function(){
			for(var j=0;j<xxks.length;j++){
				redlines[j].style.display="none";
				xxks[j].style.display="none";
			}
			redlines[this.index].style.display="block";
			xxks[this.index].style.display="block";
		}
	}
});


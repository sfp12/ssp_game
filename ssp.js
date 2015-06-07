$(document).ready(function(){
	var myObject=(function(){
		//全局变量		
		var g_settimeout_atte='';    //注视点的函数
		var g_settimeout_img='';     //展示图片的函数
		var g_settimeout_interval='';  //试次的间隔
		var g_settimeout_in_interval='';   //一个试次内部的间隔
		var g_settimeout_video='';    //展示声音的函数
		var image_appear='';      //图片出现的时间
		var image_disappear=0;   //刚开始要赋值，否则为undefined，图片消失的时间
		var image_id='';       //图片的id 0为圆形，1为方形
		var enter_interval=1;  //进入间隔时期，0表示未进入间隔，1表示进入间隔
		var key_down_right_only=0;    //按对一次键，停止
		var key_down_only=0;      //每个游戏只有一次按键的机会，0表示未按键，1表示已按键。
		var audio_obj='';     //插入音频的对象
		var in_interval_time=250;  //有信号时，首次的间隔时间
		var sign=0;   //0表示没有信号，1表示有信号。
		var go_time=0;   //每个试次的go反应时间
		var suppress_suc=0;    //抑制成功的次数
		var suppress_fai=0;    //抑制失败的次数
		var no_sign_num=0;     //没有信号的游戏的次数
		var sign_num=0;        //有信号时，游戏的次数
		var sign_flag=-1;       //表示有无信号
		
		var c=0;      //每一阶段已进行的次数
		var c_all=0;      //练习或正式游戏的次数
		var go_all=0;     //go时间的总和
		var tr_array=new Array();    //存储每次实验结果的数组
		var tr='';     //存储每次实验的结果
		var no_sign_key_num=0;    //没有信号，但有按键的数目。算go平均时需要
		var test_num=5;    //测试的次数。
		var first_num=6;    //第一阶段的次数。
		var second_num=6;    //第二阶段的次数。		
		var phase=0;        //0表示第一阶段，1表示第二阶段
		var intro2prac=0;   //指导语到练习阶段。0表示练习阶段，1表示第一阶段，2表示第二阶段
		var sign_key=0;      //有信号时，0表示2000键，1相反。
		var key_any=0;    //0表示任意键   1表示非任意键


		//输出结果
		var ssrt='0';
		var go='0';
		var suppress='0';		
		var max=test_num;   //执行的次数32	

		//需要记录的字段
		var radioset='';
        var buttonset='';
        var numset='';
        var commentset='';
        var type4set='';
        var timeset='';
        var stimidset='';
        var eventtimeset='';
        var eventelapseset='';
        var correctanswerset='';
        var radiolist1set='';
        var radiolist2set='';
        var radiolist3set='';
        var radiolist4set='';
        var radiolist5set='';
        var radiolist6set='';
        var radiolist7set='';
        var radiolist8set='';
        var radiolist9set='';
        var radiolist10set='';
		var commentset='';
		var SsRtset='';

		var key_down=function(event){
			sign_key=1;		
			if((event.keyCode==81||event.keyCode==80)&&enter_interval==0&&key_down_right_only==0&&key_any==1){
			if(image_id==0){             //圆形
				if(event.keyCode==81){
					if(key_down_only==0){        //第一次按键
						if(intro2prac==3){   //81 3 0
							tr.key='Q';
							key_down_right_only=1;						
							if(sign==0){	
								tr.key_result=1;
								image_disappear=new Date();								
							}
							if(sign==0&&intro2prac==-1){
								$('#result p').text('回答正确');
								$("#result").css("display","block");	
							}
						}else{                //不是第二阶段   81 -1 0  实验或第一阶段
							tr.key='Q';
							if(sign==0){	
								tr.key_result=0;								
							}
							if(sign==0&&intro2prac==-1){							
								$('#result p').text('回答错误');
								$("#result").css("display","block");
							}
						}
						$("#image").css("display","none");
						if(sign==0){	
								
								//$("#image").css("display","none");						
								clearTimeout(g_settimeout_img);						
								enter_interval=1;						
								interval();
						}	
						
						key_down_only=1;
					}
					
				}else{                  //按键p  80 3  0
					if(key_down_only==0){
						if(intro2prac==3){   //80 3  0
							tr.key='P';
							if(sign==0){	
								tr.key_result=0;								
							}
							if(sign==0&&intro2prac==-1){
								$('#result p').text('回答错误');
								$("#result").css("display","block");
							}
						}else{                //不是第二阶段   80 -1 0
							tr.key='P';
							key_down_right_only=1;						
							if(sign==0){
							    tr.key_result=1;
							    image_disappear=new Date();
							}
							if(sign==0&&intro2prac==-1){
								$('#result p').text('回答正确');
								$("#result").css("display","block");	
							}
						}
						$("#image").css("display","none");						
						if(sign==0){									
								clearTimeout(g_settimeout_img);						
								enter_interval=1;						
								interval();
						}
						key_down_only=1;
					}					
				}
			}else{                  //image_id=1  方形
				if(event.keyCode==81){
					if(key_down_only==0){
						if(intro2prac==3){  //81 3 1
						tr.key='Q';
						if(sign==0){	
								tr.key_result=0;								
							}
						if(sign==0&&intro2prac==-1){
							$('#result p').text('回答错误');
							$("#result").css("display","block");
						}
					}else{         //81 -1 1       //不是第二阶段
						tr.key='Q';
						key_down_right_only=1;						
						if(sign==0){
							tr.key_result=1;
							image_disappear=new Date();						
						}
						if(sign==0&&intro2prac==-1){
							$('#result p').text('回答正确');
							$("#result").css("display","block");	
						}
					}
					$("#image").css("display","none");
						if(sign==0){
								
								//$("#image").css("display","none");						
								clearTimeout(g_settimeout_img);						
								enter_interval=1;						
								interval();
						}
						key_down_only=1;
					}					
				}else{                    //按键p
					if(key_down_only==0){
						if(intro2prac==3){   //80 3 1
							tr.key='P';
							key_down_right_only=1;						
							if(sign==0){
								tr.key_result=1;
								image_disappear=new Date();
							}
							if(sign==0&&intro2prac==-1){
								$('#result p').text('回答正确');
								$("#result").css("display","block");	
							}
						}else{     //80 -1 1           //不是第二阶段
							tr.key='P';     
							if(sign==0){	
								tr.key_result=0;								
							}
								if(sign==0&&intro2prac==-1){
									$('#result p').text('回答错误');
									$("#result").css("display","block");
								}
						}
						$("#image").css("display","none");
						if(sign==0){
								
								//$("#image").css("display","none");
								clearTimeout(g_settimeout_img);						
								enter_interval=1;						
								interval();
						}
						key_down_only=1;
					}			
				}
			}						
			}		
			
		};


		//游戏开始
		var start=function(){			
			$(document).keyup(function(){    //开始按钮的点击事件	
				if(key_any==0){
					if(intro2prac==0){            //实验阶段
					intro2prac=-1;			
					$('#prac_over').css('display','none');
					$('body').css('background-color','black');
					$('#introduction').css('display','none');
					$('#container').css('display','block');
					$(document).keyup(key_down);
					sign_flag=signArray(test_num);
					setTimeout_for();				
				}
				if(intro2prac==1){            //第一阶段
					intro2prac=4;             //0 1 2 ;3 4 5
					$('#prac_over').css('display','none');								
					$('#container').css('display','block');
					sign_flag=signArray(first_num);
					setTimeout_for();
				}
				if(intro2prac==2){           //第二阶段
					intro2prac=3;
					c=0;					
					$("#main").css("display","block");
					$("#pause").css("display","none");
					sign_flag=signArray(second_num);
					setTimeout_for();
				}
				}
									
			});					
		};	

		var signArray=function(max){
			var result=new Array();
			for(var i=0;i<max;i++){
				result[i]=i;
			}
			result.sort(function(){				
				return Math.random()>.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
			});
			return result;
		};
		
		var createAudio = function(){	
			var result='';
			if(navigator.userAgent.indexOf("Chrome") > -1){ 
				//如果是Chrome： 
				result='<audio src="video/tone.wav" type="audio/mp3" autoplay=”autoplay” hidden="true"></audio>'; 
				}else if(navigator.userAgent.indexOf("Firefox")!=-1){ 
				//如果是Firefox： 
				result='<embed src="video/tone.wav" type="audio/mp3" hidden="true" loop="false" mastersound></embed>'; 
				}else if(navigator.appName.indexOf("Microsoft Internet Explorer")!=-1 && document.all){ 
				//如果是IE(6,7,8): 
				result='<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95"><param name="AutoStart" value="1" /><param name="Src" value="video/tone.wav" /></object>'; 
				}else if(navigator.appName.indexOf("Opera")!=-1){ 
				//如果是Oprea： 
				result='<embed src="video/tone.wav" type="audio/mpeg" loop="false"></embed>';
				}else{ 
				result='<embed src="video/tone.wav" type="audio/mp3" hidden="true" loop="false" mastersound></embed>'; 
				} 
			return result;
		}	

		//让settimeout进行循环，无停止信号
		var setTimeout_for=function(){
			key_any=1;    //在这里修改			
			tr={
				'id':'',
				'shape':'',
				'sign':'',
				'key':'0',
				'gotime':'',
				'key_result':'0',
				'inter':'null',
				'sup':'',
				'correct_key':'0',
			};			
			tr.id=c_all;			
			go_time=0;			
			var random_1=sign_flag[c];      //
			c++;
			if(random_1<max*.75){           //45  max*.75
				sign=0;
				no_sign_num++;
				tr.sign='no sign';				
			}else{
				sign=1;
				sign_num++;
				tr.sign='sign';
				tr.inter=in_interval_time;				
			}
			$('#foot').html('');
			g_settimeout_atte=setTimeout(function(){
					enter_interval=0;
					var random=ran(2);  //ran(2)
					image_id=random;
					if(random==1){
						$("#image").attr("src","image/rect.png")
						tr.shape='s';
						if((intro2prac==4||intro2prac==-1)&&sign==0){
							tr.correct_key='Q';
						}
						if((intro2prac==3)&&sign==0){
							tr.correct_key='P';
						}
					}else{
						$("#image").attr("src","image/circle.png")	
						tr.shape='c';
						if((intro2prac==4||intro2prac==-1)&&sign==0){
							tr.correct_key='P';
						}
						if((intro2prac==3)&&sign==0){
							tr.correct_key='Q';
						}
					}			
					image_appear=new Date();
					if(sign==1){  //如果有信号的话
						//console.log("in_interval_time="+in_interval_time);
						g_settimeout_in_interval=setTimeout(function(){   //试次内部的间隔							
							$('#foot').html(createAudio());	
													
						},in_interval_time);   //也不确定
					}
					
					g_settimeout_img=setTimeout(function(){	
						if(sign==1){
							if(key_down_only==0){
								//抑制成功
								if(in_interval_time>0){
									in_interval_time+=50;
								}	
								suppress_suc++;	
								tr.sup='yes';					
							}else{
								//已有按键
								in_interval_time-=50;
								suppress_fai++;
								tr.sup='no';
							}
						}
						if(sign==1&&sign_key==0){
							tr.key_result=1;
						}
						if(sign==1&&sign_key==1){
							tr.key_result=0;
						}
						if(sign==0&&key_down_right_only==0&&intro2prac==-1){
							$('#result p').text('回答错误');
							$("#result").css("display","block");
						}
						
						if(sign==1&&sign_key==0&&intro2prac==-1){
							$('#result p').text('回答正确');
							$("#result").css("display","block");
						}
						if(sign==1&&sign_key==1&&intro2prac==-1){
							$('#result p').text('回答错误');
							$("#result").css("display","block");
						}						
						$("#image").css("display","none");
						enter_interval=1;						
						interval();																	
					},2000);
				},250);
		};

		var endOperate=function(){
			$('body').css('background-color','white');
			$('#container').css('display','none');
			$('#record').css('display','block');
			var result='';
			go=go_all/no_sign_key_num;
			ssrt=go-in_interval_time;
			suppress=suppress_suc/sign_num;

			if(SsRtset.length!=0){
				SsRtset=SsRtset.substring(0,SsRtset.length-1);
				var t_SsRtset=SsRtset.split(';');
				for(var i=0;i<t_SsRtset.length;i++){
					t_SsRtset[i]=Math.floor(go-t_SsRtset[i]);
				}
				SsRtset=t_SsRtset.join(';');
			}
			

			numset=numset.substring(0,numset.length-1);    //最后一个分号不要。
			timeset=timeset.substring(0,timeset.length-1);         //最后一个分号不要。
			stimidset=stimidset.substring(0,stimidset.length-1);
			type4set=type4set.substring(0,type4set.length-1);
			correctanswerset=correctanswerset.substring(0,correctanswerset.length-1);
			buttonset=buttonset.substring(0,buttonset.length-1);
			radioset=radioset.substring(0,radioset.length-1);
			eventtimeset=eventtimeset.substring(0,eventtimeset.length-1);
			eventelapseset=eventelapseset.substring(0,eventelapseset.length-1);
			radiolist1set=radiolist1set.substring(0,radiolist1set.length-1);
			radiolist2set=radiolist2set.substring(0,radiolist2set.length-1);
			radiolist3set=radiolist3set.substring(0,radiolist3set.length-1);
			radiolist4set=radiolist4set.substring(0,radiolist4set.length-1);
			radiolist5set=radiolist5set.substring(0,radiolist5set.length-1);
			radiolist6set=radiolist6set.substring(0,radiolist6set.length-1);
			radiolist7set=radiolist7set.substring(0,radiolist7set.length-1);
			radiolist8set=radiolist8set.substring(0,radiolist8set.length-1);
			radiolist9set=radiolist9set.substring(0,radiolist9set.length-1);
			radiolist10set=radiolist10set.substring(0,radiolist10set.length-1);
			commentset=commentset.substring(0,commentset.length-1);
			
			result+='numset:'+numset+'<br>';
			result+='timeset:'+timeset+'<br>';
			result+='stimidset:'+stimidset+'<br>';
			result+='type4set:'+type4set+'<br>';
			result+='correctanswerset:'+correctanswerset+'<br>';
			result+='buttonset:'+buttonset+'<br>';			
			result+='radioset:'+radioset+'<br>';
			result+='eventtimeset:'+eventtimeset+'<br>';
			result+='eventelapseset:'+eventelapseset+'<br>';
			result+='radiolist1set:'+radiolist1set+'<br>';
			result+='commentset:'+commentset+'<br>';
			result+='SsRtset:'+SsRtset+'<br>';	
			
			$('#record').html(result);
		}

		//随机数函数
		var ran=function(max){
			var result;
			result=Math.floor(Math.random()*max);
			return result;
		};

		
		//间隔函数
		var interval=function(){
		$("#image").attr("src","image/attention.png");
			g_settimeout_interval=setTimeout(function(){																		
				interval_operate();
				
				if(c<max){					
					setTimeout_for();					
				}else{					
					if(max==test_num){    //如果是测试结束
						if(suppress_suc/sign_num>0.2){  //正式开始
							//要加入提示							
							$('#container').css('display','none');														

							 max=first_num;							 
							 g_settimeout_atte='';
							 g_settimeout_img='';
							 g_settimeout_interval='';
							 g_settimeout_in_interval='';
							 g_settimeout_video='';
							 image_appear='';
							 image_disappear=0;   //刚开始要赋值，否则为undefined
							 image_id='';
							 enter_interval=1;  //进入间隔时期
							 key_down_right_only=0;    //按对一次键，停止
							 audio_obj='';
							 in_interval_time=250;  //有信号时，首次的间隔时间
							 sign=0;   //0表示没有信号，1表示有信号。
							 go_time=0;
							 suppress_suc=0;
							 suppress_fai=0;
							 no_sign_num=0;
							 sign_num=0;							
							 c=0;
							 c_all=0;
							 go_all=0;
							 tr_array=new Array();    //存储每次实验结果的数组
							 tr='';     //存储每次实验的结果
							 no_sign_key_num=0;    //没有信号，但有按键的数目。算go平均时需要								
							 phase=0;        //0表示第一阶段，1表示第二阶段
							 key_down_only=0;
							 
							radioset='';
							 buttonset='';
							 numset='';
							 commentset='';
							 type4set='';
							 timeset='';
							 stimidset='';
							 eventtimeset='';
							 eventelapseset='';
							correctanswerset='';
							radiolist1set='';
							radiolist2set='';
							radiolist3set='';
							radiolist4set='';
							radiolist5set='';
							radiolist6set='';
							radiolist7set='';
							radiolist8set='';
							radiolist9set='';
							radiolist10set='';
							commentset='';
							SsRtset='';

							//输出结果
							 ssrt='0';
							 go='0';
							 suppress='0';
							 intro2prac=1;
							 key_any=0;
							 $('#prac_over').text('练习结束，请按任意键进入实验');
							 $('#prac_over').css('display','block');							 
							 							 
						}else{    //练习阶段抑制成功率不够，还需继续练习
							//继续练习
							key_any=0;
							$('#container').css('display','none');
							$('#prac_over').text('继续练习，按任意键继续');
							$('#prac_over').css('display','block');							
							suppress_suc=0;
							sign_num=0;
								
							intro2prac=0;
								
							c=0;
							c_all=0;
														
						}
					}else{  //某个阶段结束
						if(phase==0){
							//第一阶段结束
							//休息10s		
							key_any=0;	
							$("#main").css("display","none");
							$("#pause").css("display","block");
							setTimeout(function(){								
								$('#pause').text('按任意键开始练习');								
								c=0;
								intro2prac=2;								
							},10000);							
							phase=1;
						}else{
							//第二阶段结束
							intro2prac=-1;
							endOperate();
						}
					}					
				}												
			},2000);
		};
		
		//间隔操作函数
		var interval_operate=function(){		
			if(sign==0&&(image_disappear!=0)){
				go_time=image_disappear-image_appear;
				no_sign_key_num++;
				tr.gotime=go_time;
				go_all+=go_time;				
			}
			tr_array[c_all]=tr;
			c_all++;										
			image_disappear=0;   //每个试次都清空
			image_id=-1;	
			key_down_right_only=0;
			enter_interval=1;
			sign_key=0;
			key_down_only=0;
			
			//记录结果
			numset+=tr.key_result+';';    //最后一个分号不要。
			timeset+=tr.gotime+';';         //最后一个分号不要。
			stimidset+=c_all+';';
			type4set+=(sign+1)+';';
			correctanswerset+=tr.correct_key+';';
			buttonset+=tr.key+';';
			radioset+=';'; 
			eventtimeset+=';';
			eventelapseset+=';';
			radiolist1set+=';';
			radiolist2set+=';';
			radiolist3set+=';';
			radiolist4set+=';';
			radiolist5set+=';';
			radiolist6set+=';';
			radiolist7set+=';';
			radiolist8set+=';';
			radiolist9set+=';';
			radiolist10set+=';';
			commentset+='no:'+c_all+'.stopsignalset:'+sign+'.signalset:'+tr.shape+'.stopsignallatencyset:'+tr.inter+';';
			if(sign==1){
				//有信号
				SsRtset+=tr.inter+';';
			}
			$("#result").css("display","none");				
			$("#image").css("display","block");										
		};		

		return {
			start:start,
		};
	})();	

	myObject.start();
});

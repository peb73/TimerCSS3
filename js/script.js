var i = 0;

var timer = new Timer(Store.getTimer());

var renderValue = function(array){
	$('.value .days').html(array[0]);
	$('.value .hours').html(array[1]);
	$('.value .min').html(array[2]);
	$('.value .sec').html(array[3]);
};

timer.onUpdate = function(){
	Store.setTimer(this.getValue());
	var array = Util.toDateArray(this.getValue()/1000);
	renderValue(array);
};


var generateKeyFrame = function(value){
	if(value==null)
		value = 0;

	i++;

	var keyFrameChrome = "";
	keyFrameChrome += "@-webkit-keyframes loading_"+i+" {";
	keyFrameChrome +=	"0% {-webkit-transform: rotate("+value+"deg);}";
	keyFrameChrome += "25%{-webkit-transform: rotate("+(+value+90)+"deg);}";
	keyFrameChrome += "50%{-webkit-transform: rotate("+(+value+180)+"deg);}"; 
	keyFrameChrome +=	"75%{-webkit-transform: rotate("+(+value+270)+"deg);}"; 
	keyFrameChrome +=	"100% {-webkit-transform: rotate("+(+value+360)+"deg);};"; 
	keyFrameChrome += "}";
	
	var keyFrame = "";
	keyFrame += "@keyframes loading_"+i+" {";
	keyFrame +=	"0% {transform: rotate("+value+"deg);}";
	keyFrame += "25%{transform: rotate("+(+value+90)+"deg);}";
	keyFrame += "50%{transform: rotate("+(+value+180)+"deg);}"; 
	keyFrame +=	"75%{transform: rotate("+(+value+270)+"deg);}"; 
	keyFrame +=	"100% {transform: rotate("+(+value+360)+"deg);};"; 
	keyFrame += "}";
	
	return {
		name : 'loading_'+i,
		keyFrame: keyFrame,
		keyFrameChrome: keyFrameChrome
	};
}

var action = function(){
	if(timer.isStarted()){
		timer.stop();
		$('.timer').removeClass('active');
	}else{
		timer.start();
		$('.timer').addClass('active');
	}
};

var undo = function(){
	action();
	timer.value = 0;
	Store.setTimer(timer.value);
	var array = Util.toDateArray(timer.value/1000);
	renderValue(array);

	var keyFrame = generateKeyFrame();
	try{
		document.styleSheets[2].insertRule(keyFrame.keyFrame,0);
	}catch(e){
		document.styleSheets[2].insertRule(keyFrame.keyFrameChrome,0);
	}
	
	$('.needle').css('-webkit-animation-name',keyFrame.name);
	$('.needle').css('animation-name',keyFrame.name);
	action();
	
};

var remove = function(){
	//nothing yet
};

var initialize = function(){
	var array = Util.toDateArray(timer.value/1000);

	var keyFrame1 = generateKeyFrame(360/12*array[1]);
	var keyFrame2 = generateKeyFrame(360/60*array[2]);
	var keyFrame3 = generateKeyFrame(360/60*array[3]);

	try{
		document.styleSheets[2].insertRule(keyFrame1.keyFrame,0);
		document.styleSheets[2].insertRule(keyFrame2.keyFrame,0);
		document.styleSheets[2].insertRule(keyFrame3.keyFrame,0);
	}catch(e){
		document.styleSheets[2].insertRule(keyFrame1.keyFrameChrome,0);
		document.styleSheets[2].insertRule(keyFrame2.keyFrameChrome,0);
		document.styleSheets[2].insertRule(keyFrame3.keyFrameChrome,0);
	}

	$('.needle-1').css('-webkit-animation-name',keyFrame1.name);
	$('.needle-1').css('animation-name',keyFrame1.name);
	$('.needle-2').css('-webkit-animation-name',keyFrame2.name);
	$('.needle-2').css('animation-name',keyFrame2.name);
	$('.needle-3').css('-webkit-animation-name',keyFrame3.name);
	$('.needle-3').css('animation-name',keyFrame3.name);

}

$(function() {
	$('.menu .button.undo').on('click', function(){
		undo();
	});

	$('.menu .button.play').on('click', function(){
		action();
	});

	$('.menu .button.pause').on('click', function(){
		action();
	});

	$('.menu .button.remove').on('click', function(){
		remove();
	});

	timer.onUpdate();

	initialize();
});




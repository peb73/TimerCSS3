var Store = function(){
};

Store.setTimer = function(value){
	localStorage.TimerCSS3 = value;
};

Store.getTimer = function(){
	if(!localStorage.TimerCSS3){
		return 0;
	}
	return +localStorage.TimerCSS3;
};
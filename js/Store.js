var Store = function(){
};

Store.setTimer = function(value){
	localStorage.timer = value;
};

Store.getTimer = function(){
	if(!localStorage.timer){
		return 0;
	}
	return +localStorage.timer;
};
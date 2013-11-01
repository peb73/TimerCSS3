function Timer(value){
	this.value = value;
	this.interval = null;
};

Timer.prototype.getValue = function(){
	return this.value;
};

Timer.prototype.onUpdate = function(){};

Timer.prototype.isStarted = function(){
	if(this.interval)
		return true;
	return false;
};

Timer.prototype.start = function(){
	
	var that = this;

	//if interval yet started
	if(this.interval != null)
		return;

	//start
	this.interval = setInterval(
		function(){
			that.value += 1000;
			that.onUpdate();
		},
		1000
	);
}

Timer.prototype.stop = function(){
	//not started
	if(this.interval == null)
		return;

	//stop
	this.interval = clearInterval(this.interval);
}
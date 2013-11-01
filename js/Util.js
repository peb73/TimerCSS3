var Util = function(){
};

Util.toDateString = function(value){

/*
	var year = value/(365*24*60*60);
	year<1 ? year = 0 : year = parseInt(year);
	value = value-year*365*24*60*60;
*/
	var day = parseInt(value/(24*60*60));
	day<1 ? day = 0 : day = parseInt(day);
	value = value-day*24*60*60;

	var hour = parseInt(value/(60*60));
	hour<1 ? hour = 0 : hour = parseInt(hour);
	value = value-hour*60*60;

	var min = parseInt(value/60);
	min<1 ? min = 0 : min = parseInt(min);
	value = value-min*60;

	var sec = value;

	return /*year+'y '+*/day+'d '+hour+'h '+min+'m '+sec+'s';
};

Util.toDateArray = function(value){

/*
	var year = value/(365*24*60*60);
	year<1 ? year = 0 : year = parseInt(year);
	value = value-year*365*24*60*60;
*/
	var day = parseInt(value/(24*60*60));
	day<1 ? day = 0 : day = parseInt(day);
	value = value-day*24*60*60;

	var hour = parseInt(value/(60*60));
	hour<1 ? hour = 0 : hour = parseInt(hour);
	value = value-hour*60*60;

	var min = parseInt(value/60);
	min<1 ? min = 0 : min = parseInt(min);
	value = value-min*60;

	var sec = parseInt(value);

	return [/*year,*/day,hour,min,sec];
};
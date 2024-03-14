export const getCurrentDate=()=>{
 
	var date = new Date().getDate();
	if (date < 10) {
		date = '0' + date;
	}
	var month = new Date().getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}
	var year = new Date().getFullYear();

	
	return year + '-' + month + '-' + date;
}

function rand_num_plate()
{
    return rand_num_str(6);
}

function rand_num_str(num)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < num; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text.toUpperCase();
}

function rand_timestamp()
{
	return new Date();
}

function rand_booked_time()
{
    return rand_int_(12)+":"+rand_int_(59)+"PM-"+rand_int_(12)+":"+rand_int_(59)
    +"PM "+rand_int_(12)+"-"+rand_int_(29)+"-2015";
}

function rand_int_(n) {
	var num = Math.floor(Math.random() * n);
	return num < 10 ? "0"+num:num;
}

function rand_int(n) {
	return Math.floor(Math.random() * n);
}

function rand_name() {
	var name = ["Doris","Jass","Jhon","Jim","Alice","Peter"];
	return name[rand_int(name.length)].toUpperCase();
}

function rand_Paytype() {
	var name = ["PayPal","Debit cards","Cheques","Online Bank","Paymate"," eWAY"];
	return name[rand_int(name.length)].toUpperCase();
}

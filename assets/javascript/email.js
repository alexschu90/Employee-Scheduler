var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://pozzad-email-validator.p.rapidapi.com/emailvalidator/validateEmail/john%2540gmail.com",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "pozzad-email-validator.p.rapidapi.com",
		"x-rapidapi-key": "c388bad2ddmshe28e07e5b16dc28p1a0c5djsnafe9a65d329c"
	}
}

$.ajax(settings).done(function (response) {
    console.log(response);
    var res = response;
    console.log(res);
});
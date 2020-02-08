// Branden has firebase control
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

var firebaseConfig = {
	apiKey: firebase.apiKey,
	authDomain: 'employee-scheduler-402b9.firebaseapp.com',
	databaseURL: 'https://employee-scheduler-402b9.firebaseio.com',
	projectId: 'employee-scheduler-402b9',
	storageBucket: 'employee-scheduler-402b9.appspot.com',
	messagingSenderId: '336373202513',
	appId: '1:336373202513:web:d24ebf56b4a074ffd74270'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


$('#submit-employee').on('click', function (event) {
	// Prevent the default form submit behavior
	event.preventDefault();
	// Grabs user input
	var employeeName = $('#employee-name').val().trim();
	var role = $('#role').val().trim();
	var phone = $('#phone-number-form').val().trim();
	var email = $('#email-form').val().trim();
	var emWarnStatus = false
	var phWarnStatus = false


	// This function checks the phone field and if it's a valid phone-number, returns true. 
	function validPhoneNumber(phone) {
		var phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		console.log("local variable phone = " + phone)
		console.log("is this a valid number? " + phoneNumberPattern.test(phone))
		return phoneNumberPattern.test(phone);
	};
	// This function checks the eMail field and if it's a valid eMail address, returns true. 
	function validEmailAdress(email) {
		$.ajax(settings).done(function (response) {
			console.log(response);
			var res = response.isValid;
			console.log(res);
		});

		var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		console.log("local variable email = " + email)
		console.log("is this a valid email? " + emailPattern.test(email))
		return emailPattern.test(email);

	};
	// this adds the warning text if our phonenumber is invalid 
	if (validPhoneNumber(phone) === false) {
		if (phWarnStatus === false) {
			badPhWarn = $("<p id = 'ph-warn' style='color:#ff0000'>Please enter a valid phone-number!</p>")
			$("#ph-input").append(badPhWarn)
			phWarnStatus = true
		}
	} else {
		$("#ph-warn").empty()
		phWarnStatus = false
	}
	// this adds the warning text if our email is invalid 
	if (validEmailAdress(email) === false) {
		if (emWarnStatus === false) {
		badEmWarn = $("<p id = 'em-warn' style='color:#ff0000'>Please enter a valid email address!</p>")
		$("#em-input").append(badEmWarn)
		emWarnStatus = true
		}
	} else {
		$("#em-warn").empty()
		emWarnStatus = false
	}
	// if we have both a valid phone number AND a valid email address, post fields to firebase as one object and clear the fields 
	if (validPhoneNumber(phone) === true && validEmailAdress(email) === true) {

		var newEmployee = {
			employeeName: employeeName,
			role: role,
			phone: phone,
			email: email
		}

		database.ref().push(newEmployee);

		$('#employee-name').val('');
		$('#role').val('');
		$('#phone-number-form').val('');
		$('#email-form').val('');
	}



});
database.ref().on('child_added', function (childSnapshot, prevChildKey) {

	// Store everything into a variable.
	var eName = childSnapshot.val().employeeName;
	var eRole = childSnapshot.val().role;
	var ePhone = childSnapshot.val().phone;
	var eEmail = childSnapshot.val().email;

	$('#employee-table > tbody').append(
		$('<tr>').append($('<td>').text(eName), $('<td>').text(eRole), $('<td>').text(ePhone), $('<td>').text(eEmail))
	);
})
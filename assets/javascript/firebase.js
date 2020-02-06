// Branden has firebase control
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


	// This function checks the phone field and if it's a valid phone-number, returns true 
	function validPhoneNumber(phone) {
		var phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		console.log("local variable phone = " + phone)
		console.log("is this a valid number? " + phoneNumberPattern.test(phone))
		return phoneNumberPattern.test(phone);
	};
	if (validPhoneNumber(phone) === true) {
		var newEmployee = {
			employeeName: employeeName,
			role: role,
			phone: phone,
			email: email
		};
		console.log(phone + " is a valid phone number")


		database.ref().push(newEmployee);

		$('#employee-name').val('');
		$('#role').val('');
		$('#phone-number-form').val('');
		$('#email-form').val('');


	} else { alert(phone + " is not a valid phone-number!") }
});
	database.ref().on('child_added', function (childSnapshot, prevChildKey) {
		console.log(childSnapshot.val());

		// Store everything into a variable.
		var eName = childSnapshot.val().employeeName;
		var eRole = childSnapshot.val().role;
		var ePhone = childSnapshot.val().phone;
		var eEmail = childSnapshot.val().email;

		$('#employee-table > tbody').append(
			$('<tr>').append($('<td>').text(eName), $('<td>').text(eRole), $('<td>').text(ePhone), $('<td>').text(eEmail))
		);
	})

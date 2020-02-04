// Branden has firebase control
var firebaseConfig = {
	apiKey            : firebase.apiKey,
	authDomain        : 'employee-scheduler-402b9.firebaseapp.com',
	databaseURL       : 'https://employee-scheduler-402b9.firebaseio.com',
	projectId         : 'employee-scheduler-402b9',
	storageBucket     : 'employee-scheduler-402b9.appspot.com',
	messagingSenderId : '336373202513',
	appId             : '1:336373202513:web:d24ebf56b4a074ffd74270'
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

	var newEmployee = {
		employeeName : employeeName,
		role         : role,
		phone        : phone,
		email        : email
	};

	database.ref().push(newEmployee);

	$('#employee-name').val('');
	$('#role').val('');
	$('#phone-number-form').val('');
	$('#email-form').val('');
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
});
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

$('#add-employee').on('click', function (event) {
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

// var employee = {
// 	name        : 'Branden Patten',
// 	phoneNumber : '(239)-699-2087',
// 	email       : 'patte.branden@gmail.com',
// 	age         : 26,
// 	roles       : [ 'baker', 'bakery clerk', 'cake decorator', 'cashier' ],
// 	account     : {
// 		username : 'username',
// 		password : 'badplaintextpassword'
// 	}
// };

// function addUser () {
// 	var timestamp = firebase.database.ServerValue.TIMESTAMP;
// 	database.ref().child('employee').push({
// 		fullName    : employee.name,
// 		email       : employee.email,
// 		age         : employee.age,
// 		phoneNumber : employee.phoneNumber,
// 		roles       : employee.roles,
// 		username    : employee.account.username,
// 		password    : employee.account.password,
// 		dateAdded   : timestamp
// 	});

// 	// database.ref("/login").push({
// 	//   dateAdded: timestamp
// 	// })
// }
// addUser();

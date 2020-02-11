// Nav bar scripts
var themes = [
	'cerulean',
	'cosmo',
	'cyborg',
	'darkly',
	'flatly',
	'journal',
	'litera',
	'lumen',
	'lux',
	'materia',
	'minty',
	'pulse',
	'sandstone',
	'simplex',
	'sketchy',
	'slate',
	'solar',
	'spacelab',
	'superhero',
	'united',
	'yeti'
];

var globalEmail;

$(document).ready(function () {

	// $("#current-employees").DataTable({
	// 	"scrollY": "200px",
	// 	"scrollCollapse": true,
	// 	});
	// 	$('.dataTables_length').addClass('bs-select');
	// 	});

	$('[data-class]').click(function () {
		updateNavbarClass($(this).attr('data-class'));
	});

	updateNavbarClass('fixed-left');

	themes.forEach(function (theme) {
		$('#theme_select').append(
			$('<option>', {
				value: theme,
				text: theme.charAt(0).toUpperCase() + theme.slice(1),
				selected: theme === 'materia'
			})
		);
	});
	$('#add-employee-form').hide();
	// $('#current-employees').hide()
});

// shows the add employee form when clicked in the navbar 
$('#show-form').on('click', function () {
	$('#add-employee-form').show();
});
// $('.nav-item').on('click', function () {
// 	$(".showhide").hide()
// 	item = $(this).attr('data-show-this')
// 	console.log(item)
// 	$(item).show()
// });

// $('.nav-item').on('click', function () {
// 	// $('#add-employee-form').hide();
// 	// $('#calandar').hide()
// 	// $('#current-employees').hide()
// 	$(".showhide").hide()
// 	item = $(this).attr('data-show-this')
// 	console.log(item)
// 	$(item).show()

// });

$('#hide-employee-form').on('click', function () {
	$('#add-employee-form').hide();
});

function updateNavbarClass(className) {
	$('nav')
		.removeClass(function (index, css) {
			return (css.match(/(^|\s)fixed-\S+/g) || []).join(' ');
		})
		.addClass(className);

	$('[data-class]').removeClass('active').parent('li').removeClass('active');
	$('[data-class="' + className + '"]').addClass('active').parent('li').addClass('active');

	fixBodyMargin(className);
}
// sets the navbar to the left or right 
function fixBodyMargin(className) {
	if (/fixed-(left|right)/.test(className)) {
		$('body').removeAttr('style');
		if (className === 'fixed-right') {
			$('body').css('marginLeft', 0);
		} else {
			$('body').css('marginRight', 0);
		}
	} else {
		$('body').css({
			'margin-right': 0,
			'margin-left': 0,
			'padding-top': '90px'
		});
	}
}

function selectTheme(theme) {
	$('#theme_link').attr(
		'href',
		'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.3.1/' + theme + '/bootstrap.min.css'
	);
}


$("#list-booking").on("click", function () {

	var proxy = 'https://cors-anywhere.herokuapp.com/';
	var date = $("#date").val().trim();
	$.ajax({
		url: proxy + "https://www.supersaas.com/api/range/465392.json?from=" + date + "&api_key=ZHiiZGa0u1W3uNPsm2UWCw",
		type: 'GET',
		contentType: "application/json",
		headers: {
			'Access-Control-Allow-Origin': '*',
			'user%name': "employee-scheduler",
		},
		error: function (xhr, textStatus, error) {
			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	}).then(function (response) {
		console.log(response);
		for (let i = 0; i < response.slots.length; i++) {
			let slotDiv = $("<div class= 'card top'>");

			let title = response.slots[i].title;
			let start = response.slots[i].start;
			let finish = response.slots[i].finish;

			let titleOne = $("<h5 class='card-title'>").text(title);
			let startOne = $("<p class='card-text'>").text("Start time: " + start);
			let finishOne = $("<p class='card-text'>").text("Finish time: " + finish);

			slotDiv.append(titleOne);
			slotDiv.append(startOne);
			slotDiv.append(finishOne);

			let check = $('#list-view').append(slotDiv);
			$("#result-box").append(check);
		}
	});

})


$("#submit-employee").on("click", function () {

	var email = $("#email-form").val().trim();
	globalEmail = email;

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://pozzad-email-validator.p.rapidapi.com/emailvalidator/validateEmail/" + globalEmail,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "pozzad-email-validator.p.rapidapi.com",
			"x-rapidapi-key": "c388bad2ddmshe28e07e5b16dc28p1a0c5djsnafe9a65d329c"
		}
	}

	$.ajax(settings).done(function (response) {
		console.log(response);
		var res = response.isValid;
		console.log(res);

		if (res) {
			$("#em-input").append("<p>&#10004");
		} else {
			$("#em-input").append(" X");
		}
	});
})


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

$(document).ready(function () {
	$('[data-class]').click(function () {
		updateNavbarClass($(this).attr('data-class'));
	});

	updateNavbarClass('fixed-left');

	themes.forEach(function (theme) {
		$('#theme_select').append(
			$('<option>', {
				value    : theme,
				text     : theme.charAt(0).toUpperCase() + theme.slice(1),
				selected : theme === 'materia'
			})
		);
	});
	$('#add-employee-form').hide();
	$('#current-employees').hide()
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

$('#hide-employee-form').on('click', function () {
	$('#add-employee-form').hide();
});

function updateNavbarClass (className) {
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
function fixBodyMargin (className) {
	if (/fixed-(left|right)/.test(className)) {
		$('body').removeAttr('style');
		if (className === 'fixed-right') {
			$('body').css('marginLeft', 0);
		} else {
			$('body').css('marginRight', 0);
		}
	} else {
		$('body').css({
			'margin-right' : 0,
			'margin-left'  : 0,
			'padding-top'  : '90px'
		});
	}
}

function selectTheme (theme) {
	$('#theme_link').attr(
		'href',
		'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.3.1/' + theme + '/bootstrap.min.css'
	);
}

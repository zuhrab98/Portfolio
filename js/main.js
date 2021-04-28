$(document).ready(function () {

    // Фиксируем меню при скролле вниз 

    // const headerFix = document.querySelector('.header-fix');
    // window.onscroll = function showHeader () {
    //     if (window.pageYOffset > 200) {
    //         headerFix.classList.add('header-fix--active');
    //     }
    //     else {
    //         headerFix.classList.remove('header-fix--active');
    //     }
    // }


    // Мобильная навигация
    
    const navIcon = document.querySelector('.nav-icon');
    const nav = document.querySelector('.mobil-menu');
    const overlay = document.querySelector('#overlay');
    const headerTop = document.querySelector('.header-top__container')
    
    navIcon.addEventListener('click', function () {
        this.classList.toggle('nav-icon--active');
        // headerTop.classList.toggle('header-top--active');
        nav.classList.toggle('mobil-menu--active');
        overlay.classList.toggle('active')
    });
    
    // Находим ссылки внутри мобильной навигации
    const navLinks = document.querySelectorAll('.mobil-menu a');
    
    // Обходим ссылки методом forEach
    navLinks.forEach(function (item) {
        // Для каждой ссылки добавляем прослушку по событию "Клик"
        item.addEventListener('click', function () {
            overlay.classList.remove('active');
            // headerTop.classList.toggle('header-top--active'); 
            navIcon.classList.remove('nav-icon--active'); // Убираем активный класс у иконки моб. навигации
            nav.classList.remove('mobil-menu--active'); // Убираем активный класс у блока моб. навигации
        })
    })


    // ПАРАЛЛАКС ДВИЖЕНИЯ ЗА МЫШКОЙ
    let prxScene = document.querySelector('.contacts')
    let prxItem = document.querySelectorAll('.move-quot');
    prxScene.addEventListener('mousemove', function (e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        for (let item of prxItem) {
            item.style.transform = 'translate(-' + x * 100 + 'px, -' + y * 100 + 'px)';
        }

    });

    // Mixitab
    //-фильтрация проектов

    // let containerEl = document.querySelector('#portfolio-projects');

    // let mixer = mixitup(containerEl, {
    //     classNames: {
    //         block: ""
    //     }
    // });
    
    // const filterToggles = document.querySelectorAll('.portfolio-works-toggle button');
    // const portfolioBigCards = document.querySelectorAll('.project-card');

    // for (let i = 0; i <  filterToggles.length; i++) {
    //     filterToggles[i].addEventListener('click', function () {
    //         if (i == 0) {
    //             for (let j = 0; j < 2; j++) {
    //                 portfolioBigCards[j].classList.add('project-card--big')
    //             }
    //         }  else {
    //             for (let j = 0; j < 2; j++) {
    //                 portfolioBigCards[j].classList.remove('project-card--big')
    //             }
    //         }
    //     });
    // }

    	//отображение/скрытие карточек проектов по загрузке страницы
	if($(window).width() <1200){
		$('.project-card.hide-card').hide();
		
		$('.show-project-cards').on('click', function(){
			$('.project-card.hide-card').fadeIn();
			$(this).hide();
		})
	}
	else{
		$('.project-card.hide-card').fadeIn();
		$('.show-project-cards').hide();
	}

	//отображение/скрытие карточек проектов при ресайзе страницы
	$(window).on('resize', function(){
		if($(window).width() <1200){
			$('.project-card.hide-card').hide();
			$('.show-project-cards').fadeIn();

			$('.show-project-cards').on('click', function(){
				$('.project-card.hide-card').fadeIn();
				$(this).css('display', 'none');
			});
		}
		else{
			$('.project-card.hide-card').fadeIn();
			$('.show-project-cards').hide();
		}
	});

    // form placeholder
    const formField = document.querySelectorAll('.form-field');

    for (let item of formField) {
        const thisParent = item.closest('.form-item');
        const thisPlaceholder = thisParent.querySelector('.face-placeholder');
        // если инпут в фокусе
        item.addEventListener('focus', function (){
            thisPlaceholder.classList.add('active');
        });

        // Если инпут теряет фокус
        item.addEventListener('blur', function () {
            if (item.value.length > 0) {
                thisPlaceholder.classList.add('active');
            } else {
                thisPlaceholder.classList.remove('active');
            }
        })
    }

    //FORM VALIDATE
	$('.form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			subject: {
				required: 'Введите тему сообщения'
			},
			message: {
				required: 'Введите текст cообщения'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	})


	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}


})

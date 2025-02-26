!(function ($) {
    "use strict";

    // Preloader
		<script>
			window.addEventListener("load", function () {
				document.body.classList.add("loaded");
			});
		</script>


    // Hero typed
if (document.querySelector('.typed')) {
    const typedStrings = document.querySelector('.typed').getAttribute('data-typed-items');
    new Typed('.typed', {
        strings: typedStrings.split(','),
        typeSpeed: 100,
        backSpeed: 50,
        loop: true,
        backDelay: 2000,
    });
}


    // Smooth scroll for the navigation menu and links with .scrollto classes
    $(document).on('click', '.nav-menu a, .scrollto', function (e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            const target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                const scrollto = target.offset().top;

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                const body = $('body');
                if (body.hasClass('mobile-nav-active')) {
                    body.removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                }
                return false;
            }
        }
    });

    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function () {
        if (window.location.hash) {
            const initial_nav = window.location.hash;
            if ($(initial_nav).length) {
                const scrollto = $(initial_nav).offset().top;
                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');
            }
        }
    });

    $(document).on('click', '.mobile-nav-toggle', function (e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
    });

    $(document).click(function (e) {
        const container = $(".mobile-nav-toggle");
        const body = $('body');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if (body.hasClass('mobile-nav-active')) {
                body.removeClass('mobile-nav-active');
                $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            }
        }
    });

    // Navigation active state on scroll
    const nav_sections = $('section');
    const main_nav = $('.nav-menu, #mobile-nav');

    $(window).on('scroll', function () {
        const cur_pos = $(this).scrollTop() + 300;

        nav_sections.each(function () {
            const top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                if (cur_pos <= bottom) {
                    main_nav.find('li').removeClass('active');
                }
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
            if (cur_pos < 200) {
                $(".nav-menu ul:first li:first").addClass('active');
            }
        });
    });
	
	
	

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // Init AOS
    function aos_init() {
        AOS.init({
            duration: 1000,
            once: true
        });
    }


document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const header = document.querySelector('#header');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle mobile navigation
    mobileNavToggle.addEventListener('click', () => {
        header.classList.toggle('nav-menu-active');
    });

    // Close mobile menu on clicking a menu item
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            header.classList.remove('nav-menu-active');
        }
    });
});


const logo = document.getElementById('logo');
if (document.body.classList.contains('dark-mode')) {
    logo.src = 'logo-dark.png';
} else {
    logo.src = 'logo-light.png';
}





    // Porfolio isotope and filter
    $(window).on('load', function () {
        const portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item'
        });

        $('#portfolio-filters li').on('click', function () {
            $("#portfolio-filters li").removeClass('filter-active');
            $(this).addClass('filter-active');

            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
            aos_init();
        });

        // Initiate venobox (lightbox feature used in portofilo)
        $('.venobox').venobox({
            // framewidth: '500px',
            // frameheight: '500px',
            'share': false
        });

        // Initiate aos_init() function
        aos_init();

    });

})(jQuery);
// Main JavaScript file
// This file uses configuration from config.js

// Initialize configuration on page load
document.addEventListener('DOMContentLoaded', function() {
    if (typeof portfolioConfig !== 'undefined') {
        initializePortfolio();
    }
});

function initializePortfolio() {
    // Update personal information
    updatePersonalInfo();

    // Update social links
    updateSocialLinks();

    // Update CV links
    updateCVLinks();

    // Initialize theme
    initializeTheme();
}

function updatePersonalInfo() {
    const config = portfolioConfig.personal;

    // Update email
    const emailElements = document.querySelectorAll('[data-config="email"]');
    emailElements.forEach(el => {
        el.textContent = config.email;
        if (el.tagName === 'A') {
            el.href = 'mailto:' + config.email;
        }
    });

    // Update phone
    const phoneElements = document.querySelectorAll('[data-config="phone"]');
    phoneElements.forEach(el => {
        el.textContent = config.phone;
        if (el.tagName === 'A') {
            el.href = 'tel:' + config.phone.replace(/\s+/g, '');
        }
    });

    // Update location
    const locationElements = document.querySelectorAll('[data-config="location"]');
    locationElements.forEach(el => {
        el.textContent = config.location;
    });
}

function updateSocialLinks() {
    const config = portfolioConfig.social;

    // Update LinkedIn
    const linkedinLinks = document.querySelectorAll('[data-social="linkedin"]');
    linkedinLinks.forEach(link => {
        if (config.linkedin) {
            link.href = config.linkedin;
            link.style.display = '';
        } else {
            link.style.display = 'none';
        }
    });

    // Update GitHub
    const githubLinks = document.querySelectorAll('[data-social="github"]');
    githubLinks.forEach(link => {
        if (config.github) {
            link.href = config.github;
            link.style.display = '';
        } else {
            link.style.display = 'none';
        }
    });

    // Update Website
    const websiteLinks = document.querySelectorAll('[data-social="website"]');
    websiteLinks.forEach(link => {
        if (config.website) {
            link.href = config.website;
            link.style.display = '';
        } else {
            link.style.display = 'none';
        }
    });
	
	// Twitter - ADD THIS
    const twitterLinks = document.querySelectorAll('[data-social="twitter"]');
    twitterLinks.forEach(link => {
        if (config.twitter) {
            link.href = config.twitter;
        }
    });
    
    // Email links - ADD THIS
    const emailLinks = document.querySelectorAll('[data-config="email"]');
    emailLinks.forEach(link => {
        if (config.social.email) {
            link.href = 'mailto:' + config.social.email;
        }
    });
}

function updateCVLinks() {
    const config = portfolioConfig.cv;

    // Update CV download links
    const cvLinks = document.querySelectorAll('[data-cv="download"]');
    cvLinks.forEach(link => {
        link.href = config.downloadUrl;
    });
}

function initializeTheme() {
    const config = portfolioConfig.theme;

    if (!config.enableThemeToggle) {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.display = 'none';
        }
    }
}

// ========================================
// ORIGINAL PORTFOLIO JAVASCRIPT CODE
// ========================================

// Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Certifications Toggle
    const toggleCertsBtn = document.getElementById('toggleCertsBtn');
    const certsGrid = document.getElementById('certificationsGrid');

    if (toggleCertsBtn && certsGrid) {
        toggleCertsBtn.addEventListener('click', function() {
            const wasExpanded = certsGrid.classList.contains('show-all');
            certsGrid.classList.toggle('show-all');

            if (certsGrid.classList.contains('show-all')) {
                toggleCertsBtn.textContent = 'Show Less Certifications';
            } else {
                toggleCertsBtn.textContent = 'Show More Certifications';
                if (wasExpanded) {
                    setTimeout(() => {
                        const certsSection = document.getElementById('credentials');
                        if (certsSection) {
                            window.scrollTo({
                                top: certsSection.getBoundingClientRect().top + window.pageYOffset - 100,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            }
        });
    }

    // Timeline Progress Animation
   /* function updateTimelineProgress() {
        const timelineProgress = document.getElementById('timelineProgress');
        const timeline = document.querySelector('.timeline');

        if (!timelineProgress || !timeline) return;

        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollY = window.pageYOffset || window.scrollY;
        const timelineTop = timelineRect.top + scrollY;
        const timelineHeight = timelineRect.height;
        const scrolledIntoTimeline = scrollY + windowHeight - timelineTop;

        let percentage = (scrolledIntoTimeline / timelineHeight) * 100;
        percentage = Math.max(0, Math.min(100, percentage));

        timelineProgress.style.height = percentage + '%';
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateTimelineProgress();
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener('resize', updateTimelineProgress);
    window.addEventListener('load', updateTimelineProgress);
    setTimeout(updateTimelineProgress, 200);
	*/
// Timeline Progress Animation
function updateTimelineProgress() {
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineWrapper = document.querySelector('.timeline-wrapper');

    // Exit if elements don't exist
    if (!timelineProgress || !timelineWrapper) {
        console.warn('Timeline elements not found');
        return;
    }

    const timelineRect = timelineWrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollY = window.pageYOffset || window.scrollY;
    const timelineTop = timelineRect.top + scrollY;
    const timelineHeight = timelineRect.height;
    const scrolledIntoTimeline = scrollY + windowHeight - timelineTop;

    let percentage = (scrolledIntoTimeline / timelineHeight) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    timelineProgress.style.height = percentage + '%';
}

// Throttle scroll for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateTimelineProgress();
            ticking = false;
        });
        ticking = true;
    }
});

// Update on resize and load
window.addEventListener('resize', updateTimelineProgress);
window.addEventListener('load', updateTimelineProgress);

// Delayed update for dynamic content
setTimeout(updateTimelineProgress, 200);
setTimeout(updateTimelineProgress, 500); // Extra delay



        // Typed Effect
        const roles = ['Data Analyst', 'BI Developer', 'SQL Expert', 'Dashboard Designer', 'ETL Specialist'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedElement = document.getElementById('typedRole');

        function typeRole() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typedElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            setTimeout(typeRole, isDeleting ? 50 : 100);
        }

        setTimeout(typeRole, 1000);

        // Theme Toggle
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }

        window.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', savedTheme);
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active Navigation
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Project Filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Toggle Certifications - FIXED
        let certsExpanded = false;

        function toggleCertifications() {
            const hiddenCerts = document.querySelectorAll('.cert-hidden');
            const btnText = document.getElementById('certToggleBtn').querySelector('span');
            
            certsExpanded = !certsExpanded;
            
            hiddenCerts.forEach(cert => {
                cert.style.display = certsExpanded ? 'block' : 'none';
            });
            
            btnText.textContent = certsExpanded ? 'Show Less' : 'Show All Certifications';
        }

        // Back to Top
        const backToTopBtn = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        /* Contact Form
			document.getElementById('contactForm').addEventListener('submit', function(event) {
				event.preventDefault();
				
				const btn = this.querySelector('button[type="submit"]');
				const originalText = btn.textContent;
				btn.textContent = 'Sending...';
				btn.disabled = true;
				
				// Create FormData
				const formData = new FormData(this);
				
				// Send to FormSubmit
				fetch('https://formsubmit.co/mail.rmpranto@gmail.com', {
					method: 'POST',
					body: formData,
					headers: {
						'Accept': 'application/json'
					}
				})
				.then(response => {
					if (response.ok) {
						alert('✅ Message sent successfully! I will get back to you soon.');
						this.reset();
					} else {
						throw new Error('Failed to send');
					}
				})
				.catch(error => {
					alert('Failed to send message. Please email me directly at mail.rmpranto@gmail.com');
				})
				.finally(() => {
					btn.textContent = originalText;
					btn.disabled = false;
				});
			});*/


// ============================================
// CONTACT FORM - Formspree AJAX Submission
// ============================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page redirect
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
        
        // Get form data
        const formData = new FormData(this);
        
        // Send to Formspree using AJAX
        fetch('https://formspree.io/f/mzzzvbdj', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success message
                alert('✅ Message sent successfully! I will get back to you soon.');
                this.reset(); // Clear form
            } else {
                // Error from Formspree
                return response.json().then(data => {
                    throw new Error(data.error || 'Failed to send message');
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('❌ Failed to send message. Please email me directly at mail.rmpranto@gmail.com');
        })
        .finally(() => {
            // Reset button
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
        });
    });
}

    

    

    // ===== CERTIFICATION IMAGE CLICKS =====
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.cert-image').forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const card = this.closest('.cert-card');
                if (card) {
                    const link = card.querySelector('.cert-link');
                    if (link) {
                        const href = link.getAttribute('href');
                        if (href && href !== '#') {
                            window.open(href, '_blank');
                        }
                    }
                }
            });

            // Add pointer cursor style
            img.style.cursor = 'pointer';
        });
    });



    

    // ===== CERTIFICATION CARD INTERACTIONS =====
    document.addEventListener('DOMContentLoaded', function() {
        // Make cert images clickable
        document.querySelectorAll('.cert-image-container, .cert-image').forEach(elem => {
            elem.style.cursor = 'pointer';
            elem.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.cert-card');
                if (card) {
                    const link = card.querySelector('.cert-link');
                    if (link && link.href && link.href !== '#') {
                        window.open(link.href, '_blank');
                    }
                }
            });
        });
    });



    // ===== PRELOADER - AUTO HIDE =====
    (function() {
        const preloader = document.getElementById('preloader');

        if (preloader) {
            // Hide on page load
            window.addEventListener('load', function() {
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.remove();
                    }, 400);
                }, 600);
            });

            // Fallback: Force hide after 2 seconds
            setTimeout(() => {
                if (preloader && preloader.parentNode) {
                    preloader.remove();
                }
            }, 2000);
        }
    })();


    // ===== CV MODAL FUNCTIONS =====
    function openCVModal() {
        const modal = document.getElementById('cvModal');
        const iframe = document.getElementById('cvIframe');

        if (modal && iframe) {
            // Set iframe source to Google Drive embed URL
            iframe.src = 'https://drive.google.com/file/d/1C9SqT60thuGHxQw2zpfnPIzWs1oOo9yA/preview';

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCVModal() {
        const modal = document.getElementById('cvModal');
        const iframe = document.getElementById('cvIframe');

        if (modal && iframe) {
            // Hide modal
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // Clear iframe source to stop loading
            iframe.src = '';
        }
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('cvModal');
        if (event.target === modal) {
            closeCVModal();
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('cvModal');
            if (modal && modal.classList.contains('active')) {
                closeCVModal();
            }
        }
    });
	
	

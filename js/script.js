// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active state in nav
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Floating Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Fade up)
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
};

const revealOptions = {
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});


// Hover Image Slider Logic for Projects
function initHoverSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    if (slider) {
        const images = slider.querySelectorAll('.slider-img');
        let currentIndex = 0;
        let intervalId = null;

        if (images.length > 0) {
            // Mouse enter: Start sliding
            slider.addEventListener('mouseenter', () => {
                intervalId = setInterval(() => {
                    images[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % images.length;
                    images[currentIndex].classList.add('active');
                }, 1200); 
            });

            // Mouse leave: Reset to first image
            slider.addEventListener('mouseleave', () => {
                clearInterval(intervalId);
                images.forEach(img => img.classList.remove('active'));
                currentIndex = 0;
                images[0].classList.add('active');
            });
        }
    }
}

// Initialize sliders for both projects
initHoverSlider('slider-pos');
initHoverSlider('slider-radio');

// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const interactives = document.querySelectorAll('a, button, .bento-card, .project-card, .pill');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// Scroll Progress Bar Logic
const scrollProgress = document.querySelector('.scroll-progress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    // Progress Bar
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}%`;
    scrollProgress.style.width = scroll;

    // Back to Top Button
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Interactive Contact Section Logic
const btnCollaborate = document.getElementById('btn-collaborate');
const btnBackContact = document.getElementById('btn-back-contact');
const contactInitial = document.getElementById('contact-initial');
const contactFormSection = document.getElementById('contact-form-section');

if (btnCollaborate && btnBackContact) {
    btnCollaborate.addEventListener('click', () => {
        contactInitial.style.display = 'none';
        contactFormSection.style.display = 'grid';
    });

    btnBackContact.addEventListener('click', () => {
        contactFormSection.style.display = 'none';
        contactInitial.style.display = 'block';
    });
}

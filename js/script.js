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
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const interactives = document.querySelectorAll('a, button, .bento-card, .project-card, .pill, .stat-card, .edu-card, .credential-card, .timeline-content');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// Scroll Spy for Nav Links
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
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

// Mobile Sidebar Logic
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if(mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close sidebar when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Contact Form AJAX Submission (FormSubmit - Direct to Email without Account)
const contactForm = document.querySelector('.glass-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const formStatus = document.getElementById('form-status');
        const actionUrl = contactForm.getAttribute('action') || 'https://formsubmit.co/ajax/farisazhar838@gmail.com';

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        if (formStatus) {
            formStatus.style.display = 'none';
        }

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                if (formStatus) {
                    formStatus.style.display = 'block';
                    formStatus.style.color = '#2C4434';
                    formStatus.style.fontWeight = '600';
                    formStatus.innerHTML = '✓ Pesan berhasil dikirim ke email Faris!';
                }
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Smooth fallback directly to mailto without jarring alerts
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            if (formStatus) {
                formStatus.style.display = 'block';
                formStatus.style.color = '#1E1510';
                formStatus.innerHTML = 'Mengalihkan ke aplikasi email...';
            }
            const name = contactForm.querySelector('input[name="name"]')?.value || '';
            const email = contactForm.querySelector('input[name="email"]')?.value || '';
            const subject = encodeURIComponent(contactForm.querySelector('input[name="subject"]')?.value || 'Inquiry from Portfolio');
            const message = encodeURIComponent(`Halo Faris,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${contactForm.querySelector('textarea[name="message"]')?.value || ''}`);
            window.location.href = `mailto:farisazhar838@gmail.com?subject=${subject}&body=${message}`;
        }
    });
}

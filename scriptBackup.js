
import { db, storage } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

console.log("Firebase DB object:", db);
console.log("Firebase Storage object:", storage);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
  
    // === Header Scroll Effect ===
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // === Mobile Menu Toggle ===
    const menuToggle = document.getElementById('menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile nav if it doesn't exist
            let mobileNav = document.querySelector('.mobile-nav');
            let overlay = document.querySelector('.overlay');
            
            if (!mobileNav) {
                mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                
                const close = document.createElement('button');
                close.className = 'mobile-nav__close';
                close.innerHTML = '<i class="fas fa-times"></i>';
                close.setAttribute('aria-label', 'Close Menu');
                
                const nav = document.querySelector('.header__nav').cloneNode(true);
                nav.classList.remove('header__nav');
                nav.querySelector('ul').className = 'mobile-nav__menu';
                
                const cta = document.querySelector('.header__cta').cloneNode(true);
                cta.className = 'mobile-nav__cta';
                
                mobileNav.appendChild(close);
                mobileNav.appendChild(nav);
                mobileNav.appendChild(cta);
                
                document.body.appendChild(mobileNav);
                
                // Create overlay
                overlay = document.createElement('div');
                overlay.className = 'overlay';
                document.body.appendChild(overlay);
                
                // Add event listeners
                close.addEventListener('click', function() {
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
                
                overlay.addEventListener('click', function() {
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            }
            
            // Toggle mobile nav
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }
    
    // === Counter Animation ===
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const speed = Math.floor(1000 / target);
                    
                    const updateCount = () => {
                        const increment = target / 40;
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.floor(count);
                            setTimeout(updateCount, speed);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    counter.style.animation = 'count-up 1s forwards';
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // === Case Studies Slider ===
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const sliderArrows = document.querySelectorAll('.slider-arrow');
    const slides = document.querySelectorAll('.case-slide');
    
    if (sliderDots.length > 0 && slides.length > 0) {
        let currentSlide = 0;
        
        const setActiveSlide = (index) => {
            // Deactivate all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            sliderDots.forEach(dot => dot.classList.remove('active'));
            
            // Activate the current slide and dot
            slides[index].classList.add('active');
            sliderDots[index].classList.add('active');
            
            currentSlide = index;
        };
        
        // Add event listeners to dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => setActiveSlide(index));
        });
        
        // Add event listeners to arrows
        if (sliderArrows.length === 2) {
            const prevArrow = sliderArrows[0];
            const nextArrow = sliderArrows[1];
            
            prevArrow.addEventListener('click', () => {
                let index = currentSlide - 1;
                if (index < 0) index = slides.length - 1;
                setActiveSlide(index);
            });
            
            nextArrow.addEventListener('click', () => {
                let index = currentSlide + 1;
                if (index >= slides.length) index = 0;
                setActiveSlide(index);
            });
        }
        
        // Auto play the slider
        let sliderInterval = setInterval(() => {
            let index = currentSlide + 1;
            if (index >= slides.length) index = 0;
            setActiveSlide(index);
        }, 6000);
        
        // Pause on hover
        const casesSlider = document.querySelector('.cases-slider');
        if (casesSlider) {
            casesSlider.addEventListener('mouseenter', () => {
                clearInterval(sliderInterval);
            });
            
            casesSlider.addEventListener('mouseleave', () => {
                sliderInterval = setInterval(() => {
                    let index = currentSlide + 1;
                    if (index >= slides.length) index = 0;
                    setActiveSlide(index);
                }, 6000);
            });
        }
    }
    
    // === Resource Downloads Modal ===
    const resourceButtons = document.querySelectorAll('.resource-download');
    const modal = document.getElementById('resource-modal');
    
    if (resourceButtons.length > 0 && modal) {
        const modalClose = modal.querySelector('.modal-close');
        const resourceForm = document.getElementById('modal-resource-form');
        
        resourceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Set resource type for tracking
                const resourceType = button.getAttribute('data-resource');
                if (resourceForm) {
                    resourceForm.setAttribute('data-resource', resourceType);
                }
            });
        });
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
 
if (resourceForm) {
    resourceForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('modal-name').value;
        const email = document.getElementById('modal-email').value;
        const company = document.getElementById('modal-company').value;

        if (!name || !email) {
            alert('Please fill in the required fields.');
            return;
        }

        try {
            const fileRef = ref(storage, 'resources/Digital Strategy for Nonprofits on Limited Budgets.pdf');
            const downloadURL = await getDownloadURL(fileRef);

            window.open(downloadURL, '_blank');

            resourceForm.reset();
            modal.classList.remove('active');
            document.body.style.overflow = '';
        } catch (error) {
            console.error('Error fetching file:', error);
            alert('Sorry, there was a problem delivering your resource.');
        }
    });
}

    }
    
    // === Contact Form Submission ===
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const company = document.getElementById('contact-company').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const message = document.getElementById('contact-message').valu

    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const company = document.getElementById('contact-company').value;
            const phone = document.getElementById('contact-phone').value;
            const service = document.getElementById('contact-service').value;
            const message = document.getElementById('contact-message').value;
            
            // Handle form submission
            // This would typically be an AJAX call to your server
            console.log('Contact Form Submitted:', { 
                name, 
                email, 
                company, 
                phone, 
                service, 
                message 
            });
            
            // Show success message
            const formContent = contactForm.innerHTML;
            contactForm.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>We'll be in touch with you shortly.</p>
                </div>
            `;
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.innerHTML = formContent;
                document.getElementById('contact-name').value = '';
                document.getElementById('contact-email').value = '';
                document.getElementById('contact-company').value = '';
                document.getElementById('contact-phone').value = '';
                document.getElementById('contact-service').value = '';
                document.getElementById('contact-message').value = '';
            }, 5000);
        });
    }
    
    // === Lead Magnet Form Submission ===
    const resourceForm = document.getElementById('resource-form');
    
    if (resourceForm) {
        resourceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const industry = document.getElementById('industry').value;
            
            // Handle form submission
            console.log('Lead Form Submitted:', { name, email, company, industry });
            
            // Show success message
            const formContent = resourceForm.innerHTML;
            resourceForm.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your resource has been sent to your email.</p>
                </div>
            `;
            
            // Reset form after a delay
            setTimeout(() => {
                resourceForm.innerHTML = formContent;
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('company').value = '';
                document.getElementById('industry').value = '';
            }, 5000);
        });
    }
    
    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav');
                const overlay = document.querySelector('.overlay');
                const menuToggle = document.getElementById('menu-toggle');
                
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.header__link').forEach(link => {
                    link.classList.remove('active');
                });
                
                this.classList.add('active');
            }
        });
    });

// === FAQ Toggle ===
const faqItems = document.querySelectorAll('.faq-item');
    
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Get the current active state of the clicked item
            const isActive = item.classList.contains('active');
            
            // Close ALL other open FAQ items first
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active before, make it active now
            if (!isActive) {
                item.classList.add('active');
            }
            // If it was already active, it will remain closed since we removed all active classes
        });
    });
}
    
    // === Update Active Menu Item on Scroll ===
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.header__link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
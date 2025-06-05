// SquareStair Media Independent Consultant Program - Revolutionary Interactions

// Initialize AOS (Animate on Scroll) when available
document.addEventListener('DOMContentLoaded', function() {
    // Check if AOS is available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // === Canvas Background Animation ===
    const canvas = document.getElementById('background-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() * 2 - 1) * 0.4;
                this.speedY = (Math.random() * 2 - 1) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(42, 140, 186, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        function initParticles() {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((particle, index) => {
                for (let j = index + 1; j < particles.length; j++) {
                    const dx = particle.x - particles[j].x;
                    const dy = particle.y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(42, 140, 186, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(animate);
        }

        // Initialize
        resizeCanvas();
        initParticles();
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // === Progress Tracking ===
    const progressFill = document.getElementById('progress-fill');
    const navDots = document.querySelectorAll('.nav-dot');
    const chapters = document.querySelectorAll('.chapter');

    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / documentHeight) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${Math.min(scrollProgress, 100)}%`;
        }

        // Update active chapter
        const viewportCenter = scrollTop + window.innerHeight / 2;
        
        chapters.forEach((chapter, index) => {
            const chapterTop = chapter.offsetTop;
            const chapterBottom = chapterTop + chapter.offsetHeight;
            
            if (viewportCenter >= chapterTop && viewportCenter < chapterBottom) {
                navDots.forEach(dot => dot.classList.remove('active'));
                if (navDots[index]) {
                    navDots[index].classList.add('active');
                }
            }
        });
    }

    // Chapter navigation
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetChapter = chapters[index];
            if (targetChapter) {
                targetChapter.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Keyboard navigation
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dot.click();
            }
        });
    });

    // === Chapter Scroll Functions ===
    window.scrollToChapter = function(chapterNumber) {
        const targetChapter = document.getElementById(`chapter-${chapterNumber}`);
        if (targetChapter) {
            targetChapter.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // === 3D Tilt Effect ===
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // === Modal System ===
    const blueprintModal = document.getElementById('blueprint-modal');
    const successModal = document.getElementById('success-modal');

    window.openBlueprintModal = function() {
        if (blueprintModal) {
            blueprintModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus first input
            setTimeout(() => {
                const firstInput = blueprintModal.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 300);
        }
    };

    window.closeBlueprintModal = function() {
        if (blueprintModal) {
            blueprintModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    window.closeSuccessModal = function() {
        if (successModal) {
            successModal.classList.remove('active');
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 300);
        }
    };

    // Modal backdrop clicks
    if (blueprintModal) {
        blueprintModal.addEventListener('click', (e) => {
            if (e.target === blueprintModal || e.target.classList.contains('modal-backdrop')) {
                closeBlueprintModal();
            }
        });
    }

    // Escape key handling
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (blueprintModal && blueprintModal.classList.contains('active')) {
                closeBlueprintModal();
            }
            if (successModal && successModal.classList.contains('active')) {
                closeSuccessModal();
            }
        }
    });

    // === Form Handling ===
    
    // Waitlist Form
    const waitlistForm = document.getElementById('waitlist-form');
    const submitBtn = document.getElementById('submit-btn');

    if (waitlistForm && submitBtn) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(waitlistForm);
            const data = {
                firstName: formData.get('firstName'),
                email: formData.get('email'),
                experience: formData.get('experience'),
                interests: formData.getAll('interests'),
                timestamp: new Date().toISOString(),
                source: 'consultant-program-waitlist'
            };

            // Update button state
            const originalHTML = submitBtn.innerHTML;
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="button-text">Joining...</span>';

            try {
                // Simulate API call (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                console.log('Waitlist Data:', data);
                
                // Show success
                showSuccess(
                    `Welcome ${data.firstName}!`,
                    "You're now on the waitlist. We'll notify you when the program launches."
                );
                
                // Reset form
                waitlistForm.reset();
                
            } catch (error) {
                console.error('Waitlist Error:', error);
                alert('Something went wrong. Please try again.');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
            }
        });
    }

    // Purchase Form
    const purchaseForm = document.getElementById('purchase-form');
    
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(purchaseForm);
            const data = {
                email: formData.get('email'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                product: 'consultant-readiness-blueprint',
                price: 8.95,
                currency: 'CAD',
                timestamp: new Date().toISOString()
            };

            const purchaseBtn = purchaseForm.querySelector('.purchase-button');
            const originalHTML = purchaseBtn.innerHTML;
            purchaseBtn.classList.add('loading');
            purchaseBtn.disabled = true;
            purchaseBtn.innerHTML = '<span class="button-text">Processing...</span>';

            try {
                // Simulate payment processing
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                console.log('Purchase Data:', data);
                
                closeBlueprintModal();
                
                showSuccess(
                    'Purchase Complete!',
                    `Thanks ${data.firstName}! Check your email for the download link.`
                );
                
                purchaseForm.reset();
                
            } catch (error) {
                console.error('Purchase Error:', error);
                alert('Payment failed. Please try again.');
            } finally {
                purchaseBtn.classList.remove('loading');
                purchaseBtn.disabled = false;
                purchaseBtn.innerHTML = originalHTML;
            }
        });
    }

    // === Success Message Function ===
    function showSuccess(title, message) {
        const successTitle = document.querySelector('#success-modal h3');
        const successMessage = document.querySelector('#success-modal p');
        
        if (successTitle) successTitle.textContent = title;
        if (successMessage) successMessage.textContent = message;
        
        if (successModal) {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // === Input Formatting ===
    
    // Card number formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.substring(0, 19);
            }
            
            e.target.value = formattedValue;
        });
    }

    // Card expiry formatting
    const cardExpiryInput = document.getElementById('card-expiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            e.target.value = value;
        });
    }

    // CVC formatting
    const cardCvcInput = document.getElementById('card-cvc');
    if (cardCvcInput) {
        cardCvcInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
        });
    }

    // === Particle Field Animation ===
    const particleField = document.getElementById('particle-field');
    if (particleField) {
        function createParticles() {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(42, 140, 186, 0.6);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: particleFloat ${3 + Math.random() * 4}s infinite ease-in-out;
                    animation-delay: ${Math.random() * 2}s;
                `;
                particleField.appendChild(particle);
            }
        }

        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { 
                    transform: translate(0, 0) scale(1);
                    opacity: 0.6;
                }
                50% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        createParticles();
    }

    // === Scroll Event Listener ===
    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // === Initialize ===
    updateProgress();

    // === Error Handling ===
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
    });

    console.log('SquareStair Media Consultant Program initialized successfully');
});

// === Utility Functions ===

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Format Canadian currency
function formatCAD(amount) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
    }).format(amount);
}

// Detect mobile device
function isMobile() {
    return window.innerWidth < 768;
}

// Smooth scroll fallback for older browsers
function smoothScrollTo(element, duration = 800) {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * t - 2) + b;
    }

    requestAnimationFrame(animation);
}
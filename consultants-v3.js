/**
 * SquareStair Media - Consultant Partnership Page
 * Professional job listing functionality
 */

class ConsultantPartnership {
    constructor() {
        this.currentSection = 'overview';
        this.magneticParticles = [];
        this.isSubmitting = false;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMagneticBackground();
        this.setupFormHandling();
        this.setupAccordions();
        this.setupModal();
        this.setupScrollBehavior();
        this.setupQuickApply();
        
        // Initialize AOS if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50
            });
        }
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = item.dataset.section;
                this.showSection(targetSection);
                this.updateActiveNav(item);
                
                // Track navigation
                this.trackEvent('navigation', {
                    section: targetSection,
                    from: this.currentSection
                });
                
                this.currentSection = targetSection;
            });
        });

        // Handle scroll-based navigation updates
        this.setupScrollSpy();
    }

    showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    updateActiveNav(activeItem) {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        activeItem.classList.add('active');
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('.content-section');
        const navItems = document.querySelectorAll('.nav-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionId = entry.target.id;
                    const correspondingNav = document.querySelector(`[data-section="${sectionId}"]`);
                    
                    if (correspondingNav) {
                        this.updateActiveNav(correspondingNav);
                        this.currentSection = sectionId;
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupMagneticBackground() {
        const background = document.getElementById('magnetic-background');
        if (!background) return;

        // Create initial particles
        this.createParticles(15);

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            this.updateParticles(mouseX, mouseY);
        });

        // Animate particles
        this.animateParticles();
    }

    createParticles(count) {
        const background = document.getElementById('magnetic-background');
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'magnetic-particle';
            
            // Random position
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            
            // Store initial position and velocity
            particle.dataset.baseX = particle.style.left;
            particle.dataset.baseY = particle.style.top;
            particle.dataset.vx = (Math.random() - 0.5) * 0.5;
            particle.dataset.vy = (Math.random() - 0.5) * 0.5;
            
            background.appendChild(particle);
            this.magneticParticles.push(particle);
        }
    }

    updateParticles(mouseX, mouseY) {
        this.magneticParticles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - particleX, 2) + 
                Math.pow(mouseY - particleY, 2)
            );
            
            // Magnetic effect within 150px
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const angle = Math.atan2(mouseY - particleY, mouseX - particleX);
                
                const attractionX = Math.cos(angle) * force * 2;
                const attractionY = Math.sin(angle) * force * 2;
                
                particle.style.transform = `translate(${attractionX}px, ${attractionY}px)`;
                particle.style.opacity = 0.8;
            } else {
                particle.style.transform = 'translate(0, 0)';
                particle.style.opacity = 0.4;
            }
        });
    }

    animateParticles() {
        this.magneticParticles.forEach(particle => {
            const currentX = parseFloat(particle.style.left);
            const currentY = parseFloat(particle.style.top);
            
            let vx = parseFloat(particle.dataset.vx);
            let vy = parseFloat(particle.dataset.vy);
            
            // Boundary bouncing
            if (currentX <= 0 || currentX >= window.innerWidth) {
                vx = -vx;
            }
            if (currentY <= 0 || currentY >= window.innerHeight) {
                vy = -vy;
            }
            
            // Update position
            const newX = currentX + vx;
            const newY = currentY + vy;
            
            particle.style.left = newX + 'px';
            particle.style.top = newY + 'px';
            
            // Update velocity
            particle.dataset.vx = vx;
            particle.dataset.vy = vy;
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    setupAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.closest('.accordion-item');
                const isExpanded = item.dataset.expanded === 'true';
                
                // Close all other accordions
                document.querySelectorAll('.accordion-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.dataset.expanded = 'false';
                    }
                });
                
                // Toggle current accordion
                item.dataset.expanded = isExpanded ? 'false' : 'true';
                
                // Track accordion interaction
                this.trackEvent('accordion_toggle', {
                    section: header.querySelector('.accordion-title').textContent,
                    expanded: !isExpanded
                });
            });
        });
    }

    setupFormHandling() {
        const form = document.getElementById('application-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.isSubmitting) return;
            
            await this.handleFormSubmission(form);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        this.clearFieldError(field);
        
        if (isRequired && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }

    showFieldError(field, message) {
        field.style.borderColor = 'var(--error)';
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: var(--error);
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.style.borderColor = 'var(--border)';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) errorDiv.remove();
    }

    async handleFormSubmission(form) {
        this.isSubmitting = true;
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate all fields
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.isSubmitting = false;
            this.showNotification('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div class="loading-spinner"></div>
            <span>Submitting...</span>
        `;
        
        try {
            // Simulate API call
            await this.submitToAPI(data);
            
            // Track successful submission
            this.trackEvent('form_submitted', {
                formType: 'consultant_application',
                experience: data.experience,
                timeline: data.timeline
            });
            
            // Show success modal
            this.showSuccessModal();
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Something went wrong. Please try again.', 'error');
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }
        
        this.isSubmitting = false;
    }

    async submitToAPI(data) {
        // Add timestamp and user agent
        const submissionData = {
            ...data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            source: 'consultant_partnership_page'
        };
        
        // In a real implementation, you'd send to your API
        // For now, simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Log for debugging
        console.log('Form submission:', submissionData);
        
        return { success: true, id: 'app_' + Date.now() };
    }

    setupModal() {
        const modal = document.getElementById('success-modal');
        const closeBtn = document.getElementById('close-modal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideModal();
            });
        }
        
        // Close on backdrop click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal();
                }
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.hideModal();
            }
        });
    }

    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus the close button for accessibility
            const closeBtn = modal.querySelector('#close-modal');
            if (closeBtn) {
                setTimeout(() => closeBtn.focus(), 300);
            }
        }
    }

    hideModal() {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    setupScrollBehavior() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupQuickApply() {
        const quickApplyBtn = document.getElementById('quick-apply-btn');
        const learnMoreBtn = document.getElementById('learn-more-btn');
        
        if (quickApplyBtn) {
            quickApplyBtn.addEventListener('click', () => {
                this.showSection('apply');
                const applyNav = document.querySelector('[data-section="apply"]');
                if (applyNav) {
                    this.updateActiveNav(applyNav);
                }
                
                this.trackEvent('quick_apply_clicked');
            });
        }
        
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                this.showSection('opportunity');
                const opportunityNav = document.querySelector('[data-section="opportunity"]');
                if (opportunityNav) {
                    this.updateActiveNav(opportunityNav);
                }
                
                this.trackEvent('learn_more_clicked');
            });
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        const colors = {
            success: 'var(--success)',
            error: 'var(--error)',
            warning: 'var(--warning)',
            info: 'var(--accent)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 2000;
            background: var(--background);
            border: 1px solid ${colors[type]};
            border-left: 4px solid ${colors[type]};
            border-radius: var(--radius-lg);
            padding: var(--space-md) var(--space-lg);
            box-shadow: var(--shadow-lg);
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="color: ${colors[type]};">
                    ${type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ'}
                </div>
                <span style="color: var(--text);">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    trackEvent(eventName, data = {}) {
        // Analytics tracking
        const eventData = {
            event: eventName,
            timestamp: Date.now(),
            page: 'consultant_partnership',
            ...data
        };
        
        // Send to your analytics service
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        // Debug logging
        console.log('Event tracked:', eventData);
    }

    // Public methods for external use
    navigateToSection(sectionId) {
        this.showSection(sectionId);
        const nav = document.querySelector(`[data-section="${sectionId}"]`);
        if (nav) {
            this.updateActiveNav(nav);
        }
    }

    destroy() {
        // Cleanup if needed
        this.magneticParticles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.magneticParticles = [];
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.consultantPartnership = new ConsultantPartnership();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
    } else {
        // Resume animations when tab becomes visible
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    // Update particle positions if needed
    if (window.consultantPartnership) {
        // Recreate particles for new screen size
        window.consultantPartnership.magneticParticles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        window.consultantPartnership.magneticParticles = [];
        window.consultantPartnership.createParticles(15);
    }
});
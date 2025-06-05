/**
 * ===============================================
 * QUANTUM INTELLIGENCE SYSTEM - SQUARESTAIR V2
 * Award-winning conversion optimization
 * ===============================================
 */

// QUANTUM STATE MANAGEMENT
class QuantumState {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.selectedPathway = null;
        this.formData = {};
        this.particles = [];
        this.animations = new Map();
        this.observers = new Map();
        this.isInitialized = false;
        
        // Conversion tracking
        this.startTime = Date.now();
        this.interactions = [];
        this.scrollDepth = 0;
    }

    // Track user interactions for optimization
    trackInteraction(type, element, data = {}) {
        this.interactions.push({
            type,
            element: element?.id || element?.className || 'unknown',
            timestamp: Date.now() - this.startTime,
            data
        });
        
        // Send to analytics (implement your tracking)
        if (typeof gtag !== 'undefined') {
            gtag('event', type, {
                element_id: element?.id,
                custom_data: data
            });
        }
    }
}

// Initialize quantum state
const quantum = new QuantumState();

// QUANTUM PARTICLE SYSTEM
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = this.getMaxParticles();
        this.animationId = null;
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }

    getMaxParticles() {
        // Adaptive particle count based on device performance
        const width = window.innerWidth;
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        if (width < 768) return 15; // Mobile
        if (devicePixelRatio > 1.5) return 25; // High DPI
        return 35; // Desktop
    }

    init() {
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        // Quantum properties
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.8 + 0.2;
        const hue = Math.random() * 60 + 180; // Blue to cyan range
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: hsl(${hue}, 70%, 60%);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${opacity};
            filter: blur(0.5px);
            box-shadow: 0 0 ${size * 2}px hsl(${hue}, 70%, 60%);
        `;
        
        // Physics properties
        particle.quantumProps = {
            x: startX,
            y: startY,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: size,
            opacity: opacity,
            baseOpacity: opacity,
            hue: hue,
            life: Math.random() * 1000 + 500,
            maxLife: Math.random() * 1000 + 500
        };
        
        this.container.appendChild(particle);
        return particle;
    }

    bindEvents() {
        // Mouse interaction
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Resize handling
        window.addEventListener('resize', () => {
            this.maxParticles = this.getMaxParticles();
            this.adjustParticleCount();
        });
    }

    adjustParticleCount() {
        const currentCount = this.particles.length;
        
        if (currentCount < this.maxParticles) {
            // Add particles
            for (let i = currentCount; i < this.maxParticles; i++) {
                this.particles.push(this.createParticle());
            }
        } else if (currentCount > this.maxParticles) {
            // Remove particles
            const excess = this.particles.splice(this.maxParticles);
            excess.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
        }
    }

    updateParticle(particle) {
        const props = particle.quantumProps;
        
        // Mouse attraction/repulsion
        const dx = this.mouse.x - props.x;
        const dy = this.mouse.y - props.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            props.vx += (dx / distance) * force * 0.01;
            props.vy += (dy / distance) * force * 0.01;
            props.opacity = props.baseOpacity + force * 0.5;
        } else {
            props.opacity = props.baseOpacity;
        }
        
        // Apply velocity
        props.x += props.vx;
        props.y += props.vy;
        
        // Boundary wrapping
        if (props.x < 0) props.x = window.innerWidth;
        if (props.x > window.innerWidth) props.x = 0;
        if (props.y < 0) props.y = window.innerHeight;
        if (props.y > window.innerHeight) props.y = 0;
        
        // Update DOM
        particle.style.transform = `translate(${props.x}px, ${props.y}px)`;
        particle.style.opacity = Math.min(props.opacity, 1);
        
        // Velocity damping
        props.vx *= 0.995;
        props.vy *= 0.995;
    }

    animate() {
        this.particles.forEach(particle => this.updateParticle(particle));
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
    }
}

// NEURAL ORB SYSTEM
class NeuralOrb {
    constructor(element) {
        this.element = element;
        this.dataStreams = element.querySelector('.orb-data-streams');
        this.streams = [];
        this.init();
    }

    init() {
        this.createDataStreams();
        this.animate();
    }

    createDataStreams() {
        // Create flowing data streams
        for (let i = 0; i < 8; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            
            const angle = (i / 8) * Math.PI * 2;
            const radius = 150;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            stream.style.cssText = `
                position: absolute;
                width: 2px;
                height: 20px;
                background: linear-gradient(to bottom, #00d4ff, transparent);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + Math.PI/2}rad);
                animation: dataFlow ${2 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
            `;
            
            this.dataStreams.appendChild(stream);
            this.streams.push(stream);
        }

        // Add CSS animation
        if (!document.querySelector('#neural-orb-styles')) {
            const style = document.createElement('style');
            style.id = 'neural-orb-styles';
            style.textContent = `
                @keyframes dataFlow {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) translate(var(--x), var(--y)) rotate(var(--angle)) scale(1); }
                    50% { opacity: 1; transform: translate(-50%, -50%) translate(var(--x), var(--y)) rotate(var(--angle)) scale(1.5); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    animate() {
        // Breathing effect for the orb
        const breathe = () => {
            const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05;
            this.element.style.transform = `scale(${scale})`;
            requestAnimationFrame(breathe);
        };
        breathe();
    }
}

// FORM PROGRESSION SYSTEM
class FormProgression {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.formData = {};
        this.validationRules = this.setupValidation();
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
        this.setupRealTimeValidation();
    }

    setupValidation() {
        return {
            firstName: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Please enter a valid first name'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            currentRole: {
                required: true,
                message: 'Please select your current role'
            },
            experienceLevel: {
                required: true,
                message: 'Please select your experience level'
            },
            monthlyRevenue: {
                required: true,
                message: 'Please select your monthly revenue range'
            },
            revenueGoal: {
                required: true,
                message: 'Please select your revenue goal'
            },
            timeline: {
                required: true,
                message: 'Please select your timeline'
            }
        };
    }

    bindEvents() {
        // Step navigation
        document.getElementById('next-btn')?.addEventListener('click', () => this.nextStep());
        document.getElementById('back-btn')?.addEventListener('click', () => this.prevStep());
        document.getElementById('submit-btn')?.addEventListener('click', (e) => this.submitForm(e));

        // Pathway selection
        document.querySelectorAll('[data-pathway]').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectPathway(e));
        });

        // Step dots navigation
        document.querySelectorAll('.step-dot').forEach(dot => {
            dot.addEventListener('click', (e) => this.goToStep(parseInt(e.target.dataset.step)));
        });
    }

    setupRealTimeValidation() {
        const inputs = document.querySelectorAll('.quantum-input, .quantum-select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const rules = this.validationRules[field.name];
        
        if (!rules) return true;

        // Clear previous errors
        this.clearFieldError(field);

        // Required validation
        if (rules.required && !value) {
            this.showFieldError(field, rules.message);
            return false;
        }

        // Pattern validation
        if (value && rules.pattern && !rules.pattern.test(value)) {
            this.showFieldError(field, rules.message);
            return false;
        }

        // Length validation
        if (value && rules.minLength && value.length < rules.minLength) {
            this.showFieldError(field, rules.message);
            return false;
        }

        // Success state
        this.showFieldSuccess(field);
        return true;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
        
        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
        
        // Animate in
        requestAnimationFrame(() => {
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
        });
    }

    showFieldSuccess(field) {
        field.style.borderColor = '#06ffa5';
        field.style.boxShadow = '0 0 0 4px rgba(6, 255, 165, 0.1)';
    }

    clearFieldError(field) {
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        field.style.boxShadow = 'none';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.style.opacity = '0';
            errorDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => errorDiv.remove(), 300);
        }
    }

    validateCurrentStep() {
        const currentStepElement = document.querySelector(`#step-${this.currentStep}`);
        const requiredFields = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate checkboxes for step 2
        if (this.currentStep === 2) {
            const interests = document.querySelectorAll('input[name="interests"]:checked');
            if (interests.length === 0) {
                this.showNotification('Please select at least one area of interest', 'warning');
                isValid = false;
            }
        }

        return isValid;
    }

    collectStepData() {
        const currentStepElement = document.querySelector(`#step-${this.currentStep}`);
        const formData = new FormData();
        
        // Regular inputs and selects
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (input.checked) {
                    if (!this.formData[input.name]) this.formData[input.name] = [];
                    this.formData[input.name].push(input.value);
                }
            } else {
                this.formData[input.name] = input.value;
            }
        });

        quantum.trackInteraction('step_completed', currentStepElement, {
            step: this.currentStep,
            data: Object.keys(this.formData)
        });
    }

    nextStep() {
        if (!this.validateCurrentStep()) {
            this.showNotification('Please complete all required fields', 'error');
            return;
        }

        this.collectStepData();

        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateButtons();
            
            // Smooth scroll to form
            document.getElementById('application-form').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateButtons();
        }
    }

    goToStep(stepNumber) {
        // Only allow going to completed steps or next step
        if (stepNumber <= this.currentStep + 1 && stepNumber >= 1) {
            this.currentStep = stepNumber;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateButtons();
        }
    }

    showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        const currentStep = document.querySelector(`#step-${stepNumber}`);
        if (currentStep) {
            currentStep.classList.add('active');
            
            // Focus first input
            const firstInput = currentStep.querySelector('input, select, textarea');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 300);
            }
        }
    }

    updateProgress() {
        const progressFill = document.getElementById('form-progress-fill');
        const percentage = (this.currentStep / this.totalSteps) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }

        // Update step dots
        document.querySelectorAll('.step-dot').forEach((dot, index) => {
            const stepNumber = index + 1;
            dot.classList.remove('active', 'completed');
            
            if (stepNumber === this.currentStep) {
                dot.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                dot.classList.add('completed');
                dot.innerHTML = '✓';
            } else {
                dot.innerHTML = stepNumber;
            }
        });
    }

    updateButtons() {
        const backBtn = document.getElementById('back-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');

        // Back button
        if (backBtn) {
            backBtn.style.display = this.currentStep > 1 ? 'inline-flex' : 'none';
        }

        // Next/Submit buttons
        if (this.currentStep < this.totalSteps) {
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (submitBtn) submitBtn.style.display = 'none';
        } else {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'inline-flex';
        }
    }

    selectPathway(event) {
        const pathway = event.target.dataset.pathway;
        quantum.selectedPathway = pathway;
        
        // Track selection
        quantum.trackInteraction('pathway_selected', event.target, { pathway });

        if (pathway === 'premium') {
            this.showPaymentModal();
        } else {
            this.showApplicationForm();
        }
    }

    showApplicationForm() {
        const formSection = document.getElementById('application-form');
        if (formSection) {
            formSection.style.display = 'block';
            
            // Smooth reveal animation
            formSection.style.opacity = '0';
            formSection.style.transform = 'translateY(50px)';
            
            requestAnimationFrame(() => {
                formSection.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                formSection.style.opacity = '1';
                formSection.style.transform = 'translateY(0)';
            });

            // Scroll to form
            setTimeout(() => {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        }
    }

    showPaymentModal() {
        const modal = document.getElementById('payment-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Setup payment form
            this.setupPaymentForm();
        }
    }

    setupPaymentForm() {
        const paymentFields = document.querySelector('.payment-fields');
        if (!paymentFields) return;

        paymentFields.innerHTML = `
            <div class="payment-group">
                <label class="input-label">Email Address</label>
                <input type="email" name="payment-email" class="quantum-input" required>
            </div>
            <div class="form-row">
                <div class="payment-group">
                    <label class="input-label">First Name</label>
                    <input type="text" name="payment-first-name" class="quantum-input" required>
                </div>
                <div class="payment-group">
                    <label class="input-label">Last Name</label>
                    <input type="text" name="payment-last-name" class="quantum-input" required>
                </div>
            </div>
            <div class="payment-group">
                <label class="input-label">Card Number</label>
                <input type="text" name="card-number" class="quantum-input" placeholder="1234 5678 9012 3456" required>
            </div>
            <div class="form-row">
                <div class="payment-group">
                    <label class="input-label">Expiry Date</label>
                    <input type="text" name="card-expiry" class="quantum-input" placeholder="MM/YY" required>
                </div>
                <div class="payment-group">
                    <label class="input-label">CVC</label>
                    <input type="text" name="card-cvc" class="quantum-input" placeholder="123" required>
                </div>
            </div>
        `;

        // Add payment form styling
        const style = document.createElement('style');
        style.textContent = `
            .payment-group { margin-bottom: 1rem; }
            .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
            @media (max-width: 768px) {
                .form-row { grid-template-columns: 1fr; }
            }
        `;
        document.head.appendChild(style);

        // Setup form formatting
        this.setupCardFormatting();
    }

    setupCardFormatting() {
        // Card number formatting
        const cardNumber = document.querySelector('input[name="card-number"]');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
                let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                e.target.value = formattedValue.substring(0, 19);
            });
        }

        // Expiry formatting
        const cardExpiry = document.querySelector('input[name="card-expiry"]');
        if (cardExpiry) {
            cardExpiry.addEventListener('input', (e) => {
                let value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }

        // CVC formatting
        const cardCvc = document.querySelector('input[name="card-cvc"]');
        if (cardCvc) {
            cardCvc.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
            });
        }
    }

    async submitForm(event) {
        event.preventDefault();
        
        if (!this.validateCurrentStep()) {
            this.showNotification('Please complete all required fields', 'error');
            return;
        }

        this.collectStepData();

        // Show loading state
        const submitBtn = document.getElementById('submit-btn');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <span>Processing...</span>
            <div class="btn-spinner"></div>
        `;
        submitBtn.disabled = true;

        // Add spinner styles
        if (!document.querySelector('#spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-styles';
            style.textContent = `
                .btn-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        try {
            // Simulate API call
            await this.simulateSubmission();
            
            // Track successful submission
            quantum.trackInteraction('form_submitted', submitBtn, {
                pathway: quantum.selectedPathway,
                totalTime: Date.now() - quantum.startTime,
                formData: this.formData
            });

            // Show success
            this.showSuccess();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Something went wrong. Please try again.', 'error');
            
            // Restore button
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    }

    async simulateSubmission() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
        
        // Simulate occasional errors for testing
        if (Math.random() < 0.05) { // 5% error rate
            throw new Error('Network error');
        }
        
        return { success: true, id: 'cs_' + Date.now() };
    }

    showSuccess() {
        // Hide form section
        const formSection = document.getElementById('application-form');
        if (formSection) {
            formSection.style.display = 'none';
        }

        // Show success section
        const successSection = document.getElementById('success-section');
        if (successSection) {
            successSection.style.display = 'block';
            
            // Customize based on pathway
            this.customizeSuccessMessage();
            
            // Smooth reveal
            successSection.style.opacity = '0';
            requestAnimationFrame(() => {
                successSection.style.transition = 'opacity 0.8s ease';
                successSection.style.opacity = '1';
            });

            // Scroll to success
            setTimeout(() => {
                successSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        }
    }

    customizeSuccessMessage() {
        const title = document.getElementById('success-title');
        const message = document.getElementById('success-message');
        const nextSteps = document.getElementById('next-steps');
        const downloadBtn = document.getElementById('download-btn');

        if (quantum.selectedPathway === 'premium') {
            if (title) title.textContent = 'Priority Access Secured!';
            if (message) {
                message.textContent = `Thank you ${this.formData.firstName}! Your priority placement is confirmed and your Consultant Readiness Blueprint is ready for download.`;
            }
            if (nextSteps) {
                nextSteps.innerHTML = `
                    <h4 style="color: var(--plasma-green); margin-bottom: 1rem;">What happens next:</h4>
                    <ul style="text-align: left; color: rgba(255,255,255,0.8);">
                        <li>📥 Download your Blueprint below</li>
                        <li>📧 Check your email for priority access details</li>
                        <li>🚀 You'll be first to know when we launch</li>
                        <li>💬 Expect a personal welcome from our founder</li>
                    </ul>
                `;
            }
            if (downloadBtn) {
                downloadBtn.style.display = 'inline-flex';
                downloadBtn.addEventListener('click', () => this.triggerDownload());
            }
        } else {
            if (title) title.textContent = `Welcome aboard, ${this.formData.firstName}!`;
            if (message) {
                message.textContent = "You're now on our exclusive waitlist. We'll notify you as soon as the next consultant group opens.";
            }
            if (nextSteps) {
                nextSteps.innerHTML = `
                    <h4 style="color: var(--electric-blue); margin-bottom: 1rem;">What's next:</h4>
                    <ul style="text-align: left; color: rgba(255,255,255,0.8);">
                        <li>📧 Welcome guide sent to your email</li>
                        <li>🎯 Preparation materials included</li>
                        <li>📅 Launch notification coming soon</li>
                        <li>💡 Join our consultant community forum</li>
                    </ul>
                `;
            }
        }
    }

    triggerDownload() {
        // Simulate file download
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,Thank you for your interest in the SquareStair Media Consultant Program! Your Consultant Readiness Blueprint will be available in the final implementation.';
        link.download = 'consultant-readiness-blueprint.txt';
        link.click();
        
        this.showNotification('Download started! Check your downloads folder.', 'success');
        
        quantum.trackInteraction('blueprint_downloaded', link);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.quantum-notification');
        existingNotifications.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = 'quantum-notification';
        
        const colors = {
            success: '#06ffa5',
            error: '#ef4444',
            warning: '#fbbf24',
            info: '#00d4ff'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 3000;
           background: var(--glass-bg);
           backdrop-filter: var(--glass-backdrop);
           border: 1px solid ${colors[type]};
           border-left: 4px solid ${colors[type]};
           border-radius: 12px;
           padding: 1rem 1.5rem;
           color: var(--ghost-white);
           font-weight: 500;
           max-width: 400px;
           box-shadow: var(--shadow-quantum);
           transform: translateX(100%);
           transition: all 0.4s var(--ease-quantum);
           opacity: 0;
       `;
       
       notification.innerHTML = `
           <div style="display: flex; align-items: center; gap: 0.75rem;">
               <div style="color: ${colors[type]}; font-size: 1.25rem;">
                   ${type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ'}
               </div>
               <span>${message}</span>
           </div>
       `;

       document.body.appendChild(notification);

       // Animate in
       requestAnimationFrame(() => {
           notification.style.transform = 'translateX(0)';
           notification.style.opacity = '1';
       });

       // Auto remove
       setTimeout(() => {
           notification.style.transform = 'translateX(100%)';
           notification.style.opacity = '0';
           setTimeout(() => notification.remove(), 400);
       }, 4000);
   }
}

// SCROLL PROGRESS SYSTEM
class ScrollProgress {
   constructor() {
       this.progressFill = document.getElementById('progress-fill');
       this.sections = document.querySelectorAll('section[id]');
       this.currentSection = '';
       
       this.init();
   }

   init() {
       this.bindEvents();
       this.update();
   }

   bindEvents() {
       let ticking = false;
       
       window.addEventListener('scroll', () => {
           if (!ticking) {
               requestAnimationFrame(() => {
                   this.update();
                   this.updateSectionTracking();
                   ticking = false;
               });
               ticking = true;
           }
       });
   }

   update() {
       const scrollTop = window.pageYOffset;
       const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
       const scrollProgress = Math.min(scrollTop / documentHeight, 1);
       
       if (this.progressFill) {
           this.progressFill.style.width = `${scrollProgress * 100}%`;
       }

       // Update scroll depth for analytics
       quantum.scrollDepth = Math.max(quantum.scrollDepth, scrollProgress);
   }

   updateSectionTracking() {
       const scrollTop = window.pageYOffset + window.innerHeight / 2;
       
       this.sections.forEach(section => {
           const sectionTop = section.offsetTop;
           const sectionBottom = sectionTop + section.offsetHeight;
           
           if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
               const sectionId = section.getAttribute('id');
               if (sectionId !== this.currentSection) {
                   this.currentSection = sectionId;
                   quantum.trackInteraction('section_viewed', section, { 
                       sectionId,
                       scrollDepth: quantum.scrollDepth 
                   });
               }
           }
       });
   }
}

// INTERACTION ENHANCERS
class InteractionEnhancers {
   constructor() {
       this.init();
   }

   init() {
       this.setupButtonEnhancers();
       this.setupCardHovers();
       this.setupMagneticElements();
       this.setupParallaxElements();
       this.setupLoadingStates();
   }

   setupButtonEnhancers() {
       document.querySelectorAll('.quantum-btn').forEach(btn => {
           btn.addEventListener('mouseenter', (e) => this.createButtonRipple(e));
           btn.addEventListener('click', (e) => this.createClickEffect(e));
       });
   }

   createButtonRipple(event) {
       const btn = event.currentTarget;
       const rect = btn.getBoundingClientRect();
       const x = event.clientX - rect.left;
       const y = event.clientY - rect.top;

       const ripple = document.createElement('div');
       ripple.style.cssText = `
           position: absolute;
           left: ${x}px;
           top: ${y}px;
           width: 0;
           height: 0;
           background: rgba(255, 255, 255, 0.3);
           border-radius: 50%;
           transform: translate(-50%, -50%);
           animation: btnRipple 0.6s ease-out;
           pointer-events: none;
           z-index: 1;
       `;

       btn.appendChild(ripple);

       // Add animation if not exists
       if (!document.querySelector('#btn-ripple-styles')) {
           const style = document.createElement('style');
           style.id = 'btn-ripple-styles';
           style.textContent = `
               @keyframes btnRipple {
                   to {
                       width: 200px;
                       height: 200px;
                       opacity: 0;
                   }
               }
           `;
           document.head.appendChild(style);
       }

       setTimeout(() => ripple.remove(), 600);
   }

   createClickEffect(event) {
       const btn = event.currentTarget;
       
       // Create burst particles
       for (let i = 0; i < 6; i++) {
           const particle = document.createElement('div');
           const angle = (i / 6) * Math.PI * 2;
           const velocity = 50 + Math.random() * 30;
           
           particle.style.cssText = `
               position: absolute;
               left: 50%;
               top: 50%;
               width: 4px;
               height: 4px;
               background: var(--electric-blue);
               border-radius: 50%;
               pointer-events: none;
               z-index: 10;
           `;
           
           btn.appendChild(particle);
           
           const deltaX = Math.cos(angle) * velocity;
           const deltaY = Math.sin(angle) * velocity;
           
           particle.animate([
               { 
                   transform: 'translate(-50%, -50%) scale(1)',
                   opacity: 1 
               },
               { 
                   transform: `translate(${deltaX - 50}%, ${deltaY - 50}%) scale(0)`,
                   opacity: 0 
               }
           ], {
               duration: 800,
               easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
           }).onfinish = () => particle.remove();
       }

       quantum.trackInteraction('button_clicked', btn, {
           buttonText: btn.textContent.trim()
       });
   }

   setupCardHovers() {
       document.querySelectorAll('.benefit-card, .pathway-card, .stat-card').forEach(card => {
           card.addEventListener('mouseenter', (e) => this.enhanceCardHover(e));
           card.addEventListener('mouseleave', (e) => this.resetCardHover(e));
           card.addEventListener('mousemove', (e) => this.updateCardTilt(e));
       });
   }

   enhanceCardHover(event) {
       const card = event.currentTarget;
       const glow = card.querySelector('.benefit-glow, .stat-glow');
       
       if (glow) {
           glow.style.opacity = '0.4';
       }

       // Add floating effect
       card.style.transform = 'translateY(-12px) scale(1.02)';
       card.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
   }

   resetCardHover(event) {
       const card = event.currentTarget;
       const glow = card.querySelector('.benefit-glow, .stat-glow');
       
       if (glow) {
           glow.style.opacity = '0';
       }

       card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
   }

   updateCardTilt(event) {
       const card = event.currentTarget;
       const rect = card.getBoundingClientRect();
       const x = event.clientX - rect.left;
       const y = event.clientY - rect.top;
       
       const centerX = rect.width / 2;
       const centerY = rect.height / 2;
       
       const rotateX = (y - centerY) / 20;
       const rotateY = (centerX - x) / 20;
       
       card.style.transform = `
           translateY(-12px) 
           scale(1.02) 
           rotateX(${rotateX}deg) 
           rotateY(${rotateY}deg)
       `;
   }

   setupMagneticElements() {
       document.querySelectorAll('.quantum-btn--primary').forEach(btn => {
           btn.addEventListener('mousemove', (e) => this.createMagneticEffect(e));
           btn.addEventListener('mouseleave', (e) => this.resetMagneticEffect(e));
       });
   }

   createMagneticEffect(event) {
       const btn = event.currentTarget;
       const rect = btn.getBoundingClientRect();
       const x = event.clientX - rect.left - rect.width / 2;
       const y = event.clientY - rect.top - rect.height / 2;
       
       const distance = Math.sqrt(x * x + y * y);
       const maxDistance = 100;
       
       if (distance < maxDistance) {
           const force = (maxDistance - distance) / maxDistance;
           const moveX = (x / distance) * force * 8;
           const moveY = (y / distance) * force * 8;
           
           btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
       }
   }

   resetMagneticEffect(event) {
       const btn = event.currentTarget;
       btn.style.transform = 'translate(0, 0) scale(1)';
   }

   setupParallaxElements() {
       const parallaxElements = document.querySelectorAll('.neural-orb, .floating-geometry');
       
       window.addEventListener('scroll', () => {
           const scrollTop = window.pageYOffset;
           
           parallaxElements.forEach(element => {
               const speed = element.dataset.speed || 0.5;
               const yPos = -(scrollTop * speed);
               element.style.transform = `translateY(${yPos}px)`;
           });
       });
   }

   setupLoadingStates() {
       // Add loading states to all forms
       document.querySelectorAll('form').forEach(form => {
           form.addEventListener('submit', (e) => {
               const submitBtn = form.querySelector('button[type="submit"]');
               if (submitBtn && !submitBtn.disabled) {
                   this.showButtonLoading(submitBtn);
               }
           });
       });
   }

   showButtonLoading(button) {
       const originalContent = button.innerHTML;
       button.dataset.originalContent = originalContent;
       
       button.innerHTML = `
           <span>Processing...</span>
           <div class="quantum-spinner"></div>
       `;
       button.disabled = true;
       
       // Add spinner styles if not exists
       if (!document.querySelector('#quantum-spinner-styles')) {
           const style = document.createElement('style');
           style.id = 'quantum-spinner-styles';
           style.textContent = `
               .quantum-spinner {
                   width: 20px;
                   height: 20px;
                   border: 2px solid rgba(255,255,255,0.3);
                   border-top: 2px solid var(--electric-blue);
                   border-radius: 50%;
                   animation: quantumSpin 1s linear infinite;
               }
           `;
           document.head.appendChild(style);
       }
   }

   resetButtonLoading(button) {
       const originalContent = button.dataset.originalContent;
       if (originalContent) {
           button.innerHTML = originalContent;
           button.disabled = false;
       }
   }
}

// MODAL SYSTEM
class ModalSystem {
   constructor() {
       this.activeModal = null;
       this.init();
   }

   init() {
       this.bindEvents();
   }

   bindEvents() {
       // Close modal buttons
       document.querySelectorAll('.modal-close').forEach(btn => {
           btn.addEventListener('click', () => this.closeModal());
       });

       // Close on backdrop click
       document.querySelectorAll('.modal-overlay').forEach(overlay => {
           overlay.addEventListener('click', (e) => {
               if (e.target === overlay) {
                   this.closeModal();
               }
           });
       });

       // Close on escape key
       document.addEventListener('keydown', (e) => {
           if (e.key === 'Escape' && this.activeModal) {
               this.closeModal();
           }
       });

       // Payment form submission
       document.getElementById('payment-form')?.addEventListener('submit', (e) => {
           this.handlePaymentSubmission(e);
       });
   }

   openModal(modalId) {
       const modal = document.getElementById(modalId);
       if (modal) {
           this.activeModal = modal;
           modal.classList.add('active');
           document.body.style.overflow = 'hidden';
           
           // Focus first input
           const firstInput = modal.querySelector('input');
           if (firstInput) {
               setTimeout(() => firstInput.focus(), 300);
           }

           quantum.trackInteraction('modal_opened', modal, { modalId });
       }
   }

   closeModal() {
       if (this.activeModal) {
           this.activeModal.classList.remove('active');
           document.body.style.overflow = '';
           
           quantum.trackInteraction('modal_closed', this.activeModal);
           this.activeModal = null;
       }
   }

   async handlePaymentSubmission(event) {
       event.preventDefault();
       
       const form = event.target;
       const submitBtn = form.querySelector('button[type="submit"]');
       
       // Show loading
       const originalContent = submitBtn.innerHTML;
       submitBtn.innerHTML = `
           <span>Processing Payment...</span>
           <div class="quantum-spinner"></div>
       `;
       submitBtn.disabled = true;

       try {
           // Simulate payment processing
           await new Promise(resolve => setTimeout(resolve, 3000));
           
           // Success - close modal and show success
           this.closeModal();
           quantum.selectedPathway = 'premium';
           
           const formProgression = new FormProgression();
           formProgression.showApplicationForm();
           
           // Show success notification
           const enhancers = new InteractionEnhancers();
           enhancers.showNotification = FormProgression.prototype.showNotification;
           enhancers.showNotification('Payment successful! Priority access secured.', 'success');
           
           quantum.trackInteraction('payment_completed', form, {
               amount: 8.95,
               currency: 'CAD'
           });
           
       } catch (error) {
           console.error('Payment error:', error);
           
           const enhancers = new InteractionEnhancers();
           enhancers.showNotification = FormProgression.prototype.showNotification;
           enhancers.showNotification('Payment failed. Please try again.', 'error');
           
           // Restore button
           submitBtn.innerHTML = originalContent;
           submitBtn.disabled = false;
       }
   }
}

// PERFORMANCE OPTIMIZER
class PerformanceOptimizer {
   constructor() {
       this.isHighPerformanceDevice = this.detectPerformance();
       this.init();
   }

   detectPerformance() {
       // Simple performance detection
       const nav = navigator;
       const memory = nav.deviceMemory || 4; // Default to 4GB
       const cores = nav.hardwareConcurrency || 4; // Default to 4 cores
       const connection = nav.connection;
       
       let score = memory * 2 + cores;
       
       if (connection) {
           const effectiveType = connection.effectiveType;
           if (effectiveType === '4g') score += 2;
           else if (effectiveType === '3g') score += 1;
       }
       
       return score > 12; // Arbitrary threshold
   }

   init() {
       this.optimizeAnimations();
       this.optimizeParticles();
       this.setupReducedMotion();
   }

   optimizeAnimations() {
       if (!this.isHighPerformanceDevice) {
           // Reduce animation complexity on lower-end devices
           document.documentElement.style.setProperty('--animation-duration', '0.3s');
           
           // Disable some particle effects
           const particles = document.querySelectorAll('.particle');
           particles.forEach((particle, index) => {
               if (index % 2 === 0) particle.remove();
           });
       }
   }

   optimizeParticles() {
       // Adjust particle count based on device performance
       const container = document.getElementById('particle-stream');
       if (container && window.particleSystem) {
           const optimalCount = this.isHighPerformanceDevice ? 35 : 15;
           window.particleSystem.maxParticles = optimalCount;
           window.particleSystem.adjustParticleCount();
       }
   }

   setupReducedMotion() {
       // Respect user's motion preferences
       const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
       
       if (prefersReducedMotion.matches) {
           document.body.classList.add('reduced-motion');
           
           // Disable all animations
           const style = document.createElement('style');
           style.textContent = `
               .reduced-motion *,
               .reduced-motion *::before,
               .reduced-motion *::after {
                   animation-duration: 0.01ms !important;
                   animation-iteration-count: 1 !important;
                   transition-duration: 0.01ms !important;
               }
           `;
           document.head.appendChild(style);
       }
   }
}

// ANALYTICS & OPTIMIZATION
class AnalyticsSystem {
   constructor() {
       this.sessionId = this.generateSessionId();
       this.startTime = Date.now();
       this.events = [];
       
       this.init();
   }

   generateSessionId() {
       return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
   }

   init() {
       this.trackSession();
       this.setupExitIntent();
       this.setupEngagement();
   }

   trackSession() {
       // Track session start
       this.logEvent('session_start', {
           sessionId: this.sessionId,
           userAgent: navigator.userAgent,
           viewport: `${window.innerWidth}x${window.innerHeight}`,
           referrer: document.referrer,
           timestamp: Date.now()
       });

       // Track session end on page unload
       window.addEventListener('beforeunload', () => {
           this.logEvent('session_end', {
               sessionId: this.sessionId,
               duration: Date.now() - this.startTime,
               scrollDepth: quantum.scrollDepth,
               interactions: quantum.interactions.length
           });
       });
   }

   setupExitIntent() {
       let hasTriggered = false;
       
       document.addEventListener('mouseleave', (e) => {
           if (e.clientY <= 0 && !hasTriggered) {
               hasTriggered = true;
               this.logEvent('exit_intent', {
                   timeOnPage: Date.now() - this.startTime,
                   scrollDepth: quantum.scrollDepth,
                   currentSection: document.querySelector('section[id]')?.id
               });
               
               // Could trigger exit-intent popup here
               // this.showExitIntentModal();
           }
       });
   }

   setupEngagement() {
       // Track engagement milestones
       const milestones = [30, 60, 120, 300]; // seconds
       
       milestones.forEach(milestone => {
           setTimeout(() => {
               this.logEvent('engagement_milestone', {
                   milestone: milestone,
                   scrollDepth: quantum.scrollDepth,
                   interactions: quantum.interactions.length
               });
           }, milestone * 1000);
       });
   }

   logEvent(eventType, data) {
       const event = {
           type: eventType,
           data: data,
           timestamp: Date.now()
       };
       
       this.events.push(event);
       
       // Send to your analytics service
       // Example: Google Analytics 4
       if (typeof gtag !== 'undefined') {
           gtag('event', eventType, data);
       }
       
       // Example: Send to your custom analytics endpoint
       // this.sendToAnalytics(event);
   }

   async sendToAnalytics(event) {
       try {
           await fetch('/api/analytics', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(event)
           });
       } catch (error) {
           console.warn('Analytics tracking failed:', error);
       }
   }
}

// INITIALIZATION SYSTEM
class QuantumInitializer {
   constructor() {
       this.systems = [];
       this.isInitialized = false;
   }

   async init() {
       if (this.isInitialized) return;
       
       try {
           // Initialize core systems
           await this.initializeCore();
           await this.initializeEnhancements();
           await this.initializeOptimizations();
           
           // Mark as initialized
           this.isInitialized = true;
           quantum.isInitialized = true;
           
           // Fire initialization complete event
           document.dispatchEvent(new CustomEvent('quantumInitialized'));
           
           console.log('🚀 Quantum systems online - conversion optimization active!');
           
       } catch (error) {
           console.error('❌ Quantum initialization failed:', error);
       }
   }

   async initializeCore() {
       // Particle system
       const particleContainer = document.getElementById('particle-stream');
       if (particleContainer) {
           window.particleSystem = new ParticleSystem(particleContainer);
           this.systems.push(window.particleSystem);
       }

       // Neural orb
       const neuralOrb = document.getElementById('neural-orb');
       if (neuralOrb) {
           new NeuralOrb(neuralOrb);
       }

       // Form progression
       window.formProgression = new FormProgression();
       this.systems.push(window.formProgression);

       // Scroll progress
       new ScrollProgress();

       // Modal system
       window.modalSystem = new ModalSystem();
       this.systems.push(window.modalSystem);
   }

   async initializeEnhancements() {
       // Interaction enhancers
       new InteractionEnhancers();

       // Performance optimizer
       new PerformanceOptimizer();

       // Analytics system
       if (typeof gtag !== 'undefined' || window.location.hostname !== 'localhost') {
           new AnalyticsSystem();
       }
   }

   async initializeOptimizations() {
       // Preload critical resources
       this.preloadCriticalResources();

       // Setup intersection observers for lazy loading
       this.setupLazyLoading();

       // Optimize images
       this.optimizeImages();
   }

   preloadCriticalResources() {
       // Preload critical fonts
       const fontPreload = document.createElement('link');
       fontPreload.rel = 'preload';
       fontPreload.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&display=swap';
       fontPreload.as = 'style';
       document.head.appendChild(fontPreload);
   }

   setupLazyLoading() {
       // Lazy load non-critical sections
       const lazyElements = document.querySelectorAll('.benefit-card, .pathway-card');
       
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   entry.target.classList.add('loaded');
                   observer.unobserve(entry.target);
               }
           });
       }, { threshold: 0.1 });

       lazyElements.forEach(el => observer.observe(el));
   }

   optimizeImages() {
       // Add loading="lazy" to images below the fold
       const images = document.querySelectorAll('img');
       images.forEach((img, index) => {
           if (index > 2) { // Skip hero images
               img.loading = 'lazy';
           }
       });
   }

   destroy() {
       // Cleanup all systems
       this.systems.forEach(system => {
           if (system.destroy) system.destroy();
       });
       
       // Clear quantum state
       quantum.animations.clear();
       quantum.observers.clear();
       
       this.isInitialized = false;
       quantum.isInitialized = false;
   }
}

// STARTUP SEQUENCE
document.addEventListener('DOMContentLoaded', async () => {
   // Initialize quantum systems
   const initializer = new QuantumInitializer();
   await initializer.init();
   
   // Setup global error handling
   window.addEventListener('error', (e) => {
       console.error('Quantum system error:', e.error);
       
       // Track errors for optimization
       if (quantum.isInitialized) {
           quantum.trackInteraction('error', null, {
               message: e.message,
               filename: e.filename,
               lineno: e.lineno
           });
       }
   });
   
   // Setup global quantum access for debugging
   if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
       window.quantum = quantum;
       window.quantumSystems = initializer.systems;
       console.log('🔬 Quantum debug mode enabled - window.quantum available');
   }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
   module.exports = {
       QuantumState,
       ParticleSystem,
       FormProgression,
       ModalSystem,
       QuantumInitializer
   };
}
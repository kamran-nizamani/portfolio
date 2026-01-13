document.addEventListener('DOMContentLoaded', () => {
    // Navbar Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Secret Wave Game Logic
    const initGame = () => {
        const canvas = document.getElementById('waveCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        // Game State - Random Target
        let targetFreq = Math.floor((Math.random() * 0.03 + 0.01) * 1000) / 1000; // 0.01 to 0.04
        let targetAmp = Math.floor(Math.random() * 60) + 30; // 30 to 90
        
        // Initial Phase
        let phase = 0;
        let unlocked = false;

        // DOM Elements
        const freqSlider = document.getElementById('freqSlider');
        const ampSlider = document.getElementById('ampSlider');
        const freqValue = document.getElementById('freqValue');
        const ampValue = document.getElementById('ampValue');
        const matchPercent = document.getElementById('matchPercent');
        const lockStatus = document.getElementById('lockStatus');
        
        const targetFreqHint = document.getElementById('targetFreqHint');
        const targetAmpHint = document.getElementById('targetAmpHint');
        
        const gameUI = document.getElementById('secretGameUI');
        const revealedUI = document.getElementById('secretRevealedUI');
        const lockBtn = document.getElementById('lockBtn');

        // Initial Hint Set
        if (targetFreqHint) targetFreqHint.textContent = targetFreq.toFixed(3);
        if (targetAmpHint) targetAmpHint.textContent = targetAmp;

        function resetGame() {
            unlocked = false;
            phase = 0;
            
            // Randomize Target again
            targetFreq = Math.floor((Math.random() * 0.03 + 0.01) * 1000) / 1000;
            targetAmp = Math.floor(Math.random() * 60) + 30;
            
            // Update Hints
            if (targetFreqHint) targetFreqHint.textContent = targetFreq.toFixed(3);
            if (targetAmpHint) targetAmpHint.textContent = targetAmp;
            
            // Reset UI Visibility
            if (gameUI) gameUI.classList.remove('hidden');
            if (revealedUI) revealedUI.classList.add('hidden');
            
            // Reset Badge
            if (lockStatus) {
                lockStatus.classList.remove('unlocked');
                lockStatus.classList.add('locked');
                lockStatus.innerHTML = '<i class="fas fa-lock"></i> LOCKED';
            }
        }

        if (lockBtn) {
            lockBtn.addEventListener('click', resetGame);
        }

        function draw() {
            // Handle canvas resize
            if (canvas.width !== canvas.parentElement.offsetWidth) {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
            }

            ctx.clearRect(0, 0, width, height);

            // Get User Values
            const userFreq = freqSlider.value / 2000; 
            const userAmp = parseInt(ampSlider.value);

            // Update UI Labels
            if (freqValue) freqValue.textContent = userFreq.toFixed(3);
            if (ampValue) ampValue.textContent = userAmp;

            const centerY = height / 2;

            // 1. Draw Target Wave (Green)
            ctx.beginPath();
            ctx.strokeStyle = '#2ecc71'; // Green
            ctx.lineWidth = 4;
            ctx.globalAlpha = 0.6;
            for (let x = 0; x < width; x++) {
                const y = centerY + Math.sin(x * targetFreq + phase) * targetAmp;
                (x === 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.globalAlpha = 1.0;

            // 2. Draw User Wave (Cyan)
            ctx.beginPath();
            ctx.strokeStyle = '#00f2ff'; // Cyan
            ctx.lineWidth = 3;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f2ff';
            for (let x = 0; x < width; x++) {
                const y = centerY + Math.sin(x * userFreq + phase) * userAmp;
                (x === 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            // 3. Calculate Match
            const freqDiff = Math.abs(userFreq - targetFreq);
            const ampDiff = Math.abs(userAmp - targetAmp);
            
            const freqScore = Math.max(0, 1 - (freqDiff / 0.01)); 
            const ampScore = Math.max(0, 1 - (ampDiff / 30));

            let totalMatch = Math.floor((freqScore * 0.6 + ampScore * 0.4) * 100);
            if (totalMatch > 100) totalMatch = 100;
            if (totalMatch < 0) totalMatch = 0;

            if (matchPercent) matchPercent.textContent = totalMatch;

            // Win Condition
            if (totalMatch >= 95 && !unlocked) {
                unlocked = true;
                
                // Show Unlocked UI
                setTimeout(() => {
                    if (gameUI) gameUI.classList.add('hidden');
                    if (revealedUI) revealedUI.classList.remove('hidden');
                    
                    if (lockStatus) {
                        lockStatus.classList.remove('locked');
                        lockStatus.classList.add('unlocked');
                        lockStatus.innerHTML = '<i class="fas fa-lock-open"></i> UNLOCKED';
                    }
                }, 500);
            }

            // Animate Phase
            phase += 0.15;
            requestAnimationFrame(draw);
        }

        draw();
    };

    initGame();

    // Scroll Animations (IntersectionObserver)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .cert-card, .section-title-glow, .hero-content, .about-content, .contact-wrapper');
    animateElements.forEach(el => {
        el.style.opacity = '0'; // Hide initially for animation
        observer.observe(el);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Message sent successfully! (This is a demo)');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
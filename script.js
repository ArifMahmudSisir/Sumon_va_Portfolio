document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile nav when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once it has animated in
            }
        });
    }, observerOptions);

    // Select all elements with the 'hidden' class
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Navbar style on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // Interactive Hover Effect for Project Cards and Glass Cards (3D Tilt effect)
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            // Calculate rotation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // Wait for transition
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
    });

    // Space Starfield Animation
    const canvas = document.getElementById('space-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const stars = [];
        const numStars = 200;
        
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                vx: Math.floor(Math.random() * 50) - 25,
                vy: Math.floor(Math.random() * 50) - 25,
                twinkleSpeed: Math.random() * 0.05 + 0.01,
                alpha: Math.random()
            });
        }
        
        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < stars.length; i++) {
                let s = stars[i];
                
                // Twinkle
                s.alpha += s.twinkleSpeed;
                if (s.alpha > 1 || s.alpha < 0.1) {
                    s.twinkleSpeed = -s.twinkleSpeed;
                }
                
                // Slow drift
                s.x += s.vx / 100;
                s.y += s.vy / 100;
                
                // Wrap around edges
                if (s.x < 0) s.x = canvas.width;
                if (s.x > canvas.width) s.x = 0;
                if (s.y < 0) s.y = canvas.height;
                if (s.y > canvas.height) s.y = 0;
                
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
                ctx.fill();
            }
            
            requestAnimationFrame(drawStars);
        }
        
        drawStars();
    
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Shooting Stars Animation
    function createShootingStar() {
        const starContainer = document.getElementById('shooting-stars');
        if (!starContainer) return;
        
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        
        // Random starting position along the top or left half
        if (Math.random() > 0.5) {
            star.style.top = Math.random() * (window.innerHeight / 2) + 'px';
            star.style.left = '-150px';
        } else {
            star.style.top = '-150px';
            star.style.left = Math.random() * (window.innerWidth / 2) + 'px';
        }
        
        starContainer.appendChild(star);
        
        // Remove after animation completes (3 seconds)
        setTimeout(() => {
            star.remove();
        }, 3000);
    }

    // Create a shooting star randomly every 2 to 5 seconds
    setInterval(() => {
        if (Math.random() > 0.3) {
            createShootingStar();
        }
    }, 2000);

});

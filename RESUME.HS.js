  // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Skill level animation on hover
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });

        // Download resume function
        function downloadResume() {
            // Create a new window with print styles
            const printWindow = window.open('', '_blank');
            const resumeContent = document.documentElement.outerHTML;
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Bhavik Kumar Patel - Resume</title>
                    <style>
                        ${document.querySelector('style').innerHTML}
                        @media print {
                            body { background: white !important; padding: 0 !important; }
                            .container { box-shadow: none !important; margin: 0 !important; }
                            .btn-download { display: none !important; }
                            .header::before { display: none !important; }
                            * { animation: none !important; }
                        }
                    </style>
                </head>
                <body>
                    ${document.querySelector('.container').outerHTML}
                </body>
                </html>
            `);
            
            printWindow.document.close();
            
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }

        // Add typing effect to name
        const nameElement = document.querySelector('.name');
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);

        // Add floating animation to contact items
        document.querySelectorAll('.contact-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('fade-in');
        });

        // Dynamic skill level colors
        const skillLevels = document.querySelectorAll('.skill-level');
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
        
        skillLevels.forEach((level, index) => {
            level.style.background = colors[index % colors.length];
        });

        // Add progress bar animation to projects
        document.querySelectorAll('.project-item').forEach((project, index) => {
            project.style.animationDelay = `${index * 0.1}s`;
            project.addEventListener('mouseenter', function() {
                this.style.borderLeftWidth = '8px';
                this.style.transition = 'all 0.3s ease';
            });
            
            project.addEventListener('mouseleave', function() {
                this.style.borderLeftWidth = '4px';
            });
        });

        // Add scroll progress indicator
        const scrollProgress = document.createElement('div');
        scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(scrollProgress);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = scrolled + '%';
        });

        console.log('🚀 Resume loaded successfully! Interactive features enabled.')
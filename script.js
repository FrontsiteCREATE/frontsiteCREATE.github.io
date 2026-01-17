// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initNavigation();
    initAnimations();
    initBackToTop();
    initTypewriterEffect();
    initCounterAnimation();
    
    // Запуск частиц
    createParticles();
});

// Навигация
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Переключение мобильного меню
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Плавная прокрутка для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимации при скролле
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Анимация для элементов "О нас"
                if (entry.target.classList.contains('about-item')) {
                    const delay = entry.target.dataset.delay || '0';
                    entry.target.style.transitionDelay = `${delay}s`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.service-card, .about-item, .contact-card, .stat-card').forEach((card, index) => {
        observer.observe(card);
    });
}

// Анимация счетчиков
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-count');
                        const count = +counter.innerText.replace('+', '');
                        
                        if (count < target) {
                            counter.innerText = Math.ceil(count + target / speed) + '+';
                            setTimeout(updateCount, 1);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };
                    
                    updateCount();
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.about-stats'));
}

// Кнопка "Наверх"
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
            setTimeout(() => {
                if (!backToTopBtn.classList.contains('show')) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Эффект печатающегося текста
function initTypewriterEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        }
        
        // Запускаем с небольшой задержкой
        setTimeout(typeWriter, 1000);
    }
}

// Создание частиц
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные параметры
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const color = Math.random() > 0.5 ? 'rgba(0, 212, 255, ' : 'rgba(255, 41, 117, ';
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Стилизация
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color}${opacity});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticle ${duration}s linear ${delay}s infinite;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Добавляем CSS анимацию для частиц
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Параллакс эффект для фона
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const particles = document.querySelector('.particles');
    const gradientCircle = document.querySelector('.gradient-circle');
    
    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
    
    if (gradientCircle) {
        gradientCircle.style.transform = `rotate(${scrolled * 0.05}deg)`;
    }
});

// Эффект свечения при наведении на кнопки
document.querySelectorAll('.btn-primary, .btn-secondary, .contact-link').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    });
});

// Анимация логотипа при скролле
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const logo = document.querySelector('.logo');
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        logo.style.transform = 'scale(0.9)';
        logo.style.opacity = '0.8';
    } else {
        logo.style.transform = 'scale(1)';
        logo.style.opacity = '1';
    }
    
    lastScroll = currentScroll;
});

// Клик по ссылкам Telegram с анимацией
document.querySelectorAll('.contact-link[href*="t.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Создаем эффект пульсации
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 0.5s';
        }, 10);
        
        // Открываем в новой вкладке
        window.open(this.href, '_blank');
    });
});

// Добавляем hover эффект для карточек услуг
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon i');
        icon.style.transform = 'rotate(360deg) scale(1.2)';
        icon.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon i');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});

// Эффект волны при клике на кнопки
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Создаем элемент волны
        const wave = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        wave.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        this.appendChild(wave);
        
        // Удаляем элемент после анимации
        setTimeout(() => {
            wave.remove();
        }, 600);
    });
});

// Добавляем стиль для ripple эффекта
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
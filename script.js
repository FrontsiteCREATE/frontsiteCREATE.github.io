// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация темы
    initTheme();
    
    // Инициализация экрана загрузки
    initLoader();
    
    // Инициализация всех компонентов
    initNavigation();
    initScrollAnimations();
    initBackToTop();
    initTypewriterEffect();
    initCounterAnimation();
    initParallax();
    initServiceAnimations();
    
    // Запуск частиц
    createParticles();
    
    // Добавляем плавный скролл для всех якорных ссылок
    initSmoothScroll();
});

// Инициализация темы
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Устанавливаем сохраненную тему
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'light';
    
    // Обработчик переключения темы
    themeToggle.addEventListener('change', function() {
        const theme = this.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Анимация переключения
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        
        // Обновляем цвета частиц
        if (theme === 'light') {
            document.querySelector('.particles').style.backgroundImage = `
                radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 41, 117, 0.05) 0%, transparent 50%)
            `;
        } else {
            document.querySelector('.particles').style.backgroundImage = `
                radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 41, 117, 0.1) 0%, transparent 50%)
            `;
        }
    });
}

// Экран загрузки
function initLoader() {
    const loader = document.querySelector('.loader');
    const progressBar = document.querySelector('.loader-progress');
    
    // Анимация прогресс-бара с плавным движением
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10 + 5; // Более плавное увеличение
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Скрываем экран загрузки с задержкой
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                    
                    // Запускаем анимации после загрузки
                    setTimeout(() => {
                        initScrollAnimations();
                        initCounterAnimation();
                    }, 300);
                }, 500);
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 50);
}

// Навигация с анимацией скрытия/появления
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;
    
    // Управление навигацией при скролле
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Показываем/скрываем навигацию
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        // Добавляем класс для уменьшения паддинга при скролле
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Подсветка активного раздела
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        lastScroll = currentScroll;
    });
    
    // Переключение мобильного меню
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Анимация для ссылок в меню
        if (navMenu.classList.contains('active')) {
            navLinks.forEach((link, index) => {
                link.style.animation = `slideInRight 0.3s ease forwards ${index * 0.1}s`;
                link.style.opacity = '0';
                setTimeout(() => {
                    link.style.animation = '';
                    link.style.opacity = '1';
                }, 500);
            });
        }
    });
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight + 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Добавляем эффект пульсации
                this.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
        });
    });
}

// Анимации при скролле с плавными переходами
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-item, .service-card, .contact-card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем задержку для каждого элемента
                const delay = Array.from(animatedElements).indexOf(entry.target) * 0.1;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Анимация счетчиков с плавным увеличением
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-count');
                    const duration = 2000; // 2 секунды
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };
                    
                    updateCounter();
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.about-stats'));
}

// Кнопка "Наверх" с плавной анимацией
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.classList.remove('visible');
            setTimeout(() => {
                if (!backToTopBtn.classList.contains('visible')) {
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
        
        // Анимация кнопки
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
}

// Эффект печатающегося текста
function initTypewriterEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Запускаем после загрузки
    setTimeout(typeWriter, 1500);
}

// Параллакс эффект
function initParallax() {
    const parallaxElements = document.querySelectorAll('.particles, .gradient-circle');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = index === 0 ? 0.05 : 0.02;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Анимации для карточек услуг
function initServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'rotateY(360deg) scale(1.2)';
            }
            
            // Эффект поднятия
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'rotateY(0deg) scale(1)';
            }
            
            // Возвращаем позицию
            setTimeout(() => {
                this.style.zIndex = '';
            }, 300);
        });
    });
}

// Создание частиц с улучшенной анимацией
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Случайные параметры
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.2 + 0.05;
        const blur = Math.random() * 2 + 0.5;
        
        // Определяем цвет в зависимости от темы
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const color = Math.random() > 0.5 ? 
            (isLight ? 'rgba(41, 196, 255, ' : 'rgba(41, 196, 255, ') : 
            (isLight ? 'rgba(255, 41, 117, ' : 'rgba(255, 41, 117, ');
        
        // Стилизация
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color}${opacity});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            filter: blur(${blur}px);
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
            will-change: transform, opacity;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Добавляем CSS анимацию для частиц
    if (!document.querySelector('#particles-style')) {
        const style = document.createElement('style');
        style.id = 'particles-style';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                10%, 90% {
                    opacity: ${document.documentElement.getAttribute('data-theme') === 'light' ? '0.3' : '0.6'};
                }
                50% {
                    transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(1.2);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Эффект волны при клике на кнопки
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .contact-link')) {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const wave = document.createElement('span');
        wave.className = 'ripple';
        wave.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        button.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 600);
    }
});

// Добавляем CSS для ripple эффекта
if (!document.querySelector('#ripple-style')) {
    const rippleStyle = document.createElement('style');
    rippleStyle.id = 'ripple-style';
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Анимация при наведении на иконки в футере
const footerIcons = document.querySelectorAll('.footer-tech i');
footerIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.3) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Плавное появление элементов при загрузке
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Анимация для заголовка
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        word.style.animationDelay = `${0.2 + index * 0.2}s`;
    });
});

// Оптимизация анимаций для мобильных устройств
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
    // Уменьшаем количество частиц на мобильных
    const particles = document.querySelectorAll('.particle');
    if (particles.length > 30) {
        for (let i = 30; i < particles.length; i++) {
            particles[i].remove();
        }
    }
    
    // Отключаем сложные анимации на слабых устройствах
    document.querySelectorAll('.service-card, .contact-card').forEach(card => {
        card.style.willChange = 'auto';
    });
}

// Обработка изменения ориентации экрана
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, window.scrollY);
    }, 100);
});

// Обновление частиц при изменении темы
document.getElementById('theme-toggle').addEventListener('change', function() {
    setTimeout(() => {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.remove();
        });
        createParticles();
    }, 300);
});

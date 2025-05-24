document.addEventListener('DOMContentLoaded', function() {
    // Слайдер
    if (document.querySelector('.hero-slider')) {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 0;
        let slideInterval;
        
        // Создаем точки для навигации
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        
        // Функция для показа слайда
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Следующий слайд
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Переход к конкретному слайду
        function goToSlide(n) {
            clearInterval(slideInterval);
            showSlide(n);
            startSlideShow();
        }
        
        // Запуск слайд-шоу
        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Остановка слайд-шоу
        function pauseSlideShow() {
            clearInterval(slideInterval);
        }
        
        // Запускаем слайд-шоу
        startSlideShow();
        
        // Пауза при наведении
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', pauseSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);
    }
    
    // Валидация формы
    if (document.getElementById('application-form')) {
        const form = document.getElementById('application-form');
        const successMessage = document.getElementById('success-message');
        
        // Валидация телефона
        function validatePhone(phone) {
            const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            return regex.test(phone);
        }
        
        // Маска для телефона
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 1) value = value.substring(1);
                if (value.length > 0) value = '+7 (' + value;
                if (value.length > 7) value = value.substring(0, 7) + ') ' + value.substring(7);
                if (value.length > 12) value = value.substring(0, 12) + '-' + value.substring(12);
                if (value.length > 15) value = value.substring(0, 15) + '-' + value.substring(15);
                e.target.value = value;
            });
        }
        
        // Обработка отправки формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Валидация группы
            const group = document.getElementById('group');
            const groupError = document.getElementById('group-error');
            if (!group.value) {
                groupError.textContent = 'Пожалуйста, выберите группу';
                groupError.style.display = 'block';
                isValid = false;
            } else {
                groupError.style.display = 'none';
            }
            
            // Валидация направления
            const direction = document.getElementById('direction');
            const directionError = document.getElementById('direction-error');
            if (!direction.value) {
                directionError.textContent = 'Пожалуйста, выберите направление';
                directionError.style.display = 'block';
                isValid = false;
            } else {
                directionError.style.display = 'none';
            }
            
            // Валидация имени родителя
            const parentName = document.getElementById('parent-name');
            const parentNameError = document.getElementById('parent-name-error');
            if (!parentName.value || parentName.value.length < 3) {
                parentNameError.textContent = 'Имя должно содержать не менее 3 символов';
                parentNameError.style.display = 'block';
                isValid = false;
            } else {
                parentNameError.style.display = 'none';
            }
            
            // Валидация телефона
            const phone = document.getElementById('phone');
            const phoneError = document.getElementById('phone-error');
            if (!phone.value || !validatePhone(phone.value)) {
                phoneError.textContent = 'Введите телефон в формате +7 (XXX) XXX-XX-XX';
                phoneError.style.display = 'block';
                isValid = false;
            } else {
                phoneError.style.display = 'none';
            }
            
            // Если форма валидна
            if (isValid) {
                // Здесь обычно отправка формы на сервер
                // Для демонстрации просто покажем сообщение
                successMessage.classList.add('show');
                
                // Сбрасываем форму
                form.reset();
                
                // Скрываем сообщение через 5 секунд
                setTimeout(function() {
                    successMessage.classList.remove('show');
                }, 5000);
            }
        });
    }
    
    // Версия для слабовидящих
    const visuallyImpairedBtn = document.querySelector('.btn-visually-impaired');
    if (visuallyImpairedBtn) {
        visuallyImpairedBtn.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            
            // Сохраняем настройку в localStorage
            if (document.body.classList.contains('high-contrast')) {
                localStorage.setItem('highContrast', 'enabled');
            } else {
                localStorage.setItem('highContrast', 'disabled');
            }
        });
        
        // Проверяем настройку при загрузке
        if (localStorage.getItem('highContrast') === 'enabled') {
            document.body.classList.add('high-contrast');
        }
    }
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
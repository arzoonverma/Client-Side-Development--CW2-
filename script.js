document.addEventListener('DOMContentLoaded', () => {

    /* ===== Hero Typing Effect (Home Page) ===== */
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading) {
        let text = heroHeading.textContent;
        heroHeading.textContent = '';
        let i = 0;
        function typeEffect() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeEffect, 80);
            }
        }
        typeEffect();
    }

    /* ===== Cards Fade-in Animation (Destinations Page) ===== */
    const cards = document.querySelectorAll('.card');
    window.addEventListener('scroll', () => {
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 50) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = `all 0.8s ease-out ${index * 0.1}s`;
            }
        });
    });

    /* ===== LocalStorage Auto-Fill for Name ===== */
    const nameFields = document.querySelectorAll('#bname, #cname');
    nameFields.forEach(field => {
        if (localStorage.getItem('userName')) {
            field.value = localStorage.getItem('userName');
        }
        field.addEventListener('input', () => {
            localStorage.setItem('userName', field.value);
        });
    });

    /* ===== Booking Form Validation ===== */
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let name = document.getElementById('bname').value.trim();
            let email = document.getElementById('bemail').value.trim();
            let phone = document.getElementById('bphone').value.trim();
            let date = document.getElementById('bdate').value;
            let guests = document.getElementById('bguests').value;
            let msg = document.getElementById('bookingMessage');

            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let phonePattern = /^[0-9]{10,15}$/;

            let today = new Date().toISOString().split('T')[0];
            if (date < today) {
                msg.textContent = '❌ Date cannot be in the past.';
                msg.style.color = 'red';
                return;
            }
            if (!emailPattern.test(email)) {
                msg.textContent = '❌ Please enter a valid email.';
                msg.style.color = 'red';
                return;
            }
            if (!phonePattern.test(phone)) {
                msg.textContent = '❌ Please enter a valid phone number.';
                msg.style.color = 'red';
                return;
            }
            if (guests < 1) {
                msg.textContent = '❌ Number of guests must be at least 1.';
                msg.style.color = 'red';
                return;
            }

            msg.textContent = '✅ Thank you! Your booking has been confirmed.';
            msg.style.color = '#0077b6';
            bookingForm.reset();
        });
    }

    /* ===== Contact Form Validation ===== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let name = document.getElementById('cname').value.trim();
            let email = document.getElementById('cemail').value.trim();
            let messageField = document.getElementById('cmessage').value.trim();
            let msg = document.getElementById('contactMessage');

            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                msg.textContent = '❌ Please enter a valid email.';
                msg.style.color = 'red';
                return;
            }
            if (messageField.length < 5) {
                msg.textContent = '❌ Message must be at least 5 characters.';
                msg.style.color = 'red';
                return;
            }

            msg.textContent = '✅ Thank you! Your message has been sent.';
            msg.style.color = '#0077b6';
            contactForm.reset();
        });
    }

});

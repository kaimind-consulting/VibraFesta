// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (!slides.length || !dots.length) return;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

if (slides.length > 0) {
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            mobileMenu.classList.remove('active');
        }
    });
});

// Lógica del Modal y Formulario de Postulación
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const applicationModal = document.getElementById('applicationModal');
const applicationForm = document.getElementById('applicationForm');
const successMessage = document.getElementById('form-success-message');

function openModal() {
    applicationModal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeModal() {
    applicationModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

applicationModal.addEventListener('click', (event) => {
    if (event.target === applicationModal) {
        closeModal();
    }
});

// Manejo del envío del formulario (CORREGIDO)
applicationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(applicationForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const submitButton = applicationForm.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let jsonResponse = await response.json();
            if (response.status == 200) {
                // ÉXITO
                applicationForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Después de 4 segundos, resetea el formulario y cierra el modal
                setTimeout(() => {
                    applicationForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar Postulación';
                    applicationForm.style.display = 'block';
                    successMessage.style.display = 'none';
                    closeModal();
                }, 4000);

            } else {
                // ERROR DE LA API (ej. CAPTCHA inválido)
                console.log(response);
                // Intenta mostrar un mensaje más específico de la API, si no, uno genérico.
                alert(jsonResponse.message || 'Hubo un error. Por favor, completa el CAPTCHA e intenta de nuevo.');
                
                // Habilita el botón de nuevo para que el usuario pueda reintentar
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Postulación';
            }
        })
        .catch(error => {
            // ERROR DE RED
            console.log(error);
            alert('Hubo un error de conexión. Por favor, intenta de nuevo.');
            
            // Habilita el botón de nuevo para que el usuario pueda reintentar
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Postulación';
        });
});

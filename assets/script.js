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
    if (!slides.length || !dots.length) return; // Evita errores si no hay slider
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

    // Auto slide change
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
            
            // Close mobile menu if open
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

// Función para abrir el modal
function openModal() {
    applicationModal.classList.add('active');
    document.body.classList.add('modal-open');
}

// Función para cerrar el modal
function closeModal() {
    applicationModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Asignar eventos a los botones
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Cerrar el modal si se hace clic fuera del contenido
applicationModal.addEventListener('click', (event) => {
    if (event.target === applicationModal) {
        closeModal();
    }
});

// Manejo del envío del formulario
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
                applicationForm.style.display = 'none';
                successMessage.style.display = 'block';
            } else {
                console.log(response);
                alert('Hubo un error al enviar tu postulación. Por favor, intenta de nuevo.');
            }
        })
        .catch(error => {
            console.log(error);
            alert('Hubo un error al enviar tu postulación. Por favor, intenta de nuevo.');
        })
        .finally(() => {
            setTimeout(() => {
                applicationForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Postulación';
                applicationForm.style.display = 'block';
                successMessage.style.display = 'none';
                closeModal();
            }, 4000);
        });
});
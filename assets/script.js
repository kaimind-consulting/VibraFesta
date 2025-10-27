document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

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
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Lógica del Modal de Postulación (APERTURA Y CIERRE)
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const applicationModal = document.getElementById('applicationModal');

    // Función para cerrar el modal
    function closeModal() {
        if (applicationModal) {
            applicationModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    if (openModalBtn && closeModalBtn && applicationModal) {
        // Función para abrir el modal
        function openModal() {
            applicationModal.classList.add('active');
            document.body.classList.add('modal-open');
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
    }

    // SE HA ELIMINADO EL BLOQUE applicationForm.addEventListener('submit', ...)
    // El formulario ahora se envía directamente a través del atributo 'action' en el HTML.

});
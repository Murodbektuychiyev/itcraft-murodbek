document.addEventListener('DOMContentLoaded', () => {
    // Scroll animatsiyasini boshqarish
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Elementning 20% ko'ringanida animatsiyani boshlash
    });

    const animateElements = document.querySelectorAll('.animate');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // "Murodbek Tuychiyev" ism animatsiyasi
    const nameContainer = document.querySelector('.name-container');
    const name = nameContainer.getAttribute('aria-label');
    
    function animateName() {
        if (!nameContainer || !name) return;
        
        nameContainer.innerHTML = '';
        
        for (let i = 0; i < name.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = name[i] === ' ' ? '\u00A0' : name[i];
            charSpan.classList.add('char');
            charSpan.style.animationDelay = `${i * 0.05}s`;
            nameContainer.appendChild(charSpan);
        }
        
        // Ism animatsiyasi tugagach, kasb animatsiyasini boshlash
        const totalNameAnimationTime = (name.length * 50) + 1000;
        setTimeout(() => {
            animateJobTitle();
        }, totalNameAnimationTime);
    }
    
    // Kasb yozuvini o'zgartirish animatsiyasi
    const jobTitles = ["Frontend Dasturchi", "Python Dasturchi", "Git/GitHub Master"];
    const typewriter = document.querySelector('.typewriter');
    let jobIndex = 0;

    function animateJobTitle() {
        if (!typewriter) return;

        const currentTitle = jobTitles[jobIndex];
        
        typewriter.textContent = '';
        typewriter.classList.add('typing-animation');

        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < currentTitle.length) {
                typewriter.textContent += currentTitle.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    eraseJobTitle();
                }, 1500); // Yozuvni 1.5 soniya ushlab turish
            }
        }, 80); // Yozish tezligi
    }

    function eraseJobTitle() {
        if (!typewriter) return;

        let currentTitle = typewriter.textContent;
        let charIndex = currentTitle.length;

        const erasingInterval = setInterval(() => {
            if (charIndex >= 0) {
                typewriter.textContent = currentTitle.substring(0, charIndex);
                charIndex--;
            } else {
                clearInterval(erasingInterval);
                jobIndex = (jobIndex + 1) % jobTitles.length;
                animateJobTitle();
            }
        }, 50); // O'chirish tezligi
    }
    
    // Boshlang'ich animatsiyani ishga tushirish
    animateName();

    // "Back to Top" tugmasini boshqarish
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = 1;
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = 0;
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Modal oynani boshqarish
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-btn");

    const openModalBtns = document.querySelectorAll('.open-image');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = btn.getAttribute('data-img');
            
            modal.style.display = "flex";
            modalImg.src = imgSrc;
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});

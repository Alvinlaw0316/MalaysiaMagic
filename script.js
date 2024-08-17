document.addEventListener('DOMContentLoaded', () => {
    
    let preferences = JSON.parse(localStorage.getItem('cookie-preferences'));
    let email = localStorage.getItem('user-email');  // Retrieve email from local storage

    if (!preferences) {
        document.getElementById('cookie-modal').style.display = 'block';
    }

    document.getElementsByClassName('close')[0].onclick = function() {
        document.getElementById('cookie-modal').style.display = 'none';
    }

    window.savePreferences = function() {
        let preferences = {
            essential: true,
            functional: document.getElementById('functional').checked,
            analytics: document.getElementById('analytics').checked,
            advertising: document.getElementById('advertising').checked
        };
        localStorage.setItem('cookie-preferences', JSON.stringify(preferences));

        let userEmail = document.getElementById('user-email').value;  // Assuming you have an input field for the email
        if (userEmail) {
            localStorage.setItem('user-email', userEmail);  // Store email in local storage
        }

        document.getElementById('cookie-modal').style.display = 'none';
    }

    window.rejectAll = function() {
        let preferences = {
            essential: true,
            functional: false,
            analytics: false,
            advertising: false
        };
        localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
        localStorage.removeItem('user-email');  // Remove email if all cookies are rejected
        document.getElementById('cookie-modal').style.display = 'none';
    }

    // Burger menu functionality
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Hero slider functionality
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Optional: Auto-play
    setInterval(nextSlide, 6000);  // Change slide every 6 seconds

    // Touch event for slider
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });
});

function scrollFunction() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    // Check if the page is scrolled more than 20px
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block"; // Show the button
    } else {
        scrollToTopBtn.style.display = "none"; // Hide the button
    }
}

// Add the scroll event listener to monitor when the user scrolls
window.onscroll = function() { scrollFunction(); };

// Add a click event listener to the scroll-to-top button
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    scrollToTopBtn.addEventListener('click', function() {
        // Smoothly scroll to the top of the page when the button is clicked
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});


// when clicking on a dish image
// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and caption elements in the modal
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

// Function to open the modal
function openModal(img) {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() { 
    modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//class:carousel-image button
let slideIndices = {};

function changeSlide(n, location) {
    if (!slideIndices[location]) {
        slideIndices[location] = 0;
    }
    showSlides(slideIndices[location] += n, location);
}

function showSlides(n, location) {
    let carousel = document.querySelector(`.image-carousel[data-location="${location}"]`);
    let slides = carousel.getElementsByClassName("carousel-image");
    
    if (n >= slides.length) { slideIndices[location] = 0 }
    if (n < 0) { slideIndices[location] = slides.length - 1 }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[slideIndices[location]].classList.add("active");
}


document.addEventListener('DOMContentLoaded', () => {
    let carousels = document.querySelectorAll('.image-carousel');
    carousels.forEach(carousel => {
        let location = carousel.dataset.location;
        slideIndices[location] = 0;
        showSlides(0, location);
    });
});



class Slider {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.track = this.container.querySelector('.slider-track');
        this.items = Array.from(this.track.children);
        this.leftButton = this.container.querySelector('.left-button');
        this.rightButton = this.container.querySelector('.right-button');
        this.itemWidth = this.items[0].offsetWidth + 20; 
        this.currentIndex = 0;

        this.initButtons();
        this.updateButtons();
    }

    initButtons() {
        this.rightButton.addEventListener('click', () => this.slide(1));
        this.leftButton.addEventListener('click', () => this.slide(-1));
    }

    slide(direction) {
        this.currentIndex = Math.max(0, Math.min(this.currentIndex + direction, this.items.length - 1));
        this.track.style.transform = `translateX(-${this.itemWidth * this.currentIndex}px)`;
        this.updateButtons();
    }

    updateButtons() {
        this.leftButton.disabled = this.currentIndex === 0;
        this.rightButton.disabled = this.currentIndex === this.items.length - 1;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new Slider('payment-methods-slider');
    new Slider('sim-slider');
});






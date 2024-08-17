
//hidden part for feedback issue category
document.addEventListener('DOMContentLoaded', (event) => {
    const issueCategory = document.getElementById('issueCategory');
    const ratingSection = document.getElementById('ratingSection');
    const travelDate= document.getElementById('travelDate');

    issueCategory.addEventListener('change', (event) => {
        if (event.target.value === 'feedback') {
            ratingSection.style.display = 'block';
            travelDate.style.display= 'block';
        } else {
            ratingSection.style.display = 'none';
            travelDate.style.display= 'none';
        }
    });
});

//faq hidden and show
function toggleAnswer(element) {
    element.classList.toggle('open');
}
//close all faq answer
function closeAllFaqs() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.classList.remove('open');
    });
}

//session storage to recover user input while accidentally close
document.addEventListener("DOMContentLoaded", function() {
    // Define form fields and hidden features
    const formFields = ['subject', 'userName', 'userEmail', 'userTel', 'issueCategory', 'userComments'];
    const hiddenFields = ['rating', 'travelDate'];

    // Restore form field values
    formFields.forEach(field => {
        const savedValue = sessionStorage.getItem(field);
        if (savedValue) {
            document.getElementById(field).value = savedValue;
        }
    });

    // Restore hidden field values and visibility
    hiddenFields.forEach(field => {
        const savedValue = sessionStorage.getItem(field);
        if (savedValue) {
            document.getElementById(field).value = savedValue;
        }
    });

    // Restore visibility state of hidden fields based on the issue category
    const issueCategory = document.getElementById('issueCategory');
    const ratingSection = document.getElementById('ratingSection');
    const travelDate = document.getElementById('travelDate');

    if (sessionStorage.getItem('issueCategory') === 'feedback') {
        ratingSection.style.display = 'block';
        travelDate.style.display = 'block';
    } else {
        ratingSection.style.display = 'none';
        travelDate.style.display = 'none';
    }

    // Add event listeners to save values to sessionStorage
    formFields.forEach(field => {
        document.getElementById(field).addEventListener('input', function() {
            sessionStorage.setItem(field, this.value);
        });
    });

    hiddenFields.forEach(field => {
        document.getElementById(field).addEventListener('input', function() {
            sessionStorage.setItem(field, this.value);
        });
    });

    issueCategory.addEventListener('change', function() {
        const selectedValue = this.value;
        sessionStorage.setItem('issueCategory', selectedValue);
        if (selectedValue === 'feedback') {
            ratingSection.style.display = 'block';
            travelDate.style.display = 'block';
        } else {
            ratingSection.style.display = 'none';
            travelDate.style.display = 'none';
        }
    });

    // Clear sessionStorage on form submit
    document.getElementById('Qform').addEventListener('submit', function() {
        formFields.forEach(field => sessionStorage.removeItem(field));
        hiddenFields.forEach(field => sessionStorage.removeItem(field));
        sessionStorage.removeItem('issueCategory');
    });
});





//function for the news and blogs page 
//filter the categories of blogs types
function filterPosts(category) {
    const allPosts = document.querySelectorAll('.blog-post');
    allPosts.forEach(post => {
        if (category === 'all' || post.classList.contains(category)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function toggleDetails(post) {
    post.classList.toggle('open');
}


function openModal(element) {
    const modal = document.getElementById('modal');
    const modalDetails = document.getElementById('modal-details');
    const img = element.querySelector('img').src;
    const title = element.querySelector('h3').textContent;
    const name = element.getAttribute('data-name');
    const date = element.getAttribute('data-date');
    const rating = element.getAttribute('data-rating');
    const comments = element.getAttribute('data-comments');

    // Populate modal content
    modalDetails.innerHTML = `
        <img src="${img}" alt="Blog Image" style="width: 100%; height: auto;">
        <h2>${title}</h2>
        <p><strong>Guest:</strong> ${name}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Rating:</strong> ${rating}</p>
        <p><strong>Comments:</strong> ${comments}</p>
    `;

    // Show modal
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

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
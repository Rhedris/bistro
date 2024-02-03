//Loader
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader--hidden");
  
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
});




// Navbar
window.addEventListener('scroll', function() {
    var header = document.querySelector('.nav');
    var newTop = Math.max(-20, 50 - window.scrollY);
    header.style.top = newTop + 'px';
});

window.addEventListener('scroll', function() {
    var header = document.querySelector('.nav');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll up button 

document.addEventListener("DOMContentLoaded", function() {
    var scrollUpBtn = document.getElementById("scrollUpBtn");
  
    window.addEventListener("scroll", function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollUpBtn.style.display = "block";
        } else {
            scrollUpBtn.style.display = "none";
        }
    });
  
    scrollUpBtn.addEventListener("click", function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    });
});


// Gallery

var galleryImages = [
    "fotky/1.jpg",
    "fotky/2.jpg",
    "fotky/3.jpg",
    "fotky/4.jpg",
    "fotky/9.jpg",
    "fotky/10.jpg",
    "fotky/11.jpg",
    "fotky/12.jpg"
];

var currentImageIndex = 0;

function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
}

function openFullScreen() {
    var fullScreenOverlay = document.getElementById("fullScreenOverlay");
    var fullScreenImage = document.getElementById("fullScreenImage");
    var navBar = document.querySelector('.nav'); 

    fullScreenImage.src = galleryImages[currentImageIndex];
    fullScreenOverlay.style.display = "flex";

    navBar.classList.add('hide-navbar');
    disableScroll();
}

window.addEventListener("wheel", function (event) {

    var fullScreenOverlay = document.getElementById("fullScreenOverlay");
    if (fullScreenOverlay.style.display === "flex") {
        event.preventDefault(); 

        if (event.deltaY > 0) {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        } else {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        }

        updateImage();
    }
});

function closeFullScreen() {
    var fullScreenOverlay = document.getElementById("fullScreenOverlay");
    var navBar = document.querySelector('.nav'); 

    fullScreenOverlay.style.display = "none";

    navBar.classList.remove('hide-navbar');
    enableScroll();
}


function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateImage();
}

function updateImage() {
    var fullScreenImage = document.getElementById("fullScreenImage");
    fullScreenImage.src = galleryImages[currentImageIndex];
}


document.getElementById("prevButton").addEventListener("click", prevImage);
document.getElementById("nextButton").addEventListener("click", nextImage);


//copy function

function copyToClipboard(element) {
    const textToCopy = element.innerText.trim();
    
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); 
    
    document.execCommand('copy');
    
    document.body.removeChild(tempInput);

    const rect = element.getBoundingClientRect();
    
    const notification = document.getElementById('notification');
    notification.innerHTML = 'zkopírováno';
    notification.style.display = 'block';
    notification.style.top = (rect.top + 10) + 'px';
    notification.style.left = (rect.left + 20) + 'px';
    notification.style.opacity = '1'; 

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 2000);
}

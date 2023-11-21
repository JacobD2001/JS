//get all elements from html
const pauseButton = document.getElementById('pauseButton'); //shift + alt + down arrow for ctrl + d
const resumeButton = document.getElementById('resumeButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const dots = document.querySelectorAll('.dot');


let slideIndex = 1; //declare variable which follows current slide
showSlides(slideIndex); //show slide with current slide

// set time interval for 3s
sliderInterval = setInterval(() => {
    showSlides(slideIndex +=1); // go to next slide +1
}, 3000);

//pause the interval
pauseButton.addEventListener('click', () => {
    clearInterval(sliderInterval);
});

//set the interval for 3 s
resumeButton.addEventListener('click', () => {
    sliderInterval = setInterval(() => {
        showSlides(slideIndex +=1);
    }, 3000);
});

// Next/previous events clicked
prevButton.addEventListener('click', () => {
    showSlides(slideIndex -= 1);
});

nextButton.addEventListener('click', () => {
    showSlides(slideIndex += 1);
});

//shift + alt + a for commenting

// Go to selected slide(dots)
dots.forEach(dot => {
    dot.addEventListener('click', function () {
        currentSlide(parseInt(this.getAttribute('data-slide-index')));
    });
});

//function for showing current slide
function currentSlide(n) {
    showSlides(slideIndex = n);
}

//Showing the right slide
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 } //for example for 4. slide go to the first one in this case
    if (n < 1) { slideIndex = slides.length } //if you click prev on first slide go to the last one
    //hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //removing 'active' class which is used to indicate which slide is currently chosen
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    //make chosen slide visible
    slides[slideIndex - 1].style.display = "block";
    //make dot for chosen slide visible
    dots[slideIndex - 1].className += " active";
}

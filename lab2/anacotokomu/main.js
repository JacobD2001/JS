
let slideIndex = 1; //declare variable which follows current slide
showSlides(slideIndex); //show slide with current slide

// set time interval for 3s
setInterval(() => {
  plusSlides(1); // go to next slide +1
}, 3000); 

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Go to selected slide(dots)
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//Showing the right slide
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} //for example for 4. slide go to the first one in this case
  if (n < 1) {slideIndex = slides.length} //if you click prev on first slide go to the last one
  //hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  //removing 'active' class which is used to indicate which slide is currently chosen
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  //make chosen slide visible
  slides[slideIndex-1].style.display = "block";
  //make dot for chosen slide visible
  dots[slideIndex-1].className += " active";
}
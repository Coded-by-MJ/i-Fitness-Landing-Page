

const locations = {

     lagos: ["Agungi", "Jakande", "Obagada", "Ikorodu", "Lekki Phase 1", "Maruwa",
            "Onikan", "Sangotedo", "VGC", "Ikeja GRA", "Yaba", "Surulere", "Opebi",
            "Magodo", "Festac", "Ogba", "Egbeda"
     ],

     abuja: ["Gwarinpa"],
     pH: ["Trans Amadi"],
     ibadan: ["Ring Road"]

}

const programsImages = {
      
    exercise: 'images/exercise.png',
    community: 'images/community.png',
    facilities: 'images/facilities.png'
}



function hamburger(){
   if(!$("#menu").is(":visible")){
    $(".nav-links").removeClass('mobile--nav-links');
      return;
   } 

    if($("#menu").prop("checked")){
        $(".nav-links").addClass('mobile--nav-links');
        $(".join-btn").slideDown();
    }else{
        $(".nav-links").removeClass('mobile--nav-links');
        $(".join-btn").slideUp();
    }
}




function showLocations(e) {

    if ($(e.target).is(".mobile-location-wrapper") || $(e.target).closest(".mobile-location-wrapper").length ||
    $(e.target).is(".desktop-location-wrapper") || $(e.target).closest(".desktop-location-wrapper").length) {
        return;
    }


    $(".gym").toggleClass("open");

    if($(".gym").hasClass("open") && $(".desktop-location-wrapper").is(":visible")){
        openDesktopCities();
    }

}
      



function openMobileCities(e){

    if($(e.target).is(".area") || $(e.target).closest(".area").length){
         return;
    }


    $(this).siblings().removeClass("open");

    $(this).toggleClass("open");

    const cityisOpened = $(this).hasClass("open");
    

    if(cityisOpened){

       const city = e.currentTarget.dataset.city;
             // Check if the .area element already exists
        if ($(this).find(".area").length === 0) {
               // Create the .area element
                const area = $("<ul>");
                 area.addClass('area');

           // Populate the .area element with city locations
              area.html(`
                 ${locations[city].map(place => `
                     <li>${place}</li>
                      `).join('')}
                 `);

                 $(this).append(area);
 
         }

    }else {
        // If the clicked element does not have the 'open' class, remove the .area element
        $(this).find(".area").remove();
   
    }

}






function openDesktopCities(){

    $(this).siblings().removeClass("open");

    $(this).addClass("open");

    const cityisOpened = $(".states > .city.open") || $(this).hasClass("open");

    const area = $(".states-wrapper > .area");
    
     area.html('');

    if(cityisOpened){
        const city = $(".states > .city.open")[0].dataset.city;

           area.html(`
              ${locations[city].map(place => `
                  <li>${place}</li>
                   `).join('')}
              `);

             
      }else{
          area.html('');
      }

 };





function openSingleDetail(){

    const openDetail = $('details[open]');
    const currentDetail = $(this);

     if(currentDetail[0].open){
        $('details').not(currentDetail).each(function(){
            $(this).removeAttr('open');
        })
       const picture = currentDetail[0].dataset.picture;
       $(".programs-bg").html(`<img src=${programsImages[picture]} title=${picture}>`)
     
     }

     if(!currentDetail[0].open && openDetail.length < 1 ){
        currentDetail[0].open = true;
     }

}















const carousel = $(".classes-carousel");
let isDown = false;
let startX;
let scrollLeft;

function handleMouseDown(e) {
    isDown = true;
    startX = e.pageX - carousel[0].offsetLeft;
    scrollLeft = carousel.scrollLeft();

   
}

function handleTouchStart(e) {
    isDown = true;
    startX = e.touches[0].pageX - carousel[0].offsetLeft;
    scrollLeft = carousel.scrollLeft();
    // console.log(startX, scrollLeft)
}


function handleMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel[0].offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft(scrollLeft - walk);

}


function handleTouchMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - carousel[0].offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft(scrollLeft - walk);
   
   
}

function isDownState(){
    isDown = false;
}




function nextCard() {
    const scrollLeft = carousel.scrollLeft();
    const viewportWidth = carousel[0].offsetWidth;
    const carouselWidth = carousel[0].scrollWidth;

    // Calculate the amount to scroll (adjust as needed)
    const scrollAmount = viewportWidth / 2;

    // Calculate the remaining space to scroll
    const remainingScroll = carouselWidth - scrollLeft - viewportWidth;

    if (remainingScroll > 0) {
        // If there's remaining space, scroll by the specified amount
        carousel.scrollLeft(scrollLeft + scrollAmount);
    }else{
        return;
    }
}






function prevCard() {
    const scrollLeft = carousel.scrollLeft();
    const viewportWidth = carousel[0].offsetWidth;

    // Calculate the amount to scroll (adjust as needed)
    const scrollAmount = viewportWidth / 2;

    if (scrollLeft > 0) {
        // If not at the beginning, scroll by the specified amount
        carousel.scrollLeft(scrollLeft - scrollAmount);
    } else {
         return;
    }
}









const customerCard =  $('.reviews-wrapper > .review-card')
const totalWidth =  Math.floor(customerCard.width() *  (customerCard.length - 2.5));

$('.reviews-wrapper').css('width', totalWidth);





function debounce(func, wait = 35, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }


const headings = document.querySelectorAll('.about-txt > h2, .classes-content > h3, .news-content > h3, .cust-content > h3');

function checkSlide() {
headings.forEach(heading => {

  const slideInAt = window.scrollY + window.innerHeight;
        const headingBottom = heading.offsetTop + heading.offsetHeight;
        const isFullyShown = slideInAt > heading.offsetTop && window.scrollY < headingBottom;



  if (isFullyShown) {
    heading.classList.add('active');
  } else {
    heading.classList.remove('active');
  }
});
}

window.addEventListener('scroll', debounce(checkSlide));















$("#menu").on("change", hamburger);
$(".gym").click(showLocations);

$(".mobile-location-wrapper > .city").click(openMobileCities);

$(".states > .city").on({
    "click": openDesktopCities,
    "mouseover": openDesktopCities
    });


$('details').on('toggle', openSingleDetail)


 
    

carousel.on({
    "mousedown": handleMouseDown,
    "touchstart": handleTouchStart,
    "mousemove": handleMouseMove,
    "touchmove": handleTouchMove,
    "mouseleave": isDownState,
    "mouseup": isDownState,
    "touchend": isDownState,
     

})

$(document).on({
    "mouseup": isDownState,
    "mousemove": handleMouseMove
})

$(".left-btn").on("click", prevCard);
$(".right-btn").on("click", nextCard);

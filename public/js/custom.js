$(function(){
	$('.video_view_slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider_btm_allss'
    });
    $('.slider_btm_allss').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: '.video_view_slider',
      dots: false,
        nextArrow:'.slidNext',
      prevArrow:'.slidPrv',
        responsive: [
  {
      breakpoint: 992,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '15px',
        slidesToShow: 5
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 4
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '10px',
        slidesToShow: 3
      }
    }
  ]
    });
    
    
    
	$('.all_pro_slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
        dots: true,
    });
    
    /* all slider start */
    $('.product_slides').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
        nextArrow:'.slidNext_2',
      prevArrow:'.slidPrv_2',
        arrows: true,
        responsive: [
  {
      breakpoint: 992,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '15px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '10px',
        slidesToShow: 1
      }
    }
  ]
    });
    
    
    /* all slider start */
    $('.expo_bike_slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
        responsive: [
  {
      breakpoint: 992,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '15px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '10px',
        slidesToShow: 1
      }
    }
  ]
    });
    
     $('.venobox').venobox(); 
    
});
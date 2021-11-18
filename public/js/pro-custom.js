$(function(){
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

    $('.expo_bike_slider_uae').slick({
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
    
    /* all slider start */
    $('.rev_sliders').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
        arrows:false,
        centerMode: true,
       
    });
    /* all slider start */
    $('.product_spe_slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
        arrows:false,
        autoPlay: false,
        dots: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
       
    });
    
    
       
    $('#communitymode').click(function() {
       if($('#communitymode').is(':checked')) { 
            $(".product_hero_txt").hide();
       }
    });
    
    $('#communitsymode').click(function() {
       if($('#communitsymode').is(':checked')) { 
            $(".product_hero_txt").show();
       }
    });
    $('#communitymode').click(function() {
       if($('#communitymode').is(':checked')) { 
            $(".product_hero_txts").show();
       }
    });
    
    $('#communitsymode').click(function() {
       if($('#communitsymode').is(':checked')) { 
            $(".product_hero_txts").hide();
       }
    });
    


    
});
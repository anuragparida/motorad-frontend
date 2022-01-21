$(function(){
    
    var navpos = $('.navbar_static').offset();
      console.log(navpos.top);
        $(window).bind('scroll', function() {
          if ($(window).scrollTop() > navpos.top) {
           $('.navbar_static').addClass('fixedd');
           }
           else {
             $('.navbar_static').removeClass('fixedd');
           }
        });
    
});
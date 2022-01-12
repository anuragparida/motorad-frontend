$(function () {
  // pageLoader()
  $('.bolt').each(function (e) {

    var bolt = $(this),
      div = $(this).children('div');

    bolt.addClass('animate');

    var tween = new TimelineMax({
      onComplete() {
        bolt.removeClass('animate');
        repeat();
      }
    }).set(div, {
      rotation: 360
    }).to(div, .7, {
      y: 80,
      rotation: 370
    }).to(div, .6, {
      y: -140,
      rotation: 20
    }).to(div, .1, {
      rotation: -24,
      y: 80
    }).to(div, .8, {
      ease: Back.easeOut.config(1.6),
      rotation: 0,
      y: 0
    });

    function repeat() {
      setTimeout(() => {
        bolt.addClass('animate');
        tween.restart();
      }, 400);
    }

  })

  $(".video_view_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider_btm_allss",
    infinite: true,
  });
  $(".slider_btm_allss").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: ".video_view_slider",
    dots: false,
    nextArrow: ".slidNext",
    prevArrow: ".slidPrv",
    infinite: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: "15px",
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: "0px",
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "10px",
          slidesToShow: 3,
        },
      },
    ],
  });

  $(".all_pro_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  });

  /* all slider start */
  $(".product_slides").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: ".slidNext_2",
    prevArrow: ".slidPrv_2",
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: "15px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: "0px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "10px",
          slidesToShow: 1,
        },
      },
    ],
  });


  $('.expo_bike_slider_uae').slick({
    infinite: true,
    slidesToShow: 4,
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
  // $(".expo_bike_slider").not('.slick-initialized').slick()
  // $(".expo_bike_slider").slick({
  //   infinite: true,
  //   slidesToShow: 3,
  //   autoplay:true,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         autoplay:true,
  //         arrows: false,
  //         centerMode: false,
  //         centerPadding: "15px",
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         arrows: false,
  //         centerMode: false,
  //         centerPadding: "0px",
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: "10px",
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // });

  $(".venobox").venobox();
});
function pageLoader() {
  $('.bolt').each(function (e) {

    var bolt = $(this),
      div = $(this).children('div');

    bolt.addClass('animate');

    var tween = new TimelineMax({
      onComplete() {
        bolt.removeClass('animate');
        repeat();
      }
    }).set(div, {
      rotation: 360
    }).to(div, .7, {
      y: 80,
      rotation: 370
    }).to(div, .6, {
      y: -140,
      rotation: 20
    }).to(div, .1, {
      rotation: -24,
      y: 80
    }).to(div, .8, {
      ease: Back.easeOut.config(1.6),
      rotation: 0,
      y: 0
    });

    function repeat() {
      setTimeout(() => {
        bolt.addClass('animate');
        tween.restart();
      }, 400);
    }

  })

}

function cartSliderInit(n) {
  $(".product_slidess").slick({
    infinite: true,
    slidesToShow: n,
    slidesToScroll: 1,
    nextArrow: ".slidNext_2",
    prevArrow: ".slidPrv_2",
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: "15px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: "0px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "10px",
          slidesToShow: 1,
        },
      },
    ],
  });
}

function showSecondForm() {
  $("#exampleModalLong").modal("hide");
  $("#exampleModal").modal("show");
}

function hideCartModal() {
  $("#exampleModalLong").modal("hide");
}

function aboutUsReadMore() {
  $(".moreless-button").click(function () {
    $(".moretext").slideToggle();
    if ($(".moreless-button").text() == "Read more") {
      $(this).text("Read less");
    } else {
      $(this).text("Read more");
    }
  });

  $(".moreless-button1").click(function () {
    $(".moretext1").slideToggle();
    if ($(".moreless-button1").text() == "Read more") {
      $(this).text("Read less");
    } else {
      $(this).text("Read more");
    }
  });
  $(".moreless-button2").click(function () {
    $(".moretext2").slideToggle();
    if ($(".moreless-button2").text() == "Read more") {
      $(this).text("Read less");
    } else {
      $(this).text("Read more");
    }
  });
  $(".moreless-button3").click(function () {
    $(".moretext3").slideToggle();
    if ($(".moreless-button3").text() == "Read more") {
      $(this).text("Read less");
    } else {
      $(this).text("Read more");
    }
  });
}

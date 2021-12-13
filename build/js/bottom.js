window.addEventListener('load', function () {
    jQuery('.explore_bttn').click(function () {
        gtag('event', 'click', {
            'event_category': 'button',
            'event_label': 'buy now'
        });
    });
    jQuery('.d-none.d-lg-block h6 a').click(function () {
        gtag('event', 'click', {
            'event_category': 'button',
            'event_label': 'buy now'
        });
    });
    jQuery('.total_invo_btn').click(function () {
        gtag('event', 'click', {
            'event_category': 'button',
            'event_label': 'checkout'
        });
    });
});
window.addEventListener('load', function () {
    jQuery('.test_ride_submit_btn').click(function () {
        var x = 0;
        var myVar = setInterval(function () {
            if (x == 0) {
                if (jQuery('.test_ride_succes_wrap').is(":visible")) {
                    gtag('event', 'book', {
                        'event_category': 'form',
                        'event_label': 'test drive'
                    });

                    clearInterval(myVar);
                    x = 1;
                }
            }
        }, 1000);
    });
});

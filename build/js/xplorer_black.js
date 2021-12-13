(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'emotorad.myshopify.com',
      storefrontAccessToken: '30d6ccbc02723e616059bb371989487f',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: '7449124569332',
        node: document.getElementById('product-component-1639054990993'),
        moneyFormat: '%C2%A5%7B%7Bamount_no_decimals%7D%7D',
        options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px"
        }
      },
      "button": {
        "font-weight": "bold",
        "font-size": "13px",
        "padding-top": "14.5px",
        "padding-bottom": "14.5px",
        "color": "#10b068",
        ":hover": {
          "color": "#10b068",
          "background-color": "#e6e6e6"
        },
        "background-color": "#ffffff",
        ":focus": {
          "background-color": "#e6e6e6"
        },
        "border-radius": "0px",
        "padding-left": "4px",
        "padding-right": "4px"
      },
      "quantityInput": {
        "font-size": "13px",
        "padding-top": "14.5px",
        "padding-bottom": "14.5px"
      }
    },
    "contents": {
      "img": false,
      "title": false,
      "price": false
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        "font-weight": "bold",
        "font-size": "13px",
        "padding-top": "14.5px",
        "padding-bottom": "14.5px",
        "color": "#10b068",
        ":hover": {
          "color": "#10b068",
          "background-color": "#e6e6e6"
        },
        "background-color": "#ffffff",
        ":focus": {
          "background-color": "#e6e6e6"
        },
        "border-radius": "0px",
        "padding-left": "4px",
        "padding-right": "4px"
      },
      "quantityInput": {
        "font-size": "13px",
        "padding-top": "14.5px",
        "padding-bottom": "14.5px"
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "option": {},
  "cart": {
    "styles": {
      "button": {
        "font-weight": "bold",
        "font-size": "13px",
        "padding-top": "14.5px",
        "padding-bottom": "14.5px",
        "color": "#10b068",
        ":hover": {
          "color": "#10b068",
          "background-color": "#e6e6e6"
        },
        "background-color": "#ffffff",
        ":focus": {
          "background-color": "#e6e6e6"
        },
        "border-radius": "0px"
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "font-weight": "bold",
        "background-color": "#ffffff",
        ":hover": {
          "background-color": "#e6e6e6"
        },
        ":focus": {
          "background-color": "#e6e6e6"
        }
      },
      "count": {
        "font-size": "13px",
        "color": "#10b068",
        ":hover": {
          "color": "#10b068"
        }
      },
      "iconPath": {
        "fill": "#10b068"
      }
    }
  }
},
      });
    });
  }
})();
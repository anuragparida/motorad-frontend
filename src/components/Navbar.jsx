import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server, config, checkAccess } from '../env';
import isLoggedIn from './../utils/checkLogin';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';

const Navbar = (props) => {
  const [links, setLinks] = useState({});
  const [cartHasItem, setCartHasItem] = useState(false);
  const [logged, setLogged] = useState(false);

  const [subdomain, setSubdomain] = useState('');
  const [countryName, setcountryName] = useState('');
  const [countryflag, setcountryflag] = useState('images/india-flag.png');
  const [loading, setloading] = useState(false);

  const reviewSEO = {
    '@context': 'https://schema.org/',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'Organization',
      name: 'Emotorad',
      telephone: '+91 8686050590',
    },
    ratingValue: '4.7',
    bestRating: '5',
    ratingCount: '1500',
  };

  const webpageSEO = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Emotorad',
    description:
      'The company aims to bring across top quality electric cycles which would currently cost way higher in the Indian market at an affordable price utilizing its local sourcing and manufacturing capabilities.',
  };

  const websiteSEO = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Emotorad',
    url: 'https://emotorad.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: '{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const websiteJapanSEO = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Emotorad',
    url: 'https://japan.emotorad.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: '{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const websiteUAESEO = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Emotorad',
    url: 'https://uae.emotorad.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: '{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const websiteNepalSEO = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Emotorad',
    url: 'https://nepal.emotorad.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: '{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSEO = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Emotorad',
    url: 'https://www.emotorad.com/',
    logo: 'https://emotorad.com/images/logo-main.svg',
  };

  const organizationUAESEO = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Emotorad',
    url: 'https://uae.emotorad.com/',
    logo: 'https://uae.emotorad.com/images/logo-main.svg',
  };

  const loadLinks = async () => {
    await axios
      .get(server + '/api/social/read', config)
      .then((rsp) => {
        // console.log(rsp);
        setLinks(
          rsp.data.payload.reduce((t, e) => ({ ...t, [e.name]: e.link }), {})
        );
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  };

  const checkCart = async () => {
    await axios
      .get(server + '/api/cart/read', config)
      .then((rsp) => {
        // console.log(rsp);
        setCartHasItem(rsp.data.payload.product.length > 0);
      })
      .catch((err) => {
        checkAccess(err);
        console.error(err);
      });
  };

  const logout = () => {
    Cookies.remove('token');
    window.location.reload();
  };
  const getCountry = (e) => {
    if (e.target.firstElementChild.alt == 'uae') {
      document.location.href = 'https://uae.emotorad.com/';
    } else if (e.target.firstElementChild.alt == 'india') {
      document.location.href = 'https://emotorad.com/';
    } else if (e.target.firstElementChild.alt == 'japan') {
      document.location.href = 'https://japan.emotorad.com/';
    } else if (e.target.firstElementChild.alt == 'nepal') {
      document.location.href = 'https://nepal.emotorad.com/';
    }
    localStorage.setItem('subDomain', e.target.firstElementChild.alt);
    localStorage.setItem('countryflag', e.target.firstElementChild.src);

    let sub = localStorage.getItem('subDomain');
    //sub = 'uae';
    setSubdomain(sub);
    //props.setCountry(!props.country)
    setcountryName(e.target.firstElementChild.alt.toUpperCase());
    // console.log(e.target.firstElementChild)
    setcountryflag(e.target.firstElementChild.src);
  };
  const defaultCountry = () => {
    let uaeflag = 'images/uae.png';
    let indiaflag = 'images/india-flag.png';
    let japanflag = 'images/japan.png';
    let nepalflag = 'images/nepal.png';

    let full = window.location.host;
    let parts = full.split('.');
    let sub = parts[0];
    //sub = 'india';
    if (sub == 'uae') {
      localStorage.setItem('subDomain', 'uae');
      let getsub = localStorage.getItem('subDomain');
      setSubdomain(getsub);
      setcountryName(getsub.toUpperCase());
      setcountryflag(uaeflag);
    } else if (sub == 'japan') {
      localStorage.setItem('subDomain', 'japan');
      let getsub = localStorage.getItem('subDomain');
      setSubdomain(getsub);
      setcountryName(getsub.toUpperCase());
      setcountryflag(japanflag);
    } else if (sub == 'nepal') {
      localStorage.setItem('subDomain', 'nepal');
      let getsub = localStorage.getItem('subDomain');
      setSubdomain(getsub);
      setcountryName(getsub.toUpperCase());
      setcountryflag(nepalflag);
    } else {
      localStorage.setItem('subDomain', 'india');
      let getsub = localStorage.getItem('subDomain');
      setSubdomain(getsub);
      setcountryName(getsub.toUpperCase());
      setcountryflag(indiaflag);
    }
  };

  const reloadHome = () => {
    document.location.href = '/';
  };

  useEffect(() => {
    loadLinks();
    setLogged(isLoggedIn());
    if (isLoggedIn()) {
      checkCart();
    }
    let full = window.location.host;
    let parts = full.split('.');
    let sub = parts[0];
    defaultCountry();
  }, [loading]);

  /*useEffect(() => {
    let id;
    if (subdomain == 'india') {
      id = 1034452493992700;
    }
    if (subdomain == 'uae') {
      id = 598631247954691;
    }
    if (subdomain == 'japan') {
      id = 264188729053706;
    }
    if (subdomain == 'nepal') {
      id = 3068496336696715;
    }
    if (subdomain) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                
                fbq.disablePushState = true; //not recommended, but can be done
                
                fbq('init',${id});
                fbq('track', 'PageView');
            `;
      document.body.appendChild(script);
    }
  }, [subdomain]);

  useEffect(() => {
    let id;
    if (subdomain == 'uae') {
      id = 'UA-180929846-2';
    }
    if (subdomain == 'japan') {
      id = 'UA-180929846-3';
    }
    if (subdomain == 'nepal') {
      id = 'UA-180929846-4';
    }
    if (subdomain) {
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.async = true;

      script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', ${id});
            `;
      document.body.appendChild(script1);
      document.body.appendChild(script2);
    }
  }, [subdomain]);*/

  return (
    <div class='navbar_static'>
      {subdomain == 'india' ? (
        <Helmet>
          <script type='application/ld+json'>
            {JSON.stringify(reviewSEO)}
          </script>
          <script type='application/ld+json'>
            {JSON.stringify(webpageSEO)}
          </script>
          <script type='application/ld+json'>
            {JSON.stringify(websiteSEO)}
          </script>
          <script type='application/ld+json'>
            {JSON.stringify(organizationSEO)}
          </script>

          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-180929846-1'
          ></script>
          <script>
            {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'UA-180929846-1');
                            `}
          </script>
          <script>
            {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                
                fbq.disablePushState = true; //not recommended, but can be done
                
                fbq('init',1034452493992700);
                fbq('track', 'PageView');
            `}
          </script>
        </Helmet>
      ) : subdomain == 'uae' ? (
        <Helmet>
          <script type='application/ld+json'>
            {JSON.stringify(websiteUAESEO)}
          </script>
          <script type='application/ld+json'>
            {JSON.stringify(organizationUAESEO)}
          </script>

          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-180929846-2'
          ></script>
          <script>
            {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'UA-180929846-2');
                            `}
          </script>
          <script>
            {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              
              fbq.disablePushState = true; //not recommended, but can be done
              
              fbq('init',598631247954691);
              fbq('track', 'PageView');
          `}
          </script>
        </Helmet>
      ) : subdomain == 'japan' ? (
        <Helmet>
          <script type='application/ld+json'>
            {JSON.stringify(websiteJapanSEO)}
          </script>

          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-180929846-3'
          ></script>
          <script>
            {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'UA-180929846-3');
                            `}
          </script>
          <script>
            {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                
                fbq.disablePushState = true; //not recommended, but can be done
                
                fbq('init',264188729053706);
                fbq('track', 'PageView');
            `}
          </script>
        </Helmet>
      ) : subdomain == 'nepal' ? (
        <Helmet>
          <script type='application/ld+json'>
            {JSON.stringify(reviewSEO)}
          </script>
          <script type='application/ld+json'>
            {JSON.stringify(webpageSEO)}
          </script>
          <script type='application/ld+json'>
            {JSON.stringify(websiteSEO)}
          </script>
          <script type='application/ld+json'>
            {JSON.stringify(organizationSEO)}
          </script>

          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-180929846-4'
          ></script>
          <script>
            {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'UA-180929846-4');
                            `}
          </script>
          <script>
            {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                
                fbq.disablePushState = true; //not recommended, but can be done
                
                fbq('init',3068496336696715);
                fbq('track', 'PageView');
            `}
          </script>
        </Helmet>
      ) : (
        ''
      )}
      <header class='header_social_sec'>
        <div class='container-fluid'>
          <div class='row'>
            <div class='col-lg-6'>
              <div class='header_social_icons'>
                {links.linkedin && (
                  <ul>
                    <li>
                      {subdomain == 'japan' ? 'フォローする' : 'Follow Us'}
                    </li>
                    <li>
                      <a
                        target='_blank'
                        href={
                          subdomain == 'japan'
                            ? 'https://www.facebook.com/EMotoradEbikeJapan'
                            : links.facebook
                        }
                      >
                        <i class='fa fa-facebook-square'></i>
                      </a>
                    </li>
                    <li>
                      <a target='_blank' href={links.twitter}>
                        <i class='fa fa-twitter'></i>
                      </a>
                    </li>
                    <li>
                      <a
                        target='_blank'
                        href={
                          subdomain == 'japan'
                            ? 'https://instagram.com/emotorad_ebike_japan?utm_medium=copy_link'
                            : links.instagram
                        }
                      >
                        <i class='fa fa-instagram'></i>
                      </a>
                    </li>
                    <li>
                      <a target='_blank' href={links.linkedin}>
                        <i class='fa fa-linkedin-square'></i>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div class='col-lg-6'>
              <div class='header_rgt_links'>
                <ul>
                  <li>
                    <a href='javascript:void(0)'>
                      <img src={countryflag} alt='a' class='img-fluid' />{' '}
                      {countryName} <i class='fa fa-caret-down'></i>
                    </a>
                    <ul class='assurance_drop_dwn_5'>
                      <li onClick={(e) => getCountry(e)}>
                        <a href='javascript:void(0)'>
                          <img
                            src='images/india-flag.png'
                            alt='india'
                            class='img-fluid'
                          />
                          India
                        </a>
                      </li>
                      <li onClick={(e) => getCountry(e)}>
                        <a href='javascript:void(0)'>
                          <img
                            src='images/uae.png'
                            alt='uae'
                            class='img-fluid'
                          />
                          UAE
                        </a>
                      </li>
                      <li onClick={(e) => getCountry(e)}>
                        <a href='javascript:void(0)'>
                          <img
                            src='images/japan.png'
                            alt='japan'
                            class='img-fluid'
                          />
                          Japan
                        </a>
                      </li>
                      <li onClick={(e) => getCountry(e)}>
                        <a href='javascript:void(0)'>
                          <img
                            src='images/nepal.png'
                            alt='nepal'
                            class='img-fluid'
                          />
                          Nepal
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href='mailtocontactus@emotorad.com:'>
                      {subdomain == 'japan'
                        ? 'connect_japan@emotorad.com'
                        : 'contactus@emotorad.com'}
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      {subdomain == 'japan'
                        ? '+81 50 5375 7475'
                        : subdomain == 'uae'
                        ? '+971 4876 4777'
                        : subdomain == 'india'
                        ? '+91-8686050590'
                        : '+91-8686050590'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class='nav_section'>
        <div class='container'>
          <nav class='navbar px-0 navbar-expand-lg navbar-light'>
            <a class='navbar-brand' href='/'>
              <img src='images/logo-main.svg' alt='logo' class='img-fluid' />
            </a>
            <button
              class='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={window.openNav}
            >
              <span class='fa fa-bars'></span>
            </button>
            <div
              class='collapse navbar-collapse d-none d-lg-block'
              id='navbarNav'
            >
              <ul class='navbar-nav mr-auto custm_scrl'>
                <li class='nav-item'>
                  <a class='nav-link' onClick={reloadHome}>
                    <Link>HOME</Link>
                  </a>
                </li>
                <li class='nav-item'>
                  <a
                    class='nav-link'
                    href='javascript:void(0)'
                    data-toggle='collapse'
                    data-target='#collapseExample'
                    aria-expanded='false'
                    aria-controls='collapseExample'
                  >
                    {subdomain == 'japan' ? 'バイク' : 'THE BIKES'}
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link drp_dwn_clk' href='javascript:void(0)'>
                    {subdomain == 'japan' ? 'ご購入者の方へ' : 'ASSURANCE'}
                  </a>
                  <ul class='assurance_drop_dwn'>
                    <li>
                      <a href='/warranty'>
                        {subdomain == 'japan'
                          ? '保証を有効にする'
                          : 'Activate Warranty'}
                      </a>
                    </li>
                    {subdomain == 'india' || subdomain == '' ? (
                      <li>
                        <a href='/insurance'>
                          {subdomain == 'japan' ? '保 険' : 'Insurance'}
                        </a>
                      </li>
                    ) : (
                      ''
                    )}
                    {subdomain == 'india' || subdomain == '' ? (
                      <li>
                        <a href='/rsa'>
                          {subdomain == 'japan'
                            ? '道端での援助'
                            : 'Roadside Assistance'}
                        </a>
                      </li>
                    ) : (
                      ''
                    )}
                    {subdomain == 'india' || subdomain == '' ? (
                      <li>
                        <a href='/emi'>EMI</a>
                      </li>
                    ) : (
                      ''
                    )}
                    <li>
                      <a href='/buysmart'>
                        {subdomain == 'japan' ? 'スマートに購入' : 'Buy Smart'}
                      </a>
                    </li>
                  </ul>
                </li>
                <li class='nav-item'>
                  <a class='nav-link drp_dwn_clk_2' href='javascript:void(0)'>
                    EM WORLD
                  </a>

                  <ul class='assurance_drop_dwn_2'>
                    <li>
                      <a href='/community'>
                        {subdomain == 'japan' ? 'コミュニティ' : 'Community'}
                      </a>
                    </li>
                    <li>
                      <a href='https://blog.emotorad.com/' target='blank'>
                        {subdomain == 'japan' ? 'ブログ' : 'Blogs'}
                      </a>
                    </li>
                  </ul>
                </li>
                <li class='nav-item'>
                  <a class='nav-link drp_dwn_clk_3' href='javascript:void(0)'>
                    {subdomain == 'japan' ? 'お問い合わせ' : 'REACH US'}
                  </a>

                  <ul class='assurance_drop_dwn_3'>
                    <li>
                      <a href='/about'>
                        {subdomain == 'japan' ? '私たちに関しては' : 'About Us'}
                      </a>
                    </li>
                    <li>
                      <a href='/faq'>FAQs</a>
                    </li>
                    <li>
                      <a href='/partner'>
                        {subdomain == 'japan'
                          ? '私たちとパートナー'
                          : 'Partner with Us'}
                      </a>
                    </li>
                    <li>
                      <a href='/store'>
                        {subdomain == 'japan' ? 'お店を探す' : 'Find a Store'}
                      </a>
                    </li>
                    <li>
                      <a href='/careers'>
                        {subdomain == 'japan' ? 'キャリア' : 'Careers'}
                      </a>
                    </li>
                    <li>
                      <a href='/contact'>
                        {subdomain == 'japan' ? 'お問い合わせ' : 'Contact Us'}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form class='form-inline'>
                <Link to='/book' class='head_bttn'>
                  {subdomain == 'japan' ? '試乗を予約する' : 'BOOK A TEST RIDE'}
                </Link>
                <ul>
                  {/* <li><a href="javascript:void(0)"><img src="images/search_icon.svg" alt="logo" class="img-fluid"/></a></li> */}
                  <li>
                    <a href='javascript:void(0)' class='drp_dwn_clk_4'>
                      {logged ? (
                        <img
                          src='images/user_2_icon.svg'
                          alt='logo'
                          class='img-fluid'
                        />
                      ) : (
                        <img
                          src='images/user_icon.svg'
                          alt='logo'
                          class='img-fluid'
                        />
                      )}
                    </a>
                    <ul
                      class='assurance_drop_dwn_4'
                      style={{ right: logged ? '55px' : '70px' }}
                    >
                      {logged ? (
                        <>
                          <li>
                            <a href='/overview'>Overview</a>
                          </li>
                          <li>
                            <a href='/account'>Settings</a>
                          </li>
                          <li>
                            <a href='javascript:void(0)' onClick={logout}>
                              Logout
                            </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <a href='/signup'>
                              {subdomain == 'japan'
                                ? 'サインアップ '
                                : 'Sign Up'}
                            </a>
                          </li>
                          <li>
                            <a href='/login'>
                              {subdomain == 'japan' ? 'ログインする' : 'Log In'}
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </li>
                  <li>
                    <Link to='/cart'>
                      {logged && cartHasItem ? (
                        <img
                          src='images/trolly_green.svg'
                          alt='logo'
                          class='img-fluid'
                        />
                      ) : (
                        <img
                          src='images/troli_icon.svg'
                          alt='logo'
                          class='img-fluid'
                        />
                      )}
                    </Link>
                  </li>
                </ul>
              </form>
            </div>
          </nav>
        </div>

        <div class='big_dropdown_wrap collapse' id='collapseExample'>
          <div class='container'>
            <div class='row justify-content-center'>
              {subdomain === '' || subdomain === 'nepal' ? (
                <>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/cycle_warenty.png'
                        alt='a'
                        class='img-fluid'
                      />
                      <a href='/trex'>
                        T-REX{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/bicycle_3.png'
                        alt='a'
                        class='img-fluid'
                      />
                      <a href='/emx'>
                        EMX{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/bicycle_2.png'
                        alt='a'
                        class='img-fluid'
                      />
                      <a href='/doodle'>
                        DOODLE{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                </>
              ) : subdomain === 'uae' ? (
                <>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/cycle_warenty.png'
                        alt='a'
                        class='img-fluid'
                      />
                      <a href='/trex'>
                        T-REX{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/bicycle_2.png'
                        alt='a'
                        class='img-fluid'
                      />
                      <a href='/doodle'>
                        DOODLE{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/uae/Ener-G.png'
                        alt='a'
                        class='img-fluid'
                        style={{ height: '139px' }}
                      />
                      <a href='/energ'>
                        ENER G{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/uae/Trible.png'
                        alt='a'
                        class='img-fluid'
                        style={{ height: '139px' }}
                      />
                      <a href='/trible'>
                        TRIBLE{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                </>
              ) : subdomain === 'japan' ? (
                <>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/Japan/XPLORER/Xplorer-pulse-black.png'
                        alt='a'
                        class='img-fluid'
                        style={{ height: '139px' }}
                      />
                      <a href='/xplorer'>
                        XPLORER{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/Japan/GLYDER/Glyder-pulse-black.png'
                        alt='a'
                        class='img-fluid'
                        style={{ height: '139px' }}
                      />
                      <a href='/glyder'>
                        GLYDER{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/Japan/DOLPHIN/BottomPart-BlinkingPoints/Dolphin-Pulse-part.png'
                        alt='a'
                        class='img-fluid'
                        style={{ height: '139px' }}
                      />
                      <a href='/dolphine'>
                        DOLPHIN{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/cycle_warenty.png'
                        alt='a'
                        class='img-fluid'
                      />
                      <a href='/trex'>
                        T-REX{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/bicycle_3.png'
                        alt='a'
                        class='img-fluid'
                      />
                      <a href='/emx'>
                        EMX{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                  <div class='col-lg-3'>
                    <div class='bog_drop_wraps'>
                      <img
                        src='images/bicycle_2.png'
                        alt='a'
                        class='img-fluid'
                      />
                      <a href='/doodle'>
                        DOODLE{' '}
                        <img
                          src='images/arw_rgt.svg'
                          alt='a'
                          class='img-fluid'
                        />
                      </a>
                    </div>
                  </div>
                </>
              )}
              <div class='col-12'>
                <div class='big_dop_btn'>
                  <a href='/bikes'>
                    View all Products{' '}
                    <img src='images/arw_rgt.svg' alt='a' class='img-fluid' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {props.children}
    </div>
  );
};
export default Navbar;

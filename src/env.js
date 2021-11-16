const Cookies = require("js-cookie");
let domain = localStorage.getItem('subDomain');
let server;
if (domain == 'nepal' || domain == 'india' || domain == '') {
  server = 'https://api.emotorad.in';
} else if (domain == 'uae') {
  server = 'https://uae-api.emotorad.in';
} else if (domain == 'japan') {
  server = 'https://japan-api.emotorad.in';
} else {
  server = 'https://api.emotorad.in';
}

module.exports = {
  //server: "https://api.emotorad.in",
  server,
  //server: "http://localhost:7400",

  // SITE_KEY: "6LdaGssUAAAAAFMBwO3VPUNlV6pZE_uIY04zK8dh", ASK?

  // FACEBOOK_APP_ID: 296252462110494,
  FACEBOOK_APP_ID: 889533278598326,

  config: {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
      responseType: "json",
    },
  },

  formDataConfig: {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("token")}`,
      responseType: "json",
    },
  },

  checkAccess: (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        Cookies.remove("footprint");
        window.location.href = "/";
      }
    }
    return true;
  },
};

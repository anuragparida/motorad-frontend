const Cookies = require("js-cookie");
let domain = localStorage.getItem("subDomain");
let server;
if (domain != "uae" || domain != "nepal" || domain != "japan" || domain != "") {
  let full = window.location.host;
  let parts = full.split(".");
  let sub = parts[0];
  // sub = "india";
  domain = sub;
  //alert(domain);
  if (full == "emotorad.com" || full == "www.emotorad.com") {
    domain = "india";
  }
}

if (domain == "india" || domain == "") {
  server = "https://api.emotorad.com";
} else if (domain == "nepal") {
  server = "https://nepal-api.emotorad.com";
} else if (domain == "uae") {
  server = "https://uae-api.emotorad.com";
} else if (domain == "japan") {
  server = "https://japan-api.emotorad.com";
}

module.exports = {
  //server: "https://api.emotorad.in",
  server,
  //server: "http://localhost:7400",

  // SITE_KEY: "", ASK?

  // FACEBOOK_APP_ID: ,
  FACEBOOK_APP_ID: 0,

  REACT_APP_GOOGLE_API_KEY: "",

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

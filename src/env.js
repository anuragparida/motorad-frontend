const Cookies = require("js-cookie");

module.exports = {
  server: "https://api.emotorad.in",
  //server: "http://localhost:7400",

  // SITE_KEY: "6LdaGssUAAAAAFMBwO3VPUNlV6pZE_uIY04zK8dh", ASK?

  config: {
    headers: {
      "Content-Type": "application/json",
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

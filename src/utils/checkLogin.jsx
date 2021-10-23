import Cookies from "js-cookie";

const isLoggedIn = () => {
  const tokenDate = Date.parse(Cookies.get("tokenDate"));
  if (
    Date.parse(new Date()) - tokenDate > 2 * 60 * 60 * 1000 ||
    tokenDate === undefined ||
    tokenDate === null ||
    isNaN(tokenDate)
  ) {
    Cookies.remove("token");
    Cookies.remove("tokenDate");
  }

  const token = Cookies.get("token");
  let loggedIn = false;

  if (token) {
    loggedIn = true;
  }

  return loggedIn;
}

export default isLoggedIn;
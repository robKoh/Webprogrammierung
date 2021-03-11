fetch("/login")
  .then((response) => response.json())
  .then((json) => {
    if (json.usr !== undefined) {
      document.getElementById("menu-login-field").hidden = true;
      document.getElementById("menu-logout-field").hidden = false;
    }
  });

fetch("/show-most-visited-page")
  .then((response) => response.json())
  .then((json) => {
    document.getElementById("show-most-visited-page").hidden = json.hideMostVisitedPageBut;
  });

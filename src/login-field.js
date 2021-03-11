fetch("/login")
  .then((response) => response.json())
  .then((json) => {
    console.log("outside");
    if (json.usr !== undefined) {
      console.log("inside");
      //document.getElementById("menu-login-field").style.visibility = "collapse";
      //document.getElementById("menu-logout-field").style.visibility = "visible";
      document.getElementById("menu-login-field").hidden = true;
      document.getElementById("menu-logout-field").hidden = false;
    }
  });

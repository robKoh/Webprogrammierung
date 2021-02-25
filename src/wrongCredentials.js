fetch("/displayAlertCredentials")
  .then((response) => 
    response.ok ? setAlert() : (window.location.href = "/")
  )
  
function setAlert() {
    const inputUsername = document.getElementById("username");
    const inputPassword = document.getElementById("password");

    inputUsername.setAttribute("value", "Darf nicht leer sein!");
    inputUsername.style.color = "red";
    inputPassword.setAttribute("value", "Darf nicht leer sein!");
    inputPassword.style.color = "red";
}


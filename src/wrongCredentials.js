fetch("/displayAlertCredentials")
  .then((response) => 
    response.ok ? setAlert() : null
  )
  
function setAlert() {
    window.location.href = "/";
    alert("Sie müssen einen Benutzername und ein Passwort eingeben!");
}


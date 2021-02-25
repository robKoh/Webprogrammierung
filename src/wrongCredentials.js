fetch("/displayAlertCredentials")
  .then((response) => 
    response.ok ? setAlert() : (window.location.href = "/login")
  )
  
function setAlert() {
    alert("Sie müssen einen Benutzername und ein Passwort eingeben!");
}


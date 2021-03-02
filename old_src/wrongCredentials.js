function validateInputForm() {
  const inputUsername = document.getElementById("username");
  const inputPassword = document.getElementById("password");

  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("Sie müssen einen Benutzername und ein Passwort eingeben!");
  }
}

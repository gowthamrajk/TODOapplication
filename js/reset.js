
function resetPassword()
{
	const resetForm = document.getElementById("login-form");
    resetForm .addEventListener('submit', e => {
    e.preventDefault();
    const email = resetForm ['email'].value;
    console.log(email);
    firebase.auth().sendPasswordResetEmail(email);
    change();
})
}

function change()
{
    var text = document.getElementById("subtext1");
    text.innerHTML = "Reset Password Link sent Successfully";
    text.style.color = "lime";
}

function validation()
{
    var form = document.getElementById("login-form");
    var email = document.getElementById("email").value;
    var text = document.getElementById("subtext");
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(email.match(pattern))
    {
        form.classList.add("valid");
        form.classList.remove("invalid");
        text.innerHTML = "valid Email Address";
        text.style.color = "#00ff00";
    }
    else
    {
        form.classList.remove("valid");
        form.classList.add("invalid");
        text.innerHTML = "Invalid Email Address";
        text.style.color = "#ff0000";
    }
    if(email == "")
    {
        form.classList.remove("valid");
        form.classList.remove("invalid");
        text.innerHTML = "";
        text.style.color = "#00ff00";
    }
}

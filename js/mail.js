const feedbackForm = document.getElementById("feedback-form");

feedbackForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = feedbackForm['username'].value;
    const email = feedbackForm['email'].value;
    const phone = feedbackForm['phone'].value;
    const comments = feedbackForm['comments'].value;
    console.log(name, email, phone, comments);
    sendEmail1(name,email,comments);
    sendEmail2(name,email,phone,comments);
    feedbackForm.reset();
})

function sendEmail1(name,email,comments) 
{ 
      Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "todoapplicationteam@gmail.com", 
        Password: "Gowthamraj@258", 
        To: email,
        From: 'todoapplicationteam@gmail.com', 
        Subject: "Greetings From TODO Application - Feedback Submission", 
        Body: "<html><h2><b><font color='brown'>Hello "+name+", </font></h2><h3>Thanks for sending me your feedback as <p>' "+comments+" '</p> I really appreciate it since I am always looking for ways to make my services even better...</h3> <h3><font color='navy'>Thanks & regards,</font><br><font color='red'>- GowthamRaj.K (TODO Application)</font><br></h3><h4>for more queries,<p>reach me at:\ngowthamraj692@gmail.com\n9698382306</p></h4></b></html>", 
      }) 
        .then(function (message) 
        { 
          console.log(username+" "+email+" "+phone+" "+comments);
          location.href="putFeedbackResult.html";
        }); 
} 

function sendEmail2(name,email,phone,comments) 
{ 
      Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "todoapplicationteam@gmail.com", 
        Password: "Gowthamraj@258", 
        To: 'gowthamraj692@gmail.com',
        From: 'todoapplicationteam@gmail.com', 
        Subject: "Response TODO Application - Feedback Submission", 
        Body: "<html><h2><b><font color='brown'>User "+name+", </font></h2><h3>Had Successfully submitted the feedback as <p>' "+comments+" '</p> from email ID ' "+email+" '. Please have a glance on it and contact them through <p>' "+phone+" '</p> </h3> <h3><font color='navy'>Thanks & regards,</font><br><font color='red'>- TODO Application</font><br></h3></b></html>", 
      }) 
        .then(function (message) 
        { 
          console.log(username+" "+email+" "+phone+" "+comments);
          location.href="putFeedbackResult.html";
        }); 
} 

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});
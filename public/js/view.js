$(document).ready(function () {

  const noteForm = $("form.note-send");
  const nameInput = $("input#name-input");
  var emailInput = $("input#email-input");
  var noteInput = $("textarea#note-input");

  noteForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      note: noteInput.val().trim()
    };

    if (!userData.name || !userData.email || !userData.note) {
      return;
    }

    // If we have an email and note we run the loginUser function and clear the form
    sendMsg(userData.name, userData.email, userData.note);
    nameInput.val("");
    emailInput.val("");
    noteInput.val("");
  });

  function sendMsg(name, email, note) {
    $.post("/api/sendmsg", {
      name: name,
      email: email,
      note: note
    }).then(function () {
      // window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err.responseJSON);
  }

});
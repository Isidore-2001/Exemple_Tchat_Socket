
window.addEventListener('load',initForm);
var socket = io.connect('http://localhost:3000');



/*window.addEventListener("DOMContentLoaded", (event) => {
  sendForm2;
});*/

function initForm(){
  
  /**window.setInterval(,500);**/
  //sendForm2();
  document.forms.loginform.addEventListener("submit", sendForm1);
  document.forms.form.addEventListener("submit", sendForm2);
  
 
  //document.forms.form_communes.addEventListener("submit", fetchCommune);
  
  

}

function sendForm1(ev){ // form event listener
  ev.preventDefault();
  const username  = document.getElementById('username');
  const mail  = document.getElementById('mail');
  const user = document.getElementById('users');

  socket.on('newusr', (users)=>{
    user.innerHTML += '<img src="'+ users.avatar + '" id= ' +users.mail + '></img>'
  });

//socket.emit('connecte');

  socket.emit('login', {
    username : username.value,
    mail : mail.value
  });



  var msgtpl = $('#msgtpl').html();
    $('#msgtpl').remove();
    const m = document.getElementById("messages");
    socket.on('message', (message1)=>{
      console.log(message1);
      m.innerHTML+='<div class="sep"></div>';

     
      console.log(message1);
      m.innerHTML += '<div class="message">' + Mustache.render(msgtpl, message1) + '</div>';
    });

  socket.on('logged', (users1)=>{
    //console.log(users1);
    $('#login').fadeOut();
    //var lastmsg= false;
    
  });

  socket.on('discusr', (user)=>{
    
    let users1 = document.getElementById('users');
    let user1 = document.getElementById(user.mail);
    users1.removeChild(user1);
    
  })
  
    
    };


    function sendForm2(ev){
      var lastmsg= false;
      var msgtpl = $('#msgtpl').html();
      $('#msgtpl').remove();
    ev.preventDefault();

  const message = document.getElementById("message");
  socket.emit(
    'message', {
    message : message.value,
    
    }

    

    
  );
    const m = document.getElementById("messages");
    socket.on('message', (message1)=>{
      m.innerHTML+='<div class="sep"></div>';

     
      //console.log(message1);
      m.innerHTML += '<div class="message">' + Mustache.render(msgtpl, message1) + '</div>';
    });
    //message.value = '';
    

    }
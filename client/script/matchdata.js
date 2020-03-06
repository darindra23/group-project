$containerMatchData = $("#DivMatch");
$home = $("#home");
$login = $("#login-page");
$navbar = $("#navbar");

if (localStorage.getItem("token")) {
  homePage();
} else {
  start();
}

function start() {
  $login.show();
  $home.hide();
  $navbar.hide();
}

// DISPLAY HOME PAGE
function homePage() {
  $login.hide();
  $home.show();
  $navbar.show();
  getMatchData();
}

// LOGIN ON SUBMIT
$("#login").on("submit", function(e) {
  e.preventDefault();
  let $email = $("#login-email");
  let $password = $("#login-password");
  login($email.val(), $password.val());
});
function login(email, password) {
  $.ajax({
    url: "http://localhost:4000/user/login",
    method: "post",
    contentType: "application/json",
    data: JSON.stringify({
      email: email,
      password: password
    }),
    success: function(res) {
      localStorage.setItem("token", res.token);
      homePage();
    },
    error: function(a, b, c) {
      console.log("error");
    }
  });
}

// REGISTER
$("#registration").on("submit", function(e) {
  e.preventDefault();
  let $fullname = $("#fullname-registration");
  let $email = $("#email-registration");
  let $password = $("#password-registration");
  register($fullname.val(), $email.val(), $password.val());
});

function register(fullname, email, password) {
  $.ajax({
    type: "POST",
    url: "http://localhost:4000/user/register",
    contentType: "application/json",
    data: JSON.stringify({ fullname, email, password })
  }).done(response => {
    $("#second").fadeOut("fast", function() {
      $("#first").fadeIn("fast");
    });
  });
}

function getPlayer(params) {
  $.ajax({
    url: `Http://localhost:4000/team/${params}`,
    method: "get",
    contentType: "application/json",
    headers: { token: localStorage.token },
    success: function(data) {
      $("#modal-body").empty();
      data.forEach(player => {
        $("#modal-body").append(`
            <p>Name : ${player.first_name} ${player.last_name}</p>
            <p>Position : ${player.position}</p>
            <hr>
          `);
      });
    },
    error: function(a, b, c) {
      console.log(b, c);
    }
  });
}

function update(password) {
  $.ajax({
    type: "PUT",
    url: "Http://localhost:4000/user/update",
    headers: { token: localStorage.token },
    data: JSON.stringify({ password }),
    contentType: "application/json",
    success: function(response) {
        console.log('sukses ganti password');
    }
  });
}

function hapusAkun() {
  $.ajax({
    type: "DELETE",
    url: "Http://localhost:4000/user/delete",
    headers: { token: localStorage.token },
    success: function(response) {
      signOut();
    }
  });
}

function getMatchData() {
  $.ajax({
    url: "http://localhost:4000/match",
    method: "get",
    contentType: "application/json",
    headers: { token: localStorage.token },
    success: function(res) {
      res.forEach(ele => {
        let tgl = new Date(ele.schedule);
        let home = ele.home.name;
        let away = ele.away.name;
        $("#DivMatch").append(`
                        <div id="id ke..."  style="background-color: #f5f8ff; padding: 40px" >
                        <h1 style="color: ;"> ${ele.venue.name} </h1><br>
                        <div class="row">
                            <div class="col">
                                <h3>Home</h3>
                                <a style="color:#1949a8" id="${ele.home.name}"  class="btn "   data-toggle="modal" data-target="#exampleModalCenter"  onclick="getPlayer('${home}')" ><h1>${ele.home.name}</h1></a>
          
                                    </div>

                                    <div class="col text-center">
                                    <h2>&nbsp</h2>
                                    <h3 style="color: red">VS</h3>
                                    </div>
                                    
                            <div class="col">
                                <h3>Away</h3>
                                <a style="color:#1949a8" id="${ele.away.name}" class="btn"  data-toggle="modal" data-target="#exampleModalCenter" onclick="getPlayer('${away}')"  ><h1>${ele.away.name}</h1></a>
                            </div>
                        </div>
                        <div style="text-align: center; margin-top:20px; color:#ffa600">
                            <br>
                            
                            
                            <h3> ${tgl} </h3>
                            
                            <h5>LEAGUE/SEASON :${ele.league}/${ele.season}</h5>
                            <br>
                        </div>
                    </div>
                    <br>
                        `);
      });
    },
    error: function(a, b, c) {
      console.log("error");
    }
  });
}

// LOGOUT

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    localStorage.removeItem("token");
    start();
  });
}

// FITUR LOGIN
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    type: "POST",
    url: "http://localhost:4000/user/google",
    data: { id_token }
  })
    .done(response => {
      localStorage.setItem("token", response.token);
      homePage();
    })
    .fail(err => {
      console.log(err);
    });
}

$("#signup").click(function(e) {
  e.preventDefault();
  $("#first").fadeOut("fast", function() {
    $("#second").fadeIn("fast");
  });
});

$("#signin").click(function(e) {
  e.preventDefault();
  $("#second").fadeOut("fast", function() {
    $("#first").fadeIn("fast");
  });
});

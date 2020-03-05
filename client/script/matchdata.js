$containerMatchData = $("#DivMatch")
getMatchData()


$("#form-login").on("submit", function (e) {
    e.preventDefault();
    let $email = $("#login-email")
    let $password = $("#login-password")
    
    login($email.val(),$password.val())
});



function login(email,password){
    console.log('masuk login',email,password)
    $.ajax({
        url:"http://localhost:4000/user/login",
        method:"post",
        contentType:"application/json",
        data:JSON.stringify({
            email:email,
            password:password
        }),
        success:function(res){
            localStorage.setItem("token", res.token)
        },
        error:function(a,b,c){
            console.log('error')
        }
        
    })
}

function kilik(params){ //ini cari nama tim by team =====================================================
    console.log('kilik button',params)
    $.ajax({
        url:`Http://localhost:4000/team/${params}`,
        method:"get",
        contentType:"application/json",
        headers:{token:localStorage.token},
        success:function(data){
            console.log(data)
        },
        error:function(a,b,c){
            console.log(a)
        }
    })

}

function getMatchData(){
    console.log("masuk sini")
        $.ajax({
            url:"http://localhost:4000/match",
            method:"get",
            contentType:"application/json",
            success:function(res){
                console.log('sukses')
                res.forEach(ele=>{
                    let tgl= new Date(ele.schedule)
                    let home = ele.home.name
                    let away = ele.away.name
                    $("#DivMatch").append(`
                        <div id="id ke..."  style="background-color: yellow;" >
                        <h2> ${ele.title} </h2><br>
                        <div class="row">
                            <div class="col">
                                <h2>Home</h2>
                                <a style="color:white" id="${ele.home.name}"  class="btn btn-primary"   data-toggle="modal" data-target="#exampleModalLong"  onclick="kilik('${home}')" ><h3>${ele.home.name}</h3></a>                            </div>
                            <div class="col">
                                <h2>Away</h2>
                                <a style="color:white" id="${ele.away.name}" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModalLong" onclick="kilik('${away}')"  ><h3>${ele.away.name}</h3></a>
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <br>
                            <h3> ${ele.venue.name}</h3>
                            
                            <h5> ${tgl.toDateString()} </h5>
                            
                            <h5>LEAGUE/SEASON :${ele.league}/${ele.season}</h5>
                            <br>
                        </div>
                    </div>
                    <br>
                        `)

                })
            },
            error:function(a,b,c){
                console.log('error')
            }
        })
}





  //=============LOGOUT BIASA

  $("#btn-logout").on("click", function(){
    localStorage.removeItem("token")
    signOut()
    location.reload()

})
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GCLIENT);
const { User } = require("../models");
const jwt = require('jsonwebtoken')



class Controller {

    static googleSignIn(request,response,next){
        // console.log('token google',token)
        let Gltoken = request.body.token
        let user=null
        client.verifyIdToken({
            idToken:Gltoken,
            audience:process.env.GCLIENT
        })
        .then(ticket=>{
            const payload=ticket.getPayload();
            console.log(payload,'<<<<<<<<<<<<<<< korewa payload')
            user={
                name:payload.name,
                email:payload.email,
                password:'12345'
            }
            return User.findOne({where:{email:user.email}})
        })
        .then(data=>{
            if(data){
                return data
            }else{
                let receipient=user.email
                let nama=user.name
                let msg=`selamat datang ${user.name}, password anda adalah ${user.password}`
                sendmail(receipient,msg,nama) 
                return User.create(user)
            }
        })
        .then(data=>{
            let token=jwt.sign({id:data.id,email:data.email},process.env.SECRET)
            response.status(200).json({token})
        })
        .catch(err=>{
            console.log('glsign error')
            next(err)
        })
    }


}


module.exports = Controller
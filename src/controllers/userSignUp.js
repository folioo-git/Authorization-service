// This controller all the User sign up related logic for basic Authentication.

const dataEncrypter = require("../utils/dataEncrypter")
const pool = require('../config/db')
const isExistingUser = require('../utils/existingUser')
const userSignUp = (async(req,res)=>{

    try{
        const {email,password} = req.body;
    
        if(req.body){
            if(email){
                
                if(password){

                    //Both email and Password are present

                    const existing = await isExistingUser(email)
                    if(existing === undefined){
                        throw Error
                    }

                    var hashedPassword = await dataEncrypter(password)

                    if(!existing){
                        // pool.query("insert into user (email,password) values (?,?)",[email,hashedPassword],(err,result)=>{
                        //     if(err){
                        //         console.log(err)
                        //         throw Error
                        //     }
                            
                        //     return res.status(201).json({"Message":"Data Inserted"})
    
                        // })
                    }
                    else{
                        return res.status(400).json({"Message":"Email Already Exists."})
                    }

                    
                }
                else{

                    return res.status(400).json({"Message":"No Password provided in body"});
                }
            }
            else{
                return res.status(400).json({"Message":"No Email provided in body"});
            }
        }
        else{
            return res.status(400).json({"Message":"No body provided"});
        }
    }
    catch(err){
        return res.status(500).json({"Message":"Some Error Occured in Server"})
    }

})

module.exports = userSignUp
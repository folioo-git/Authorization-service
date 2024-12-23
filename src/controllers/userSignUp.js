// This controller all the User sign up related logic for basic Authentication.


const userSignUp = (async(req,res)=>{

    try{
        const {email,password} = req.body;
    
        if(req.body){
            if(email){
                
                if(password){

                    //Both email and Password are present

                    console.log(`email: ${email}, pass: ${password}`)
                    return res.status(200).json({"Message":"Working"})
                    
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
const User = require("./model/userModel")
const bcrypt = require('bcrypt')
 


const adminSeeder =async()=>{
        //admin seeding
const isAdminExists = await User.findOne({userEmail:"admin@gmail.com", role:"admin"})
if(!isAdminExists){
    await User.create({
    userEmail : "admin@gmail.com",
    userPassword : bcrypt.hashSync("admin",10),
    userPhoneNumber : 9849139266,
    userName :"admin",
    role:"admin"

})

}else{
    console.log("Admin already seeded")
}
}
module.exports = adminSeeder
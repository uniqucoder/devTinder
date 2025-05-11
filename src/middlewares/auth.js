export const adminAuth = (req,res,next)=>{
    console.log("admin auth is getting checked")
    const token = "xyaz";

    const isAdminAuthorized = token ==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorised request");
    }else{
        next();
    }
};
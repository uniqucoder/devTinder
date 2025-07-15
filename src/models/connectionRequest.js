const {mongoose, Schema } = require("mongoose");


const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref :"User", // Reference to the user collection
            required : true,
            
        },
        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        status : {
            type : String,
            required : true,
            enum :{
                values : ["ignored", "interested","accepted","rejected"],
                message : `{VALUE} is incorrect Status`
            }
        }


    },{
        timestamps : true,
    }
)

connectionRequestSchema.index({ fromUserId : 1});

// Schema Pre -> its and function on schema, which run before query
connectionRequestSchema.pre('save',function (next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You can not send request to yourself !");
    }
    next();
});
const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;
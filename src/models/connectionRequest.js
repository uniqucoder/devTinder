const { default: mongoose } = require("mongoose");


const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
            required : true,
        },
        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
        },
        status : {
            type : String,
            required : true,
            enum :{
                values : ["ignored", "intrested","accepted","rejected"],
                message : `{VALUE} is incorrect Status`
            }
        }


    },{
        timestamps : true,
    }
)

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;
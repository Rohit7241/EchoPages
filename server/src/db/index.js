import mongoose,{mongo} from "mongoose"

const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/EchoPages`)
        console.log(`mongodb connected ${connectionInstance}`)
    }
    catch(error){
        console.error("Mongodb connection error",error)
        process.exit(1)
    }
}

export default connectDB
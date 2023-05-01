import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(
  
  "mongodb://127.0.0.1:27017/monkeyman",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to mongodb')
})

// Create Mongoose schema
const formSchema = new mongoose.Schema({


    tokenID: String
}
);

// Create Mongoose model
module.exports= mongoose.models.admin || mongoose.model('admin', formSchema)
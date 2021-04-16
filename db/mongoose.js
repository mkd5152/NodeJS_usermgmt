var mongoose =require ('mongoose')

mongoose.Promise = global.Promise; 
mongoose.set('useCreateIndex', true);
mongoose.set( 'useFindAndModify', false)
mongoose.set('useUnifiedTopology', true )

const CONNECTION_URL = 'mongodb+srv://mkd5152:RG2q-3zLRuJAnd_@cluster0.kqv9v.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB has reconnected')
})
mongoose.connection.on('error', error => {
  console.log('MongoDB connection has an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection is disconnected')
})
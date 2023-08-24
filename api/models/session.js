import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

/**
 * Session
 * 
 * Mongoose Schema defined for user sessions.
 */
const SessionSchema = new Schema({
   _id: {type: String},
   session: { type: String, unique: true, },
   expires: { type: Date }
}, {
    //Defines the collection objects of this schema get saved to.
    collection: 'sessions'
});

// User model
const Session = model("Session", SessionSchema)

export default Session;
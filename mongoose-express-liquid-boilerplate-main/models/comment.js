// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const Superhero = require('./superhero')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const commentSchema = new Schema(
	{
		title: { type: String, required: true},
		body: { type: String, required: true },
		superhero: { 
			type: Schema.Types.ObjectID,
			ref: 'Superhero' 
		},
		author: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Comment = model('Comment', commentSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Comment
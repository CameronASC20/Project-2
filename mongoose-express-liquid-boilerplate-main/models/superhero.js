// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const Comment = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const superheroSchema = new Schema(
	{
		images: { type: String },
		id: { type: String },
		name: { type: String },
		powerstats: { type: Object, },
		appearance: { type: Object },
		biography: { type: Object },
		connections: { type: Object },
		comments: [{ 
			type: Schema.Types.ObjectID,
			ref: 'Comment',
		 }],
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Superhero = model('Superhero', superheroSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Superhero

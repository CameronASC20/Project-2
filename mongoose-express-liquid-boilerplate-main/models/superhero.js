// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const superheroSchema = new Schema(
	{
		id: { type: String, required: true},
		name: { type: String, required: true },
		powerstats: { type: Object, required: true },
        appearance: { type: Object, required: true },
		biography: { type: Object, required: true },
		connections: { type: Object, required: true },
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

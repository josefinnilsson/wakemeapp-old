//Adapted from: https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const salt_rounds = 10

const UserSchema = new mongoose.Schema({
    email: { type: String, required, true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
})

UserSchema.pre('save', (next) => {
    if (this.isNew || this.isModified('password')) {
        const document = this
        bcrypt.hash(document.password, salt_rounds, (err, hashedPassword) => {
            if (err) {
                next(err)
            } else {
                document.password = hashedPassword
                next()
            }
        })
    } else {
        next()
    }
})

module.exports = mongoose.model('User', UserSchema)
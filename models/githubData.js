import { Schema, model } from 'mongoose'

const githubData = new Schema( {
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    contributions: []
},
{
    timestamps: true
}
);

module.exports = model('GitHubData', githubData);

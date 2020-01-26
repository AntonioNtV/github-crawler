const GithubData = require('../models/githubData')
const axios = require('axios')

const updateContributionsFromUser = async (username) => {
    const githubData = await GithubData.findOne( { username: username } );

    if (githubData) {
        const datetime = new Date();
    
        const completeDateArray = datetime.toISOString().slice(0,10).split('-');
        const day = parseInt(completeDateArray[2]).toString()
        const month = parseInt(completeDateArray[1]).toString()
        const year = parseInt(completeDateArray[0]).toString()
        
        const response = await axios.get(` https://github-contributions-api.now.sh/v1/${username}?format=nested`)
        
        const { contributions } = response.data;
        const {date, count} = contributions.contributions[year][month][17]

        const todaysContributions = {
            date,
            count
        }

        githubData.contributions.unshift(todaysContributions)
        await githubData.save()


    }
}

const updateAllUsers = async() => {
    const allUsers = await GithubData.find({})

    allUsers.forEach(element => {
        updateContributionsFromUser(element.username)
    });
}

module.exports = { updateAllUsers }
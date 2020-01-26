const mongoose = require('mongoose');
const GithubData = require('./models/githubData')
const { CronJob } = require('cron')
const updateController = require('./data/updateController')
const credentials = require('./env/credentials')


mongoose.connect(`mongodb+srv://${credentials.cluster}:${credentials.password}@cluster0-xi3uc.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const job = new CronJob('0 0 6 * * ?', () => {
    updateController.updateAllUsers();
    console.log('Updating all users');
});

job.start();



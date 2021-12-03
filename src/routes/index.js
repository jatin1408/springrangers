const apiRouter = require('./api');
const userRouter = require('./user');

module.exports = {
    api: apiRouter,
    user: userRouter
};

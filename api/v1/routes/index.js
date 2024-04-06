const Router = require('express').Router();
const fs = require('fs');
const chalk = require('chalk');
const {EOL} = require('os');

Router.get('/', (req, res) => {
    res.send("V1 route is up..");
});
console.log(chalk.green('INITIALIZING ROUTES...'));
// based on the file name it should use the router
try {
    const data = fs.readFileSync(__dirname + '/.ignoreroutes', {encoding: 'utf-8'});
    const toIgnore = [
        '.ignoreroutes',
        'index.js',
        ...data.split(EOL)
    ];
    console.log(chalk.white.bold('IGNORE ROUTES FILE'));
    console.log(chalk.white('-----------------------'));
    console.log(chalk.bgGreenBright.black(data.split(EOL)));
    console.log(chalk.white('-----------------------'));
    const dirs = fs.readdirSync(__dirname);
    dirs.map(d => {
        if(!toIgnore.includes(d)) {
            console.log(chalk.green(`Route File Loaded:=> ${d}`));
            Router.use('/' + d.split('.')[0], require(`./${d}`));
        }
    });
}catch(e) {
    console.log(e);
}

module.exports = Router;
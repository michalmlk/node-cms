const app = require('./index');
const chalk = require("chalk");
const PORT = 3000;

app.listen(PORT, () => {
    console.log(chalk.black.bold.bgGreen(`     Server started on port ${PORT} ⚡️     `));
})
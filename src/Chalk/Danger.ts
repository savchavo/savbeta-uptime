import chalk from "chalk";

export const danger = (description : string) => {
    return console.log(chalk.bold.red.bgBlack("BAŞARISIZ ") + chalk.bold.white.bgBlack("- ") + chalk.bold(description))
}
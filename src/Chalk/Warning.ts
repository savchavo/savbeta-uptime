import chalk from "chalk";

export const warning = (description : string) => {
    return console.log(chalk.bold.yellow.bgBlack("BAŞARISIZ ") + chalk.bold.white.bgBlack("- ") + chalk.bold(description))
}
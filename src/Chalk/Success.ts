import chalk from "chalk";

export const success = (description : string) => {
    return console.log(chalk.bold.green.bgBlack("BAŞARILI ") + chalk.bold.white.bgBlack("- ") + chalk.bold(description))
}
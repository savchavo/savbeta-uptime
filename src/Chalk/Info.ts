import chalk from "chalk";

export const info = (description : string) => {
    return console.log(chalk.bold.blue.bgBlack("BİLGİ ") + chalk.bold.white.bgBlack("- ") + chalk.bold(description))
}
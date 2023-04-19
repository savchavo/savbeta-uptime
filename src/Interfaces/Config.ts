export interface Config {
    token: string,
    prefix: string,
    developers: string[],
    database: {
        url: string
    }
}
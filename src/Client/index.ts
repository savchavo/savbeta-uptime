import { Client, Collection } from "discord.js";
import { connect, set } from "mongoose";
import { Commands, Config, Events } from "../Interfaces";

import { success, danger, warning } from "../Chalk"

import fs from "fs";
import path from "path";
import configFile from "../config.json";

export class RomanBot extends Client {
    public commands : Collection<string, Commands> = new Collection();
    public config : Config = configFile;

    public async init() {
        this.registeredCommands()
        this.registeredEvents()
        this.connectingDatabase()

        this.login(this.config.token).then(() => {
            success("Discord API'ye istek gönderimi başarılı.")
        }).catch(() => {
            danger("Discord API'ye istek gönderimi başarısız.")
        });
    }

    public async registeredEvents() {
       fs.readdir(path.join(__dirname, "../Events"), (err, events: string[]) => {
            if(err) throw new Error(err.message);

            events.forEach(async (event : string) => {
                try {
                    const { Event }: { Event: Events } = await import(`../Events/${event}`);

                    if(Event.once) {
                        this.once(Event.name, (...args) => {
                            Event.run(this, ...args)
                        });
                    } else {
                        this.on(Event.name, (...args) => {
                            Event.run(this, ...args)
                        });
                    }

                } catch (err) {
                    throw err;
                }
            });
       });
    }

    public async registeredCommands() {
        fs.readdir(path.join(__dirname, "../Commands"), (err, commands: string[]) => {
            if(err) throw new Error(err.message);

            commands.forEach(async (command : string) => {
                try {
                    const { Command }: { Command: Commands } = await import(`../Commands/${command}`);

                    this.commands.set(Command.name, Command)
                    
                } catch (err) {
                    throw err;
                }
            });
       });
    }

    public async connectingDatabase() {
        set("strictQuery", false)

       connect(this.config.database.url).then(() => {
            success("Mongo Atlas'a istek gönderimi başarılı.")
       }).catch(() => {
            danger("Mongo Atlas'a istek gönderimi başarısız.")
       });
    }
}
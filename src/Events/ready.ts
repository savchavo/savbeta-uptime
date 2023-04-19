import { Events } from "../Interfaces";
import { info } from "../Chalk"

export const Event : Events = {
    name: "ready",
    once: false,
    run: (client) => {
        info(`Aktif: ${client.user?.tag}`)
    
       
    const sav = [
        `Sponsor gg./roderika`,
        ' Yenideden Sav Beta',
        'Sponsor gg./roderika',
         `Yeniden Sav Beta`
      ]
      setInterval(() => {
        const işlev = Math.floor(Math.random() * (sav.length - 1))
        client.user?.setActivity(sav[işlev])
      }, 7000)
      console.log(client.users.cache.size)
} }
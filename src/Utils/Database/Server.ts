import { JsonDatabase } from "wio.db";
import { DBServerSuggestions } from "./Suggestions";

const db = new JsonDatabase<DBServer>({ databasePath: "./db/serverDb.json" });

export function getServer<Fill extends boolean = false>(
  serverId: string,
  fill?: Fill
): Fill extends true ? DBServer : DBServer | undefined {
  const serverData = db.get(serverId, fill ? {} : undefined);
  return serverData;
}

export function setServer(serverId: string, serverData: DBServer) {
  db.set(serverId, serverData);
}

// Interfaces

export interface DBServer {
  suggestions?: DBServerSuggestions;
}

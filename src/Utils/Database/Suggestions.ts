import { getServer, setServer } from "./Server";
import { DBServerSuggestion } from "./Suggestion";

export function getSuggestions<Required extends boolean = false>(
  serverId: string,
  required?: Required
): DBSuggestionsReturn<Required> {
  const { suggestions } = getServer(serverId, true);
  if (required && !suggestions)
    throw new Error("[DB] Suggestions are requested to be required but not available on the data.");
  return suggestions as DBSuggestionsReturn<Required>;
}

export function setSuggestions(serverId: string, suggestionsData: DBServerSuggestions) {
  const server = getServer(serverId, true);
  server.suggestions = suggestionsData;
  setServer(serverId, server);
}

export function getSuggestionsChannel(serverId: string | undefined | null): string | undefined {
  return serverId ? getServer(serverId)?.suggestions?.channel : undefined;
}

export function getSuggestionsStatus(serverId: string | undefined | null): boolean | undefined {
  return serverId ? getServer(serverId)?.suggestions?.status : undefined;
}

export function getSuggestionsCount(serverId: string | undefined | null): number {
  return serverId ? getServer(serverId)?.suggestions?.last ?? 0 : 0;
}

export function getSuggestionsAdminPerm(serverId: string | undefined | null): string | undefined {
  return serverId ? getServer(serverId)?.suggestions?.adminPerm : undefined;
}

export function overwriteSuggestions(serverId: string, partialSuggestionsData: Partial<DBServerSuggestions>) {
  const server = getServer(serverId, true);
  server.suggestions = { ...(server.suggestions as DBServerSuggestions), ...partialSuggestionsData };
  setServer(serverId, server);
}

export function deleteSuggestions(serverId: string) {
  const serverData = getServer(serverId, true);
  const { suggestions, ...others } = serverData;
  setServer(serverId, others);
}

export function isSuggestionsUsable(serverId: string): boolean {
  return !!getServer(serverId, true).suggestions;
}

// Interfaces

export type DBSuggestionsReturn<Required extends boolean> = Required extends true
  ? DBServerSuggestions
  : DBServerSuggestions | undefined;

export interface DBServerSuggestions {
  channel: string;
  adminPerm?: string;
  last: number;
  list: DBServerSuggestion[];
  status: boolean;
}

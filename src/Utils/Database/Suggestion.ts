import { getSuggestions, overwriteSuggestions } from "./Suggestions";

export function getSuggestion<Required extends boolean = false>(
  serverId: string,
  messageId: string,
  required?: Required
): DBSuggestionReturn<Required> {
  const suggestions = getSuggestions(serverId, true);
  const suggestionFound = suggestions.list.find((list) => list.messageId === messageId);
  if (required && !suggestionFound)
    throw new Error("[DB] A suggestion is requested to be required but not available on the data.");
  return suggestionFound as DBSuggestionReturn<Required>;
}
export function refreshSuggestion(serverId: string, messageId: string, sugggestionData: DBServerSuggestion) {
  const suggestions = getSuggestions(serverId, true);
  const suggestionList = suggestions.list.map((suggestion) =>
    suggestion.messageId === messageId ? sugggestionData : suggestion
  );
  overwriteSuggestions(serverId, { list: suggestionList });
}
export function overwriteSuggestion(
  serverId: string,
  messageId: string,
  partialSugggestionData: Partial<DBServerSuggestion>
) {
  const suggestions = getSuggestions(serverId, true);
  const suggestionList = suggestions.list.map((suggestion) =>
    suggestion.messageId === messageId ? { ...suggestion, ...partialSugggestionData } : suggestion
  );
  overwriteSuggestions(serverId, { list: suggestionList });
}

export function getUserSuggestions(serverId: string, userId: string): DBServerSuggestion[] {
  const suggestions = getSuggestions(serverId, true);
  return suggestions.list?.filter((list) => list.userId === userId);
}

export function addSuggestionSupporter(serverId: string, messageId: string, userId: string) {
  const suggestion = getSuggestion(serverId, messageId, true);
  overwriteSuggestion(serverId, messageId, { accepts: [...(suggestion?.accepts ?? []), userId] });
}

export function removeSuggestionSupporter(serverId: string, messageId: string, userId: string) {
  const suggestion = getSuggestion(serverId, messageId, true);
  overwriteSuggestion(serverId, messageId, { accepts: (suggestion?.accepts ?? []).filter((user) => user !== userId) });
}

export function checkSuggestionSupporter(serverId: string, messageId: string, userId: string) {
  const suggestion = getSuggestion(serverId, messageId, true);
  return suggestion.accepts.includes(userId);
}

export function addSuggestionDenyer(serverId: string, messageId: string, userId: string) {
  const suggestion = getSuggestion(serverId, messageId, true);
  overwriteSuggestion(serverId, messageId, { denies: [...(suggestion?.denies ?? []), userId] });
}

export function removeSuggestionDenyer(serverId: string, messageId: string, userId: string) {
  const suggestion = getSuggestion(serverId, messageId, true);
  overwriteSuggestion(serverId, messageId, { denies: (suggestion?.denies ?? []).filter((user) => user !== userId) });
}

export function checkSuggestionDenyer(serverId: string, messageId: string, userId: string) {
  const suggestion = getSuggestion(serverId, messageId, true);
  return suggestion.denies.includes(userId);
}

export function setActionAdmin(serverId: string, messageId: string, adminId: string) {
  overwriteSuggestion(serverId, messageId, { actionAdminId: adminId });
}

export function getActionAdmin(serverId: string, messageId: string) {
  const adminId = getSuggestion(serverId, messageId, true);
  return adminId.actionAdminId;
}

// Interfaces

export type DBSuggestionReturn<Required extends boolean> = Required extends true
  ? DBServerSuggestion
  : DBServerSuggestion | undefined;

export interface DBServerSuggestion {
  userId: string;
  suggestion: string;
  accepts: string[];
  denies: string[];
  messageId: string;
  suggestionId: number;
  actionAdminId?: string;
  messageUrl: string;
}

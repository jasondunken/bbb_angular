export interface CreateJournalDto {
    journalName: String;
    journalDescription: String;
}

export interface JournalDto {
    _id: String;
    journalName: String;
    journalDescription: String;
    journalEntries: [];
}

export interface CreateJournalEntryDto {
    journalEntry: String;
    journalEntryTitle: String;
    images: [];
}

export interface JournalEntryDto {
    _id: String;
    journalEntry: String;
    journalEntryTitle: String;
    images: [];
}

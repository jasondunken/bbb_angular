export interface CreateJournalDto {
    name: String;
    description: String;
}

export interface JournalDto {
    _id: String;
    name: String;
    description: String;
    entries: [];
    createdAt: Date;
    lastUpdate: Date;
}

export interface CreateJournalEntryDto {
    title: String;
    description: String;
    body: String;
    images: [];
}

export interface JournalEntryDto {
    _id: String;
    title: String;
    description: String;
    body: String;
    images: [];
    createdAt: Date;
    lastUpdate: Date;
}

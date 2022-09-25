export interface CreateJournalDto {
    name: string;
    description: string;
}

export interface JournalDto {
    _id: string;
    name: string;
    description: string;
    entries: [];
    createdAt: Date;
    lastUpdate: Date;
}

export interface CreateJournalEntryDto {
    journalId: string;
    title: string;
    description: string;
    body: string;
    images: [];
}

export interface JournalEntryDto {
    _id: string;
    title: string;
    description: string;
    body: string;
    images: [];
    createdAt: Date;
    lastUpdate: Date;
}

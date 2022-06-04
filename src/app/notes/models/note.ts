import { User } from "src/app/authentication/models/authentication";

export interface Note {
    id: number;
    title: string;
    content: string;
    user_id: 0;
    user: User;
    created: string;
    updated: string;
}

export class CreateNote {
    title: string;
    content: string;
    constructor(note) {
        this.title = note.title || "";
        this.content = note.content || "";

    }
}
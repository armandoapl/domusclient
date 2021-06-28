import { Photo } from "./photo";
import { Property } from "./Property";

export interface Agent {
    id: number;
    userName: string;
    photoUrl: string;
    legalId: string;
    age: number;
    knownAs: string;
    createdAt: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    city: string;
    country: string;
    photos: Photo[];
    properties: Property[];
}
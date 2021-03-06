import { Photo } from "./photo";

export interface Property {
        id: number;
        title: string;
        description: string;
        city: string;
        country: string;
        appUserId: number;
        address: string;
        photoUrl: string;
        photos: Photo[];
}
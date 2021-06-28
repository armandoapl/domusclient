import { Photo } from "./photo";

export interface Property {
        id: number;
        title: string;
        description: string;
        city: string;
        country: string;
        AppUserId: number;
        address: string;
        photoUrl: Photo;
        photos: Photo[];
}
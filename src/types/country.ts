export default interface Country {
    name: string;
    capital: string;
    altSpellings: string;
    region: string;
    subregion: string;
    population: number;
    flag: string;
    latlng: number[];
    area: number;
    languages: Language[];
    borders: string[];
}

export interface Language {
    name: string;
}

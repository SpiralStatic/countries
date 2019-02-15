import axios from 'axios';
import Country from '../../types/country';

export default class CountriesApi {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get(country: string): Promise<Country[]> {
        return await axios
            .get<Country[]>(`${this.baseUrl}/name/${country}`)
            .then((response) => response.data);
    }

    public async getByCode(codes: string[]): Promise<Country[]> {
        return await axios
            .get<Country[]>(`${this.baseUrl}/alpha?codes=${codes.join(';')}`)
            .then((response) => response.data);
    }
}

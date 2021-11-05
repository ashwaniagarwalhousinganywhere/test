import { Character, CharacterInitialValues, Characters, CharactersInitialValues } from "../models/character";
import { Episode, EpisodeInitialValues } from '../models/Episode';
import { Location, LocationsInitialValues } from '../models/Location';
import { getAllCharacterById, getAllCharacters, getAllCharactersByIds, getEpisode, getEpisodeById, getEpisodes, getLocation } from "../services/rick-morty-service";

const characters: Characters = CharactersInitialValues;
const character: Character = CharacterInitialValues;
const allCharactersTest: Character[] = [];
const locations: Location = LocationsInitialValues;
const episodes: Episode[] = [];
const episode: Episode = EpisodeInitialValues;

const RickMortyStore = {
    data:
    {
        allCharacters: characters,
        allCharactersTest: allCharactersTest,
        character: character,
        allLocations: locations,
        allEpisodes: episodes,
        episode: episode,
        error: ""
    },

    getAllCharacters: async function (pageNum:number) {
        try {
            const response = await getAllCharacters(pageNum);
            this.data.allCharacters = response;
            this.data.error = "";
        }
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                this.data.error = error.response.data;
            }
            else {
                this.data.error = "Rick Morty API Error";
            }
        }
    },

    getAllCharacterById: async function (characterId: number) {
        try {
            const response = await getAllCharacterById(characterId);
            this.data.character = response;
            this.data.error = "";
        }
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                this.data.error = error.response.data;
            }
            else {
                this.data.error = "Rick Morty API Error";
            }
        }
    },

    getAllCharactersByIds: async function (characterIds: Array<number>) {
        try {
            const response = await getAllCharactersByIds(characterIds);
            this.data.allCharactersTest = response;
            this.data.error = "";
        }
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                this.data.error = error.response.data;
            }
            else {
                this.data.error = "Rick Morty API Error";
            }
        }
    },

    getLocation: async function (locationId: number) {
        try {
            const response = await getLocation(locationId);
            this.data.allLocations = response;
            this.data.error = "";
        }
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                this.data.error = error.response.data;
            }
            else {
                this.data.error = "Rick Morty API Error";
            }
        }
    },

    getEpisodes: async function (episodeIds: Array<number>) {
        try {
            const response = await getEpisodes(episodeIds);
            this.data.allEpisodes = response;
            this.data.error = "";
        }
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                this.data.error = error.response.data;
            }
            else {
                this.data.error = "Rick Morty API Error";
            }
        }
    },

    getEpisode: async function (episodeIds: Array<number>) {
        try {
            const response = await getEpisode(episodeIds);
            this.data.episode = response;
            this.data.error = "";
        }
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                this.data.error = error.response.data;
            }
            else {
                this.data.error = "Rick Morty API Error";
            }
        }
    },

    getEpisodeById: async function (episodeIds: number) {
        try {
            const response = await getEpisodeById(episodeIds);
            this.data.episode = response;
            this.data.error = "";
        }
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                this.data.error = error.response.data;
            }
            else {
                this.data.error = "Rick Morty API Error";
            }
        }
    }
}

export default RickMortyStore
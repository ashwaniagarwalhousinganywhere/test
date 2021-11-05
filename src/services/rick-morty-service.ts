

import http from "../apiConfigs/http-service";
import { Character, Characters } from "../models/character";
import { Episode } from "../models/Episode";
import { Location } from "../models/Location";


export async function getAllCharacters(pageNum:number): Promise<Characters> {
    return await (await http.get(`https://rickandmortyapi.com/api/character?page=${pageNum}`)).data;
}

export async function getAllCharacterById(characterId: number): Promise<Character> {
    return await (await http.get(`https://rickandmortyapi.com/api/character/${characterId}`)).data;
}

export async function getAllCharactersByIds(characterIds: Array<number>): Promise<Array<Character>> {
    return await (await http.get(`https://rickandmortyapi.com/api/character/${characterIds}`)).data;
}

export async function getLocation(locationId: number): Promise<Location> {
    return await (await http.get(`https://rickandmortyapi.com/api/location/${locationId}`)).data;
}

export async function getEpisode(episodeIds: Array<number>): Promise<Episode> {
    return await (await http.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`)).data;
}

export async function getEpisodes(episodeIds: Array<number>): Promise<Array<Episode>> {
    return await (await http.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`)).data;
}

export async function getEpisodeById(episodeId: number): Promise<Episode> {
    return await (await http.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)).data;
}
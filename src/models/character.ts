export type Characters =
    {
        results: Array<Character>,
        info: Info
    }

export const CharactersInitialValues =
{
    results: [],
    info: <Info>{}
}

export const CharacterInitialValues =
{
    id: 0,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: <CharacterOrigin>{},
    location: <CharacterLocation>{},
    image: "",
    episode: [],
    url: "",
    created: ""
}

export const CharacterInfoInitialValues =
{
    count: 0,
    pages: 0,
    next: "",
    prev: ""
}

export type Info = {
    count: number,
    pages: number,
    next: string,
    prev: string
}

export type Character =
    {
        id: number,
        name: string,
        status: string,
        species: string,
        type: string,
        gender: string,
        origin: CharacterOrigin,
        location: CharacterLocation,
        image: string,
        episode: Array<string>,
        url: string,
        created: string
    }

export type CharacterOrigin =
    {
        name: string,
        url: string
    }

export type CharacterLocation =
    {
        name: string,
        url: string
    }
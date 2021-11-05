export const LocationsInitialValues =
{
    id: 0,
    name: "",
    type: "",
    dimension: "",
    residents: []
}

export type Location =
    {
        id: number,
        name: string,
        type: string,
        dimension: string,
        residents: Array<string>
    }
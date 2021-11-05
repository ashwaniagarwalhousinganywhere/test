export type Episode =
    {
        id:number,
        name:string,
        air_date:string,
        episode:string,
        characters:Array<string>
    }

    export const EpisodeInitialValues=
    {
        id:0,
        name:"",
        air_date:"",
        episode:"",
        characters:[]
    }
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Character, CharacterInitialValues } from '../models/character';
import { Episode, EpisodeInitialValues } from '../models/Episode';
import RickMortyStore from '../stores/rick-morty-store';


interface ICollectionLandingProps extends RouteComponentProps<{ id?: string }> { }
interface ICollectionLandingState {
    character: Character;
    allEpisodes: Array<Episode>;
    singlEpisode: Episode;
    spinner: boolean;
}

class CharacterDetailsComponent extends React.Component<ICollectionLandingProps, ICollectionLandingState> {

    constructor(props: ICollectionLandingProps) {
        super(props);
        this.state = {
            character: CharacterInitialValues,
            allEpisodes: [],
            singlEpisode: EpisodeInitialValues,
            spinner: false
        }
    }

    episodesIds: Array<number> = [];

    componentDidMount() {
        this.getAllCharacterById(Number(this.props.match.params.id));
    }

    async getAllCharacterById(characterId: number) {

        this.episodesIds = [];
        this.setState({ spinner: true });

        await RickMortyStore.getAllCharacterById(characterId);
        const { character, error } = RickMortyStore.data;
        this.setState({ character: character });

        character.episode.forEach(toSplit => {
            let idFromUrl = toSplit.split('/');

            this.episodesIds.push(Number(idFromUrl[idFromUrl.length - 1]));
        });

        await this.fetchEpisodes(this.episodesIds);
        this.setState({ spinner: false });
    }


    async fetchEpisode(episodeIds: Array<number>) {
        await RickMortyStore.getEpisode(episodeIds);
        const { episode, error } = RickMortyStore.data;
        this.setState({ singlEpisode: episode });
    }

    async fetchEpisodes(episodeIds: Array<number>) {

        await RickMortyStore.getEpisodes(episodeIds);
        const { allEpisodes, error } = RickMortyStore.data;

        if (allEpisodes.length === undefined) {
            await this.fetchEpisode(episodeIds);
        }

        this.setState({ allEpisodes: allEpisodes });
    }


    renderEpisodes() {

        if (!!this.state.singlEpisode && this.state.singlEpisode.id !== 0) {
            return (
                <div className="grid-container">
                    <Link to={"/episode/" + this.state.singlEpisode.id}>
                        <div className="grid-item" style={{ paddingBottom: "5px", backgroundColor: "cadetblue", height: "120px", borderRadius: "10px", textAlign: "center", fontFamily: "sans-serif" }}>
                            <div className="card">
                                <div className="card-block">
                                    <h3>{this.state.singlEpisode.name}</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        }
        else {
            return (
                <>
                    <div className="grid-container">
                        {!!this.state.allEpisodes && this.state.allEpisodes.map((episode: Episode, index: number) => {
                            return (
                                <Link key={index} to={"/episode/" + episode.id}>
                                    <div className="grid-item" style={{ paddingBottom: "5px", backgroundColor: "cadetblue", height: "120px", borderRadius: "10px", textAlign: "center", fontFamily: "sans-serif" }}>
                                        <div className="card">
                                            <div className="card-block">
                                                <h3>{episode.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                </>

            )
        }
    }

    getLocationUrl(character: Character) {

        let id: string = "";

        if (character !== undefined && character.id !== 0) {
            let idFromUrl = character.location.url.split('/');
            id = idFromUrl[idFromUrl.length - 1];
        }
        return id;
    }

    render() {
        return (
            <>
                <div className="container location-header-container">
                    <div className="row">
                        <div className="col col-lg-4">
                            <img className="character-image" src={this.state.character.image} />
                        </div>

                        <div className="col">
                            <div className="row">
                                <div className="col col-lg-2">
                                    <h1>{this.state.character.name}</h1>
                                    {this.state.spinner === true ? null : <b>|</b>}
                                    <b>{this.state.character.gender}</b>
                                    {this.state.spinner === true ? null : <b>|</b>}
                                    <b>{this.state.character.status}</b>
                                    <div style={{ height: "20px", width: "100%" }}></div>
                                    {this.state.spinner === true ? null : <Link
                                        to={"/location/" + this.getLocationUrl(this.state.character)}
                                        className="btn btn-primary active">
                                        <h3 style={{ color: "white" }}>See Location</h3>
                                    </Link>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={this.state.spinner === true ? { display: 'flex', justifyContent: 'center', top: '50%', left: '50%', backgroundColor: "transparent" } : { display: 'none' }}>
                        <img src="/assets/images/loader.gif" width={150} height={120} />
                    </div>

                    <div style={{ height: "40px", width: "100%" }}></div>
                </div>

                <h2 className="all-characters-heading">EPISODES</h2>

                {this.renderEpisodes()}

            </>
        );
    }



}



export default withRouter(CharacterDetailsComponent);

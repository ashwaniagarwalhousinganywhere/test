import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Character } from '../models/character';
import { Episode, EpisodeInitialValues } from '../models/Episode';
import RickMortyStore from '../stores/rick-morty-store';
import CharacterCardComponent from './CharacterCardComponent';

export interface IEpisodeDetailComponenentProps extends RouteComponentProps<{ id?: string }> {

}

interface IEpisodeDetailComponentState {
    allCharacters: Array<Character>;
    singlEpisode: Episode;
    spinner: boolean;
}

class EpisodeDetailComponent extends React.Component<IEpisodeDetailComponenentProps, IEpisodeDetailComponentState> {

    constructor(props: IEpisodeDetailComponenentProps) {
        super(props);
        this.state = {
            allCharacters: [],
            singlEpisode: EpisodeInitialValues,
            spinner: false
        }
    }

    characterIds: Array<number> = [];

    componentDidMount() {
        this.getEpisode(Number(this.props.match.params.id));
    }

    async getEpisode(episodeId: number) {
        this.setState({ spinner: true });
        this.characterIds = [];
        await RickMortyStore.getEpisodeById(episodeId);
        const { episode, error } = RickMortyStore.data;

        this.setState({ singlEpisode: episode });

        episode.characters.forEach(toSplit => {
            let idFromUrl = toSplit.split('/');
            this.characterIds.push(Number(idFromUrl[idFromUrl.length - 1]));
        });

        await this.fetchCharacters(this.characterIds);
        this.setState({ spinner: false });
    }

    async fetchCharacters(characterIds: Array<number>) {
        await RickMortyStore.getAllCharactersByIds(characterIds);
        const { allCharactersTest, error } = RickMortyStore.data;
        this.setState({ allCharacters: allCharactersTest });
    }

    getCharacterDetails(data: Character) {
        this.props.history.push("/character/" + data.id);
    }

    render() {
        return (

            <React.Fragment>
                <div className="container location-header-container">
                    <div className="row">
                        <h1 className="all-characters-heading">{this.state.singlEpisode.name}</h1>
                        <h1 className="all-characters-heading"><b>{this.state.singlEpisode.episode}</b></h1>
                        <div style={{ height: "40px", width: "100%" }}></div>
                    </div>
                </div>


                <h2 className="all-characters-heading">FEATURED CHARCTERS</h2>
                <div style={this.state.spinner === true ? { display: 'flex', justifyContent: 'center', top: '50%', left: '50%', backgroundColor: "transparent" } : { display: 'none' }}>
                    <img src="/assets/images/loader.gif" width={150} height={120} />
                </div>

                <CharacterCardComponent allCharacters={this.state.allCharacters} />

            </React.Fragment>
        )
    }
}



export default withRouter(EpisodeDetailComponent);

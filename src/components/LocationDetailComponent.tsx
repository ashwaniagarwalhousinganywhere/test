import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Character } from '../models/character';
import { Location, LocationsInitialValues } from '../models/Location';
import RickMortyStore from '../stores/rick-morty-store';
import CharacterCardComponent from './CharacterCardComponent';

export interface ILocationDetailComponentProps extends RouteComponentProps<{ id?: string }> {

}

interface ILocationDetailComponentState {
    allCharacters: Array<Character>;
    location: Location;
    spinner: boolean;
}

class LocationDetailComponent extends React.Component<ILocationDetailComponentProps, ILocationDetailComponentState> {

    constructor(props: ILocationDetailComponentProps) {
        super(props);
        this.state = {
            allCharacters: [],
            location: LocationsInitialValues,
            spinner: false
        }
    }

    characterIds: Array<number> = [];

    componentDidMount() {
        this.getLocation(Number(this.props.match.params.id));
    }

    async getLocation(locationId: number) {
        this.setState({ spinner: true });
        this.characterIds = [];
        await RickMortyStore.getLocation(locationId);
        const { allLocations, error } = RickMortyStore.data;

        this.setState({ location: allLocations });

        allLocations.residents.forEach(toSplit => {
            let idFromUrl = toSplit.split('/');
            this.characterIds.push(Number(idFromUrl[idFromUrl.length - 1]));
        })

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
                        <h1 className="all-characters-heading">{this.state.location.name}</h1>
                        <h1 className="all-characters-heading"><b>{this.state.location.dimension}</b></h1>
                        <div style={{ height: "40px", width: "100%" }}></div>
                    </div>
                </div>

                <h2 className="all-characters-heading">RESIDENTS</h2>

                <div style={this.state.spinner === true ? { display: 'flex', justifyContent: 'center', top: '50%', left: '50%', backgroundColor: "transparent" } : { display: 'none' }}>
                    <img src="/assets/images/loader.gif" width={150} height={120} />
                </div>

                <CharacterCardComponent allCharacters={this.state.allCharacters} />

            </React.Fragment>
        )
    }
}



export default withRouter(LocationDetailComponent);

import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import CharacterCardComponent from "../components/CharacterCardComponent";
import { Character, CharacterInfoInitialValues, Info } from "../models/character";
import RickMortyStore from "../stores/rick-morty-store";

interface ICollectionLandingProps extends RouteComponentProps { }
interface ICollectionLandingState {
    allCharacters: Array<Character>;
    allCharactersCount: number;
    spinner: boolean;
    currentPageNum: number;
    allCharacterInfo: Info;
    showInfiniteScrollSpinner: boolean;
}

class CharacterLandingPage extends React.Component<ICollectionLandingProps, ICollectionLandingState> {

    constructor(props: ICollectionLandingProps) {
        super(props);
        this.state = {
            allCharacters: [],
            allCharactersCount: 0,
            spinner: false,
            currentPageNum: 1,
            allCharacterInfo: CharacterInfoInitialValues,
            showInfiniteScrollSpinner: false
        }
    }

    async fetchCharacterDetails(pageNum: number) {

        this.setState({ spinner: true });

        let characters = await this.fetchCharacters(pageNum);

        this.setState(
            {
                allCharacters: characters.results,
                allCharactersCount: characters.info.count,
                allCharacterInfo: characters.info,
                currentPageNum: pageNum,
                spinner: false,
                showInfiniteScrollSpinner: characters.results.length < characters.info.count ? true : false,
            });

        this.setState({ spinner: false });
    }

    componentDidMount() {
        this.fetchCharacterDetails(1);
    }

    fetchCharacters = async (currentPageNum: number) => {
        await RickMortyStore.getAllCharacters(currentPageNum);
        const { allCharacters, error } = RickMortyStore.data;
        return allCharacters;
    };

    paginatePreviousResult(pageNum: number) {
        window.scrollTo(0, 0);
        this.fetchCharacterDetails(pageNum - 1);
        this.setState({ currentPageNum: pageNum - 1 });
    }

    paginateNextResult(pageNum: number) {
        window.scrollTo(0, 0);
        this.fetchCharacterDetails(pageNum + 1);
        this.setState({ currentPageNum: pageNum + 1 });
    }

    paginateFirstResult(pageNum: number) {
        window.scrollTo(0, 0);
        this.fetchCharacterDetails(pageNum);
        this.setState({ currentPageNum: pageNum });
    }

    paginateLastResult(pageNum: number) {
        window.scrollTo(0, 0);
        this.fetchCharacterDetails(pageNum);
        this.setState({ currentPageNum: pageNum });
    }


    render() {

        return (
            <React.Fragment>

                <div className="container location-header-container">
                    <div className="row">
                        <h1 className="all-characters-heading">ALL CHARACTERS</h1>
                    </div>
                </div>

                <div style={{ height: "40px", width: "100%" }}></div>
                <div style={this.state.spinner === true ? { display: 'flex', justifyContent: 'center', top: '50%', left: '50%', backgroundColor: "transparent" } : { display: 'none' }}>
                    <img src="/assets/images/loader.gif" width={150} height={120} />
                </div>

                <div className="row">
                    <CharacterCardComponent allCharacters={this.state.allCharacters} />
                </div>

                <div className="row">
                    <nav className="page-navigation-items">
                        <ul className="pagination pagination-lg">
                            <li className="page-item page-item-btn">
                                <button className="btn btn-primary" disabled={this.state.currentPageNum === 1 ? true : false} onClick={() => this.paginateFirstResult(1)} tabIndex={-1}>First
                                </button>
                            </li>
                            <li className="page-item page-item-btn">
                                <button className="btn btn-primary" disabled={this.state.currentPageNum === 1 ? true : false} onClick={() => this.paginatePreviousResult(this.state.currentPageNum === 1 ? 0 : this.state.currentPageNum)} tabIndex={-1}>Previous
                                </button>
                            </li>
                            <li className="page-item page-item-btn">
                                <button className="btn btn-primary" disabled={this.state.currentPageNum === this.state.allCharacterInfo.pages ? true : false} onClick={() => this.paginateNextResult(this.state.currentPageNum)}>Next
                                </button>
                            </li>
                            <li className="page-item page-item-btn">
                                <button className="btn btn-primary" disabled={this.state.currentPageNum === this.state.allCharacterInfo.pages ? true : false} onClick={() => this.paginateLastResult(this.state.allCharacterInfo.pages)}>Last
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(CharacterLandingPage);
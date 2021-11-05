import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Character } from "../models/character";

export interface ICharacterCardComponentProps extends RouteComponentProps {
    allCharacters: Array<Character>;
}

const CharacterCardComponent: React.FC<ICharacterCardComponentProps> = (
    props: ICharacterCardComponentProps
) => {

    return (
        <div className="character-wrapper">
            <div className="characters-container">
                {!!props.allCharacters && props.allCharacters.map((character: Character, index: number) => {
                    return (
                        <div key={index} className="col-12 col-md-6 col-lg-3" style={{ width: "auto" }}>
                            <Link to={"/character/" + character.id}>
                                <img src={character.image}
                                    alt=""
                                    className="character-image" />
                            </Link>
                            <h3>{character.name}</h3> | <b>{character.species}</b>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

export default withRouter(CharacterCardComponent);

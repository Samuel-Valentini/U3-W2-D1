import { Component } from "react";
import FantasyBooks from "../json/fantasy.json";
import HistoryBooks from "../json/history.json";
import HorrorBooks from "../json/horror.json";
import RomanceBooks from "../json/romance.json";
import ScifiBooks from "../json/scifi.json";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import BookList from "./Booklist";

class GenresChoice extends Component {
    state = {
        genre: "fantasy",
        reloadComment: 0,
    };

    buttonGenerator(genreChoose) {
        return (
            <Button
                variant="success"
                style={{
                    backgroundColor:
                        this.state.genre === genreChoose ? "#157347" : "",
                }}
                onClick={() => {
                    this.setState((prev) => ({
                        genre: genreChoose,
                        reloadComment: prev.reloadComment + 1,
                    }));
                }}>
                {genreChoose}
            </Button>
        );
    }

    render() {
        let bookType = FantasyBooks;
        switch (this.state.genre) {
            case "fantasy":
                bookType = FantasyBooks;
                break;
            case "history":
                bookType = HistoryBooks;
                break;
            case "horror":
                bookType = HorrorBooks;
                break;
            case "romance":
                bookType = RomanceBooks;
                break;
            case "scifi":
                bookType = ScifiBooks;
                break;
            default:
                break;
        }
        return (
            <>
                <div className="d-flex my-3">
                    <ButtonGroup
                        aria-label="Genres"
                        className="m-auto text-center">
                        {this.buttonGenerator("fantasy")}
                        {this.buttonGenerator("history")}
                        {this.buttonGenerator("horror")}
                        {this.buttonGenerator("romance")}
                        {this.buttonGenerator("scifi")}
                    </ButtonGroup>
                </div>
                <BookList
                    list={bookType}
                    reloadComment={this.state.reloadComment}
                />
            </>
        );
    }
}
export default GenresChoice;

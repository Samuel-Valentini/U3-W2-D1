import { Component } from "react";
import FantasyBooks from "../json/fantasy.json";
import HistoryBooks from "../json/history.json";
import HorrorBooks from "../json/horror.json";
import RomanceBooks from "../json/romance.json";
import ScifiBooks from "../json/scifi.json";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import BookList from "./BookList";

class GenresChoice extends Component {
    state = {
        genre: "fantasy",
    };

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
                        <Button
                            variant="success"
                            style={{
                                backgroundColor:
                                    this.state.genre === "fantasy"
                                        ? "#157347"
                                        : "",
                            }}
                            onClick={() => {
                                this.setState({
                                    genre: "fantasy",
                                });
                            }}>
                            fantasy
                        </Button>
                        <Button
                            variant="success"
                            style={{
                                backgroundColor:
                                    this.state.genre === "history"
                                        ? "#157347"
                                        : "",
                            }}
                            onClick={() => {
                                this.setState({
                                    genre: "history",
                                });
                            }}>
                            history
                        </Button>
                        <Button
                            variant="success"
                            style={{
                                backgroundColor:
                                    this.state.genre === "horror"
                                        ? "#157347"
                                        : "",
                            }}
                            onClick={() => {
                                this.setState({
                                    genre: "horror",
                                });
                            }}>
                            horror
                        </Button>
                        <Button
                            variant="success"
                            style={{
                                backgroundColor:
                                    this.state.genre === "romance"
                                        ? "#157347"
                                        : "",
                            }}
                            onClick={() => {
                                this.setState({
                                    genre: "romance",
                                });
                            }}>
                            romance
                        </Button>
                        <Button
                            variant="success"
                            style={{
                                backgroundColor:
                                    this.state.genre === "scifi"
                                        ? "#157347"
                                        : "",
                            }}
                            onClick={() => {
                                this.setState({
                                    genre: "scifi",
                                });
                            }}>
                            scifi
                        </Button>
                    </ButtonGroup>
                </div>
                <BookList list={bookType} />
            </>
        );
    }
}
export default GenresChoice;

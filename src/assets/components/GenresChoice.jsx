import { useState } from "react";
import FantasyBooks from "../json/fantasy.json";
import HistoryBooks from "../json/history.json";
import HorrorBooks from "../json/horror.json";
import RomanceBooks from "../json/romance.json";
import ScifiBooks from "../json/scifi.json";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import BookList from "./Booklist";

const GenresChoice = () => {
    const [genre, setGenre] = useState("fantasy");
    const [reloadComment, setReloadComment] = useState(0);

    const buttonGenerator = (genreChoose) => {
        return (
            <Button
                variant="success"
                style={{
                    backgroundColor: genre === genreChoose ? "#157347" : "",
                }}
                onClick={() => {
                    setGenre(genreChoose);
                    setReloadComment(reloadComment + 1);
                }}>
                {genreChoose}
            </Button>
        );
    };

    let bookType = FantasyBooks;
    switch (genre) {
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
                <ButtonGroup aria-label="Genres" className="m-auto text-center">
                    {buttonGenerator("fantasy")}
                    {buttonGenerator("history")}
                    {buttonGenerator("horror")}
                    {buttonGenerator("romance")}
                    {buttonGenerator("scifi")}
                </ButtonGroup>
            </div>
            <BookList list={bookType} reloadComment={reloadComment} />
        </>
    );
};

export default GenresChoice;

import { Button, Col, Row } from "react-bootstrap";
import SingleBook from "./SingleBook";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import ReviewsAccordion from "./ReviewsAccordion";
import AddComment from "./AddComment";

const BookList = (props) => {
    const [notifyReviews, setNotifyReviews] = useState(0);
    const [search, setSearch] = useState("");
    const [memory, setMemory] = useState(null);
    const [selectedAsin, setSelectedAsin] = useState("");
    const [dataToSend, setDataToSend] = useState({
        comment: "",
        rate: "",
        elementId: "",
    });
    const [shouldPost, setShouldPost] = useState(false);

    const setBooklistState = (selAsin) => {
        setSelectedAsin(selAsin);
        setMemory(props.reloadComment);
    };

    const showForm = memory === props.reloadComment;

    const setCommentDataToSend = (newValue) => {
        setDataToSend({
            ...dataToSend,
            comment: newValue.target.value,
            elementId: selectedAsin,
        });
    };

    const setRateDataToSend = (newValue) => {
        setDataToSend({
            ...dataToSend,
            rate: newValue.target.value,
        });
    };

    const { list } = props;
    const newList = list.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase()),
    );

    const pri = newList.filter((book) => book.asin === selectedAsin)[0];

    let pric;

    if (pri) {
        pric = pri.price;
    } else {
        pric = "0";
    }

    let tit;

    if (pri) {
        tit = pri.title;
    } else {
        tit = "";
    }

    return (
        <>
            <div className="w-75 m-auto">
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="ricerca per titolo"
                    value={search}
                    onChange={(s) => {
                        setSearch(s.target.value);
                    }}
                />
            </div>
            <br />
            <Row>
                <Col xs="6" md="8" lg="9" xxl="10">
                    <Row className="h-100 ">
                        {newList.map((book) => {
                            return (
                                <SingleBook
                                    key={book.asin}
                                    book={book}
                                    selectedAsin={selectedAsin}
                                    setBooklistState={setBooklistState}
                                    dataToSend={dataToSend}
                                    shouldPost={shouldPost}
                                    setCommentDataToSend={setCommentDataToSend}
                                    setRateDataToSend={setRateDataToSend}
                                    memory={memory}
                                    reloadComment={props.reloadComment}
                                />
                            );
                        })}
                    </Row>
                </Col>
                <Col
                    xs="6"
                    md="4"
                    lg="3"
                    xxl="2"
                    className="bg bg-warning text-center ">
                    <div
                        className="sticky-top overflow-auto"
                        style={{ height: "100vh" }}>
                        {selectedAsin && showForm ? (
                            <>
                                <div className="flex-grow-1 me-3 ">
                                    <h1>{tit}</h1>
                                    <hr />
                                    <h2>Reviews</h2>

                                    <ReviewsAccordion
                                        reloadComment={props.reloadComment}
                                        notifyReviews={notifyReviews}
                                        asin={selectedAsin}></ReviewsAccordion>
                                </div>
                                <Button variant="primary" className="mx-auto">
                                    Buy for {pric} €{" "}
                                </Button>
                                <Form
                                    className="me-3"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (dataToSend.rate !== "") {
                                            setShouldPost(true);
                                        } else {
                                            alert("rate non inserito");
                                        }
                                    }}>
                                    <h4 className="text-center mt-3">
                                        Leave a review
                                    </h4>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1">
                                        <Form.Control
                                            required
                                            as="textarea"
                                            rows={3}
                                            value={dataToSend.comment}
                                            onChange={(e) => {
                                                setDataToSend({
                                                    ...dataToSend,
                                                    comment: e.target.value,
                                                    elementId: selectedAsin,
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Select
                                        value={dataToSend.rate}
                                        onChange={(e) => {
                                            setDataToSend({
                                                ...dataToSend,
                                                rate: e.target.value,
                                            });
                                        }}
                                        required
                                        aria-label="Default select example">
                                        <option value="">Rate</option>
                                        <option value="1"> &#9733; 1/5</option>
                                        <option value="2">
                                            {" "}
                                            &#9733;&#9733; 2/5
                                        </option>
                                        <option value="3">
                                            {" "}
                                            &#9733;&#9733;&#9733; 3/5
                                        </option>
                                        <option value="4">
                                            {" "}
                                            &#9733;&#9733;&#9733;&#9733; 4/5
                                        </option>
                                        <option value="5">
                                            {" "}
                                            &#9733;&#9733;&#9733;&#9733;&#9733;5/5
                                        </option>
                                    </Form.Select>
                                    {shouldPost && (
                                        <AddComment
                                            dataToSend={dataToSend}
                                            onDone={(ok) => {
                                                setShouldPost(false);
                                                setNotifyReviews(
                                                    (prev) => prev + 1,
                                                );

                                                if (ok) {
                                                    setDataToSend((prev) => ({
                                                        ...prev,
                                                        comment: "",
                                                        rate: "",
                                                        elementId: "",
                                                    }));
                                                }
                                            }}></AddComment>
                                    )}
                                    <div className="text-center mt-2">
                                        <Button type="submit">Submit</Button>
                                    </div>
                                </Form>{" "}
                            </>
                        ) : null}
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default BookList;

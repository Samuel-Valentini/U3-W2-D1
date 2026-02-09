import { Button, Col, Row } from "react-bootstrap";
import SingleBook from "./SingleBook";
import Form from "react-bootstrap/Form";
import { Component } from "react";
import ReviewsAccordion from "./ReviewsAccordion";
import AddComment from "./AddComment";

class BookList extends Component {
    state = {
        search: "",
        genre: "fantasy",
        selectedAsin: "",
        dataToSend: {
            comment: "",
            rate: "",
            elementId: "",
        },

        shouldPost: false,
    };

    setBooklistState = (selAsin) => {
        this.setState({ selectedAsin: selAsin });
    };

    setCommentDataToSend = (newValue) => {
        this.setState((prev) => ({
            dataToSend: {
                ...prev.dataToSend,
                comment: newValue.target.value,
                elementId: this.state.selectedAsin,
            },
        }));
    };

    setRateDataToSend = (newValue) => {
        this.setState((prev) => ({
            dataToSend: {
                ...prev.dataToSend,
                rate: newValue.target.value,
            },
        }));
    };

    render() {
        const { list } = this.props;
        const newList = list.filter((book) =>
            book.title.toLowerCase().includes(this.state.search.toLowerCase()),
        );

        const pri = newList.filter(
            (book) => book.asin === this.state.selectedAsin,
        )[0];

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

        console.log(newList);

        console.log(pri);

        console.log(pric);

        return (
            <>
                {" "}
                {console.log(this.state.selectedAsin)}
                <div className="w-75 m-auto">
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="ricerca per titolo"
                        value={this.state.search}
                        onChange={(s) => {
                            this.setState({
                                ...this.state,
                                search: s.target.value,
                            });
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
                                        selectedAsin={this.state.selectedAsin}
                                        setBooklistState={this.setBooklistState}
                                        dataToSend={this.state.dataToSend}
                                        shouldPost={this.state.shouldPost}
                                        setCommentDataToSend={
                                            this.setCommentDataToSend
                                        }
                                        setRateDataToSend={
                                            this.setRateDataToSend
                                        }
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
                        className="bg bg-warning text-center">
                        {this.state.selectedAsin ? (
                            <>
                                <div className="flex-grow-1 me-3">
                                    <h1>{tit}</h1>
                                    <hr />
                                    <h2>Reviews</h2>

                                    <ReviewsAccordion
                                        asin={
                                            this.state.selectedAsin
                                        }></ReviewsAccordion>
                                </div>
                                <Button variant="primary" className="mx-auto">
                                    Buy for {pric} €{" "}
                                </Button>
                            </>
                        ) : null}

                        {this.state.selectedAsin ? (
                            <Form
                                className="me-3"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (this.state.dataToSend.rate !== "") {
                                        this.setState({ shouldPost: true });
                                    } else {
                                        console.log("rate non inserito");
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
                                        value={this.state.dataToSend.comment}
                                        onChange={(e) => {
                                            this.setState((prev) => ({
                                                dataToSend: {
                                                    ...prev.dataToSend,
                                                    comment: e.target.value,
                                                    elementId:
                                                        this.state.selectedAsin,
                                                },
                                            }));
                                        }}
                                    />
                                </Form.Group>
                                <Form.Select
                                    value={this.state.dataToSend.rate}
                                    onChange={(e) => {
                                        this.setState((prev) => ({
                                            dataToSend: {
                                                ...prev.dataToSend,
                                                rate: e.target.value,
                                            },
                                        }));
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
                                {this.state.shouldPost && (
                                    <AddComment
                                        dataToSend={this.state.dataToSend}
                                        onDone={(ok) => {
                                            this.setState((prev) => ({
                                                shouldPost: false,
                                                dataToSend: ok
                                                    ? {
                                                          ...prev.dataToSend,
                                                          comment: "",
                                                          rate: "",
                                                          elementId: "",
                                                      }
                                                    : prev.dataToSend,
                                            }));
                                        }}></AddComment>
                                )}
                                <div className="text-center mt-2">
                                    <Button type="submit">Submit</Button>
                                </div>
                            </Form>
                        ) : null}
                    </Col>
                </Row>
            </>
        );
    }
}
export default BookList;

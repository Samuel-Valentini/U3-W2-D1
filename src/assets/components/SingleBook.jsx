import { Component } from "react";
import { Accordion, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ReviewsAccordion from "./ReviewsAccordion";
import AddComment from "./AddComment";

class SingleBook extends Component {
    state = {
        selected: false,
        dataToSend: {
            comment: "",
            rate: "",
            elementId: "",
        },
        // asin: "",
        shouldPost: false,
    };

    render() {
        const { book } = this.props;

        return (
            <Col md="4" lg="3" xxl="2" className="mb-3" key={book.asin}>
                <Card
                    className={`my-card ${book.asin === this.props.selectedAsin ? "bg-warning" : ""}`}>
                    <Card.Img
                        variant="top"
                        src={book.img}
                        className="change-ratio"
                        onClick={() => {
                            this.props.setBooklistState(book.asin);
                        }}
                    />
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title>{book.title}</Card.Title>
                        {this.state.selected ? (
                            <div className="flex-grow-1">
                                <ReviewsAccordion
                                    asin={book.asin}></ReviewsAccordion>
                            </div>
                        ) : null}
                        <Button variant="primary">
                            Buy for {book.price} €{" "}
                        </Button>
                        {this.state.selected ? (
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (this.props.dataToSend.rate !== "") {
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
                                        value={this.props.dataToSend.comment}
                                        onChange={(e) => {
                                            this.props.setCommentDataToSend(e);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Select
                                    value={this.props.dataToSend.rate}
                                    onChange={(e) => {
                                        this.props.setRateDataToSend(e);
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
                                        dataToSend={this.props.dataToSend}
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
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}
export default SingleBook;

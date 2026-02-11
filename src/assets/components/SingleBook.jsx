import { useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ReviewsAccordion from "./ReviewsAccordion";

const SingleBook = (props) => {
    const [selected, _] = useState(false);
    const { book } = props;

    return (
        <Col md="4" lg="3" xxl="2" className="mb-3" key={book.asin}>
            <Card
                className={`my-card ${book.asin === props.selectedAsin && props.memory === props.reloadComment ? "bg-warning" : ""}`}>
                <Card.Img
                    variant="top"
                    src={book.img}
                    className="change-ratio"
                    onClick={() => {
                        props.setBooklistState(book.asin);
                    }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title>{book.title}</Card.Title>
                    {selected ? (
                        <div className="flex-grow-1">
                            <ReviewsAccordion
                                asin={book.asin}></ReviewsAccordion>
                        </div>
                    ) : null}
                    <Button variant="primary">Buy for {book.price} € </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default SingleBook;

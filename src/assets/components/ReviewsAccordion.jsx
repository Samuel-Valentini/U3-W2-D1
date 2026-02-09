import { Component } from "react";
import { Accordion, Button } from "react-bootstrap";

const url = "https://striveschool-api.herokuapp.com/api/comments/";
const auth =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg2MTM2MDMyODQ2YTAwMTU5ZTIwYjciLCJpYXQiOjE3NzAzOTQ0NjQsImV4cCI6MTc3MTYwNDA2NH0.8uX2X0rslmp1mWu1ZJ3jXdio7STzDLQ0nXWhAUG54FQ";

class ReviewsAccordion extends Component {
    state = {
        asin: "",
        comments: [],
    };

    getReviews = () => {
        fetch(url + this.props.asin, {
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("error in the first .then");
                }
            })
            .then((data) => {
                this.setState({
                    asin: this.props.asin,
                    comments: data,
                });
            })
            .catch((e) => {
                console.log("error " + e);
            });
    };

    componentDidUpdate(pP) {
        if (pP.asin !== this.props.asin) {
            this.getReviews();
        }

        if (this.props.notifyReviews !== pP.notifyReviews) {
            this.getReviews();
        }
    }

    componentDidMount() {
        this.getReviews();
    }

    render() {
        return (
            <Accordion defaultActiveKey="" className="my-2">
                {this.state.comments.map((comment, i) => {
                    return (
                        <Accordion.Item eventKey={i} key={comment._id}>
                            <Accordion.Header>
                                <div className="d-flex w-100 align-items-center">
                                    <div className="w-75">
                                        <div
                                            className="fw-bold"
                                            style={{ fontSize: "0.6rem" }}>
                                            {comment.author}
                                        </div>
                                        <div className="text-truncate">
                                            {comment.comment}
                                        </div>
                                    </div>
                                    <div className="ms-auto me-2 text-center">
                                        {comment.rate} &#9733;
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div>{comment.comment}</div>
                                <div className="text-center">
                                    <Button
                                        className="btn-warning"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            fetch(url + comment._id, {
                                                method: "delete",
                                                headers: {
                                                    Authorization: `Bearer ${auth}`,
                                                },
                                            })
                                                .then((res) => {
                                                    if (res.ok) {
                                                        console.log(
                                                            "eliminato",
                                                        );
                                                        this.setState((p) => ({
                                                            comments:
                                                                p.comments.filter(
                                                                    (d) =>
                                                                        d._id !==
                                                                        comment._id,
                                                                ),
                                                        }));
                                                    } else {
                                                        throw new Error(
                                                            "eliminazione fallita",
                                                        );
                                                    }
                                                })
                                                .catch((err) => {
                                                    console.log("errore", err);
                                                });
                                        }}>
                                        Delete
                                    </Button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        );
    }
}
export default ReviewsAccordion;

import { Col, Row } from "react-bootstrap";
import SingleBook from "./SingleBook";
import Form from "react-bootstrap/Form";
import { Component } from "react";

class BookList extends Component {
    state = {
        search: "",
        genre: "fantasy",
    };

    render() {
        const { list } = this.props;
        const newList = list.filter((book) =>
            book.title.toLowerCase().includes(this.state.search.toLowerCase()),
        );

        return (
            <>
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
                                    <SingleBook key={book.asin} book={book} />
                                );
                            })}
                        </Row>
                    </Col>
                    <Col
                        xs="6"
                        md="4"
                        lg="3"
                        xxl="2"
                        className="bg bg-warning"></Col>
                </Row>
            </>
        );
    }
}
export default BookList;

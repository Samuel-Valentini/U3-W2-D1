import { Component } from "react";
import ErrorAlert from "./ErrorAlert";

const url = "https://striveschool-api.herokuapp.com/api/comments/";
const auth =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg2MTM2MDMyODQ2YTAwMTU5ZTIwYjciLCJpYXQiOjE3NzAzOTQ0NjQsImV4cCI6MTc3MTYwNDA2NH0.8uX2X0rslmp1mWu1ZJ3jXdio7STzDLQ0nXWhAUG54FQ";

class AddComment extends Component {
    state = {};
    componentDidMount() {
        fetch(url, {
            method: "post",
            body: JSON.stringify(this.props.dataToSend),
            headers: {
                "content-type": "application/JSON",
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    console.log("tutto ok");
                    alert("Comment added, refresh the page to view it.");
                    this.props.onDone?.(true);
                } else {
                    throw new Error("error in the first .then (POST)");
                }
            })
            .catch((e) => {
                console.log("error " + e);
                alert(
                    " Error communicating with the server, please try again.",
                );
                this.props.onDone?.(false);
            });
    }
    render() {}
}
export default AddComment;

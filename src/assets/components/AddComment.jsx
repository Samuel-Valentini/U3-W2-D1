import { useEffect } from "react";
import ErrorAlert from "./ErrorAlert";

const url = "https://striveschool-api.herokuapp.com/api/comments/";
const auth =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg2MTM2MDMyODQ2YTAwMTU5ZTIwYjciLCJpYXQiOjE3NzAzOTQ0NjQsImV4cCI6MTc3MTYwNDA2NH0.8uX2X0rslmp1mWu1ZJ3jXdio7STzDLQ0nXWhAUG54FQ";

const AddComment = (props) => {
    useEffect(() => {
        fetch(url, {
            method: "post",
            body: JSON.stringify(props.dataToSend),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    alert("Comment added.");
                    props.onDone?.(true);
                } else {
                    throw new Error("error in the first .then (POST)");
                }
            })
            .catch((e) => {
                alert(
                    " Error communicating with the server, please try again. Error:" +
                        e,
                );
                props.onDone?.(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
export default AddComment;

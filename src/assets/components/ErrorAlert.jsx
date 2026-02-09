import { Component } from "react";

class ErrorAlert extends Component {
    render() {
        return alert(" Error communicating with the server, please try again.");
    }
}
export default ErrorAlert;

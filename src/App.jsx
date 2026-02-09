import MyFooter from "./assets/components/MyFooter";
import MyNav from "./assets/components/MyNav";
import MyMain from "./assets/components/MyMain";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

function App() {
    return (
        <>
            <MyNav />
            <MyMain />
            <MyFooter />
        </>
    );
}

export default App;

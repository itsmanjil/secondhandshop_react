import "./mystyle.css";
import "./App.css";
import Header from "./components/Header";
import Mid from "./components/Mid";
import Navbar from "./components/nav";
// import Footer from './components/Footer';
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Mid />
        {/* <Footer/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

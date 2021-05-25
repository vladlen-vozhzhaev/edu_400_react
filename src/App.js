import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {About} from "./pages/About";
import {Menu} from "./components/Menu";
import {Header} from "./components/Header";
import {Blog} from "./pages/Blog";
import {Footer} from "./components/Footer";
import {Post} from "./components/Post";
import {ContactUs} from "./pages/ContactUs";




function App() {
  return (
    <div>
        <BrowserRouter>
            <Menu/>
            <Header/>
            <Route exact path="/" component={()=><Blog/>}/>
            <Route path="/post" component={()=><Post/>}/>
            <Route path="/about" component={()=><About/>}/>
            <Route path="/contact-us" component={()=><ContactUs/>}/>
        </BrowserRouter>
        <hr/>
        <Footer/>
    </div>
  );
}

export default App;

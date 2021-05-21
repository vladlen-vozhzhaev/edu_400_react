import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {About} from "./components/About";
import {Menu} from "./components/Menu";
import {Header} from "./components/Header";
import {Blog} from "./components/Blog";
import {Footer} from "./components/Footer";
import {Post} from "./components/Post";




function App() {
  return (
    <div>
        <Menu/>
        <Header/>
        <BrowserRouter>
            <Route exact path="/" component={()=><Blog/>}></Route>
            <Route path="/post" component={()=><Post/>}/>
            <Route path="/about" component={()=><About/>}></Route>
            <Route path="/contact-us" component={()=><h1>Страница контакты</h1>}></Route>
        </BrowserRouter>
        <hr/>
        <Footer/>
    </div>
  );
}

export default App;

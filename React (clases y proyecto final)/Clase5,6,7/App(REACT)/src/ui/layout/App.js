import React, {Component, Fragment} from "react"
import Header from "./Header"
import Footer from "./Footer";
import Main from "./Main";

export default class App extends Component{
    render(){
        return <Fragment>
            <Header/>
            <Main/>
            <Footer/>
        </Fragment>
    }
}
import React, {Component, Fragment} from "react"

export default class Header extends Component{
    render(){
        return <Fragment>
            <header>
                <nav>
                    <h1>SPA</h1>
                    <a href="#">Perfil</a>
                    <a href="#">Portfolio</a>
                    <a href="#">Contacto</a>
                </nav>
            </header>
        </Fragment>
    }
}
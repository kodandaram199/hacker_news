/**
 * Created by kodanda_rama on 5/23/17.
 */
import React, { Component } from 'react';
import NavBar from '../../../components/Reusable/NavBar';

class App extends Component{
    render(){
        const { children } = this.props;
        return(
            <div id="app-start">
                <NavBar/>
                <div className="container">
                    { children }
                </div>
            </div>
        )
    }
}

export default App;
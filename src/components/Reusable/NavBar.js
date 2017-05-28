/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { Link } from 'react-router';

const NavBar = () => (
    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-brand-centered">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div className="navbar-brand navbar-brand-centered">Hacker News</div>
            </div>
            <div className="collapse navbar-collapse" id="navbar-brand-centered">
                <ul className="nav navbar-nav">
                    <li><Link to="/" ClassName="active">New</Link></li>
                    <li><Link to="/top" ClassName="active">Top</Link></li>
                    <li><Link to="/best" ClassName="active">Best</Link></li>
                    <li><Link to="/show" ClassName="active">Show</Link></li>
                    <li><Link to="/ask" ClassName="active">Ask</Link></li>
                    <li><Link to="/jobs" ClassName="active">Jobs</Link></li>
                </ul>
            </div>
        </div>
    </nav>
);

export default NavBar;
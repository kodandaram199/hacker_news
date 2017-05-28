/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getUserProfile, requestUserProfileReset } from './actions';
import { connect } from 'react-redux';
import Profile from './components/Profile';

function mapStateToProps(state) {
    return {
        userProfile: state.userProfile
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUserProfile: (userName) => {
            dispatch(getUserProfile(userName));
        },
        resetProfile: () => {
            dispatch(requestUserProfileReset());
        }
    };
}

class UserProfile extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.fetchUserProfile(this.props.params.user);
    }

    componentWillUnMount(){
        this.props.resetProfile(this.props.params.user);
    }

    render(){
        const { profile, profile_pending, profile_failed } = this.props.userProfile;
        return(
            <div>
                <Profile data={profile} pending={profile_pending} failed={profile_failed}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
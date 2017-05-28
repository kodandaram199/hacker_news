/**
 * Created by kodanda_rama on 5/27/17.
 */
import React from 'react';
import { getHours, getFormattedName } from '../../../../../utils/utils'

const Profile = ({data, pending, failed}) => (
    <div style={{marginTop: "10%"}}>
        {
            pending && <div className="loading"/>
        }
        {
            !pending && data && Object.keys(data).length > 0 &&
            <div style={{color: "#565252"}} className="card">
                <div style={{marginBottom: "5%"}}>
                    <div className="text-center" style={{fontSize: "500%"}}>
                        <i className="fa fa-user-o" aria-hidden="true"></i>
                        <h1>
                           {getFormattedName(data.id)}
                        </h1>
                    </div>
                    <div className="text-center">
                        <h4>
                            <i className="fa fa-clock-o" aria-hidden="true"></i> Created { data.created && getHours(data.created)}
                        </h4>
                        <h4>
                            <i className="fa fa-star-o" aria-hidden="true"></i> Karma - {data.karma}
                        </h4>
                        <h4>
                            <i className="fa fa-comment-o" aria-hidden="true"></i> Total Submissions - {data.submitted.length}
                        </h4>
                    </div>
                </div>
                <div style={{padding: "0 8% 5%  8%"}}>
                    <span dangerouslySetInnerHTML={{__html: data.about}} />
                </div>
            </div>
        }
    </div>
);

export default Profile;
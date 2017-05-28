/**
 * Created by kodanda_rama on 5/26/17.
 */
import React from 'react';
import { getFormattedName, getHours } from '../../../../../utils/utils';

const Description = ({ story, pending, failed }) => (
    <div>
        {
            pending && <div className="loading"/>
        }
        {
            !pending && story && Object.keys(story).length > 0 &&
            <div style={{color: "#565252"}}>
                <div style={{marginBottom: "5%"}}>
                    <div>
                        <h4>{story.title} - {getFormattedName(story.by)}</h4>
                    </div>
                    <div>
                        <h6>
                            <i className="fa fa-user-o" aria-hidden="true"></i> Author - { story.by && getFormattedName(story.by)}
                        </h6>
                        <h6>
                            <i className="fa fa-star-o" aria-hidden="true"></i> Score - {story.score} points
                        </h6>
                        <h6>
                            <i className="fa fa-clock-o" aria-hidden="true"></i> Posted {getHours(story.time)}
                        </h6>
                        <h6>
                            <i className="fa fa-comment-o" aria-hidden="true"></i> Comments - {story.kids.length}
                        </h6>
                        <h6>
                            <i className="fa fa-comment-o" aria-hidden="true"></i> Type - {story.type}
                        </h6>
                    </div>
                </div>
                <div>
                    <span dangerouslySetInnerHTML={{__html: story.text}} />
                </div>
            </div>
        }
    </div>
);

export default Description
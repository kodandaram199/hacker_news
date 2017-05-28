/**
 * Created by kodanda_rama on 5/26/17.
 */
import React from 'react';
import { Link } from 'react-router';
import { getHours, getFormattedName } from '../../utils/utils';

const Story = ({ stories, pending, failed, ids, loading }) => (
    <div style={{marginTop: "10%", marginBottom: "10%"}}>
        {
            pending && <div className="loading"/>
        }
        {
            !pending && stories && stories.length > 0 &&
            stories.map((story, index) => (<div className="card" key={index}>
                <div style={{paddingLeft: "5%"}}>
                    {
                        story.url && story.url.length > 0 ? <a href={story.url} target="_blank"><h5>{story.title} <i className="fa fa-external-link" aria-hidden="true"></i></h5></a> : <Link to={`story-description/${story.id}`}><h5>{story.title} <i className="fa fa-external-link" aria-hidden="true"></i></h5></Link>
                    }
                    <h6>
                        <i className="fa fa-user-o" aria-hidden="true"></i> <Link to={`${story.by}`}>Author - {getFormattedName(story.by)}</Link> | <i className="fa fa-star-o" aria-hidden="true"></i> Score - {story.score} points | <i className="fa fa-clock-o" aria-hidden="true"></i> Posted {getHours(story.time)} | {story.kids && <i className="fa fa-comment-o" aria-hidden="true"></i>} {story.kids && <Link to={`story-description/${story.id}`}>Comments - {story.kids.length}</Link>}
                    </h6>
                </div>

            </div>))
        }
        {
            loading && <div className="loading"/>
        }
    </div>
);

export default Story;
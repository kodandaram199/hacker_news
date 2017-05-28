/**
 * Created by kodanda_rama on 5/26/17.
 */
import React from 'react';
import { getComments } from '../actions';
import { getHours, getFormattedName } from '../../../../../utils/utils';

class Comments extends React.Component{

    render(){
        const { story, handleClick, comments, pending, failed, loading } = this.props;
        return(
            <div>
                {
                    story && story.kids &&
                    <div className="jumbotron" style={{marginBottom: "10%"}}>
                        <button className="btn btn-info" data-toggle="collapse" data-target="#comments" onClick={() => handleClick(story.kids)}>
                            Total - { story.kids.length } comments. View Comments <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </button>
                        <Comment id="comments" className="collapse" comments={comments} pending={pending} failed={failed}/>
                        {
                            loading && <div className="loading"/>
                        }
                    </div>
                }
            </div>
        )
    }
}

class Comment extends React.Component{
    render(){
        const { comments, pending, failed } = this.props;
        return(
            <div>
                {
                    pending && <div className="loading"/>
                }
                {
                    comments && comments.length > 0 &&
                    comments.map(comment => (
                        <div style={{color: "#565252", marginBottom: "5%"}}>
                            <div >
                                <div>
                                    <h3><i className="fa fa-user-o" aria-hidden="true"></i> { comment.by && getFormattedName(comment.by)}</h3>
                                </div>
                                <div>
                                    <h6>
                                        <i className="fa fa-clock-o" aria-hidden="true"></i> Posted {getHours(comment.time)}
                                    </h6>
                                </div>
                            </div>
                            <div>
                                <span dangerouslySetInnerHTML={{__html: comment.text}} />
                            </div>
                            <hr />
                    </div>
                    ))
                }
            </div>
        )
    }
}

export default Comments;
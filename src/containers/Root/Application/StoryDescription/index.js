/**
 * Created by kodanda_rama on 5/26/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { getComments, getStory, resetStoryDescription } from './actions';
import Description from './components/Description';
import Comments from './components/Comments';
import $ from 'jquery';

function mapStateToProps(state) {
    return {
        storyDescription: state.storyDescription
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchStory: (id) => {
            dispatch(getStory(id));
        },
        fetchComments: (ids, start, end) => {
            dispatch(getComments(ids, start, end))
        },
        resetDescription: () => {
            dispatch(resetStoryDescription())
        }
    };
}

class StoryDescription extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            page: 15,
            reachedEnd: false
        }
    }

    componentWillMount(){
        this.props.fetchStory(this.props.params.id);
    }

    componentWillUnMount(){
        this.props.resetDescription();
    }

    handleClick = (ids) => {
        this.props.fetchComments(ids, 0, 15);
    };

    loadData = () => {
        const { page, reachedEnd } = this.state;
        const { kids } = this.props.storyDescription.story;
        let next_page = page + 15;
        let end = next_page < kids.length ? next_page : kids.length;
        if  ($(window).scrollTop() == $(document).height() - $(window).height() && !reachedEnd) {
            this.setState({page: next_page});
            this.props.fetchComments(kids, page, end);
            kids.length === end ? this.setState({reachedEnd: true}) : null;
        }
    };

    render(){
        const {
            story,
            story_pending,
            story_failed,
            comments,
            comments_pending,
            comments_failed
        } = this.props.storyDescription;
        const { page, loading } = this.state;
        return(
            <div style={{marginTop: "10%"}}>
                <Description
                    story={story}
                    pending={story_pending}
                    failed={story_failed}/>
                <Comments
                    story={story}
                    handleClick={this.handleClick}
                    loadData={this.loadData}
                    comments={comments.slice(0, page)}
                    pending={comments_pending}
                    failed={comments_failed}
                    loading={loading}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryDescription);
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
        fetchComments: (ids) => {
            dispatch(getComments(ids))
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
            data: this.props.storyDescription.comments,
            page: 10,
            loading: false
        }
    }

    componentWillMount(){
        this.props.fetchStory(this.props.params.id);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.storyDescription && this.props.storyDescription.comments && nextProps.storyDescription && nextProps.storyDescription.comments && nextProps.storyDescription.comments !== this.props.storyDescription.comments) {
            this.setState({data: nextProps.storyDescription.comments});
        }
    }

    componentWillUnMount(){
        this.props.resetDescription();
    }

    handleClick = (ids) => {
        this.props.fetchComments(ids);
    };

    loadData = () => {
        const {data, page} = this.state;
        if  ($(window).scrollTop() == $(document).height() - $(window).height() && data.length!== 0 && data.length !== page){
            this.setState({loading: true});
            setTimeout(() => {
                let nextPage = page+10;
                nextPage < data.length ? this.setState({page: nextPage}) : this.setState({page: data.length});
                this.setState({loading: false});
            },300);


        }
    };

    componentDidMount(){
        window.addEventListener('scroll',this.loadData);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.loadData);
    }

    render(){
        const {
            story,
            story_pending,
            story_failed,
            comments,
            comments_pending,
            comments_failed
        } = this.props.storyDescription;
        const {data, page, loading} = this.state;
        return(
            <div style={{marginTop: "10%"}}>
                <Description
                    story={story}
                    pending={story_pending}
                    failed={story_failed}/>
                <Comments
                    story={story}
                    handleClick={this.handleClick}
                    comments={data.slice(0, page)}
                    pending={comments_pending}
                    failed={comments_failed}
                    loading={loading}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryDescription);
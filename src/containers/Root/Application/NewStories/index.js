/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getNewStoriesIds, getNewStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
import InfiniteScroll from '../../../../components/Reusable/InfiniteScroll';
import $ from 'jquery';

function mapStateToProps(state) {
    return {
        newStories: state.newStories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchIds: () => {
            dispatch(getNewStoriesIds());
        },
        fetchStories: (ids, start, end) => {
            dispatch(getNewStories(ids, start, end));
        }
    };
}

class NewStories extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            page: 15,
            reachedEnd: false
        }
    }

    componentWillMount(){
        this.props.fetchIds();
    }

    componentDidMount(){
        window.addEventListener('scroll',this.loadData);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.loadData);
    }

    loadData = () => {
        const {page, reachedEnd} = this.state;
        const {new_stories_ids} = this.props.newStories;
        let next_page = page + 15;
        let end = next_page < new_stories_ids.length ? next_page : new_stories_ids.length;
        if  ($(window).scrollTop() == $(document).height() - $(window).height() && !reachedEnd) {
            this.setState({page: next_page});
            this.props.fetchStories(new_stories_ids, page, end);
            new_stories_ids.length === end ? this.setState({reachedEnd: true}) : null;
        }
    };

    render(){
        const { new_stories, new_stories_pending } = this.props.newStories;
        return(
            <div>
                <InfiniteScroll
                    data={<Story stories={new_stories}/>}
                    isLoading={new_stories_pending}
                    loadingComponent={<div className="loading"></div>}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStories);
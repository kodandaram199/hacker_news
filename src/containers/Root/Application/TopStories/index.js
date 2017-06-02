/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getTopStoriesIds, getTopStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
import InfiniteScroll from '../../../../components/Reusable/InfiniteScroll';
import $ from 'jquery';

function mapStateToProps(state) {
    return {
        topStories: state.topStories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchIds: () => {
            dispatch(getTopStoriesIds());
        },
        fetchStories: (ids, start, end) => {
            dispatch(getTopStories(ids, start, end));
        }
    };
}

class TopStories extends React.Component{

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
        const {top_stories_ids} = this.props.topStories;
        let next_page = page + 15;
        let end = next_page < top_stories_ids.length ? next_page : top_stories_ids.length;
        if  ($(window).scrollTop() == $(document).height() - $(window).height() && !reachedEnd) {
            this.setState({page: next_page});
            this.props.fetchStories(top_stories_ids, page, end);
            top_stories_ids.length === end ? this.setState({reachedEnd: true}) : null;
        }
    };

    render(){
        const { top_stories, top_stories_pending, top_stories_failed } = this.props.topStories;
        return(
            <div>
                <InfiniteScroll
                    data={<Story stories={top_stories}/>}
                    isLoading={top_stories_pending}
                    loadingComponent={<div className="loading"></div>}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopStories);
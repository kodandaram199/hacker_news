/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getShowStoriesIds, getShowStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
import InfiniteScroll from '../../../../components/Reusable/InfiniteScroll';
import $ from 'jquery';

function mapStateToProps(state) {
    return {
        showStories: state.showStories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchIds: () => {
            dispatch(getShowStoriesIds());
        },
        fetchStories: (ids, start, end) => {
            dispatch(getShowStories(ids, start, end));
        }
    };
}

class ShowStories extends React.Component{

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
        const {show_stories_ids} = this.props.showStories;
        let next_page = page + 15;
        let end = next_page < show_stories_ids.length ? next_page : show_stories_ids.length;
        if  ($(window).scrollTop() == $(document).height() - $(window).height() && !reachedEnd) {
            this.setState({page: next_page});
            this.props.fetchStories(show_stories_ids, page, end);
            show_stories_ids.length === end ? this.setState({reachedEnd: true}) : null;
        }
    };

    render(){
        const { show_stories, show_stories_pending, show_stories_failed } = this.props.showStories;
        return(
            <div>
                <InfiniteScroll
                    data={<Story stories={show_stories}/>}
                    isLoading={show_stories_pending}
                    loadingComponent={<div className="loading"></div>}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowStories);
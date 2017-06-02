/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getBestStoriesIds, getBestStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
import InfiniteScroll from '../../../../components/Reusable/InfiniteScroll';
import $ from 'jquery';

function mapStateToProps(state) {
    return {
        bestStories: state.bestStories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchIds: () => {
            dispatch(getBestStoriesIds());
        },
        fetchStories: (ids, start, end) => {
            dispatch(getBestStories(ids, start, end));
        }
    };
}

class BestStories extends React.Component{

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
        const {best_stories_ids} = this.props.bestStories;
        let next_page = page + 15;
        let end = next_page < best_stories_ids.length ? next_page : best_stories_ids.length;
        if  ($(window).scrollTop() == $(document).height() - $(window).height() && !reachedEnd) {
            this.setState({page: next_page});
            this.props.fetchStories(best_stories_ids, page, end);
            best_stories_ids.length === end ? this.setState({reachedEnd: true}) : null;
        }
    };

    render(){
        const { best_stories, best_stories_pending } = this.props.bestStories;
        return(
            <div>
                <InfiniteScroll
                    data={<Story stories={best_stories}/>}
                    isLoading={best_stories_pending}
                    loadingComponent={<div className="loading"></div>}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BestStories);
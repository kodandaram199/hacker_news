/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getAskStoriesIds, getAskStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
import InfiniteScroll from '../../../../components/Reusable/InfiniteScroll';
import $ from 'jquery';

function mapStateToProps(state) {
    return {
        askStories: state.askStories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchIds: () => {
            dispatch(getAskStoriesIds());
        },
        fetchStories: (ids, start, end) => {
            dispatch(getAskStories(ids, start, end));
        }
    };
}

class AskStories extends React.Component{

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
        const { page, reachedEnd } = this.state;
        const { ask_stories_ids } = this.props.askStories;
        let next_page = page + 15;
        let end = next_page < ask_stories_ids.length ? next_page : ask_stories_ids.length;
        if  ($(window).scrollTop() == $(document).height() - $(window).height() && !reachedEnd) {
            this.setState({page: next_page});
            this.props.fetchStories(ask_stories_ids, page, end);
            ask_stories_ids.length === end ? this.setState({reachedEnd: true}) : null;
        }
    };

    render(){
        const { ask_stories, ask_stories_pending } = this.props.askStories;
        return(
            <div>
                <InfiniteScroll
                    data={<Story stories={ask_stories}/>}
                    isLoading={ask_stories_pending}
                    loadingComponent={<div className="loading"></div>}
                    />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AskStories);
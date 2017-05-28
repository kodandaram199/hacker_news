/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getTopStoriesIds, getTopStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
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
        fetchStories: (ids) => {
            dispatch(getTopStories(ids));
        }
    };
}

class TopStories extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: this.props.topStories.top_stories,
            page: 15,
            loading: false
        }
    }

    componentWillMount(){
        this.props.fetchIds();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.topStories && this.props.topStories.top_stories_ids && nextProps.topStories && nextProps.topStories.top_stories_ids && nextProps.topStories.top_stories_ids !== this.props.topStories.top_stories_ids) {
            this.props.fetchStories(nextProps.topStories.top_stories_ids);
        }
        if(this.props.topStories && this.props.topStories.top_stories && nextProps.topStories && nextProps.topStories.top_stories && nextProps.topStories.top_stories !== this.props.topStories.top_stories) {
            this.setState({data: nextProps.topStories.top_stories});
        }
    }

    componentDidMount(){
        window.addEventListener('scroll',this.loadData);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.loadData);
    }

    loadData = () => {
        const {data, page} = this.state;
        if  ($(window).scrollTop() == $(document).height() - $(window).height() && data.length!== 0 && data.length !== page){
            this.setState({loading: true});
            setTimeout(() => {
                let nextPage = page+15;
                nextPage < data.length ? this.setState({page: nextPage}) : this.setState({page: data.length});
                this.setState({loading: false});
            },100);


        }
    };

    render(){
        const { top_stories, top_stories_pending, top_stories_failed, top_stories_ids } = this.props.topStories;
        const {data, page, loading} = this.state;
        return(
            <div>
                <Story stories={data.slice(0, page)} pending={top_stories_pending} failed={top_stories_failed} ids={top_stories_ids} loading={loading}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopStories);
/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getBestStoriesIds, getBestStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
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
        fetchStories: (ids) => {
            dispatch(getBestStories(ids));
        }
    };
}

class BestStories extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: this.props.bestStories.best_stories,
            page: 15,
            loading: false
        }
    }

    componentWillMount(){
        this.props.fetchIds();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.bestStories && this.props.bestStories.best_stories_ids && nextProps.bestStories && nextProps.bestStories.best_stories_ids && nextProps.bestStories.best_stories_ids !== this.props.bestStories.best_stories_ids) {
            this.props.fetchStories(nextProps.bestStories.best_stories_ids);
        }
        if(this.props.bestStories && this.props.bestStories.best_stories && nextProps.bestStories && nextProps.bestStories.best_stories && nextProps.bestStories.best_stories !== this.props.bestStories.best_stories) {
            this.setState({data: nextProps.bestStories.best_stories});
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
        const { best_stories, best_stories_pending, best_stories_failed, best_stories_ids } = this.props.bestStories;
        const {data, page, loading} = this.state;
        return(
            <div>
                <Story stories={data.slice(0, page)} pending={best_stories_pending} failed={best_stories_failed} ids={best_stories_ids} loading={loading}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BestStories);
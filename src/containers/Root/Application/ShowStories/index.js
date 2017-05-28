/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getShowStoriesIds, getShowStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
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
        fetchStories: (ids) => {
            dispatch(getShowStories(ids));
        }
    };
}

class ShowStories extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: this.props.showStories.show_stories,
            page: 15,
            loading: false
        }
    }

    componentWillMount(){
        this.props.fetchIds();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.showStories && this.props.showStories.show_stories_ids && nextProps.showStories && nextProps.showStories.show_stories_ids && nextProps.showStories.show_stories_ids !== this.props.showStories.show_stories_ids) {
            this.props.fetchStories(nextProps.showStories.show_stories_ids);
        }
        if(this.props.showStories && this.props.showStories.show_stories && nextProps.showStories && nextProps.showStories.show_stories && nextProps.showStories.show_stories !== this.props.showStories.show_stories) {
            this.setState({data: nextProps.showStories.show_stories});
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
        const { show_stories, show_stories_pending, show_stories_failed, show_stories_ids } = this.props.showStories;
        const {data, page, loading} = this.state;
        return(
            <div>
                <Story stories={data.slice(0, page)} pending={show_stories_pending} failed={show_stories_failed} ids={show_stories_ids} loading={loading}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowStories);
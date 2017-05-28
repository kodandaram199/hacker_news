/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getNewStoriesIds, getNewStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
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
        fetchStories: (ids) => {
            dispatch(getNewStories(ids));
        }
    };
}

class NewStories extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: this.props.newStories.new_stories,
            page: 15,
            loading: false
        }
    }

    componentWillMount(){
        this.props.fetchIds();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.newStories && this.props.newStories.new_stories_ids && nextProps.newStories && nextProps.newStories.new_stories_ids && nextProps.newStories.new_stories_ids !== this.props.newStories.new_stories_ids) {
            this.props.fetchStories(nextProps.newStories.new_stories_ids);
        }
        if(this.props.newStories && this.props.newStories.new_stories && nextProps.newStories && nextProps.newStories.new_stories && nextProps.newStories.new_stories !== this.props.newStories.new_stories) {
            this.setState({data: nextProps.newStories.new_stories});
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
        const { new_stories, new_stories_pending, new_stories_failed, new_stories_ids } = this.props.newStories;
        const {data, page, loading} = this.state;
        return(
            <div>
                <Story stories={data.slice(0, page)} pending={new_stories_pending} failed={new_stories_failed} ids={new_stories_ids} loading={loading}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStories);
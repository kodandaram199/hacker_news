/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getAskStoriesIds, getAskStories } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
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
        fetchStories: (ids) => {
            dispatch(getAskStories(ids));
        }
    };
}

class AskStories extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: this.props.askStories.ask_stories,
            page: 15,
            loading: false
        }
    }

    componentWillMount(){
        this.props.fetchIds();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.askStories && this.props.askStories.ask_stories_ids && nextProps.askStories && nextProps.askStories.ask_stories_ids && nextProps.askStories.ask_stories_ids !== this.props.askStories.ask_stories_ids) {
            this.props.fetchStories(nextProps.askStories.ask_stories_ids);
        }
        if(this.props.askStories && this.props.askStories.ask_stories && nextProps.askStories && nextProps.askStories.ask_stories && nextProps.askStories.ask_stories !== this.props.askStories.ask_stories) {
            this.setState({data: nextProps.askStories.ask_stories});
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
        const { ask_stories, ask_stories_pending, ask_stories_failed, ask_stories_ids } = this.props.askStories;
        const {data, page, loading} = this.state;
        return(
            <div>
                <Story stories={data.slice(0, page)} pending={ask_stories_pending} failed={ask_stories_failed} ids={ask_stories_ids} loading={loading}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AskStories);
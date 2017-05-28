/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getJobsIds, getJobs } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
import $ from 'jquery';

function mapStateToProps(state) {
    return {
        jobStories: state.jobStories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchIds: () => {
            dispatch(getJobsIds());
        },
        fetchStories: (ids) => {
            dispatch(getJobs(ids));
        }
    };
}

class Jobs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: this.props.jobStories.jobs,
            page: 15,
            loading: false
        }
    }

    componentWillMount(){
        this.props.fetchIds();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.jobStories && this.props.jobStories.jobs_ids && nextProps.jobStories && nextProps.jobStories.jobs_ids && nextProps.jobStories.jobs_ids !== this.props.jobStories.jobs_ids) {
            this.props.fetchStories(nextProps.jobStories.jobs_ids);
        }
        if(this.props.jobStories && this.props.jobStories.jobs && nextProps.jobStories && nextProps.jobStories.jobs && nextProps.jobStories.jobs !== this.props.jobStories.jobs) {
            this.setState({data: nextProps.jobStories.jobs});
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
        const { jobs, jobs_pending, jobs_failed, jobs_ids } = this.props.jobStories;
        const {data, page, loading} = this.state;
        return(
            <div>
                <Story stories={data.slice(0, page)} pending={jobs_pending} failed={jobs_failed} ids={jobs_ids} loading={loading}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
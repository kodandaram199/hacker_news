/**
 * Created by kodanda_rama on 5/23/17.
 */
import React from 'react';
import { getJobsIds, getJobs } from './actions';
import { connect } from 'react-redux';
import Story from '../../../../components/Reusable/Story';
import InfiniteScroll from '../../../../components/Reusable/InfiniteScroll';
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
        fetchStories: (ids, start, end) => {
            dispatch(getJobs(ids, start, end));
        }
    };
}

class Jobs extends React.Component{

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
        const { jobs_ids } = this.props.jobStories;
        let next_page = page + 15;
        let end = next_page < jobs_ids.length ? next_page : jobs_ids.length;
        if  ($(window).scrollTop() == $(document).height() - $(window).height() && !reachedEnd) {
            this.setState({page: next_page});
            this.props.fetchStories(jobs_ids, page, end);
            jobs_ids.length === end ? this.setState({reachedEnd: true}) : null;
        }
    };

    render(){
        const { jobs, jobs_pending } = this.props.jobStories;
        return(
            <div>
                <InfiniteScroll
                    data={<Story stories={jobs}/>}
                    isLoading={jobs_pending}
                    loadingComponent={<div className="loading"></div>}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
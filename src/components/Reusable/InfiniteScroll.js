/**
 * Created by kodanda_rama on 5/29/17.
 */
import React from 'react';

const InfiniteScroll = ({data, isLoading, loadingComponent}) => {
    return(
        <div>
            { data }
            { isLoading && loadingComponent }
        </div>
    )
};

export default InfiniteScroll;
import React from 'react';
import FeedCard from './FeedCard';

export default function FeedList(props) {
    return(
        <>
            {props.feed.map(element => (
                <FeedCard feed={element} key={element.id}/>
            ))}
        </>
    )
}
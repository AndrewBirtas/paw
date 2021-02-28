import React, { useEffect, useState } from 'react';
import { Container, Grid, Loader } from 'semantic-ui-react';
import FeedList from './FeedList';

import {sampleData} from '../../../app/api/sampleData';
import {useStore} from '../../../contexts/StoreContext';

export default function FeedDashboard() {

    const {posts, getPosts} = useStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPosts()
        setLoading(false)
    }, [])
    return(
        <Container className="main">
            {loading ? <Loader /> : [
                    <Grid>
                    <Grid.Column width={10}>
                        <FeedList feed={posts}/>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <h2>Right column</h2>
                    </Grid.Column>
                </Grid>
            ]}
            
        </Container>
    )
}
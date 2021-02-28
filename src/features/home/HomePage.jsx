import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { useStore } from '../../contexts/StoreContext';

export default function HomePage() {

    const {users, getUsers} = useStore()

    useEffect(() => {
        const unsubscribe = getUsers()
    
        return unsubscribe
      }, [])

    return(
        <Container className="main">
            {users.map((user) => (
                <>
                    <h1>{user.displayName}</h1>
                    <h1>{user.email}</h1>
                </>
            ))}
            <h1>Home PAGE</h1>
            
        </Container>
    )
}
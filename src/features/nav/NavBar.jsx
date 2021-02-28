import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import {useAuth} from '../../contexts/AuthContext'

export default function NavBar() {

    const {currentUser} = useAuth()

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/landingPage' header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: "15px"}}/>
                    Paw
                </Menu.Item>
                {currentUser ? [
                    <Menu.Item as={NavLink} exact to='/' name="Home">
                    </Menu.Item>,
                    <Menu.Item as={NavLink} to='/createPost'>
                        <Button positive inverted content="New adoption"/>
                    </Menu.Item>,
                    <SignedIn />
                ]
                :
                <SignedOut />
            
            }
                
                
            </Container>
        </Menu>
    )
}
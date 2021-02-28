import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import {useAuth} from '../../contexts/AuthContext'
import { useStore } from '../../contexts/StoreContext';

export default function SignedIn () {

    const {currentUser, logout} = useAuth()
    const [username, setUsername] = useState('')

    console.log(currentUser.displayName)

    useEffect(() =>{
        const time = setTimeout(() =>{
            currentUser ? setUsername(currentUser.displayName) : setUsername("N/A")
        }, 1000)

        return () => clearTimeout(time)
    }, [currentUser.displayName, username])

    async function handleSignOut() {
        try {
            await logout()
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <Menu.Item position="right">
           <Image avatar spaced="right" src={currentUser.photoURL || 'assets/user.png'} />
           <Dropdown pointing="top left" text={username} >
               <Dropdown.Menu>
                   <Dropdown.Item as={Link} to='/createPost' text="Add adoption" icon="plus" />
                   <Dropdown.Item text="My profile" icon="user" />
                   <Dropdown.Item onClick={handleSignOut} text="Sign Out" icon="power" />
               </Dropdown.Menu>
           </Dropdown>
        </Menu.Item>
    )
}
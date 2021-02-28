import React from 'react';
import { Link } from 'react-router-dom';
import {Menu, Button} from 'semantic-ui-react';

export default function SignedOut () {
    return(
        <Menu.Item position="right">
            <Button as={Link} to='/signin' basic inverted content="Login" />
            <Button as={Link} to='/register' basic inverted content="Register" style={{marginLeft: '0.5rem'}}/>
        </Menu.Item>
    )
}
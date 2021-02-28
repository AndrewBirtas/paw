import React , { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, MessageHeader, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext'
import { useStore } from '../../contexts/StoreContext';

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] =useState(false)
    const { login, currentUser} = useAuth()
    const {setUser} = useStore()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(email, password)

        } catch {
            setError('Wrong email or password')
        }

        setLoading(false)
    }
    return(
    <Grid textAlign='center' verticalAlign='middle' className="bg">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='green' textAlign='center'>
                <Image src='assets/logo.png' /> Log-in to your account
            </Header>

            {error && <Message warning><MessageHeader>{error}</MessageHeader></Message>}
            <Form size='large' onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        fluid 
                        icon='user' 
                        iconPosition='left' 
                        placeholder='E-mail address' 
                        />
                    <Form.Input
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />

                    <Button 
                        color='green' 
                        fluid 
                        size='large'
                        disabled={loading}
                        type="submit"
                        >
                        Login
                    </Button>
                </Segment>
            </Form>
            <Message>
                New to us?  <Link to='/register'>Register</Link>
            </Message>
            <Message>
                Forgot password?  <Link to='/forgot'>Recover password</Link>
            </Message>
        </Grid.Column>
    </Grid>
    )
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, MessageHeader, Segment } from 'semantic-ui-react'
import { useAuth } from '../../contexts/AuthContext'
import { useStore } from '../../contexts/StoreContext';

export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repass, setRepass] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] =useState(false)
    const { signup, currentUser } = useAuth()
    const {setUser} = useStore()

    async function handleSubmit(e) {
        e.preventDefault()

        if(password !== repass) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup({
                username: name,
                email: email,
                pass: password
            })
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }
    return(
    <Grid textAlign='center' verticalAlign='middle' className="bg">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='green' textAlign='center'>
                <Image src='assets/logo.png' /> Register a new account
            </Header>
            {error && <Message warning ><MessageHeader>{error}</MessageHeader></Message>}
            <Form size='large' onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        fluid 
                        icon='user' 
                        iconPosition='left' 
                        placeholder='Username' 
                        />
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
                    <Form.Input
                        value={repass}
                        onChange={e=>setRepass(e.target.value)}
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Re-type Password'
                        type='password'
                    />

                    <Button 
                        color='green' 
                        fluid 
                        size='large' 
                        type="submit"
                        disabled={loading}
                        >
                        Register
                    </Button>
                </Segment>
            </Form>
            <Message>
                Already have an accout? <Link to='/signin'>Sign In</Link> 
            </Message>
        </Grid.Column>
    </Grid>
    )
}
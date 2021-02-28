import React , { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, MessageHeader, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] =useState(false)
    const { resetPassword } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await resetPassword(email)
            setError('Instructions have been mailed to you!')
        } catch {
            setError('There are no accounts registered with this email!')
        }
        
        setLoading(false)
    }
    return(
    <Grid textAlign='center' verticalAlign='middle' className="bg">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='green' textAlign='center'>
                <Image src='assets/logo.png' /> Reset Password
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

                    <Button 
                        color='green' 
                        fluid 
                        size='large'
                        disabled={loading}
                        type="submit"
                        >
                        Send reset email
                    </Button>
                </Segment>
            </Form>
            <Message>
                New to us?  <Link to='/register'>Register</Link>
            </Message>
        </Grid.Column>
    </Grid>
    )
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Card, Header, Form, Grid, Button, Message } from 'semantic-ui-react';
import {storage} from '../../firebase'
import {useStore} from '../../contexts/StoreContext'
import {useAuth} from '../../contexts/AuthContext'
import cuid from 'cuid'

export default function CreatePost() {
    const {createPost} = useStore()
    const {currentUser} = useAuth()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    function handleChange(e) {
        setFile(e.target.files[0]);
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        const uploadTask = storage.ref(`/images/${file.name}`).put(file)
        uploadTask.on("state_changed", console.log, console.error, () => {
            storage
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then((url) => {
                setFile(null)
                try{
                    setLoading(true)
                    const idP = cuid()
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;
                    createPost({
                        id: idP,
                        host: currentUser.uid,
                        title: title,
                        description: description,
                        photoURL: url,
                        likes: [],
                        date: dateTime
                    })
                  } catch(err) {
                      console.log(err)
                  }
                  
                setLoading(false)            
            })
          })
          

    }
    
    return(
        <Container className="main">
            <Segment className="noPadd">
        <Card fluid>
          <Card.Content>
            
          <Grid textAlign='center' verticalAlign='middle' className="bg">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='green' textAlign='center'>
                 Create a new post
            </Header>
            <Form size='large' onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                        fluid 
                        placeholder='Title' 
                        />
                    <Form.Input
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                        fluid   
                        placeholder='Description' 
                        />
                    <Form.Input
                        type='file'
                        onChange={handleChange}
                        />
                    <Button 
                        color='green' 
                        fluid 
                        size='large' 
                        type="submit"
                        disabled={loading}
                        >
                        Add
                    </Button>
                    <Button 
                        color='red' 
                        fluid 
                        size='large' 
                        as={Link} 
                        to='/'
                        disabled={loading}
                        >
                        Cancel
                    </Button>
                </Segment>
            </Form>
            <Message>
               
            </Message>
        </Grid.Column>
    </Grid>
          </Card.Content>
        </Card>
      </Segment>
        </Container>
        
    )
}
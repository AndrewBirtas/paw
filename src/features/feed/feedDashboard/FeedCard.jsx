import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Image, Segment } from "semantic-ui-react";
import {store} from '../../../firebase'

const CardExampleCard = ({feed}) => {

  const [hostedby, setHostedby] = useState('')
  const [hostPhoto, setHostPhoto] = useState('')

  function gethostphoto() {
    const ref = store.collection('users')

    //const userPhoto = ref.doc(feed.host).get('photoURL')
    ref.doc(feed.host).get().then((item) => {
      const data = item.data()
      setHostedby(data.displayName)
      setHostPhoto(data.photoURL)
    }).catch((error) => {
      console.log("Error getting cached document:", error);
    })
  }

  useEffect(() => {
    gethostphoto()
  }, [])

  return(
      <Segment className="noPadd">
        <Card fluid>
          <Card.Content>
            <Image
              floated="left"
              size="mini"
              circular
              src={hostPhoto || 'assets/user.png'}
            />
            <Card.Header>
              {feed.title}
              <Card.Meta>
                <span className="date">Posted by {hostedby}</span>
              </Card.Meta>
            </Card.Header>

            <Card.Description>
              {feed.description}
            </Card.Description>
            
          </Card.Content>
          <Image src={feed.photoURL} />
          <Card.Content extra>
            <span>
              <Icon name="user" />
              22 Friends
            </span>
            <Button content="View more details" floated="right" />
          </Card.Content>
        </Card>
      </Segment>
  )
};

export default CardExampleCard;

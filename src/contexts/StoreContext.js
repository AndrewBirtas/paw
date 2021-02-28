import React, { useContext, useState } from 'react'
import { store } from '../firebase'

const StoreContext = React.createContext()

export function useStore() {
    return useContext(StoreContext)
}


export function StoreProvider({children}) {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    
    const ref = store.collection('users')
    const ref_posts = store.collection('posts')

    console.log(ref)

    function getUsers() {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setUsers(items)
        })
    }

    function createPost(newPost) {
        
        ref_posts.doc(newPost.id).set(newPost).catch((err) => {
            console.log(err)
        })

        ref.doc(newPost.host).update({posts: posts.push(newPost.id)})
    }

    function getPosts() {
        ref_posts.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setPosts(items)
        })
    }

    const value = {
        users,
        posts,
        getUsers,
        createPost,
        getPosts
      }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}
import Post from '../post/Post'
import Share from '../Share/Share'
import './feed.css'
import { useEffect, useState } from 'react';
import axios from 'axios'


export default function Feed({username}) {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            console.log(username)
            const res = username 
                ? await axios.get("/posts/profile/"+username )
                : await axios.get("posts/timeline/6104f65b9436590db80f15aa");
            setPost(res.data)
        }
        fetchPosts();
    },[username])
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                    {
                        post.map((p) => (
                            <Post key={p._id} post={p} />
                        ))
                    }
            </div>
        </div>
    )
}

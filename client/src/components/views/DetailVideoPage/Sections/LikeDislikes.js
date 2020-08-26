import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import axios from 'axios';

function LikeDislikes(props) {

    const [likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [dislikes, setDislikes] = useState(0);
    const [DislikeAction, setDislikeAction] = useState(null);
    let variable = {};

    if(props.video){
        variable = { videoId: props.videoId, userId: props.userId }
    }else{
        variable = { commentId: props.commentId, userId: props.userId  }
    }

    useEffect(() => {
        
        axios.post('/api/like/getLikes', variable)
            .then(response => {

                if(response.data.success){
                    //How many likes does this video or comment have
                    setLikes(response.data.likes.length);

                    //if I already clicked this like button
                    response.data.likes.map(like =>{
                        if(like.userId === props.userId){
                            setLikeAction('liked');
                        }
                    });

                }else{
                    alert('failed to get likes');
                }

            })
        ;
        
        axios.post('/api/dislike/getDislikes', variable)
            .then(response => {

                if(response.data.success){
                    //How many dislikes does this video or comment have
                    setDislikes(response.data.dislikes.length);

                    //if I already clicked this Dislike button
                    response.data.dislikes.map(dislike =>{
                        if(dislikes.userId === props.userId){
                            setDislikeAction('disliked');
                        }
                    });

                }else{
                    alert('failed to get dislikes');
                }

            })
        ;

    }, [])

    return (
        <React.Fragment>

            <span key="comment-basic-like">
    
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined' }
                        onClick
                    />
                </Tooltip>    
                <span style={{ paddingLeft: '8px', cursor:'auto' }}>{likes}</span>
            
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined' }
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}>{dislikes}</span>

            </span>

        </React.Fragment>
    )
}

export default LikeDislikes

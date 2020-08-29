import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import axios from 'axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [Dislikes, setDislikes] = useState(0);
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
                console.log('getLikes', response.data)

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
        
        axios.post('/api/like/getDislikes', variable)
            .then(response => {

                if(response.data.success){
                    //How many dislikes does this video or comment have
                    setDislikes(response.data.dislikes.length);

                    //if I already clicked this Dislike button
                    response.data.dislikes.map(like =>{
                        if(like.userId === props.userId){
                            setDislikeAction('disliked');
                        }
                    });

                }else{
                    alert('failed to get dislikes');
                }

            })
        ;



    }, [])

    const onLike = () =>{



        if(LikeAction === null){

            axios.post('/api/like/upLike', variable)
                .then(response =>{

                    if(response.data.success){

                        setLikes(Likes + 1);
                        setLikeAction('liked');

                        //if dislike button is already clicked
                        if(DislikeAction !== null){
                            setDislikeAction(null);
                            setDislikes(Dislikes -1);
                        }

                    }else{
                        alert('failed to increase likes');
                    }

                })
            ;   
 
        } else{

            axios.post('/api/like/unLike', variable)
                .then(response => {

                    if(response.data.success){

                        setLikes(Likes - 1);
                        setLikeAction(null);

                    }else{
                        alert('failed to decrease the like');
                    }

                })
            ;

        }



    }

    const onDislike = () =>{

        if(DislikeAction !== null){

            axios.post('/api/like/unDisLike', variable)
                .then(response =>{

                    if(response.data.success){

                        setDislikes(Dislikes -1);
                        setDislikeAction(null);

                    }else{
                        alert('failed to decrease dislike');
                    }

                })
            ;

        }else{

            axios.post('/api/like/upDisLike', variable)
                .then(response =>{

                    if(response.data.success){

                        setDislikes(Dislikes + 1);
                        setDislikeAction('disliked');

                        //if dislike button is already clicked
                        if(LikeAction !== null){
                            setLikeAction(null);
                            setLikes(Likes -1);
                        }

                    }else{
                        alert('failed to increase dislikes');
                    }

                })
            ;

        }

    }

    return (
        <React.Fragment>

            <span key="comment-basic-like">
    
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined' }
                        onClick={onLike}
                    />
                </Tooltip>    
                <span style={{ paddingLeft: '8px', cursor:'auto' }}>{Likes}</span>
            
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined' }
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}>{Dislikes}</span>

            </span>

        </React.Fragment>
    )
}

export default LikeDislikes

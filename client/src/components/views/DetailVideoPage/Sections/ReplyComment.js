import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);
    
    useEffect(() => {
        
        let commentNumber = 0;
        props.CommentList.map((comment)=>{
            if(comment.responseTo === props.parentCommentId){
                commentNumber++;
            }
        });
        setChildCommentNumber(commentNumber);

    }, [])

    let renderReplyComment = (parentCommentId) =>
 
        props.CommentList && props.CommentList.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId}
                    <div style={{ marginLeft:'40px', width: '80%' }}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentList={props.CommentList} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </div>
                
            </React.Fragment>
        )) 
    

    const handleChange= () =>{
        setOpenReplyComments(!OpenReplyComments);
    }

    

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} 
                    onClick={handleChange} >
                    View  {ChildCommentNumber} more comment(s)
                </p> 
            }

            {OpenReplyComments && 
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment

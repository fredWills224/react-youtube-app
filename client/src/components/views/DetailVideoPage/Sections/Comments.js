import React, {useState} from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
function Comments(props) {

    //[user] can be access because of [useSelector from 'react-redux']
    const user = useSelector(state => state.user);
    const [Comment, setComment] = useState("");

    const handleChange = (e)=>{
        setComment(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response=>{
                
                if(response.data.success){
                    setComment("");
                    props.refreshFunction(response.data.result);
                }else{
                    alert('failed to save comment');
                }

            })
        ;

    }

    return (
        <div>



            <br/>
            <p> replies </p>
            <hr/>

            {/* Comment List */}
            {console.log(props.CommentList)}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit>

                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder='write comments here'
                />
                <br/>
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                
            </form>



        </div>
    )
}

export default Comments

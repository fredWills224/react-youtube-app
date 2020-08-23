import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Subscriber(props) {

    const userTo = props.userTo;
    const userFrom = props.userFrom;

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(()=>{
        
        const subscribeNumberVariables = { userTo:userTo }
        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response=>{

                if(response.data.success){
                    console.log(response.data.subscribeNumber);
                    setSubscribeNumber(response.data.subscribeNumber);
                }else{
                    alert('failed to get subscriber number');
                }

            })
        ;

        axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response=>{

                if(response.data.success){
                    console.log(response.data.subscribed);
                    setSubscribed(response.data.subscribed);
                }else{
                    alert('failed to get subscribed information');
                }

            })
        ;

    }, [])

    return (
        <div>
            <button style={{ 
                backgroundColor: `${Subscribed ? '#AAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
             }}>
                {SubscribeNumber} {Subscribed? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscriber

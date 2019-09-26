import React, { useState } from 'react';
import axios from 'axios';
// import axios from 'axios';



function Parent() {
    const [comments, setComments] = useState([]);

    function fetchComments() {
        axios.get('http://localhost:4000/getAllContent')
            .then(response => response.data)
            .then(data => setComments(data));
    }
    
    return (
        <div>
            <button onClick={fetchComments}>Get Comments</button>
            <ul>
                {comments.map((comment, index) =>
                    <li key={index}>
                        {comment.content}
                    </li>
                )}
            </ul>
        </div>

    )
}

export default Parent;

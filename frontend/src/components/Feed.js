import React from 'react';
import { List, ListItemText, Paper } from '@material-ui/core';
import TwitterFeed from './TwitterFeed';

export default function Feed() {
    return (
        <Paper style={{ maxHeight: window.innerHeight * .9, overflow: 'auto' }}>
            
                <TwitterFeed/>
        </Paper>
    );
}

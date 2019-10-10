import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Paper, Button, ListSubheader } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function TwitterFeed(props) {
    console.log(props)

    function getCriteria(){
        if (props.subject === 'Guns'){
            return `guns OR "second amendment" OR shootings`
        } else if (props.subject === 'Environment'){
            return `Environment protect activism`
        } else if (props.subject === 'Sexual Harassment'){
            return "sexual harassment OR rape"
        }
    }

    function updateTweets() {
        axios.post('http://localhost:4000/getTweets', {criteria: getCriteria()})
            .then(response => response.data)
            .then(data => {
                console.log(data);
                var newTweets = data.statuses.map((item) => {
                    return ({    
                        alt: 'fakeAlt',
                        src: item.user.profile_image_url_https,
                        handle: item.user.screen_name,
                        header: item.user.screen_name,
                        primaryText: item.full_text,
                        retweetCount: item.retweet_count,
                    })
                })
                setTweets(newTweets)
            });
    }

    const classes = useStyles();
    const [tweets, setTweets] = useState([]);
    return (
        <Paper style={{ maxHeight: window.innerHeight * .9, overflow: 'auto' }}>
            <Button
                color="primary"
                variant="contained"
                onClick={updateTweets}>
                get tweets
            </Button>
            <List
                className={classes.root}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Twitter Feed:
            </ListSubheader>}
            >
                {tweets.filter(item => item.retweetCount > 3).map((item, index) => {
                    return (
                        <div key={index}>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar alt={item.alt} src={item.src} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={'@' + item.header}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                #retweets: {item.retweetCount}
                                                <br />
                                            </Typography>
                                            {item.primaryText}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider component="li" />
                        </div>
                    )
                })}
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                >
                    Get more tweets
                </Button>
            </List>
        </Paper>
    );
}
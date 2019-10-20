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

const twitterHandles = new Map([['Barack Obama', 'barackobama'], ['Donald Trump', 'realdonaldtrump'], ['Alexandria Ocasio-Cortez', 'aoc'], ['Ted Cruz', 'tedcruz'], ['Nancy Pelosi', 'speakerpelosi'], ['Adam Schiff', 'repadamschiff'], ['John Lewis', 'repjohnlewis'], ['Anderson Cooper', 'andersoncooper'], ['John Oliver', 'iamjohnoliver'], ['Ben Shapiro', 'benshapiro']]);

export default function TwitterFeed(props) {
    console.log(props)

    function getCriteria() {
        //check which influencers selected
        // set string equal to twitter handle
        // return from:handle AND query params
        var authorHandle = selectAuthor(props);
        if(props.subject === 'Any' || !Object.keys(props.subject).length) {
            return authorHandle
        } else if (props.subject === 'Guns'){
            return authorHandle + `(gun OR 'second amendment' OR shootings)`
        } else if (props.subject === 'Environment') {
            return authorHandle + ` (#climate OR Environment OR "climate change" OR pollution)`
        } else if (props.subject === 'Sexual Harassment') {
            return authorHandle + " sexual harassment OR rape"
        } else if (props.subject === 'Healthcare') {
            return authorHandle + ' healthcare OR hospital OR medical treatments'
        } else if (props.subject === 'Student Debt') {
            return authorHandle + ' #studentloan OR student debt'
        } else if (props.subject === '2020 Election') {
            return authorHandle + '#election2020 OR MAGA OR #Yang2020 OR Vote OR KeepItBlue OR #Bernie2020 OR #Warren2020 OR #Pete2020'
        } else if (props.subject === 'Police Brutality') {
            return authorHandle + ' #blacklivesmatter OR #bluelivesmatter OR Ferguson'
        } else if (props.subject === 'LGBTQ+') {
            return authorHandle + ' #lgbt OR #pride OR #transgender'
        } else if (props.subject === 'Gender Equality') {
            return authorHandle + ' #feminism OR #gender OR #genderequality'
        } else if (props.subject === 'Brexit') {
            return authorHandle + ' #brexit'
        } else return '';
    }

    function selectAuthor(props) {

        //if string is empty, add handle
        //if string is not empty, concatenate with OR from:handle
        var handle_String = '';
        twitterHandles.forEach(function (value, key) {
            if (props.authorsArray.indexOf(key) >= 0) {
                if (handle_String == '') {
                    handle_String += '(from:' + value;
                } else {
                    handle_String += ' OR from:' + value;
                }
            }
        })
        return handle_String === '' ? handle_String : handle_String + ') AND '
    }

    function updateTweets() {
        console.log(getCriteria())
        axios.post('http://localhost:4000/getTweets', { criteria: getCriteria() })
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
                setTweets(newTweets.sort((item1, item2) => item2.retweetCount - item1.retweetCount))
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
            </List>
        </Paper>
    );
}
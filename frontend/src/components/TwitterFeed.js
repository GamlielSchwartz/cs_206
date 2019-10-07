import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TwitterFeed() {
    const classes = useStyles();
    const tweets =
        [{
            alt: "altNum1",
            src: "xyz",
            header: "Header # 1",
            handle: "number1",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum2",
            src: "xyz",
            header: "Header # 2",
            handle: "secondPLace",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum3",
            src: "xyz",
            header: "Header # 3",
            handle: "thirdPlace",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum1",
            src: "xyz",
            header: "Header # 1",
            handle: "number1",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum2",
            src: "xyz",
            header: "Header # 2",
            handle: "secondPLace",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum3",
            src: "xyz",
            header: "Header # 3",
            handle: "thirdPlace",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum1",
            src: "xyz",
            header: "Header # 1",
            handle: "number1",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum2",
            src: "xyz",
            header: "Header # 2",
            handle: "secondPLace",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum3",
            src: "xyz",
            header: "Header # 3",
            handle: "thirdPlace",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum1",
            src: "xyz",
            header: "Header # 1",
            handle: "number1",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum2",
            src: "xyz",
            header: "Header # 2",
            handle: "secondPLace",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        },
        {
            alt: "altNum3",
            src: "xyz",
            header: "Header # 3",
            handle: "thirdPlace",
            primaryText: "Some text. Some text. Some text. Some text. Some text. Some text. Some text. "
        }
        ]
    return (
        <Paper style={{ maxHeight: window.innerHeight * .9, overflow: 'auto' }}>
            <List className={classes.root}>
                {tweets.map((item, index) => {
                    return (
                        <div key={index}>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar alt={item.alt} src={item.src} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.header}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                @{item.handle}
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
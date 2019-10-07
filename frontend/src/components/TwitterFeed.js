import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Paper, Button, ListSubheader } from '@material-ui/core';

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
            <List 
            className={classes.root}
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Twitter Feed:
            </ListSubheader>}
            >
                {tweets.map((item, index) => {
                    return (
                        <div key={index}>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar alt={item.alt} src={"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg"} />
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
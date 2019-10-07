import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SelectedListItem(props) {
    const classes = useStyles();
    const selectedSubjects = props.selectedSubjects;
    const setSelectedSubjects = props.setSelectedSubjects;
    
    function handleListItemClick(subject) {
        setSelectedSubjects(subject);
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folder">
                {props.subjectArray.map((item, index) => {
                    return (
                        <ListItem 
                            key={index}
                            button
                            selected={selectedSubjects.indexOf(item) !== -1}
                            onClick={() => handleListItemClick(item)}
                        >
                            <ListItemText primary={item} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
}

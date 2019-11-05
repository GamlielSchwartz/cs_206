import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import './filterByAuthor.css';
import { ListSubheader, Divider, Paper } from '@material-ui/core';
import SearchBar from './SearchBar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import influencers from './influencersList.js';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function FilterByAuthor(props) {
    const classes = useStyles();
    // const [checked, setChecked] = useState([0,0,0,0,0]);
    // const setChecked = props.setSelectedAuthors;
    const [checked, setChecked] = useState({ 'Journalist': false, 'Academia': true, 'Politician—Executive': false, 'Politician—Representative': false, 'Politician—Senator': false })

    const handleToggle = value => () => {
        console.log(value)
        // var newChecked = [JSON.parse(JSON.stringify(checked))];
        // newChecked[value] = !newChecked[value];
        // setChecked(newChecked);
        // console.log(newChecked)
        var filtered = influencers.filter(item => item.category === value);
        props.bulkAdd(filtered);
        // const currentIndex = checked.indexOf(value);
        // const newChecked = [...checked];

        // if (currentIndex === -1) {
        //     newChecked.push(value);
        // } else {
        //     newChecked.splice(currentIndex, 1);
        // }
        // setChecked(newChecked);
    };

    function handleSelectedAuthor(event, obj) {
        // handleToggle(obj.suggestion.name);
        props.addAuthor(obj.suggestion);
    }

    const categories = ['Journalist', 'Academia', 'Politician—Executive', 'Politician—Representative', 'Politician—Senator'];

    return (
        <Paper style={{ maxHeight: window.innerHeight * .9, overflow: 'auto' }}>
            <SearchBar
                selectAuthor={handleSelectedAuthor}
            />
            <List
                dense
                className={classes.root}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Selected Influencers:
                    </ListSubheader>
                }
            >
                {categories.map((value, index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemText id={"labelId"} primary={value} />
                            <ListItemSecondaryAction >
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(value)}
                                    // checked={checked[value]}
                                    inputProps={{ 'aria-labelledby': "labelId" }}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
                <Divider />
                <ListItem button onClick={props.clearAll}>
                    <ListItemText id={"clear"} primary={"Clear All"} />
                </ListItem>
                <Divider />

                {props.chosenAuthors.map((value, index) => {
                    const labelId = `checkbox-list-secondary-label-${index}`;
                    return (
                        <ListItem key={value.twitterHandle}>
                            {/* <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${value + 1}`}
                                src={`/static/images/avatar/${value + 1}.jpg`}
                            />
                            </ListItemAvatar> */}
                            <ListItemText id={labelId} primary={value.name} />
                            <ListItemSecondaryAction >
                                <HighlightOffIcon onClick={() => props.removeAuthor(value)} htmlColor={"red"} />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    )

}

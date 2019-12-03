import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListSubheader, Paper, InputLabel, FormControl, Select, MenuItem, FormHelperText, Input, OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const useStylesSelect = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function SelectedListItem(props) {
    const classes = useStyles();
    const classes2 = useStylesSelect();
    // const [values, setValues] = React.useState({
    //     age: '',
    //     name: 'hai',
    // });
    const [currRegion, setCurrRegion] = React.useState("United States");

    function handleSelectChange(event) {
        console.log(event.target.value);
        setCurrRegion(event.target.value);
        props.changeRegion(event.target.value);

        // setValues(oldValues => ({
        //     ...oldValues,
        //     [event.target.name]: event.target.value,
        // }));
    }
    const selectedSubjects = props.selectedSubjects;
    const setSelectedSubjects = props.setSelectedSubjects;

    function handleListItemClick(subject) {
        setSelectedSubjects(subject);
    }
    const [value, setValue] = React.useState(2);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <div>
            <Paper style={{ maxHeight: window.innerHeight * .5, overflow: 'auto' }}>
                <FormControl variant={"outlined"} className={classes2.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">Region</InputLabel>
                    <Select
                        value={currRegion}
                        onChange={handleSelectChange}
                        input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
                    >
                        <MenuItem value={"United States"}>United States</MenuItem>
                        <MenuItem value={"California"}>California</MenuItem>
                        <MenuItem value={"New York City"}>New York City</MenuItem>
                    </Select>
                    <FormHelperText>Select a Region to Explore</FormHelperText>
                </FormControl>
            </Paper>
            <br /><br />
            <Paper style={{ maxHeight: window.innerHeight * .7, overflow: 'auto' }}>
                <List
                    className={classes.root}
                    dense
                    component="nav"
                    aria-label="secondary mailbox folder"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Choose a Subject In Your Region:
            </ListSubheader>
                    }
                >
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
            </Paper>
        </div>
    );
}

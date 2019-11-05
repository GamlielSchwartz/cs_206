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
        if (props.subject === 'Any' || !Object.keys(props.subject).length) {
            return authorHandle
        } else if (props.subject === 'Gun Control') {
            return authorHandle + 'second amendment OR school shooting OR march for our lives OR firearms OR NRA'
        } else if (props.subject === 'Environment') {
            return authorHandle + 'carbon emissions OR alternative energy OR pollution OR global warming OR forest fire OR renewable OR global warming OR greta thunberg OR carbon tax OR green new deal'
        } else if (props.subject === 'Sexual Violence') {
            return authorHandle + 'meToo OR timesup	OR dating violence OR domestic violence OR consent OR Title IX OR BelieveSurvivors OR rape'
        } else if (props.subject === 'Healthcare') {
            return authorHandle + 'healthcare OR Affordable Care Act OR Obamacare OR healthcare Premiums OR Medicare-for-All OR health insurance OR big pharma OR medicaid'
        } else if (props.subject === 'Student Debt') {
            return authorHandle + 'student loans OR student debt OR debt forgiveness'
        } else if (props.subject === '2020 Election') {
            return authorHandle + '#election2020 OR MAGA OR #Yang2020 OR Vote OR KeepItBlue OR #Bernie2020 OR #Warren2020 OR #Pete2020 OR "democratic debate"'
        } else if (props.subject === 'Police Brutality') {
            return authorHandle + '#blacklivesmatter OR #bluelivesmatter OR Ferguson OR police brutality'
        } else if (props.subject === 'LGBTQ+') {
            return authorHandle + '#lgbt OR #pride OR #transgender OR homosexual OR gay'
        } else if (props.subject === 'Gender Equality') {
            return authorHandle + 'wage gap OR sexism OR glass ceiling OR empowerment OR sexual harassment OR Title IX OR feminism OR ERA'
        } else if (props.subject === 'Immigration') {
            return authorHandle + 'immigration OR mexico OR illegal OR asylum OR citizenship OR refuge OR deportation OR ICE OR	DACA OR migration'
        } else if (props.subject === 'Refugees') {
            return authorHandle + 'syria OR asylum OR detention OR refugee crisis OR IRC OR deportation OR refugees OR refugee cap'
        } else if (props.subject === 'Big Tech') {
            return authorHandle + 'Salesforce OR NoTechForIce OR WeWontBuildIt OR Palantir OR Apple OR Google OR Facebook OR Amazon OR tech'
        } else if (props.subject === 'Marijuana') {
            return authorHandle + 'cannabis OR THC OR medicinal marijuana OR #LegalizeIt OR CBD'
        } else if (props.subject === 'Abortion') {
            return authorHandle + 'pro-choice OR pro-life OR planned parenthood OR birth control OR first trimester OR Roe v Wade OR abortion clinic'
        } else if (props.subject === 'Free Speech') {
            return authorHandle + 'first amendment OR hate speech OR censorship OR slander OR defamation OR Facebook Ads OR safe spaces'
        } else if (props.subject === 'Impeachment') {
            return authorHandle + 'Trump OR impeachment inquiry OR Indictment OR Senate hearing OR Robert Mueller'
        } else if (props.subject === 'China') {
            return authorHandle + 'Trade War OR Hong Kong Protest OR Xinjiang OR Uighur OR Alibaba OR Huawei OR Xi Jinping'
        } else if (props.subject === 'Taxes') {
            return authorHandle + 'pension OR income tax OR state tax OR sales tax OR taxpayer OR tax bracket OR IRS OR tax cut'
        } else if (props.subject === 'Minimum Wage') {
            return authorHandle + 'living wage OR minimum wage OR fight for 15 OR universal basic income OR UBI'
        } else if (props.subject === 'Religion') {
            return authorHandle + 'Catholic OR christianity OR religious freedom OR Islamophobia OR Synagogue OR Mosque OR Judaism OR hijab OR religious discrimination'
        } else if (props.subject === 'Terrorism') {
            return authorHandle + 'jihad OR al-qaeda OR extremists OR bombing OR domestic terrorist OR White nationalism OR ISIS OR right-wing terrorism'
        } else if (props.subject === 'Education') {
            return authorHandle + 'student debt OR student loan OR college OR higher education OR department of education OR for-profit college OR Betsy DeVos OR affirmative action'
        } else if (props.subject === 'Opioid Crisis') {
            return authorHandle + 'opioid OR heroin OR fentanyl OR Opiate'
        } else return '';
    }

    function selectAuthor(props) {

        //if string is empty, add handle
        //if string is not empty, concatenate with OR from:handle
        var handle_String = '';
        props.authorsArray.forEach(function (value, key) {
            console.log(value);
            // if (props.authorsArray.indexOf(key) >= 0) {
            if (handle_String == '') {
                handle_String += '(from:' + value.twitterHandle;
            } else {
                handle_String += ' OR from:' + value.twitterHandle;
            }
            // }
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
            <List
                className={classes.root}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={updateTweets}>
                            Get Tweets
                        </Button>
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
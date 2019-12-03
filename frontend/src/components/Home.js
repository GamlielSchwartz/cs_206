import React, { useState } from 'react';
import FilterByAuthor from './FilterByAuthor';
import FilterBySubject from './FilterBySubject';
import Grid from '@material-ui/core/Grid';
import TwitterFeed from './TwitterFeed';
import './home.css';
import DemoChart from './DemoChart'
import CustomProgress from './CustomProgress';

function Home() {
    // const UnitedStatesSubjectArray = ['Gun Control', 'Environment', 'Sexual Violence', 'Healthcare', 'Student Debt', '2020 Election', 'Police Brutality', 'LGBTQ+',
    //     'Gender Equality', 'Immigration', 'Refugees', 'Big Tech', 'Marijuana', 'Abortion', 'Free Speech', 'Impeachment',
    //     'China', 'Taxes', 'Minimum Wage', 'Religion', 'Terrorism', 'Education', 'Opioid Crisis']
    const UnitedStatesSubjectArray = ['Abortion', 'Big Tech', 'China', 'Climate Change', 'Criminal Justice',
        'Economy', 'Education & Student Loans', 'Gender Equality',
        'Gun Control', 'Healthcare', 'Immigration', 'Refugees', 'Impeachment', 'Korean Peninsula',
        'LGBTQ', 'Mental Health', 'Public Transportation', 'Russia', 'Religion', 'Terrorism', 'Sexual Violence', 'Opioid Crisis', 'Syria']
    const californiaSubjectArray = ['Drought', 'Wildfire', 'Affordable Housing', 'Earthquake', 'Marijuana'];
    const newYorkSubjectArray = ['Metro', 'Police Brutality', 'Affordable Housing', 'Hurricane'];

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [chosenAuthors, setChosenAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currDisplayedSubjects, setCurrDisplayedSubjects] = useState(UnitedStatesSubjectArray);

    // function updateAuthors(newAuthors) {
    //     console.log(newAuthors);
    //     setSelectedAuthors(newAuthors);
    // }

    function updateCategories(newCategories) {
        console.log(newCategories);
        setSelectedCategories(newCategories);
    }

    function addAuthor(authorObj) {
        console.log(authorObj);
        var newAuthors = [...chosenAuthors];
        newAuthors.push(authorObj);
        setChosenAuthors(newAuthors);
    }

    function bulkAdd(bulkAuthorArray) {
        var newAuthors = [...chosenAuthors];
        for (var i = 0; i < bulkAuthorArray.length; i++) {
            if (!newAuthors.includes(bulkAuthorArray[i])) {
                newAuthors.push(bulkAuthorArray[i]);
            }
        }
        //TODO: not working!
        const sorted = newAuthors.sort(function (a, b) { return b.name - a.name; });
        // console.log(sorted)
        setChosenAuthors(sorted);
    }

    function bulkRemove(toRemoveArray) {
        var newAuthors = [...chosenAuthors];
        for (var i = 0; i < toRemoveArray.length; i++) {
            newAuthors = newAuthors.filter(item => item !== toRemoveArray[i]);
        }
        setChosenAuthors(newAuthors);
    }

    function removeAuthor(authorObj) {
        var newAuthors = [...chosenAuthors];
        newAuthors.splice(newAuthors.indexOf(authorObj), 1);
        setChosenAuthors(newAuthors);
    }

    function clearAll() {
        setChosenAuthors([]);
        setSelectedCategories([]);
    }

    function updateSubjects(newSubjects) {
        console.log(newSubjects);
        setSelectedSubjects(newSubjects);
    }

    var authorCategories = ['Journalist', 'Academia', 'Politician—Executive', 'Politician—Representative', 'Politician—Senator'];


    function switchSubjectAndAuthorsByRegion(newRegion) {
        console.log(newRegion);
        switch (newRegion) {
            case 'United States':
                setCurrDisplayedSubjects(UnitedStatesSubjectArray);
                setAuthCategories(authorCategories)
                break;
            case 'California':
                setCurrDisplayedSubjects(californiaSubjectArray.concat(UnitedStatesSubjectArray));
                setAuthCategories(['CA—Executive', 'CA—Senator', 'CA—Representative', 'CA—Publication'])
                break;
            case 'New York City':
                setCurrDisplayedSubjects(newYorkSubjectArray.concat(UnitedStatesSubjectArray));
                setAuthCategories(['NYC—Executive', 'NYC—Representative', 'NYC—Publication'])
                break;
        }
    }

    const [authCategories, setAuthCategories] = React.useState(authorCategories);
    const [tweetData, setTweetData] = React.useState(null);
    function handleNewTweetsFromDb(data) {
        console.log(data)
        var unpopular = [];
        var somehwatPopular = [];
        var popular = [];
        var veryPopular = [];
        var extremelyPopular = [];

        const unpopularUpperLimit = 50;
        const somewhatPopularUpperLimit = 1000;
        const popularUpperLimit = 5000;
        const veryPopularUpperLimit = 20000;

        for (var i = 0; i < data.authors.length; i++) {
            var byMe = data.tweets.filter(tweet => tweet.twitterHandle === data.authors[i]);
            unpopular.push(byMe.filter(tweet => tweet.retweets < unpopularUpperLimit).length);
            somehwatPopular.push(byMe.filter(tweet => tweet.retweets >= unpopularUpperLimit && tweet.retweets < somewhatPopularUpperLimit).length);
            popular.push(byMe.filter(tweet => tweet.retweets >= somewhatPopularUpperLimit && tweet.retweets < popularUpperLimit).length);
            veryPopular.push(byMe.filter(tweet => tweet.retweets >= popularUpperLimit && tweet.retweets < veryPopularUpperLimit).length);
            extremelyPopular.push(byMe.filter(tweet => tweet.retweets >= veryPopularUpperLimit).length);
        }
        var tweetDataObj =
        {
            authors: data.authors,
            unpopular: unpopular,
            somewhatPopular: somehwatPopular,
            popular: popular,
            veryPopular: veryPopular,
            extremelyPopular: extremelyPopular
        }
        setTweetData(tweetDataObj);
    }

    const [showProgress, setShowProgress] = React.useState(false);

    function setProgress(showCircularProgress) {
        setShowProgress(showCircularProgress);
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
        >
            <Grid item xs={3}>
                <FilterBySubject
                    setSelectedSubjects={updateSubjects}
                    selectedSubjects={selectedSubjects}
                    subjectArray={currDisplayedSubjects.sort()}
                    changeRegion={switchSubjectAndAuthorsByRegion}
                />
            </Grid>
            <Grid item xs={3}>
                <FilterByAuthor
                    bulkRemove={bulkRemove}
                    clearAll={clearAll}
                    bulkAdd={bulkAdd}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    // setSelectedAuthors={updateAuthors}
                    // authorsArray={authorsArray}
                    categories={authCategories}
                    addAuthor={addAuthor}
                    chosenAuthors={chosenAuthors}
                    removeAuthor={removeAuthor}
                />
            </Grid>
            <Grid item xs={5}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid item>
                        <TwitterFeed
                            setProgress={setProgress}
                            notifyHistogram={handleNewTweetsFromDb}
                            authorsArray={chosenAuthors}
                            subject={selectedSubjects} />
                    </Grid>

                    {tweetData && !showProgress ?
                        <Grid item>
                            <DemoChart tweetsData={tweetData} />
                        </Grid>
                        :
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                        >
                            <br /><br />
                            {showProgress ? <CustomProgress /> : null}
                            
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>

    );
}

export default Home;

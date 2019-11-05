import React, { useState } from 'react';
import FilterByAuthor from './FilterByAuthor';
import FilterBySubject from './FilterBySubject';
import Grid from '@material-ui/core/Grid';
import TwitterFeed from './TwitterFeed';
import './home.css';

function Home() {
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [chosenAuthors, setChosenAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

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
            newAuthors = newAuthors.filter(item=> item !== toRemoveArray[i]);
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

    //TODO: replace dummy with real data
    const subjectArray = ['Gun Control', 'Environment', 'Sexual Violence', 'Healthcare', 'Student Debt', '2020 Election', 'Police Brutality', 'LGBTQ+',
        'Gender Equality', 'Immigration', 'Refugees', 'Big Tech', 'Marijuana', 'Abortion', 'Free Speech', 'Impeachment',
        'China', 'Taxes', 'Minimum Wage', 'Religion', 'Terrorism', 'Education', 'Opioid Crisis']
    // const authorsArray = ["Barack Obama", "Donald Trump", "Alexandria Ocasio-Cortez", "Ted Cruz", "Nancy Pelosi", "Adam Schiff", "John Lewis", "Anderson Cooper", "John Oliver", "Ben Shapiro"];
    const authorsArray = [];
    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <FilterBySubject
                    setSelectedSubjects={updateSubjects}
                    selectedSubjects={selectedSubjects}
                    subjectArray={subjectArray.sort()}
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
                    authorsArray={authorsArray}
                    addAuthor={addAuthor}
                    chosenAuthors={chosenAuthors}
                    removeAuthor={removeAuthor}
                />
            </Grid>

            <Grid item xs={6}>
                <TwitterFeed
                    authorsArray={chosenAuthors}
                    subject={selectedSubjects} />
            </Grid>

        </Grid>

    );
}

export default Home;

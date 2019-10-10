import React, { useState } from 'react';
import FilterByAuthor from './FilterByAuthor';
import FilterBySubject from './FilterBySubject';
import Grid from '@material-ui/core/Grid';
import TwitterFeed from './TwitterFeed';


function Home() {
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    function updateAuthors(newAuthors) {
        console.log(newAuthors);
        setSelectedAuthors(newAuthors);
    }

    function updateSubjects(newSubjects) {
        console.log(newSubjects);
        setSelectedSubjects(newSubjects);
    }

    //TODO: replace dummy with real data
    const subjectArray = ["Guns", "Environment", "Sexual Harassment"];
    const authorsArray = ["Anyone", "Barack Obama", "Donald Trump"];

    return (
        <Grid container spacing={3}>

            <Grid item xs={3}>
                <FilterByAuthor
                    setSelectedAuthors={updateAuthors}
                    selectedAuthors={selectedAuthors}
                    authorsArray={authorsArray}
                />
            </Grid>

            <Grid item xs={3}>
                <FilterBySubject
                    setSelectedSubjects={updateSubjects}
                    selectedSubjects={selectedSubjects}
                    subjectArray={subjectArray}
                />
            </Grid>

            <Grid item xs={6}>
                <TwitterFeed
                    authorsArray={selectedAuthors}
                    subject={selectedSubjects} />
            </Grid>

        </Grid>

    );
}

export default Home;

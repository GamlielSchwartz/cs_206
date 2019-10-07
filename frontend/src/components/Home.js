import React, { useState } from 'react';
import '../EditorView.css';
import FilterByAuthor from './FilterByAuthor';
import FilterBySubject from './FilterBySubject';
import Grid from '@material-ui/core/Grid';
import Feed from './Feed';


function Home() {
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    function updateAuthors(newAuthors){
        console.log(newAuthors);
        setSelectedAuthors(newAuthors);
    }

    function updateSubjects(newSubjects){
        console.log(newSubjects);
        setSelectedSubjects(newSubjects);
    }

    //TODO: replace dummy with real data
    const subjectArray = ["Subject 0", "Subject 1", "Subject 2"];
    const authorsArray = ["George Bush", "Barack Obama", "Donald Trump"];

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
                <Feed />
            </Grid>

        </Grid>

    );
}

export default Home;

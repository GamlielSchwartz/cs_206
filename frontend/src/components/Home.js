import React, { useState } from 'react';
import '../EditorView.css';
import FilterByAuthor from './FilterByAuthor';
import FilterBySubject from './FilterBySubject';
import Grid from '@material-ui/core/Grid';
import Feed from './Feed';


function Home() {
    return (
        <Grid container spacing={3}>

            <Grid item xs={3}>
                <FilterByAuthor />
            </Grid>

            <Grid item xs={3}>
                <FilterBySubject />
            </Grid>

            <Grid item xs={6}>
                <Feed />
            </Grid>

        </Grid>

    );
}

export default Home;

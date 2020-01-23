import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    header: {
        height: 60,
    }
}));

export default function ProductCard(props) {
    const classes = useStyles();

    return (
        <Box my={3} mx={1}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.header}
            >
                <Typography variant="h6" gutterBottom>
                    {props.title}
                </Typography>
                {props.children}
            </Grid>
        </Box>
    );
}

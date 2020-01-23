import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import {CustomPriceLabel} from './ComparisonTable'

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 210,
        maxWidth: 210,
        position: 'relative',
        '&:hover $overlay': {
            opacity: 1,
        },
        '&:hover $overlayText': {
            opacity: 1
        },
    },
    media: {
        height: 250,
        backgroundSize: "contain"
    },
    overlay: {
        height: 250,
        background: '#40e6b985',
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        opacity: 0,
        transition: 'all 0.4s ease-in-out 0s',
    },
    overlaySelected: {
        height: 250,
        background: '#40e6b985',
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        opacity: 1,
        transition: 'all 0.4s ease-in-out 0s',
    },
    overlayText: {
        height: 250,
        position: "absolute",
        textAlign: "center",
        paddingLeft: "1em",
        paddingRight: "1em",
        width: '100%',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        opacity: 0,
        // transform: "translate(-50%, -50%)",
        transition: "all 0.3s ease-in-out 0s",
    },
    btnMargin: {
        margin: theme.spacing(1),
    },
    title: {
        fontWeight: "bold",
        fontSize: "1rem"
    }
}));

const ColorButton = withStyles(theme => ({
    root: {
        padding: "8px 24px",
        color: "#04c18d",
        fontWeight: "bold",
        fontSize: 13,
        backgroundColor: "#fff",
        '&:hover': {
            backgroundColor: "#efefef",
        },
    },
}))(Button);


export default function ProductCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={props.data.image}
                title={props.data.name}
            />
            <Grid container justify="center" alignItems="center" className={props.added ? classes.overlaySelected : classes.overlay}>
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.overlayText}>
                {props.added ?
                    <ColorButton variant="contained" color="primary" className={classes.btnMargin} onClick={props.removeFromCompare}>
                        Remove
                    </ColorButton>
                    : <ColorButton variant="contained" color="primary" className={classes.btnMargin} onClick={props.addToCompare}>
                        Compare
                    </ColorButton>
                }
            </Grid>
            <CardContent>
                <Grid container justify="space-between" alignItems="center">
                    <Typography variant="h6" component="h6" className={classes.title}>
                        {props.data.name}
                    </Typography>
                    <CustomPriceLabel>
                        {props.data.price}
                    </CustomPriceLabel>
                </Grid>
            </CardContent>
        </Card>
    );
}

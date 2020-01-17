import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
// import { white } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 250,
        position: 'relative',
        '&:hover $overlay': {
            opacity: 1,
        },
    },
    media: {
        height: 250,
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
    overlaySelected:{
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
    btnMargin: {
        margin: theme.spacing(1),
    },
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
            <Grid container justify="center" alignItems="center" className={props.added?classes.overlaySelected:classes.overlay}>
                <ColorButton variant="contained" color="primary" className={classes.btnMargin} onClick={props.addToCompare}>
                    Compare
      </ColorButton>
            </Grid>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.data.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.data.price}
                </Typography>
            </CardContent>
        </Card>
    );
}

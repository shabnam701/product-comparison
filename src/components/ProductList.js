import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));


export default function ProductList(props) {
    const classes = useStyles();
    // const selectedIndices = props.selected? props.selected.map(item => item.id):[]

    return (<Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
                {props.data.map(item =>
                    <Grid item>
                        {
                            props.selected && props.selected[item.id]
                                ? <ProductCard added={true} data={item} removeFromCompare={() => { props.removeFromCompare(item) }} addToCompare={() => { props.addToCompare(item) }} />
                                : <ProductCard data={item} removeFromCompare={() => { props.removeFromCompare(item) }} addToCompare={() => { props.addToCompare(item) }} />

                        }
                    </Grid>)}
            </Grid>
        </Grid>
    </Grid>)
}
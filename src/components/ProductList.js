import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom:10
    },
}));


export default function ProductList(props) {
    const classes = useStyles();

    return (<Grid container className={classes.root}>
        <Grid container justify="center" spacing={2}>
            {props.data.map((item,idx) =>
                <Grid key={idx} item>
                    {props.selected && props.selected.find(sel=>sel.id===item.id)!==undefined
                        ? <ProductCard added={true} data={item} removeFromCompare={() => { props.removeFromCompare(item) }} addToCompare={() => { props.addToCompare(item) }} />
                        : <ProductCard data={item} removeFromCompare={() => { props.removeFromCompare(item) }} addToCompare={() => { props.addToCompare(item) }} />
                    }
                </Grid>)}
        </Grid>
    </Grid>)
}
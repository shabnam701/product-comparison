import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 700,
    },
    columnHeader: {
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    listStyle: {
        width: '100%',
        maxWidth: 360,
    },
    listItemStyle: {
        textAlign: "right"
    },
    priceLabel: {
        color: "green"
    },
    textLabel: {
        textTransform: "capitalize"
    },
    colorLabel: {
        height: 20,
        width: 20,
        margin: 1
    },
    colorContainer: {
        display: 'flex'
    }
}));

export function CustomAttributeLabel(props) {
    const classes = useStyles();

    return (<Typography className={classes.textLabel} variant="subtitle2" gutterBottom>
        {props.children}
    </Typography>)
}

export function CustomColorLabel(props) {
    const classes = useStyles();

    return (<Grid component="div" className={classes.colorLabel} style={{ backgroundColor: props.backgroundColor }} />)
}

export function CustomPriceLabel(props) {
    const classes = useStyles();

    return (<Typography className={classes.priceLabel} variant="subtitle2">
        {props.children}
    </Typography>)
}

export default function ComparisonTable(props) {
    const classes = useStyles();

    return (<TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    {
                        props.data && props.data.map(item =>
                            <TableCell className={classes.columnHeader} align="right">{item.name}</TableCell>)
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {props.filters && props.filters.map(filter =>
                    <TableRow key={filter}>
                        <TableCell component="th" scope="row">
                            <CustomAttributeLabel>{filter}</CustomAttributeLabel>
                        </TableCell>
                        {props.data.map(row =>
                            <TableCell align="right">
                                {(filter === "price" ?
                                    <CustomPriceLabel>{row[filter]}</CustomPriceLabel>
                                    : filter === "colors" ?
                                        <Grid className={classes.colorContainer} justify="flex-end" alignItems="center">{row[filter].map((item, idx) => <CustomColorLabel backgroundColor={item} />)}</Grid>
                                        : (row[filter] instanceof Array) ?
                                            <List dense className={classes.listStyle}>
                                                {row[filter].map((item, idx) => {
                                                    const labelId = `checkbox-list-secondary-label-${item}`;
                                                    let labelText = `${idx + 1}. ${item}`
                                                    return (
                                                        <ListItem key={item} >
                                                            <ListItemText className={classes.listItemStyle} disableTypography={true} id={labelId} primary={labelText} />
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                            : row[filter])}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>)
}
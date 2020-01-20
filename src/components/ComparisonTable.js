import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 700,
    },
}));


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ComparisonTable(props) {
    const classes = useStyles();
    // const selectedIndices = props.selected? props.selected.map(item => item.id):[]

    return (<TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    {
                        props.data && props.data.map(item =>
                            <TableCell align="right">{item.name}</TableCell>

                        )
                    }

                </TableRow>
            </TableHead>
            <TableBody>
                {/* <TableRow key={"attributes"}>
                    {props.filters && props.filters.map(filter =>
                        <TableCell align="right">{filter}</TableCell>
                    )}
                </TableRow> */}
                {/* {props.data.map(row => { */}
                {props.filters && props.filters.map(filter =>
                    <TableRow key={filter}>
                        <TableCell component="th" scope="row">
                            {filter}
                        </TableCell>
                        {props.data.map(row =>
                            <TableCell align="right">
                                {row[filter]}
                            </TableCell>
                        )}
                    </TableRow>

                )
                }
                {/* )} */}
            </TableBody>
        </Table>
    </TableContainer>)
}
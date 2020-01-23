import React from 'react';
import { Button, Grid, Box, Modal, FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText, Checkbox, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import {CustomAttributeLabel} from './ComparisonTable'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    button: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(3),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function AttributeFilter(props) {
    const classes = useStyles();

    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [state, setState] = React.useState({
        open: false,
        selectedFilters: {}

    });

    const handleOpen = () => {
        setState({ ...state, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleSubmit = () => {
        let selected = Object.keys(state.selectedFilters).filter(it => state.selectedFilters[it] === true)
        props.save(selected)
        handleClose()
    }

    React.useEffect(() => {
        setState({
            ...state, selectedFilters: props.data.reduce(function (result, item, index, array) {
                result[item] = props.selected.has(item) ? true : false; //a, b, c
                return result;
            }, {})
        });
    }, [props.selected])

    const handleChange = name => event => {
        setState({ ...state, selectedFilters: { ...state.selectedFilters, [name]: event.target.checked } });
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" className={classes.button}
                startIcon={<EditIcon />} onClick={handleOpen}>
                Add/Remove Attributes
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={state.open}
                onClose={handleClose}
            >
                <Grid style={modalStyle} className={classes.paper}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <Box my={1}>
                            <FormLabel component="legend">Select attributes for comparison</FormLabel>
                        </Box>
                        <FormGroup>
                            {props.data.map(filter => <FormControlLabel
                                control={<Checkbox checked={state.selectedFilters && state.selectedFilters[filter] ? state.selectedFilters[filter] : false} onChange={handleChange(filter)} value={filter} />}
                                label={<CustomAttributeLabel>{filter}</CustomAttributeLabel>}
                            />)}
                        </FormGroup>
                    </FormControl>
                    <Box my={1}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Apply
                            </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={handleClose}>
                                    Close
                            </Button>
                            </Grid>

                        </Grid>
                    </Box>
                </Grid>
            </Modal>
        </React.Fragment>
    );
}

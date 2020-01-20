import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

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
    formControl: {
        margin: theme.spacing(3),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function AttributeFilter(props) {
    console.log("props", props)
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [state, setState] = React.useState({
        open: false,
        selectedFilters: {},
        gilad: false,
        jason: false,
        antoine: false

    });
    console.log("init state", state)

    const handleOpen = () => {
        setState({ ...state, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleSubmit = () => {
        let selected = Object.keys(state.selectedFilters).filter(it => state.selectedFilters[it] === true)
        props.save(selected)
    }

    React.useEffect(() => {
        setState({
            ...state, selectedFilters: props.data.reduce(function (result, item, index, array) {
                result[item] = props.selected.has(item) ? true : false; //a, b, c
                return result;
            }, {})
        });

        console.log("state", state)
    }, [props.selected])

    const handleChange = name => event => {
        setState({ ...state, selectedFilters: { ...state.selectedFilters, [name]: event.target.checked } });
    };

    const { gilad, jason, antoine, selectedFilters } = state;
    const error = [gilad, jason, antoine].filter(v => v).length !== 2;

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Add/Remove Attributes
      </button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={state.open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Assign responsibility</FormLabel>
                        <FormGroup>
                            {props.data.map(filter => <FormControlLabel
                                control={<Checkbox checked={state.selectedFilters && state.selectedFilters[filter] ? state.selectedFilters[filter] : false} onChange={handleChange(filter)} value={filter} />}
                                label={filter}
                            />)}


                        </FormGroup>
                        <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                    <button type="button" onClick={handleClose}>
                        Close
      </button>
                    <button type="button" onClick={handleSubmit}>
                        Apply
      </button>
                </div>

            </Modal>
        </div>
    );
}

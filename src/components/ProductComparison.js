import React from 'react';
import { Container, Typography, Grid, Box } from '@material-ui/core';

import ProductList from './ProductList'
import ComparisonTable from './ComparisonTable'
import AttributeFilter from './AttributeFilter'
import SectionHeader from './SectionHeader'
import withSampleData from './withSampleData'

import '../App.css';

class ProductComparison extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItems: new Set(),
            selectedFilters: new Set(props.filters)
        }
        this.addToCompare = this.addToCompare.bind(this);
        this.removeFromCompare = this.removeFromCompare.bind(this);
    }

    componentDidMount() {
        this.setState({
            selectedFilters: new Set(this.props.filters)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.filters !== prevProps.filters) {
            this.setState({
                selectedFilters: new Set(this.props.filters)
            })
        }
    }

    addToCompare = (item) => {
        console.log("Item Added", item)
        this.setState(prevState => ({
            selectedItems: new Set(prevState.selectedItems).add(item)
        }))
    }

    removeFromCompare = (item) => {
        const selected = new Set(this.state.selectedItems);
        selected.delete(item);
        this.setState({
            selectedItems: selected,
        })
    }

    saveFilters = (selected) => {
        const selectedFilters = new Set(selected);
        this.setState({
            selectedFilters: selectedFilters
        })

    }

    render() {
        return (
            <Container maxWidth="md">
                <SectionHeader title="Select 2 or more products for comparison">
                    {this.state.selectedItems.size > 1 && <AttributeFilter save={this.saveFilters} data={this.props.filters} selected={this.state.selectedFilters} />}
                </SectionHeader>
                <ProductList data={this.props.products} selected={[...this.state.selectedItems]} addToCompare={this.addToCompare} removeFromCompare={this.removeFromCompare} />
                {this.state.selectedItems.size > 1 && <ComparisonTable data={[...this.state.selectedItems]} filters={[...this.state.selectedFilters]} />}
            </Container>
        );
    }
}

export default withSampleData(ProductComparison);

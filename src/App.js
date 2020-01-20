import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
// import {MenuIcon} from '@material-ui/icons'
import logo from './logo.svg';
import ProductList from './components/ProductList'
import ComparisonTable from './components/ComparisonTable'
import AttributeFilter from './components/AttributeFilter'
import { products } from './data/Products'
import { filters } from './data/Filters'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItems: new Set(),
      selectedFilters: new Set(filters)
    }
    this.addToCompare = this.addToCompare.bind(this);
    this.removeFromCompare = this.removeFromCompare.bind(this);
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
        <Box my={5} textAlign="center">
          <Typography variant="h6" component="h3" gutterBottom>
            {/* <MenuIcon/> */}
            Best Buy App
        </Typography>
          {this.state.selectedItems.size > 0 && <AttributeFilter save={this.saveFilters} data={filters} selected={this.state.selectedFilters} />}
        </Box>
        <ProductList data={products} selected={[...this.state.selectedItems]} addToCompare={this.addToCompare} removeFromCompare={this.removeFromCompare} />
        {this.state.selectedItems.size > 0 && <ComparisonTable data={[...this.state.selectedItems]} filters={[...this.state.selectedFilters]} />}
      </Container>
    );
  }
}

export default App;

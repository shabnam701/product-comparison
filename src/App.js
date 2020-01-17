import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
// import {MenuIcon} from '@material-ui/icons'
import logo from './logo.svg';
import ProductList from './components/ProductList'
import { products } from './data/Products'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
    }
  }

  addToCompare = (item) => {
    console.log("Item Added", item)
    const {id:id, ...itemInfo}=item

    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        [id]: itemInfo
      }
    }))
  }

  removeFromCompare = (item)=>{
    const selected = Object.assign({}, this.state.selected);
    const id = item.id;
    delete selected[id];
    this.setState({ selected });
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Box my={5} textAlign="center">
          <Typography variant="h5" component="h1" gutterBottom>
            {/* <MenuIcon/> */}
            Best Buy App
        </Typography>
        </Box>
        <ProductList data={products} selected={this.state.selected} addToCompare={this.addToCompare} removeFromCompare={this.removeFromCompare}/>
      </Container>
    );
  }
}

export default App;

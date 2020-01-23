import React from 'react';
import { products } from '../data/Products'
import { filters } from '../data/Filters'

export default function withSampleData(WrappedComponent) {
    class HOC extends React.Component {
        render() {
            return <WrappedComponent {...this.props} products={products} filters={filters} />
        }
    }
    return HOC;
}

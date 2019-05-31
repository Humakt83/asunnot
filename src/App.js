import React, { Component } from 'react';
import { Input, Container, Label, Button } from 'reactstrap';
import { getAddress } from './api/durationQuery';

import AddressViewer from './AddressViewer';
import ApartmentFrame from './ApartmentFrame';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {search: '', searchCoords: null, apartments: [], apartmentSearch: ''};
    this.changeSearch = this.changeSearch.bind(this);
    this.searchCoords = this.searchCoords.bind(this);
    this.addApartment = this.addApartment.bind(this);
    this.changeApartmentSearch = this.changeApartmentSearch.bind(this);
  }

  changeSearch(event) {
    const search = event.target.value;
    const searchCoords = this.state.searchCoords;
    this.setState({search, searchCoords});
  }

  async searchCoords() {
    const search = this.state.search;
    const addressCoord = await getAddress(search);
    this.setState({search, searchCoords: addressCoord});
  }

  addApartment() {
    const {apartmentSearch, search, searchCoords} = this.state;
    const apartments = this.state.apartments.concat([apartmentSearch]);
    this.setState({apartmentSearch, search, searchCoords, apartments});
  }

  changeApartmentSearch(event) {
    const apartmentSearch = event.target.value;
    const {apartments, search, searchCoords} = this.state;
    this.setState({apartmentSearch, apartments, search, searchCoords});
  }

  render() {

    return (
      <Container fluid>
        <Label>Add apartment site</Label>
        <Input value={this.state.apartmentSearch} onChange={this.changeApartmentSearch} type="text"/>
        <Button onClick={this.addApartment}>Lisää</Button>
        <Label>Search address</Label>
        {this.state.apartments.map((link, index) => {
          return <ApartmentFrame webAddress={link} key={index}/>
        })}
        <Input
          type="text"
          value={this.state.search} 
          onChange={this.changeSearch}/>
        <Button onClick={this.searchCoords}>Hae</Button>
        <AddressViewer addressCoord={this.state.searchCoords}/>
      </Container>
    );
  }
}

export default App;

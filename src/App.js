import React, { Component } from 'react';
import { Input, Container, Label, Button } from 'reactstrap';
import { getAddress } from './api/durationQuery';

import AddressViewer from './AddressViewer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {search: '', searchCoords: null};
    this.changeSearch = this.changeSearch.bind(this);
    this.searchCoords = this.searchCoords.bind(this);
  }

  changeSearch(event) {
    const search = event.target.value;
    const searchCoords = this.state.searchCoords;
    this.setState({search, searchCoords});
  }

  async searchCoords() {
    const search = this.state.search;
    const addressCoord = await getAddress(search);
    console.log(addressCoord);
    this.setState({search, searchCoords: addressCoord});
  }
  render() {

    return (
      <Container fluid>
        <Label>Search address</Label>
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

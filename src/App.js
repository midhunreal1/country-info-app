import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [countryData, setCountryData] = useState(null);
  const [searchCountry, setSearchCountry] = useState('');

  const fetchCountryInfo = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${searchCountry}?fullText=true`
      );
      setCountryData(response.data);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Country Information</h1>
      <Form className="mb-3">
        <Form.Group controlId="searchCountry">
          <Form.Label>Search Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country name"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={fetchCountryInfo}>
          Search
        </Button>
      </Form>
      {countryData && (
           <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
           <div className="col-lg-4">
             <Card>
               <Card.Img variant="top" src={countryData[0].flags.png} alt="Country Flag" />
               <Card.Body>
                 <Card.Title>{countryData[0].name}</Card.Title>
                 <Card.Text>{countryData[0].name} is a country located in {countryData[0].region}.</Card.Text>
                 <Card.Text>Region: {countryData[0].region}</Card.Text>
                 <Card.Text>Capital: {countryData[0].capital}</Card.Text>
                 <Card.Text>Population: {countryData[0].population}</Card.Text>
               </Card.Body>
             </Card>
           </div>
         </div>
      )}
    </Container>
  );
}

export default App;

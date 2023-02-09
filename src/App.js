import React, { useState, useEffect, useRef } from 'react';
import { AddressFinder } from '@ideal-postcodes/address-finder';
import './App.css';
import { Form } from 'react-bootstrap';

function App() {
  const [address, setAddress] = useState({
    line_1: '',
    line_2: '',
    line_3: '',
    post_town: '',
    postcode: '',
  });

  const inputId = 'line_1';
  const shouldRender = useRef(true);

  useEffect(() => {
    if (shouldRender.current) {
      shouldRender.current = false;

      AddressFinder.setup({
        outputFields: {
          line_1: '#line_1',
          line_2: '#line_2',
          line_3: '#line_3',
          post_town: '#post_town',
          postcode: '#postcode',
        },
        apiKey: window.apiKey || 'ak_test',
        injectStyle: true,
        onAddressRetrieved: (result) => {
          setAddress({
            line_1: result.line_1,
            line_2: result.line_2,
            line_3: result.line_3,
            post_town: result.post_town,
            postcode: result.postcode,
          });
          console.log(result);
        },
      });
    }
  }, []);

  return (
    <div className='App'>
      <h1>Ideal Postcodes Address Finder</h1>
      <Form>
        <Form.Group>
          <Form.Label>Line 1</Form.Label>
          <Form.Control
            type='text'
            id={inputId}
            value={address.line_1}
            className='form-control'
            onChange={(e) => setAddress({ ...address, line_1: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Line 2</Form.Label>
          <Form.Control
            type='text'
            id='line_2'
            value={address.line_2}
            className='form-control'
            onChange={(e) => setAddress({ ...address, line_2: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Line 3</Form.Label>
          <Form.Control
            type='text'
            id='line_3'
            value={address.line_3}
            className='form-control'
            onChange={(e) => setAddress({ ...address, line_3: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Post Town</Form.Label>
          <Form.Control
            type='text'
            id='post_town'
            value={address.post_town}
            className='form-control'
            onChange={(e) =>
              setAddress({ ...address, post_town: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type='text'
            id='postcode'
            value={address.postcode}
            className='form-control'
            onChange={(e) =>
              setAddress({ ...address, postcode: e.target.value })
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('Examining the syntax of Jest tests', () => {
   
  it('sums numbers', () => {
      expect(1 + 2).toEqual(3);
      expect(2 + 2).toEqual(4);
   });
  });
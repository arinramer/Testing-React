import React from 'react';
import { render, fireEvent, findByText, act, wait } from '@testing-library/react';
import StarWarsCharacters from './StarWarsCharacters';
import { getData as mockGetData } from '../api';

jest.mock('../api');

const startData = { next: 'ABCD', previous: 'ABCD', results: [{
    name: 'Luke Skywalker'
}]
 }
test('renders character list', async ()=> {
    mockGetData.mockResolvedValueOnce(startData);
    const { getByText } = render(<StarWarsCharacters/>);
    expect(mockGetData).toHaveBeenCalledTimes(1);
    expect(mockGetData).toHaveBeenCalledWith('https://swapi.co/api/people');
    await wait(()=> expect(getByText(/Luke Skywalker/i)));
})

test('renders next and previous button', async ()=> {
    mockGetData.mockResolvedValueOnce(startData);
    const { queryByText } = render(<StarWarsCharacters/>);
    const previousButton = queryByText(/previous/i);
    const nextButton = queryByText(/next/i);
    act(()=> {
        fireEvent.click(previousButton, nextButton);
        expect(findByText(/success/i));
    })
})
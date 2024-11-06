import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import demodata from './demo-data.json'
import App from './App'

describe('renders the expected elements on the page', () => {
  test('displays input field', async () => {
    render(<App />);
    const inputField = screen.getByTestId('input-field');
    expect(inputField).toBeInTheDocument();
  });

  test('displays the correct value for a given key on text input', async () => {
    render(<App />);
    const inputField = screen.getByTestId('input-field');
    const responseField = screen.getByTestId('property-response-field');
    const defaultValue = 'undefined'

    // Boolean response
    fireEvent.change(inputField, { target: { value: 'res.hasError' } })
    expect(responseField).toHaveTextContent(demodata.hasError);

    // Empty field
    fireEvent.change(inputField, { target: { value: '' } })
    expect(responseField).toHaveTextContent(defaultValue);

    // Nested objects properties
    fireEvent.change(inputField, { target: { value: 'res.fields[0].prop' } })
    expect(responseField).toHaveTextContent(demodata.fields[0].prop);

    // Unknown property
    fireEvent.change(inputField, { target: { value: 'res.fields[1].prop' } })
    expect(responseField).toHaveTextContent(defaultValue);
  });

  test('displays the correct value for a given key on click input', async () => {
    render(<App />);
    const inputField = screen.getByTestId('input-field');
    const responseField = screen.getByTestId('property-response-field');
    const dateButton = screen.getByTestId('res.date');
    const fieldsKey = screen.getByTestId('res.fields');
    const fieldId = screen.getByTestId('res.fields[0].id');
    
    // String response
    await fireEvent.click(dateButton)
    
    expect(inputField).toHaveAttribute('value','res.date');
    expect(responseField).toHaveTextContent(demodata.date);

    // Non-clickable field (no change)
    fireEvent.click(fieldsKey)
    expect(inputField).toHaveAttribute('value', 'res.date');
    expect(responseField).toHaveTextContent(demodata.date);

    // Nested objects properties
    fireEvent.click(fieldId)
    expect(inputField).toHaveAttribute('value', 'res.fields[0].id');
    expect(responseField).toHaveTextContent(demodata.fields[0].id);
  });
})

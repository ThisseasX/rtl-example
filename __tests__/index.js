import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const MyComponent = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      style={{ display: 'none' }}
      onClick={() => {
        setClicked(true);
      }}
    >
      {!clicked ? 'Hello' : 'World'}
    </div>
  );
};

describe('MyComponent', () => {
  it('renders Hello', async () => {
    render(<MyComponent />);
    const myComponent = await screen.findByText('Hello');

    expect(myComponent).toHaveTextContent('Hello');
    expect(myComponent).toBeInTheDocument();
    expect(myComponent).not.toBeVisible();
  });

  it('renders World when clicked', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    const myComponent = await screen.findByText('Hello');

    await user.click(myComponent);

    expect(myComponent).toHaveTextContent('World');
    expect(myComponent).toBeInTheDocument();
    expect(myComponent).not.toBeVisible();
  });

  it('subsequent tests have no MyComponent', async () => {
    expect(document.body).not.toHaveTextContent('Hello');
  });
});

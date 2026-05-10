import { render } from '@testing-library/react';

import FedexContext from './context';

describe('FedexContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FedexContext />);
    expect(baseElement).toBeTruthy();
  });
});

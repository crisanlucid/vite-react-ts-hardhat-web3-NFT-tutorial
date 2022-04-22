import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils';
import Loader from './Loader';

describe('Loader Component', () => {
  it('renders <Loader /> component correctly', async () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });
});

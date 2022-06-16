import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders <Footer /> component correctly', async () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId('footer')).toBeInTheDocument();
  });
});

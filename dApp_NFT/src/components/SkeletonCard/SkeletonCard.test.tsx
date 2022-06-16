import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils';
import SkeletonCard from './SkeletonCard';

describe('SkeletonCard Component', () => {
  it('renders <SkeletonCard /> component correctly', async () => {
    //arrange
    const { getAllByRole } = render(<SkeletonCard />);
    //assert
    expect(getAllByRole('listitem')).toHaveLength(3);
  });
});

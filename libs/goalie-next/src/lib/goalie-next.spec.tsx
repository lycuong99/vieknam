import { render } from '@testing-library/react';

import GoalieNext from './goalie-next';

describe('GoalieNext', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<GoalieNext />);
		expect(baseElement).toBeTruthy();
	});
});

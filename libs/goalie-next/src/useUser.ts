import { useContext } from 'react';
import { GoalieContext } from './GoalierProvider';

export function useUser() {
	const ctx = useContext(GoalieContext);
	if (!ctx) {
		throw new Error('useUser must be in GoalieProvider');
	}

	return ctx;
}

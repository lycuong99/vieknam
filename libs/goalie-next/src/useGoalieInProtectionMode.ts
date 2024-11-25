import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GoalieUser } from './types';
import { clearAllGoalieTokens, isSessionExpired, isSessionStillAlive } from './lib/util';

const signInPage = '/sign-in';
const authPage = [signInPage, '/sign-up'];

export default function useGoalieInProtectionMode({ user }: { user: GoalieUser | null }) {
	const pathname = usePathname();
	const { push } = useRouter();

	function onAuth() {
		// console.log('useGoalieInProtectionMode', pathname);
		const isInSideAuthPage = authPage.includes(pathname);

		if (isSessionExpired() && !isInSideAuthPage) {
			console.log('session expired');
			clearAllGoalieTokens();

			// return push(signInPage);
		}

		if (isSessionStillAlive() && isInSideAuthPage) {
			// return push('/organization');
		}
	}

	useEffect(() => {
		user && onAuth();
	}, [pathname, user]);
}

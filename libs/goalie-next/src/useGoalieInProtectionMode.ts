import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GoalieUser } from '../types';
import { clearAllGoalieTokens, getDecodedGoalieRefreshToken } from './util';

const signInPage = '/sign-in';
const publicsPages = [signInPage, '/sign-up'];

export default function useGoalieInProtectionMode({ user }: { user: GoalieUser | null }) {
	const pathname = usePathname();
	const { push } = useRouter();

	useEffect(
		function onAuth() {
			if (publicsPages.includes(pathname)) return;

            if (!user) {
				push(signInPage);
                return;
			}

            const decoded = getDecodedGoalieRefreshToken();
            if(decoded.exp < Date.now() / 1000 + 5) {
                clearAllGoalieTokens();
                push(signInPage);
            }
		},
		[pathname, user, push]
	);
}

import '@shadcn-in-nx/styles/global.css';
import './global.css';
import RootLayoutComp from '../layouts/RootLayoutComp';
import { GoalieProvider } from '@goalie/next';

export const metadata = {
	title: 'Welcome to ui-app',
	description: 'Generated by create-nx-workspace'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<GoalieProvider>
					<RootLayoutComp>{children}</RootLayoutComp>
				</GoalieProvider>
			</body>
		</html> 
	);
}

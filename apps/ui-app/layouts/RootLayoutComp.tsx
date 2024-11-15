'use client';
import { Toaster } from '@shared/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();
export default function RootLayoutComp({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex">
			<QueryClientProvider client={client}>
				<Toaster richColors />
				{children}
			</QueryClientProvider>
		</div>
	);
}

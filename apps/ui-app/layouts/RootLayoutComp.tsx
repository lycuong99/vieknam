'use client';
import { Toaster } from '@shared/ui';
export default function RootLayoutComp({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex">
			<Toaster richColors />
			{children}
		</div>
	);
}

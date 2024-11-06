'use client';

export default function RootLayoutComp({ children }: { children: React.ReactNode }) {
	return <div className="min-h-screen flex">{children}</div>;
}

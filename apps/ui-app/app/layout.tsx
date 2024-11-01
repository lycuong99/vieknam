import '@shadcn-in-nx/styles/global.css';
import './global.css';

export const metadata = {
  title: 'Welcome to ui-app',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

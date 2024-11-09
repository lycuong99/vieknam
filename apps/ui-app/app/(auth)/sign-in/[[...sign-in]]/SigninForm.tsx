'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUserSchema } from '@shared/validation';
import { z } from 'zod';
import { Button, Form, PasswordTextfield, Textfield } from '@shared/ui';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import Logo from 'apps/ui-app/components/Logo';
import { signIn } from '@goalie/next';

export default function SigninForm() {
	const { push } = useRouter();
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof loginUserSchema>>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	async function onSubmit(data: z.infer<typeof loginUserSchema>) {
		setLoading(true);
		const { email, password } = data;
		try {
			const res = await signIn(email, password);
			push('/');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 400) {
					toast.error(error.response.data.message);
				}
			} else {
				toast.error('Something went wrong');
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="h-screen w-screen  flex items-center justify-center">
			<div className="flex rounded-md border-2 border-indigo-300 shadow-2xl shadow-indigo-200">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className={` bg-white p-8 w-[350px] sm:w-[400px] rounded-md`}>
						<div className="flex gap-2 items-center">
							<Logo />
							<h2 className="text-xl sm:text-2xl font-bold">Welcome to ViekNam</h2>
						</div>
						<p className="text-gray-400 text-sm mt-3">Enter your email and password to access to your worksppace.</p>
						<div className="mt-6 flex flex-col gap-4">
							<Textfield name="email" label="Email" placeholder="name@example.com" />

							<PasswordTextfield name="password" label="Password" />

							<Button className="mt-2" loading={loading}>
								Sign in
							</Button>
						</div>

						<div className="mt-6 text-center text-gray-400 text-sm">
							Don not have any account ?{' '}
							<Link className="text-indigo-600 hover:underline" href={'/sign-up'}>
								Register
							</Link>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}

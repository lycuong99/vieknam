'use client';

import { cn } from '@shadcn-in-nx/utils';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpUserSchema } from '@shared/validation';
import { z } from 'zod';
import { Button, Form, PasswordTextfield, Textfield } from '@shared/ui';
import Logo from 'apps/ui-app/components/Logo';
import { toast } from 'sonner';
import axios from 'axios';
import { signUp } from '@goalie/next';

export default function SignupForm() {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const form = useForm<z.infer<typeof signUpUserSchema>>({
		resolver: zodResolver(signUpUserSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	async function onSubmit(data: z.infer<typeof signUpUserSchema>) {
		setLoading(true);
		try {
			const res = await signUp(data);

			setSuccess(true);
			console.log(res);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 400) {
					toast.error(error.response.data.message);
				}
			} else {
				toast.error('Something went wrong');
			}
		}
		setLoading(false);
	}

	return (
		<div className="h-screen w-screen  flex items-center justify-center">
			<div className="flex rounded-md border-2 border-indigo-300 shadow-2xl shadow-indigo-200">
				<div className={cn('w-[350px] sm:w-[400px] text-center p-8 rounded-md bg-white', !success && 'hidden')}>
					<img src="/email.svg" className="m-auto pb-6 w-[200px]" />
					<h2 className="text-xl sm:text-2xl font-bold mt-3">Successfully Registration</h2>
					<p className="text-gray-400 text-sm mt-3">
						We have sent an activation link to your email to continue with the registration process
					</p>
					<p className="mt-4">
						<Link className="text-sm text-indigo-600 hover:underline" href={'/sign-in'}>
							Back to Login
						</Link>
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className={`${success ? 'hidden' : ''} bg-white p-8 w-[350px] sm:w-[400px] rounded-md`}>
						<div className="flex gap-2 items-center">
							<Logo />
							<h2 className="text-xl sm:text-2xl font-bold">Sign up to ViekNam</h2>
						</div>
						<p className="text-gray-400 text-sm mt-3">
							Our registration process is quick and easy, taking no more than 10 minutes to complete.
						</p>
						<div className="mt-6 flex flex-col gap-4">
							<Textfield name="name" label="Full name" placeholder="Name" />

							<Textfield name="email" type="email" label="Email" placeholder="name@example.com" />

							<PasswordTextfield name="password" label="Password" />
							<PasswordTextfield name="confirmPassword" label="Confirm Password" />

							<Button className="mt-2" loading={loading}>
								Create Account
							</Button>
						</div>

						<div className="mt-6 text-center text-gray-400 text-sm">
							Have a account ?{' '}
							<Link className="text-indigo-600 hover:underline" href={'/sign-in'}>
								Login
							</Link>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}

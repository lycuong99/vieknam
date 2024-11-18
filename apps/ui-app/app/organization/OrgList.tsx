'use client';
import { Organization } from '@prisma/client';
import { getOrg, useQueryOrganization } from 'apps/ui-app/services/organization';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const OrgList = () => {
	const { push } = useRouter();

	const { data, isLoading, isSuccess } = useQueryOrganization({
		queryConfig: { select: data => data.data }
	});
	console.log(data);
	const orgs = data?.data as Organization[];

	if (isSuccess && orgs.length === 0) {
		push('/organization/create');
	}

	return (
		<div className="w-screen h-screen bg-white">
			<div className="w-full h-[200px] bg-indigo-500"></div>
			<div className="w-[900px] m-auto -mt-[140px]">
				<h2 className="font-bold text-2xl text-white">Your organizations</h2>
				<p className="text-indigo-200 text-sm mt-2">
					Select one for work. Next time, we will redirect you to the last selected organization.
				</p>

				<div className="grid grid-cols-3 gap-4 mt-6">
					<Link href={`/organization/create`}>
						<div className="box flex h-[100px] gap-3 items-center justify-center cursor-pointer hover:border-indigo-300 text-indigo-800 bg-white rounded shadow">
							<Plus className="w-5 h-5 -ml-4" />
							<h2 className="text-base font-medium">Create organization</h2>
						</div>
					</Link>
					{isLoading && (
						<>
							{Array(5)
								.fill(1)
								.map((_, i) => {
									return (
										<div
											key={i}
											className="box flex h-[100px] gap-3 items-center cursor-pointer animate-pulse bg-gray-100 rounded shadow p-4">
											<div className="w-10 h-10 bg-gray-200 rounded-md"></div>
											<div className="h-6 bg-gray-200 rounded w-1/2"></div>
										</div>
									);
								})}
						</>
					)}
					{orgs?.map(org => {
						return (
							<Link key={org.id} href={`/${org.id}`}>
								<div className="box flex h-[100px] gap-3 items-center cursor-pointer hover:border-indigo-300 text-indigo-800 bg-white rounded shadow p-4">
									<img
										className="w-10 h-10 rounded-md"
										src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Vanamo_Logo.png/600px-Vanamo_Logo.png?20120915115534"
									/>
									<h2>{org.name}</h2>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

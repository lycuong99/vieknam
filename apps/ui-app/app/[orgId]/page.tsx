export default function Page({ params }: { params: { orgId: string } }) {
	return <div>Page detail {params.orgId}</div>;
}

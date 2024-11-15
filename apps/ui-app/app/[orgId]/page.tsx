import IconPicker from "apps/ui-app/components/IconPicker";

export default function Page({ params }: { params: { orgId: string } }) {
	return <div>Page detail {params.orgId}
	<IconPicker />
	</div>;
}

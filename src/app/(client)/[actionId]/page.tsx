import { Copy, Title } from "@/components/copy";
import { PatientsOpeningsView } from "@/components/patient-match-view";
import { getActionCallable } from "@/lib/callables/action";

export const fetchCache = "force-no-store";

type PageProps = {
  params: Promise<{ actionId: string }>;
};

export default async function Page({ params }: PageProps) {
  const actionId = (await params).actionId;
  const response = await getActionCallable({ actionId: actionId });

  if (response.data.action === null) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Title>Invalid or Expired Link</Title>
        <Copy>The link provider is either incorrect or expired.</Copy>
      </div>
    );
  }

  return <PatientsOpeningsView actionId={actionId} action={response.data.action} />;
}

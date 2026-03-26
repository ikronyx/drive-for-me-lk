import DriverAssignmentsClient from "./DriverAssignmentsClient";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <DriverAssignmentsClient token={token} />;
}

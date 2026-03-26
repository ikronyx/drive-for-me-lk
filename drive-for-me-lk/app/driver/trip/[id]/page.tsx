import TripTrackerClient from "./TripTrackerClient";

export default async function Page({ params, searchParams }: any) {
  return (
    <TripTrackerClient
      bookingId={Number((await params).id)}
      token={(await searchParams).token}
    />
  );
}

export default function Page({ params }: { params: { DataDaoID: string } }) {
  // params.profileId = "hey";
  return <div>My Post: {params.DataDaoID}</div>;
}

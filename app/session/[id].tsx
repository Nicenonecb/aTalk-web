export default function Sessions({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Session {params.id}</h1>
    </div>
  );
}
import { trpc } from "../_trpc/trpcRsc";

export default async function Events() {
  const events = await trpc.getEvents();

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>{event.title}</li>
      ))}
    </ul>
  );
}

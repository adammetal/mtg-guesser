import { db } from "@/database";
import { procedure, router } from "../trpc";

const getEvents = procedure.query(() => db.query.events.findMany());

export default router({
  getEvents,
});

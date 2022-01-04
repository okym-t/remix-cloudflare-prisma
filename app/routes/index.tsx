import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { db } from "~/utils/db.server";
import type { users } from "@prisma/client";

type LoaderData = { users: users[] };
export let loader: LoaderFunction = async () => {
  const data = {
    users: await db.users.findMany(),
  };
  return data;
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}

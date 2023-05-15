import getQueryClient from "@sastodaju/utils/getQueryClient";
import ListUsers, { User } from "../sample/page";
import Hydrate from "@sastodaju/utils/hydrate.client";
import { dehydrate } from "@tanstack/react-query";


async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
}

export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-users"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}

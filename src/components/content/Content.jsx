import React from "react";
import { useQuery } from "react-query";
import fetchData from "./FetchAPI";

export const Content = () => {
  // then using the hook
  const { data, error, isLoading, isError } = useQuery("users", fetchData);

  // SHOW OFF!!!!
  if (isError) {
    return <div>{error.message}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Users:</h1>
        {data.data.map((users, id) => {
          return (
            <article key={id}>
              <h4>{users.name}</h4>
              <a href="https://google.com">{users.email}</a>
            </article>
          );
        })}
      </div>
    );
  }
};

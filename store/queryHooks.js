import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const username = Cookies.get("username");

const queryFetcher = async url => {
  const accessToken = Cookies.get("access");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useCustomQuery = (queryKey, url, id) => {
  const { isPending, data, error, refetch } = useQuery({
    queryKey: [`${queryKey}`],
    queryFn: () =>
      queryFetcher(
        `${process.env.NEXT_PUBLIC_HOST_API}${url}/${id}${id ? "/" : ""}`
      ),
  });
  return { isPending, data, error, refetch };
};

export const useCustomMutation = (url, key) => {
  const accessToken = Cookies.get("access");
  if (url !== "/authentication/v1/login/") {
    return useMutation({
      mutationFn: body =>
        fetch(`${process.env.NEXT_PUBLIC_HOST_API}${url}`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${accessToken}`,
          },
        }).then(res => res.json()),
      onSuccess: data => {
        console.log("success", data);
      },
    });
  } else {
    return useMutation({
      mutationFn: body =>
        fetch(`${process.env.NEXT_PUBLIC_HOST_API}${url}`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => res.json()),
      onSuccess: data => {
        console.log("success", data);
      },
    });
  }
};

export const useCustomMutationPut = (url, key, id) => {
  const accessToken = Cookies.get("access");
  return useMutation({
    mutationFn: body =>
      fetch(`${process.env.NEXT_PUBLIC_HOST_API}${url}/${id}/`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(res => res.json()),
    onSuccess: data => {
      console.log("success", data);
    },
  });
};

export const useCustomMutationDelete = (url, key, id) => {
  const accessToken = Cookies.get("access");
  return useMutation({
    mutationFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_HOST_API}${url}/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(),
    onSuccess: data => {
      console.log("success", data);
    },
  });
};

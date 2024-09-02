import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import { use } from "react";

const navigate = redirect;

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

////////////////////////////// Http GET Requests //////////////////////////////

export const useCustomQuery = (queryKey, url, id) => {
  if (id === "?page_size=100") {
    const { isPending, data, error, refetch } = useQuery({
      queryKey: [`${queryKey}`],
      queryFn: () =>
        queryFetcher(`${process.env.NEXT_PUBLIC_HOST_API}${url}/${id}`),
    });
    return { isPending, data, error, refetch };
  } else {
    const { isPending, data, error, refetch } = useQuery({
      queryKey: [`${queryKey}`],
      queryFn: () =>
        queryFetcher(
          `${process.env.NEXT_PUBLIC_HOST_API}${url}/${id}${id ? "/" : ""}`
        ),
    });
    return { isPending, data, error, refetch };
  }
  // const { isPending, data, error, refetch } = useQuery({
  //   queryKey: [`${queryKey}`],
  //   queryFn: () =>
  //     queryFetcher(
  //       `${process.env.NEXT_PUBLIC_HOST_API}${url}/${id}${id ? "/" : ""}`
  //     ),
  // });
  // return { isPending, data, error, refetch };
};

////////////////////////////// Http POST Requests //////////////////////////////

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
      onSuccess: async data => {
        console.log("success", data);
        if (data.access) {
          Cookies.set("access", data.access);
          Cookies.set("refresh", data.refresh);
          try {
            redirect("/restaurant-list");
          } catch (e) {
            console.log(e);
          }
        } else {
          alert("Invalid Credentials or User does not exist");
          window.location.reload();
        }
      },
    });
  }
};

////////////////////////////// Http PUT Requests //////////////////////////////

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

////////////////////////////// Http DELETE Requests //////////////////////////////

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

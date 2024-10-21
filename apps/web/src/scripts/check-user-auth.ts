"use client";

import { UserProfile } from "@/types/user";

export function searchLocalStorage(): {
  authorization: string;
  userId: string;
} {
  const authorization: string = localStorage.getItem("authorization") as string;
  const userId: string = localStorage.getItem("user-Id") as string;
  return { authorization, userId };
}

export function getImageFromLocalStorage() {
  const imageAddress: string = localStorage.getItem("userPhoto") as string;
  return imageAddress;
}

export function getVerifiedFromLocalStorage() {
  const verified: boolean =
    localStorage.getItem("userVerified") === "true" ? true : false;
  return verified;
}

export function setVerifiedInLocalStorage(verified: boolean) {
  try {
    localStorage.setItem("userVerified", verified.toString());
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function storeValues(user: UserProfile, userVerified: boolean): Boolean {
  try {
    localStorage.setItem("authorization", user.token);
    localStorage.setItem("user-Id", user.id.toString());
    localStorage.setItem("userName", user.userName);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userVerified", userVerified.toString());
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function checkValues(): boolean {
  const { authorization, userId } = searchLocalStorage();
  return !!authorization && !!userId;
}

export function deletedValues(): boolean {
  localStorage.removeItem("authorization");
  localStorage.removeItem("user-Id");
  localStorage.removeItem("userPhoto");
  localStorage.removeItem("userVerified");
  localStorage.removeItem("email");
  if (!checkValues()) {
    return false;
  } else {
    return true;
  }
}

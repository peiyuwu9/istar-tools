import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp) {
  // example: 3/9/2024, 7:14:54 PM
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(timestamp);
}

export function getPaginationPages(page, totalPage) {
  let paginationPage = [];

  if (totalPage < 5) {
    for (let i = 1; i <= totalPage; i++) {
      paginationPage.push(i);
    }
  } else {
    for (let i = -2; i <= 2; i++) {
      paginationPage.push(page);
    }
  }

  return paginationPage;
}

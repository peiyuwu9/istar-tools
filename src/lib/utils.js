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

export function getPaginationPages(currentPage, totalPage) {
  let paginationPage = [];

  if (totalPage <= 5) {
    for (let i = 1; i <= totalPage; i++) {
      paginationPage.push(i);
    }
  } else if (currentPage < 3) {
    for (let i = 1; i <= 5; i++) {
      paginationPage.push(i);
    }
  } else if (currentPage > totalPage - 2) {
    for (let i = totalPage - 4; i <= totalPage; i++) {
      paginationPage.push(i);
    }
  } else {
    for (let i = -2; i <= 2; i++) {
      paginationPage.push(currentPage + i);
    }
  }

  return paginationPage;
}

export function calculateRowCount(contentSize) {
  // shadcn data table row height is 60px
  return contentSize?.height
    ? Math.floor(contentSize.height / 60) > 3
      ? Math.floor(contentSize.height / 60) - 3
      : 1
    : 0;
}

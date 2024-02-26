import http from "k6/http";
import { sleep } from "k6";
import users from "./users_1k.js";

export const options = {
  vus: 100,
  duration: "30s",
};

export default function () {
  http.post("http://localhost:3000", JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
  sleep(1);
}

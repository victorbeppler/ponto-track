import axios from "axios";

const ApiBack = axios.create({
  baseURL: "https://apitrack.victorbeppler.dev",
});

export default ApiBack;

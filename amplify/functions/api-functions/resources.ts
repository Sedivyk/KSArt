import { defineFunction } from "@aws-amplify/backend";

export const myApiFunction = defineFunction({
  name: "api-functions",
});

export const ksSendEventFunction = defineFunction({
  name: "ks-send-event-function",
});

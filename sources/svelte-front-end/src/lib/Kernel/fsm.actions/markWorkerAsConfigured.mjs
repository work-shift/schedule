import { assign } from "xstate";

export const markWorkerAsConfigured = assign({
  workers: (context, event) => ({
    [event.payload.name]: Object.assign(
      {},
      context.workers[event.payload.name],
      {
        isConfigured: true,
      },
    )
  }),
});
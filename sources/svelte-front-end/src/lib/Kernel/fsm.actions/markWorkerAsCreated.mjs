import { assign } from "xstate";

export const markWorkerAsCreated = assign({
  workers: (context, event) => ({
    [event.payload.name]: Object.assign(
      {},
      context.workers[event.payload.name],
      {
        isCreated: true,
      },
    )
  }),
});
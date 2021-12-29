import { assign } from "xstate";

export const markWorkerAsStarted = assign({
  workers: (context, event) => ({
    [event.payload.name]: Object.assign(
      {},
      context.workers[event.payload.name],
      {
        isStarted: true,
      },
    )
  }),
});
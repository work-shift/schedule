import {
  ProtocolEventNames,
} from '$lib/constants/ProtocolEventNames.mjs';

export const startWorkers = async (context = null, event = null) => {
  console.log('services.startWorkers', context, event);

  for (const [, workerObject] of Object.entries(context.workers)) {
    const message = {
      type: ProtocolEventNames.WORKER_START_REQ,
      payload: null,
    };

    console.log(`sending "${message.type}" to channel "${workerObject.channel.name}" w/`, message.payload);

    workerObject.channel.postMessage(message);
  }
}
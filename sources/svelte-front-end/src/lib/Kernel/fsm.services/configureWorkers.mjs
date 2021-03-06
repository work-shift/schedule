import {
  ProtocolEventNames,
} from '$lib/constants/ProtocolEventNames.mjs';

export const configureWorkers = async (context = null, event = null) => {
  console.log('services.configureWorkers', context, event);

  for (const [, workerObject] of Object.entries(context.workers)) {
    const message = {
      type: ProtocolEventNames.WORKER_SET_CONFIG_REQ,
      payload: workerObject.config,
    };

    console.log(`sending "${message.type}" to channel "${workerObject.channel.name}" w/`, message.payload);

    workerObject.channel.postMessage(message);
  }
}
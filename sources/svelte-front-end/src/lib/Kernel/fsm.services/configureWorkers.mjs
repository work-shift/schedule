import {
  ProtocolEventNames,
} from '$lib/constants/ProtocolEventNames.mjs';

export const configureWorkers = async (context = null, event = null) => {
  console.log('services.configureWorkers', context, event);

  for (const [, workerObject] of Object.entries(context.workers)) {
    workerObject.channel.postMessage({
      type: ProtocolEventNames.CONFIGURATION_REQ,
    });
  }
}
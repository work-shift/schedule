export const createWorkers = (handleWorkerMessage = null) => async (context = null, event = null) => {
  if (handleWorkerMessage === null) {
    throw new ReferenceError('handleWorkerMessage is undefined');
  }

  console.log('services.createWorkers', context, event);

  for (const [workerName, workerObject] of Object.entries(context.workers)) {
    workerObject.channel = new BroadcastChannel(workerObject.channelName);
    workerObject.channel.addEventListener('message', handleWorkerMessage);
    workerObject.worker = new workerObject.workerClass();

    console.log(`[worker] ${workerName} created`);
  }

  return true;
}

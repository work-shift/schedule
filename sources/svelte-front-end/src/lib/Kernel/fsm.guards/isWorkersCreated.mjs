export const isWorkersCreated = (context = null, event = null, condMeta = null) => {
  console.log('guards.isWorkersCreated', context, event, condMeta);

  for (const [, workerObject] of Object.entries(context.workers)) {
    if (workerObject.worker === null) {
      return false;
    }
  }

  return true;
}

export const isWorkersCreated = (context = null) => {
  for (const [, workerObject] of Object.entries(context.workers)) {
    if (workerObject.isCreated === false) {
      return false;
    }
  }

  console.log('guards.isWorkersCreated: yes');

  return true;
}

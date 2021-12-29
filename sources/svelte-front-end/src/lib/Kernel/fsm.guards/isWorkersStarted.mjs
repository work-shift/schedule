export const isWorkersStarted = (context = null) => {
  for (const [, workerObject] of Object.entries(context.workers)) {
    if (workerObject.isStarted === false) {
      return false;
    }
  }

  console.log('guards.isWorkersStarted: yes');

  return true;
}

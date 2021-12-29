export const isWorkersConfigured = (context = null) => {
  for (const [, workerObject] of Object.entries(context.workers)) {
    if (workerObject.isConfigured === false) {

      return false;
    }
  }

  console.log('guards.isWorkersConfigured: yes');

  return true;
}

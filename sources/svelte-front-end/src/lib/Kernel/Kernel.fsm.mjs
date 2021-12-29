import {
  createMachine,
  interpret,
} from 'xstate';
import {
  ProtocolEventNames,
} from '$lib/constants/ProtocolEventNames.mjs';

const KernelMachine = createMachine({
  id: 'KernelMachine',
  initial: 'initial',
  states: {
    initial: {
      always: [
        {
          target: 'createWorkers',
        }
      ],
    },
    createWorkers: {
      always: [
        {
          target: 'configureWorkers',
          cond: 'isWorkersCreated',
        }
      ],
      invoke: {
        id: 'createWorkers',
        src: 'createWorkers',
        onError: {
          target: 'errorCreatingWorkers',
        }
      },
      on: {
        [ProtocolEventNames.WORKER_CREATED]: {
          actions: [
            'markWorkerAsCreated',
          ],
        },
      },
    },
    configureWorkers: {
      always: [
        {
          target: 'startWorkers',
          cond: 'isWorkersConfigured',
        }
      ],
      invoke: {
        id: 'configureWorkers',
        src: 'configureWorkers',
        onError: {
          target: 'errorConfigureWorkers',
        },
      },
      on: {
        [ProtocolEventNames.WORKER_SET_CONFIG_RES]: {
          actions: [
            'markWorkerAsConfigured',
          ],
        },
      },
    },
    startWorkers: {
      always: [
        {
          target: 'run',
          cond: 'isWorkersStarted',
        }
      ],
      invoke: {
        id: 'startWorkers',
        src: 'startWorkers',
        onError: {
          target: 'errorStartWorkers',
        },
      },
      on: {
        [ProtocolEventNames.WORKER_START_RES]: {
          actions: [
            'markWorkerAsStarted',
          ],
        },
      },
    },
    run: {
      invoke: {
        id: 'reportKernelReady',
        src: 'reportKernelReady',
      },
    },
    doneOK: {
      type: 'final',
    },
    errorStartWorkers: {
      type: 'final',
    },
    errorConfigureWorkers: {
      type: 'final',
    },
    errorCreatingWorkers: {
      type: 'final',
    },
    error: {
      type: 'final',
    },
    done: {
      type: 'final',
    },
  },
});

export const createKernelService = (config = {}, context = {}) => interpret(KernelMachine.withConfig(config).withContext(context))
  .onTransition((state) => {
     console.debug('KernelMachine.onTransition', state);
  })
  .onChange((state) => {
    console.debug('KernelMachine.onChange', state);
  })
  .onDone((doneEvent = null) => {
    console.debug('KernelMachine.onDone', doneEvent);
  })
  .onEvent((event = null) => {
    console.debug('KernelMachine.onEvent', event);
  })
  .onSend((sendEvent = null) => {
    console.debug('KernelMachine.onSend', sendEvent);
  })
  .onStop((stopEvent = null) => {
    console.debug('KernelMachine.onStop', stopEvent);
  });

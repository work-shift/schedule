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
          target: 'startWorkers',
          cond: 'isWorkersCreated',
        },
        {
          target: 'createWorkers',
        }
      ],
    },
    createWorkers: {
      invoke: {
        id: 'createWorkers',
        src: 'createWorkers',
        // onDone: {
        //   target: 'configureWorkers',
        // },
        onError: {
          target: 'error',
        }
      },
      on: {
        [ProtocolEventNames.WORKER_CTOR]: {
          actions: [
            'markWorkerAsStarted',
          ],
        },
      },
    },
    configureWorkers: {
      invoke: {
        id: 'configureWorkers',
        src: 'configureWorkers',
        onDone: {
          target: 'startWorkers',
        },
        onError: {
          target: 'error',
        },
      },
    },
    startWorkers: {
      entry: [
        () => {
          console.log('startWorkers');
        },
      ],
    },
    error: {
      type: 'final',
    },
  },
});

export const KernelService = (config = {}, context = {}) => interpret(KernelMachine.withConfig(config).withContext(context))
  .onTransition((state) => {
     console.debug('KernelService.onTransition', state);
  })
  .onChange((state) => {
    console.debug('KernelService.onChange', state);
  })
  .onDone((doneEvent = null) => {
    console.debug('KernelService.onDone', doneEvent);
  })
  .onEvent((event = null) => {
    console.debug('KernelService.onEvent', event);
  })
  .onSend((sendEvent = null) => {
    console.debug('KernelService.onSend', sendEvent);
  })
  .onStop((stopEvent = null) => {
    console.debug('KernelService.onStop', stopEvent);
  });

import {
  createMachine,
  interpret,
} from 'xstate';
import {
  ProtocolEventNames,
} from '$lib/constants/ProtocolEventNames.mjs';

const CommunicatorMachine = createMachine({
  id: 'CommunicatorMachine',
  initial: 'initial',
  states: {
    initial: {
      on: {
        [ProtocolEventNames.WORKER_SET_CONFIG_REQ]: {
          
        },
      },
    },
    createClient: {
      always: [
        {
          target: 'startClient',
          cond: 'isClientCreated',
        }
      ],
      invoke: {
        id: 'createClient',
        src: 'createClient',
        onError: {
          target: 'createClientError',
        },
      },
    },
    createClientError: {
      type: 'final',
    },
    startClient: {
      type: 'final',
    },
  },
});

export const createCommunicatorService = (config = {}, context = {}) => interpret(CommunicatorMachine.withConfig(config).withContext(context))
  .onTransition((state) => {
    console.debug('CommunicatorMachine.onTransition', state);
  })
  .onChange((state) => {
    console.debug('CommunicatorMachine.onChange', state);
  })
  .onDone((doneEvent = null) => {
    console.debug('CommunicatorMachine.onDone', doneEvent);
  })
  .onEvent((event = null) => {
    console.debug('CommunicatorMachine.onEvent', event);
  })
  .onSend((sendEvent = null) => {
    console.debug('CommunicatorMachine.onSend', sendEvent);
  })
  .onStop((stopEvent = null) => {
    console.debug('CommunicatorMachine.onStop', stopEvent);
  });

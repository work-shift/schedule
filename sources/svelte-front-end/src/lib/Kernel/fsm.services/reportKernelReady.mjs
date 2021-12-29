import {
  ChannelNames,
} from '$lib/constants/ChannelNames.mjs';
import {
  ProtocolEventNames,
} from '$lib/constants/ProtocolEventNames.mjs';

const kernelChannel = new BroadcastChannel(ChannelNames.KERNEL);

export const reportKernelReady = () => {
  kernelChannel.postMessage({
    type: ProtocolEventNames.KERNEL_READY,
    payload: null,
  });

  console.log('kernel ready');
};
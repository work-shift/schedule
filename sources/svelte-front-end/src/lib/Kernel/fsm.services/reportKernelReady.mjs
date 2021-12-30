import {
  ChannelNames,
} from '$lib/constants/ChannelNames.mjs';
import {
  ProtocolEventNames,
} from '$lib/constants/ProtocolEventNames.mjs';

export const reportKernelReady = () => {
  let kernelChannel = new BroadcastChannel(ChannelNames.KERNEL);

  kernelChannel.postMessage({
    type: ProtocolEventNames.KERNEL_READY,
    payload: null,
  });

  kernelChannel.close();

  console.log('kernel ready');
};

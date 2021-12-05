// automatically generated by the FlatBuffers compiler, do not modify

import { PublicKeyCredentialCreationOptions } from '../schedule/public-key-credential-creation-options';
import { RegistrationRequest } from '../schedule/registration-request';


export enum Payload{
  NONE = 0,
  PublicKeyCredentialCreationOptions = 1,
  RegistrationRequest = 2
}

export function unionToPayload(
  type: Payload,
  accessor: (obj:PublicKeyCredentialCreationOptions|RegistrationRequest) => PublicKeyCredentialCreationOptions|RegistrationRequest|null
): PublicKeyCredentialCreationOptions|RegistrationRequest|null {
  switch(Payload[type]) {
    case 'NONE': return null; 
    case 'PublicKeyCredentialCreationOptions': return accessor(new PublicKeyCredentialCreationOptions())! as PublicKeyCredentialCreationOptions;
    case 'RegistrationRequest': return accessor(new RegistrationRequest())! as RegistrationRequest;
    default: return null;
  }
}

export function unionListToPayload(
  type: Payload, 
  accessor: (index: number, obj:PublicKeyCredentialCreationOptions|RegistrationRequest) => PublicKeyCredentialCreationOptions|RegistrationRequest|null, 
  index: number
): PublicKeyCredentialCreationOptions|RegistrationRequest|null {
  switch(Payload[type]) {
    case 'NONE': return null; 
    case 'PublicKeyCredentialCreationOptions': return accessor(index, new PublicKeyCredentialCreationOptions())! as PublicKeyCredentialCreationOptions;
    case 'RegistrationRequest': return accessor(index, new RegistrationRequest())! as RegistrationRequest;
    default: return null;
  }
}

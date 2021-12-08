import { PublicKeyCredentialCreationOptions } from '../schedule/public-key-credential-creation-options';
import { RegistrationRequest } from '../schedule/registration-request';
export declare enum Payload {
    NONE = 0,
    PublicKeyCredentialCreationOptions = 1,
    RegistrationRequest = 2
}
export declare function unionToPayload(type: Payload, accessor: (obj: PublicKeyCredentialCreationOptions | RegistrationRequest) => PublicKeyCredentialCreationOptions | RegistrationRequest | null): PublicKeyCredentialCreationOptions | RegistrationRequest | null;
export declare function unionListToPayload(type: Payload, accessor: (index: number, obj: PublicKeyCredentialCreationOptions | RegistrationRequest) => PublicKeyCredentialCreationOptions | RegistrationRequest | null, index: number): PublicKeyCredentialCreationOptions | RegistrationRequest | null;

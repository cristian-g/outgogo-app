//import { User } from './user';

export class Vehicle {
    id: string;
    subject: string;
    content: string;
    encryptedContent: string;
    signature: string;
    signedDestinationEmail: string;
    invalidSignature: boolean;
    //owner: User;
    datetimeToSend: string;
    formattedDatetimeToSend: string;
    role: string;
    editable: boolean;
    editableTime: string;
    editableUnits: string;
    disposable: boolean;
    encryptedKPlatform: string;
    encryptedKOwner: string;
    encryptedKDestination: string;
    pendingEncryptionForDestination: boolean;
    creationDate: Date;
    lastEditDate: Date;
}

import { AnyDeposition } from './../../helpers/deposition-types';
declare type RecordType = 'collection' | 'deposition';
export declare const deposition_show_details: (token: string, sandbox: boolean, id: string, expected_type: RecordType, verbose?: boolean) => Promise<AnyDeposition>;
export {};

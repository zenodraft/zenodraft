import { DepositionsResponse } from './zenodo-response-types';
export declare const get_deposition_details: (sandbox: boolean, id: string, verbose?: boolean) => Promise<DepositionsResponse>;

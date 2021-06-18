import { DepositionsResponse } from '../../helpers/zenodo-response-types';
export declare const deposition_show_details: (sandbox: boolean, id: string, verbose?: boolean) => Promise<DepositionsResponse>;

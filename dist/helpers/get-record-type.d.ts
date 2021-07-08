declare type RecordType = 'collection' | 'deposition';
export declare const helpers_get_record_type: (token: string, sandbox: boolean, id: string, verbose?: boolean) => Promise<RecordType>;
export {};

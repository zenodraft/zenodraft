declare const _default: {
    cli: () => import("commander").Command;
    deposition_create_in_existing_collection: (sandbox: boolean, collection_id: string, verbose?: boolean) => Promise<string>;
    deposition_create_in_new_collection: (sandbox: boolean, verbose?: boolean) => Promise<string>;
    deposition_delete: (sandbox: boolean, id: string, verbose?: boolean) => Promise<void>;
    deposition_publish: (sandbox: boolean, id: string, verbose?: boolean) => Promise<void>;
    deposition_show_details: (sandbox: boolean, id: string, verbose?: boolean) => Promise<import("./helpers/zenodo-response-types").DepositionsResponse>;
    deposition_show_latest: (sandbox: boolean, collection_id: string, verbose?: boolean) => Promise<string>;
    deposition_show_prereserved: (sandbox: boolean, latest_id: string, verbose?: boolean) => Promise<string>;
    file_add: (sandbox: boolean, id: string, filename: string, verbose?: boolean) => Promise<void>;
    file_delete: (sandbox: boolean, id: string, filename: string, verbose?: boolean) => Promise<void>;
    helpers_get_access_token_from_environment: (sandbox: boolean) => string;
    helpers_get_api: (sandbox: boolean) => string;
    helpers_validate_in_collection_value: (sandbox: boolean, collection_id: string, verbose?: boolean) => Promise<void>;
    metadata_update: (sandbox: boolean, id: string, filename?: string, verbose?: boolean) => Promise<void>;
};
export default _default;

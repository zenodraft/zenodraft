export declare type AnyDeposition = {
    conceptrecid: string;
    created: string;
    files: File[];
    id: number;
    links: {
        bucket: string;
        discard: string;
        edit: string;
        files: string;
        html: string;
        newversion: string;
        publish: string;
        registerconceptdoi: string;
        self: string;
        [any_extra_keys: string]: any;
    };
    metadata: {
        prereserve_doi: {
            doi: string;
            recid: number;
        };
        [any_extra_keys: string]: any;
    };
    modified: string;
    owner: number;
    record_id: number;
    state: string;
    submitted: boolean;
    title: string;
    [any_extra_keys: string]: any;
};
export declare type File = {
    checksum: string;
    filename: string;
    filesize: number;
    id: string;
    links: {
        download: string;
        self: string;
    };
};
export declare type HasDraft = {
    links: {
        latest_draft_html: string;
        latest_draft: string;
    };
};
export declare type HasLatest = {
    conceptdoi: string;
    doi: string;
    doi_url: string;
    links: {
        badge: string;
        conceptbadge: string;
        conceptdoi: string;
        doi: string;
        latest: string;
        latest_html: string;
    };
};

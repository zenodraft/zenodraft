export declare type DepositionsResponse = {
    conceptrecid: string;
    files: [
        {
            filename: string;
        }
    ];
    links: {
        bucket: string;
        latest: string;
        latest_draft?: string;
    };
    record_id: string;
};

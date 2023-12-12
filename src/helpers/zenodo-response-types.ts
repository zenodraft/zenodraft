export type DepositionsResponse = {
    conceptrecid: string
    files: [
        {
            filename: string
	    id: string
        }
    ]
    links: {
        bucket: string
        latest: string
	files: string
        latest_draft?: string
    }
    metadata: {
        prereserve_doi: {
            doi: string
        }
    }
    record_id: string
}

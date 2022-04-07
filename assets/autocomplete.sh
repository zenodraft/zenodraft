#/usr/bin/env bash
_zenodraft_completions()
{
    local history cur draft_id
    # Join the array elements from COMP_WORDS using forward slashes, 
    # chop off the uncompleted command from the right hand side,
    # remove the sandbox and verbose terms:
    history=$(echo "${COMP_WORDS[@]}" | sed -e 's# #/#g' | sed -e 's#[^/]*$##g' | sed -e 's#--sandbox/##g' | sed -e 's#-s/##g' | sed -e 's#--verbose/##g' | sed -e 's#-v/##g' | sed -e 's#-sv/##g' | sed -e 's#-vs/##g')

    # Set $cur to the subcommand that is currently being typed
    cur=${COMP_WORDS[COMP_CWORD]}

    draft_id=$(echo "${COMP_WORDS[@]:-1}" | sed -e 's#[^0-9]##g')

    # switch based on $history
    case ${history} in
        ${COMP_WORDS[0]}/)
            COMPREPLY=($(compgen -W "deposition file metadata" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/)
            COMPREPLY=($(compgen -W "create delete publish show" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/create/)
            COMPREPLY=($(compgen -W "concept version" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/create/version/)
            COMPREPLY=($(compgen -W "<concept_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/delete/)
            COMPREPLY=($(compgen -W "<record_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/publish/)
            COMPREPLY=($(compgen -W "<record_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/)
            COMPREPLY=($(compgen -W "details draft files latest prereserved" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/details/)
            COMPREPLY=($(compgen -W "<record_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/draft/)
            COMPREPLY=($(compgen -W "<concept_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/files/)
            COMPREPLY=($(compgen -W "<record_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/latest/)
            COMPREPLY=($(compgen -W "<concept_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/prereserved/)
            COMPREPLY=($(compgen -W "<record_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/)
            COMPREPLY=($(compgen -W "add delete" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/add/)
            COMPREPLY=($(compgen -W "<record_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/add/${draft_id}/)
            COMPREPLY=($(compgen -o filenames -A file -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/delete/)
            COMPREPLY=($(compgen -W "<record_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/delete/${draft_id}/)
            COMPREPLY=($(compgen -W "<remote_filename>"))
            ;;
        ${COMP_WORDS[0]}/metadata/)
            COMPREPLY=($(compgen -W "clear update" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/metadata/clear/)
            COMPREPLY=($(compgen -W "<record_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/metadata/update/)
            COMPREPLY=($(compgen -W "<record_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/metadata/update/${draft_id}/)
            COMPREPLY=($(compgen -o filenames -A file -- ${cur}))
            ;;
        *)
            COMPREPLY=()
            ;;
    esac
}
complete -F _zenodraft_completions zenodraft

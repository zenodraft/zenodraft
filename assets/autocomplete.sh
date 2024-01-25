#/usr/bin/env bash
_zenodraft_completions()
{
    local history cur version_id used_options
    # Join the array elements from COMP_WORDS using forward slashes, 
    # chop off the uncompleted command from the right hand side,
    # remove the sandbox and verbose and help terms:
    history=$(echo "${COMP_WORDS[@]}" | sed -e 's# #/#g' | sed -e 's#[^/]*$##g' | sed -e 's#/--help##g' | sed -e 's#/--sandbox##g' | sed -e 's#/-s##g' | sed -e 's#/--verbose##g' | sed -e 's#/-v##g' | sed -e 's#/-sv##g' | sed -e 's#/-vs##g')

    # Set $cur to the subcommand that is currently being typed
    cur=${COMP_WORDS[COMP_CWORD]}

    # Try to extract a string containing the version id, either as a plain number or as a variable
    version_id=$(echo ${COMP_WORDS[@]} | grep -e '\$[^\r\n\t\f\v ]*' -e '[0-9]*' -o)

    # Take all the words that have been entered so far, 
    # make them into a string; then use grep with exact matching
    # to select the options that have been used already;
    # concatenate them with the pipe symbol while ignoring
    # the last newline
    used_options=$(echo "${COMP_WORDS[@]}" | grep -F -e "--help" -e "--sandbox" -e "--verbose" -o | sed -z -e 's#\n#|#g' | sed 's/.$//') 

    # switch based on $history
    case ${history} in
        ${COMP_WORDS[0]}/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help deposition file metadata" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help create delete publish show" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/create/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help concept version" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/create/concept/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/create/version/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <concept_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/delete/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <version_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/publish/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <version_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help details draft files prereserved" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/details/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <version_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/draft/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <concept_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/files/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <version_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/deposition/show/prereserved/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <version_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help add delete" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/add/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <version_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/add/${version_id}/)
            COMPREPLY=($(compgen -o filenames -A file -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/delete/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <version_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/file/delete/${version_id}/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <remote_filename>"))
            ;;
        ${COMP_WORDS[0]}/metadata/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help clear update" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/metadata/clear/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <version_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/metadata/update/)
            COMPREPLY=($(compgen -X "*($used_options)" -W "--help --sandbox --verbose <version_id>" -- ${cur}))
            ;;
        ${COMP_WORDS[0]}/metadata/update/${version_id}/)
            COMPREPLY=($(compgen -o filenames -A file -- ${cur}))
            ;;
        *)
            COMPREPLY=()
            ;;
    esac
}
# nosort has no effect in some Bash versions (e.g. 4.4.20), set 
# $ bind "set completion-ignore-case off"
# to make it work
complete -o nosort -F _zenodraft_completions zenodraft

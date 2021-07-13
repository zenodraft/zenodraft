import * as commander from 'commander'


export const make_cli_route = (route: string, cmd: () => commander.Command) => {

    const parent_cmd_names = route.split(' ').reverse().slice(1).filter((name: string) => {return name.startsWith('-') === false})
    let command = cmd()
    for (const parent_cmd_name of parent_cmd_names) {
        command = wrap_command(parent_cmd_name, command)
    }
    command
        .option('-s, --sandbox', 'run on zenodo sandbox instead of regular zenodo', false)
        .option('-v, --verbose', 'verbose mode', false)
    return command
}



const wrap_command = (name: string, sub: commander.Command) => {

    return new commander.Command(name)
        .addCommand(sub)
        .enablePositionalOptions()
        .passThroughOptions()
}

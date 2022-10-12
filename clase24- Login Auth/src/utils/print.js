import util from 'util';

export function print(object) {
    console.log(
        util.inspect(object, false, 12, true)
    )
}

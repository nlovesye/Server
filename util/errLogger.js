const defaultError = {
    code: 500,
    msg: '服务器错误！'
}

const errLogger = (opt, err) => {
    if (!!err) {
        console.log('>>>>>', err)
    }
    if (opt === undefined) {
        console.log('>>>>>>>', defaultError.msg)
        return {
            ...defaultError
        }
    } else if (typeof opt === 'string') {
        console.log('>>>>>>>', opt)
        return {
            ...defaultError,
            msg: opt
        }
    } else {
        const msg = opt.msg || defaultError.msg
        console.log('>>>>>>>', msg)
        return {
            ...defaultError,
            ...opt,
            msg,
        }
    }
}

module.exports = errLogger
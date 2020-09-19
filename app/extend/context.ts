export default {
    success(data, status = 200, msg = '成功'){
        this.body = {
            retcode: status,
            msg: msg,
            data: data,
        }
    },
    error(status = 500, msg='错误'){
        this.body = {
            retcode: status,
            msg: msg,
        }
    }
}
import captcha from '../util/captcha'

export default {
    createCaptcha(){
        return captcha.createCaptcha(this.ctx)
    },
    verifyCaptcha(clientCode){
        captcha.verifyCaptcha(this.ctx, clientCode)
    }
}
import {Controller} from 'egg'

export default class UtilController extends Controller{
    public async captcha(){
        const { ctx } = this;
        ctx.body = ctx.helper.createCaptcha();
    }
}
import {create} from 'svg-captcha'

export default {
    createCaptcha(ctx){
        const captcha = create({
            size: 4,
            width: 120,
            height: 40,
            fontSize: 50,
            ignoreChars: 'Oo01iLIl',
            noise: 4,
            color: true,
            background: '#eee',
        })
        console.log('验证码:',captcha.text);
        ctx.session.captcha = {
            code: captcha.text,
            expire: Date.now() + 60*1000
        }
        return captcha.data;
    },
    verifyCaptcha(ctx, clientCode){
        const serverCaptcha = ctx.session.captcha;
        let serverCode;
        let serverExpire;
        try {
            serverCode = serverCaptcha.code;
            serverExpire = serverCaptcha.expire;
        }catch (e) {
            // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
            ctx.session.captcha = null;
            throw new Error('请重新获取验证码');
        }
        if (Date.now() > serverExpire) {
            ctx.session.captcha = null;
            throw new Error('验证码已经过期')
        } else if (serverCode !== clientCode) {
            ctx.session.captcha = null;
            throw new Error('验证码不正确')
        }
        ctx.session.captcha = null
    }
}
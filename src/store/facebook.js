class Facebook{

    initFbScript() {
        if(!this.scriptPromise) {
            this.scriptPromise = new Promise((resolve, reject) => {
                window.fbAsyncInit = () => {
                    window.FB.init({
                        appId      : '120359432010284',
                        cookie     : true,
                        autoLogAppEvents : true,
                        xfbml      : true,
                        version    : 'v2.12'
                    });
                    resolve();
                };
                if (typeof(window.FB) == 'undefined') {
                    ((d, s, id) => {
                        let js;
                        const fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    })(document, 'script', 'facebook-jssdk');
                }
            })
        }
        return this.scriptPromise;
    }

    getLoginStatus(callback) {
        return this.initFbScript().then(() => window.FB.getLoginStatus(callback));
    }
}

export default Facebook
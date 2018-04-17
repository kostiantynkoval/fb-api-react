class VK{

    initVKScript() {
        const VKPromise = new Promise((resolve, reject) => {

            if (typeof(window.VK) === 'undefined') {
                ((d, s, id) => {
                    let js;
                    const fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "https://vk.com/js/api/xd_connection.js?2";
                    fjs.parentNode.insertBefore(js, fjs);

                    window.addEventListener('load', resolve);

                })(document, 'script', 'vk-sdk');
            } else {
                resolve();
                console.log(window);
            }

        });

        VKPromise.then(this.initVK)
    }

    initVK() {
        console.log(window.VK);
        window.VK.init(function() {
            // API initialization succeeded
            console.log('Inited');

        }, function() {
            // API initialization failed
            console.log('NOT Inited');
        }, '5.74');
    }

}

export default VK
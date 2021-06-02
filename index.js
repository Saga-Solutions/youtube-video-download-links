const getScript = (url, id) => {
    return new Promise((resolve, reject) => {
        const http = require('http'),
            https = require('https');

        let client = http;

        const options = {
            hostname: 'api.y2mate.guru/api',
            port: 443,
            path: '/convert',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authority': 'api.y2mate.guru',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                'origin': 'https://en.y2mate.guru',
                'authority': 'api.y2mate.guru',
                'referer': 'https://en.y2mate.guru',
            }
        }

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.request(options, (resp) => {
            const data = JSON.stringify({
                url: `https://www.youtube.com/watch?v=${id}`
            })

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
};

module.exports = youtubeDownloadLinkCreator = async (link) => {
    return new Promise((resolve, reject) => {
        try {
            if (!link) {
                return reject(new Error("Invalid URL was provided"));
            }
            let id = "";
            try {
                let splited = link.split("?");
                if (splited.length === 1) {
                    id = link.split("/").pop();
                } else {
                    let elems = splited[1].split("&");
                    for (let i = 0; i < elems.length; i++) {
                        let query = elems[i].split("=");
                        if (query[0] == "v") {
                            id = query[1]
                            break;
                        }
                    }
                }
            } catch (er) { }
            if (!id) return reject(new Error("Invalid URL was provided"));
            let url = `https://api.y2mate.guru/api/convert`;
            getScript(url, id).then((data) => {
                let urlData = data;
                return resolve(urlData);
            }).catch((err) => {
                reject(new Error("Some error on URL data fetch"));
            })
        } catch (err) {
            return reject(new Error("Some error occured"));
        }
    });
}
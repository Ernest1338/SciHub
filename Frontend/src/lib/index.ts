const backendIp = "127.0.0.1";

export const backend = {
    get: async (endpoint: string, params : object): Promise<any> => {
        const result = await fetch(`http://${backendIp}:3000/${endpoint}`, params);
        return await result.json();
    },
    post: async (endpoint: string, params : object): Promise<any> => {
        const result = await fetch(`http://${backendIp}:3000/${endpoint}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        return await result.json();
    },
}

export const cookies = {
    get: (key: string | undefined) => {
        let cname = key + '=';
        let decoded_cookie = decodeURIComponent(document.cookie);
        let ca = decoded_cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) == 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return undefined;
    },
    set: (key: string, value: string) => {
        document.cookie = `${key}=${value};`;
    },
    delete: (key: string) => {
        document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}

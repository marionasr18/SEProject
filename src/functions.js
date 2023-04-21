import axios from "axios";
import { cloneDeep, isEmpty } from "lodash";

export async function FetchData(url, Type, params = null, datafilterfunction = () => true, controller) {
    try {
        let token = sessionStorage.getItem('auth');
        if (Type === 'get') {


            let queryparams = new URLSearchParams({ ...params });
            let resp = await axios({ method: 'get', 
            url: url + `${!isEmpty(params) ? `?${queryparams.toString()}` : ''}`, 
            crossDomain: true, signal: controller ? controller.signal : null,headers:{'Authorization':`Bearer ${token}`} });


            await awaitableTimeOut(100);
            return {
                ...cloneDeep(resp), data: resp.data

            }
        }
        else {
            let resp = await axios({
                method: 'post',
                signal: controller ? controller.signal : null,
                url: url,
                data: isEmpty(params) ? JSON.stringify({}) : JSON.stringify(params),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization':`Bearer ${token}`
                }
            });

            await awaitableTimeOut(100);

            return {
                ...cloneDeep(resp), data: resp.data

            }
            // await awaitableTimeOut(500);

            // let uri = new URL(url);
            // let MethodName = uri.href.substring(uri.href.lastIndexOf("/")).replace("/", '')
            // let r = resp.data[`${MethodName}Result`];
            // if (isEmpty(r)) {
            //     return []
            // }
            // else {
            //     return JSON.parse(r)
            // }


        }
    }
    catch (e) {
        throw e;
    }


}

export const awaitableTimeOut = (timeout) => new Promise((rs, rj) => {
    setTimeout(() => {
        rs(1)
    }, timeout);

})
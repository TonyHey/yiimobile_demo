let api = "",
    cdn = "",
    pclogin_qa = "http://account.qa1.tff.com"

if(process.env.NODE_ENV === "production") {
    api = "https://app.toursforfun.com"
    cdn = "http://dn-toursforfun.qbox.me/images/"
}else{
    api = "http://trest.qa1.tff.com"
    cdn = "http://dn-toursforfun.qbox.me/images/"
}

export const URL = api
export const CDN = cdn
export const PCLOGINQA = pclogin_qa

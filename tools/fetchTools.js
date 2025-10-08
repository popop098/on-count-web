import axios from "axios";

const {
    CHZZK_CLIENT_ID,
    CHZZK_CLIENT_SECRET,
} = process.env;

const deafultApiUrls = {
    endpoint: "https://openapi.chzzk.naver.com",
    token: "/auth/v1/token",
    me: "/open/v1/users/me",
    channels: (channelIds) => `/open/v1/channels?channelIds=${channelIds}`,
}

export const swrFetcher = (...args) => fetch(...args).then(res => res.json())

export const getAccessToken = async ({code, state}) => {
    const resp = await axios.post(deafultApiUrls.endpoint + deafultApiUrls.token, {
        grantType: 'authorization_code',
        code: code,
        clientId: CHZZK_CLIENT_ID,
        clientSecret: CHZZK_CLIENT_SECRET,
        state: state,
    });
    const { accessToken, refreshToken, expiresIn } = resp.data.content;
    return {
        accessToken,
        refreshToken,
        expiresIn,
    }
}

export const getMeInfo = async (accessToken) => {
    const resp = await axios.get(deafultApiUrls.endpoint + deafultApiUrls.me, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    const { channelId, channelName } = resp.data.content;
    return {
        channelId,
        channelName,
    }
}

export const getChannelsInfo = async (channelIds) => {
    const resp = await axios.get(deafultApiUrls.endpoint + deafultApiUrls.channels(channelIds), {
        headers: {
            'Client-Id': CHZZK_CLIENT_ID,
            'Client-Secret': CHZZK_CLIENT_SECRET,
            'Content-Type': 'application/json'
        },
    });
    return resp.data.content
}
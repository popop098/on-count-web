// pages/api/auth/callback.js

import { serialize } from 'cookie';
import { supabase } from '@/lib/supabaseClient';
import {
    getAccessToken,
    getMeInfo,
    getChannelsInfo
} from "@/tools/fetchTools";


export default async function handler(req, res) {
    const { code, state } = req.query;

    if (!code) {
        return res.status(400).send('Authorization code is missing.');
    }


    try {
        const tokenResponse = await getAccessToken({ code, state });
        const { accessToken, refreshToken, expiresIn } = tokenResponse

        const profileResponse = await getMeInfo(accessToken)

        const { channelId, channelName } = profileResponse

        // Check if the user exists and when they were last updated
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', channelId)
            .single();

        let follower_count = existingProfile?.follower_count || 0;
        let channel_imageUrl = existingProfile?.channel_image_url || null
        let verified_mark = existingProfile?.verified_mark || null


        // Determine if we need to refresh the channel info (new user or data is older than 24 hours)
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const shouldUpdate = !existingProfile || (existingProfile && new Date() - new Date(existingProfile.updated_at) > twentyFourHours);

        // If channelId exists and we need to update, fetch fresh channel info
        if (channelId && shouldUpdate) {
            try {
                const channelResponse = await getChannelsInfo(channelId)

                if (channelResponse.data.length > 0) {
                    const channelResponseData = channelResponse.data[0]
                    const {
                        followerCount,
                        channelImageUrl,
                        verifiedMark
                    } = channelResponseData
                    follower_count = followerCount
                    channel_imageUrl = channelImageUrl;
                    verified_mark = verifiedMark;
                }
            } catch (channelError) {
                console.error('Failed to fetch channel info:', channelError.response?.data || channelError.message);
                // If fetching fails, we keep the old follower count to prevent data loss from a temporary API failure.
                follower_count = existingProfile?.follower_count || 0;
            }
        }

        const { error } = await supabase
            .from('profiles')
            .upsert({ 
                id: channelId,
                channel_id: channelId,
                channel_name: channelName,
                channel_image_url: channel_imageUrl,
                follower_count: follower_count,
                verified_mark: verified_mark,
                updated_at: new Date(),
            }, { onConflict: 'id' })
            .eq('id', channelId)

        if (error) {
            console.error('Supabase error:', error);
            // Decide how to handle the error. Maybe redirect to an error page.
        }

        const accessTokenCookie = serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
            maxAge: expiresIn,
        });

        const refreshTokenCookie = serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
        });
        const userIdCookie = serialize('userId', channelId, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
        });

        res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie,userIdCookie]);
        res.redirect('/');

    } catch (error) {
        console.error('Failed during auth callback:', error.response?.data || error.message);
        res.status(500).send('Authentication failed.');
    }
}
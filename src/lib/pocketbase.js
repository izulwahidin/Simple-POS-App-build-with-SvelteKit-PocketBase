import {PUBLIC_POCKETBASE_URL, PUBLIC_POCKETBASE_PORT} from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from "svelte/store";

export const pb = new PocketBase(`${PUBLIC_POCKETBASE_URL}:${PUBLIC_POCKETBASE_PORT}`);
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('auth change', auth);
    currentUser.set(pb.authStore.model)
})
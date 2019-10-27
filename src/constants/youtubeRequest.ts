import axios from 'axios';

export const API_KEY = "AIzaSyBocMbCUtixbWRlErVp-4bY0ZAstxTqTis";
export const MAX_RESULT_COUNT = 10;

export const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/"
});
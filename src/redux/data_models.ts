export interface YoutubeResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    prevPageToken: string;
    regionCode: string;
    pageInfo: any;
    items: YoutubeVideoData[]
}

export interface YoutubeVideoData {
    kind: string;
    etag: string;
    id: YoutubeVideoDataId,
    snippet: YoutubeVideDataSnippet;
}

export interface YoutubeVideoDataId {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
}

export interface YoutubeVideDataSnippet {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: any;
    channelTitle: string;
    liveBroadcastContent: string;
}

export interface ChannelData {
    name: string;
    id: string;
}
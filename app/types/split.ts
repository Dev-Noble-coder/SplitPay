export interface Split {
    _id: string;
    name?: string;
    splitname?: string;
    priceForSplit?: number | string;
    splitCode?: string;
    userId?: string;
    username?: string;
    approved?: boolean;
}

export interface SplitsResponse {
    message: string;
    splitsfound?: number;
    availableSplit?: Split[];
    split?: Split[];
}

export interface JoinedSplitsResponse {
    message: string;
    totalsplitjoined: number;
    splitJoined: Split[];
}

export interface SplitInfoResponse {
    message: string;
    members?: any[];
    approvedMebers?: any[]; 
    estimetedUsers?: number; 
    creatorName?: string;
}

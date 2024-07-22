export interface AnalyticsData {
    website: WebsiteInfo;
    viewCount: number;
    sessionCount: number;
    sessionTime: SessionTime;
    deviceType: DeviceType;
    sourceType: SourceType;
    pagesViews: PagesViews;
    customEvents: CustomEvents;
    viewsHistogram: EventHistogram;
}

export interface WebsiteInfo {
    websiteID: string;
    websiteName: string;
    websiteURL: string;
}

export interface SessionTime {
    min: number;
    max: number;
    mean: number;
}

export interface DeviceType {
    desktop?: number;
    mobile?: number;
}

export interface SourceType {
    direct?: number;
    referral?: number;
    search?: number;
    internal?: number;
}

export interface PagesViews {
    [key: string]: number;
}

export interface CustomEvents {
    [key: string]: number;
}

interface EventHistogram {
    [date: string]: number;
}
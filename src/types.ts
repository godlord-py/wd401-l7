export type User = {
    id: number,
    name: string,
    email: string,
}

export type Matches = {
    id: number;
    name: string;
    location: string;
    sportName: string;
    endsAt: string;
    isRunning: boolean;
    teams: Teams[];
}

export type Teams = {
    id: number;
    name: string;
}

export type Articles = {
    id: number;
    title: string;
    thumbnail: string;
    sport: {
        id: number;
        name: string;
    };
    date: string;
    summary: string;
    teams: Teams[];
};

export type ArticleDetails = {
    id: number;
    title: string;
    summary: string;
    thumbnail: string;
    sport: {
        id: number;
        name: string;
    };
    date: string;
    content: string;
    teams: Teams[];
}
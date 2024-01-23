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
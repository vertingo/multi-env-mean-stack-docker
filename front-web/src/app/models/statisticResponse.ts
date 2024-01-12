export interface StatisticResponse {

    success: boolean;
    data: Statistic[];
    
}


export interface Statistic {

    gain: string;
    used: number;
    served: number;
    total: number;
    
}


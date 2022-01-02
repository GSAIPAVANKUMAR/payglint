export interface eventTableFilterPayload {
    currentPage?: number;
    perPage?: number;
    filters?: {
        severity?: { values: string[] };
        userId?: { values: string[] };
        deviceId?: { values: string[] };
        sessionId?: { values: string[] };
        checkpoint?: { values: string[] };
        requestId?: { values: string[] };
        status?: { values: string[] };
        amount?: { values: string[] };
        currency?: { values: string[] };
        destination?: { values: string[] };
        score?: { values: string[] };
    };
    ranges?: {
        bigEquals?: string;
        smallEquals?: string;
    };
    sort?: {
        fieldName?: string;
        order?: string;
    };
}

export interface screenEventTableFilterPayload {
    currentPage?: number;
    perPage?: number;
    filters?: {
        action?: { values: string[] };
        deviceId?: { values: string[] };
        id?: { values: string[] };
        screenId?: { values: string[] };
        screenListenerType?: { values: string[] };
        sessionId?: { values: string[] };
        userId?: { values: string[] };
        version?: { values: string[] };
    };
    ranges?: {
        bigEquals?: string;
        smallEquals?: string;
    };
    sort?: {
        fieldName?: string;
        order?: string;
    };
}

export interface reportChartFilterPayload {

}

export interface auditTrailTableFilterPayload {
    currentPage?: number;
    perPage?: number;
    filters?: {
        idFilter?: { values: string[] };
        methodFilter?: { values: string[] };
        pathFilter?: { values: string[] };
        resourceFilter?: { values: string[] };
        userNameFilter?: { values: string[] };
    }
    ranges?: {
        bigEquals?: string;
        smallEquals?: string;
    };
    sort?: {
        fieldName?: string;
        order?: string;
    };
}

export interface profileFilterPayload {
    currentPage?: number;
    perPage?: number;
    filters?: {
        emailFilter?: { values: string[] };
        idFilter?: { values: string[] };
        isUserVerifiedFilter?: { values: string[] };
        nameFilter?: { values: string[] };
        roleFilter?: { values: string[] };
    }
    ranges?: {
        bigEquals?: string;
        smallEquals?: string;
    };
    sort?: {
        fieldName?: string;
        order?: string;
    };
}

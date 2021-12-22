export interface eventTablePayload {
    amount?: number;
    checkpoint: string;
    currency?: string;
    destination?: string;
    deviceId?: string;
    increasingReasons?: string;
    json?: string;
    requestId?: string;
    score?: number;
    sessionId?: string;
    severity?: string;
    status?: string;
    timestamp?: Date;
    transactionType?: string;
    userId?: string;
}
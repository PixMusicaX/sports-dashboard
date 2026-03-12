import { MATCH_STATUS } from "../validation/matches.js";

export function getMatchStatus(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();

    // Fix: Corrected the parenthesis placement in the isNaN check
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return null;
    }

    if (now < start) {
        return MATCH_STATUS.SCHEDULED;
    }

    // Fix: Ensure the current time is past start but BEFORE end to be LIVE
    if (now >= start && now < end) {
        return MATCH_STATUS.LIVE;
    }

    // If it's not scheduled and not live, it must be finished
    return MATCH_STATUS.FINISHED;
}
export async function syncMatchStatus(match, updateStatus) {
    const nextStatus = getMatchStatus(match.startTime, match.endTime);

    if (!nextStatus) {
        return match.status;
    }

    if (match.status !== nextStatus) {
        await updateStatus(nextStatus);
        match.status = nextStatus;
    }

    return match.status;
}
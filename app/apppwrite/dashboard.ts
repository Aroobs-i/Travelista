import { appwriteConfig, database } from "./client";

interface Document {
    [key: string]: any,
}

type FilterByDate = (
    items: Document[],
    key: string,
    start: string,
    end?: string
) => number;

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
    const d = new Date();
    const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
    const startPrev = new Date(d.getFullYear(), d.getMonth() -1, 1).toISOString();
    const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();

    const [users, trips] = await Promise.all([
        database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId
        ),
        database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tripColletionId
        ),
    ])

    const filterByDate: FilterByDate = (items, key, start, end) => items.filter((item) => (
        item[key] >= start && (!end || item[key] <= end)
    )).length;

    const filterUsersByRole = (role: string) => {
        return users.documents.filter((u: Document) => u.status === role)
    }

    return {
        totalUsers: users.total,
        usersJoined: {
            currentMonth: filterByDate(
                users.documents,
                 'joinedAt',
                startCurrent,
                 undefined
            ),
            lastMonth: filterByDate(
                users.documents, 
                'joinedAt', 
                startPrev, 
                endPrev
            )
        },
        userRole: {
            total: filterUsersByRole('user').length,
            currentMonth: filterByDate(
                filterUsersByRole('user'),
                 'joinedAt',
                startCurrent,
                 undefined
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt', 
                startPrev, 
                endPrev
            )
        },
        totalTrips: trips.total,
        tripsCreated: {
            currentMonth: filterByDate(
                trips.documents,
                 'createdAt',
                startCurrent,
                 undefined
            ),
            lastMonth: filterByDate(
                trips.documents,
                 'createdAt',
                startPrev, 
                endPrev
            )
        }
    }
} 
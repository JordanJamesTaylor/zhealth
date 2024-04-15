import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import getIssueTickets from '../api/getIssueTicket';
import IssueTicketTable from './IssueTicketsTable';

const AdminPage = () => {
    // Get all tickets
    const ticketsQuery = useQuery({
        queryKey: ["tickets"],
        queryFn: getIssueTickets,
        staleTime: 1000 * 60 * 5
    });

    // Still fetching data = laoding screen
    if(ticketsQuery.isLoading) return <h1>Loading...</h1>;
    // Fetching failed = error msg
    if(ticketsQuery.isError) return <pre>{JSON.stringify(ticketsQuery.error)}</pre>;

    return (
        <Box sx={{ padding: '2.5rem'}}>
            <IssueTicketTable tickets={ticketsQuery} />
        </Box>
    );
};

export default AdminPage;
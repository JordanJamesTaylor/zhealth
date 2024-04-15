import React, {useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import getIssueTickets from '../api/getIssueTicket';
import IssueTicket from './issueTickets/IssueTicket';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AdminPage = () => {
    // Get all tickets
    const ticketsQuery = useQuery({
        queryKey: ["tickets"],
        queryFn: getIssueTickets,
    });        

    // Still fetching data = laoding screen
    if(ticketsQuery.isLoading) return <h1>Loading...</h1>
    // Fetching failed = error msg
    if(ticketsQuery.isError) return <pre>{JSON.stringify(ticketsQuery.error)}</pre>

    const setTicketRows = ticketsQuery.data.map((ticket) => {
        return (
            <IssueTicket
                key={ticket.name}
                id={ticket.id}
                ticket={ticket}
            />
        );
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '5% 5% 0 5%' }} >
            <Typography 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginTop: '5%',
                    fontSize: '2rem',
                    fontWeight: '700'
                }} 
            >
                Issue Tickets ({ticketsQuery.data.length})
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: '3rem'}} >
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Ticket Status</TableCell>
                            <TableCell>Change Status</TableCell>
                            <TableCell>Write Response</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {setTicketRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminPage;
import { CustomDataTable, HeaderItem } from '@/core/shared/components/CustomDataTable'
import PageTitle from '@/core/shared/components/PageTitle';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactNode, useEffect } from 'react'
import AssignReview from '../../components/review-request/AssignReview';
import { RootState, useAppDispatch, useAppSelector } from '@/core/state/store';
import { getAdminReports } from '@/modules/review-request/controllers/thunks/review-request-thunk';
import { ReviewRequestState } from '@/modules/review-request/controllers/types';
import { getAllUsers } from '@/modules/auth/controllers/thunks/auth-thunk';
import { allUsersState } from '@/modules/auth/controllers/types';
import { UserInterface } from '@/modules/auth/interfaces/user-interface';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
const ReportsPage = () => {

    const reviewRequestState: ReviewRequestState = useAppSelector(
        (state: RootState) => state.reviewRequestSlice
    )

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAdminReports());
        dispatch(getAllUsers());

    }, [])

    // get all radiologists //
    function formatRadiologists(users: UserInterface[], creator: string) {
        const usersArray: { id: string, value: string }[] = []
        users.map((user: UserInterface) => {
            if (user.role === 'RADIOLOGIST' &&
                ` ${user.radiologist?.fname} ${user.radiologist?.lname}` !== ` ${creator}`
            ) {
                usersArray.push({
                    id: user.id,
                    value: `${user.radiologist?.fname} ${user.radiologist?.lname}`
                });
            }
        });
        return usersArray;
    }
    const allRadiologistsState: allUsersState = useAppSelector(
        (state: RootState) => state.allUsersSlice
    )

    const getIcon = (status?: string): ReactNode => {
        switch (status) {
            case 'created':
                return <PersonAddAlt1RoundedIcon sx={{ mr: 1, color: 'secondary.main', fontSize: '1.3rem' }} />
            case 'Assigned':
                return <HourglassTopRoundedIcon sx={{ mr: 1, color: 'secondary.main', fontSize: '1.3rem' }} />
            case 'Reviewed':
                return <RefreshRoundedIcon sx={{ mr: 1, color: 'secondary.main', fontSize: '1.3rem' }} />
            case 'Completed':
                return <CheckRoundedIcon sx={{ mr: 1, color: 'secondary.main', fontSize: '1.3rem' }} />
            default:
                return <PersonAddAlt1RoundedIcon sx={{ mr: 1, color: 'secondary.main', fontSize: '1.3rem' }} />
        }
    }


    let newTableData: any[] = [];
    reviewRequestState.reports.forEach((item) => {
        newTableData.push({
            reportName: item.name ?? '-',
            reportAuther: item.creator?.fname + ' ' + item.creator?.lname,
            reportReviwer: item.reviewer === undefined ? <AssignReview id={item.id ?? ''} users={formatRadiologists(allRadiologistsState.users, item.creator?.fname + ' ' + item.creator?.lname)} /> : <Typography sx={{ fontSize: '0.8rem' }}>{item.reviewer?.fname + ' ' + item.reviewer?.lname}</Typography>,
            status:
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'Center', }}>
                    {getIcon(item.status)}
                    <Typography sx={{
                        fontSize: '0.8rem',
                        width: '5rem',
                        
                    }}>{item.status === 'Completed' ? 'Accepted' : item.status}</Typography>
                </Box>,
            score: item.score ?? '--',

        })
    })


    const header: HeaderItem[] = [
        {
            filterKey: "reportName",
            id: "reportName",
            label: "Name",
            minWidth: 50,
            tableCellProps: { align: "left" },
            showBorder: true,
        },
        {
            filterKey: "reportAuther",
            id: "reportAuther",
            label: "Report Auther",
            minWidth: 50,
            tableCellProps: { align: "left" },
        },
        {
            filterKey: "reportReviwer",
            id: "reportReviwer",
            label: "Report Reviwer",
            minWidth: 100,
            tableCellProps: { align: "left" },
            isComponent: true,
        },
        {
            filterKey: "status",
            id: "status",
            label: "Status",
            minWidth: 50,
            tableCellProps: { align: "left", },
            isComponent: true,
        },
        {
            filterKey: "score",
            id: "score",
            label: "Score",
            minWidth: 50,
            tableCellProps: { align: "left", },
            isComponent: true,
        },

    ];
    return (
        <>
            <PageTitle title='Reports' />
            <CustomDataTable
                data={newTableData}
                totalItems={newTableData.length}
                headerItems={header}
                fetchData={() => { }}
                showToolbar={false}
                showPagination={false}
                stickyHeader={true}
                boxShadow={0}
                height='71vh'
            />
        </>
    )
}

export default ReportsPage
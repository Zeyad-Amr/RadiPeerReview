import { CustomDataTable, HeaderItem } from '@/core/shared/components/CustomDataTable'
import PageTitle from '@/core/shared/components/PageTitle';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import AssignReview from '../../components/review-request/AssignReview';
import { RootState, useAppDispatch, useAppSelector } from '@/core/state/store';
import { getAdminReports } from '@/modules/review-request/controllers/thunks/review-request-thunk';
import { ReviewRequestState } from '@/modules/review-request/controllers/types';

const ReportsPage = () => {

    const reviewRequestState: ReviewRequestState = useAppSelector(
        (state: RootState) => state.reviewRequestSlice
    )

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAdminReports());
    }, [])

    console.log(reviewRequestState)

    let newTableData: any[] = [];
    reviewRequestState.reports.forEach((item) => {
        newTableData.push({
            reportName: item.name ?? '',
            reportAuther: item.creator?.fname + ' ' + item.creator?.lname,
            reportReviwer: item.reviewer === undefined ? <AssignReview id={item.id ?? ''} /> : <Typography sx={{ fontSize: '0.8rem' }}>{item.reviewer?.fname + ' ' + item.reviewer?.lname}</Typography>,
            status: <Typography sx={{
                fontSize: '0.8rem',
                color: item.approved ? 'green' : 'black'
            }}>{item.approved ? 'Accepted' : item.status}</Typography>,
        })
    })

    const header: HeaderItem[] = [
        {
            filterKey: "reportName",
            id: "reportName",
            label: "Name",
            minWidth: 50,
            tableCellProps: { align: "center" },
            showBorder: true,
        },
        {
            filterKey: "reportAuther",
            id: "reportAuther",
            label: "Report Auther",
            minWidth: 50,
            tableCellProps: { align: "center" },
            onClick: () => console.log("ahhhh"),
        },
        {
            filterKey: "reportReviwer",
            id: "reportReviwer",
            label: "Report Reviwer",
            minWidth: 100,
            tableCellProps: { align: "center" },
            isComponent: true,
        },
        {
            filterKey: "status",
            id: "status",
            label: "Status",
            minWidth: 100,
            tableCellProps: { align: "center", },
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
import { CustomDataTable, HeaderItem } from '@/core/shared/components/CustomDataTable'
import PageTitle from '@/core/shared/components/PageTitle';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import AssignReview from '../../components/reports/AssignReview';

const ReportsPage = () => {

    const data = [
        {
            reportName: 'report',
            reportAuther: 'Body',
            reportReviwer: 'Zeyad',
            status: 'Accepted',
            score: 85,
        },
        {
            reportName: 'report2',
            reportAuther: 'Body',
            reportReviwer: '',
            status: '',
            score: '',
        },
    ]

    let newTableData: any[] = [];
    data.forEach((item) => {
        newTableData.push({
            reportName: item.reportName,
            reportAuther: item.reportAuther,
            reportReviwer: item.reportReviwer === '' ? <AssignReview /> : <Typography sx={{ fontSize: '0.8rem' }}>{item.reportReviwer}</Typography>,
            status: <Typography sx={{
                fontSize: '0.8rem',
                color: item.status === 'Accepted' ? 'green' : 'black'
            }}>{item.status}</Typography>,
            score: item.score,
        })
    })

    const header: HeaderItem[] = [
        {
            filterKey: "reportName",
            id: "reportName",
            label: "Report Name",
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
        {
            filterKey: "score",
            id: "score",
            label: "Score",
            minWidth: 100,
            tableCellProps: { align: "center", },
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
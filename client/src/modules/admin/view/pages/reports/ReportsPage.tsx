import { CustomDataTable, HeaderItem } from '@/core/shared/components/CustomDataTable'
import { Box } from '@mui/system';
import React from 'react'

const ReportsPage = () => {

    const data = [
        {
            reportName: 'report',
            reportAuther: 'Body',
            reportReviwer: 'Zeyad',
            status: 'accepted',
            score: 85,
        },
    ]
    const header: HeaderItem[] = [
        {
            filterKey: "reportName",
            id: "reportName",
            label: "Report Name",
            minWidth: 50,
            tableCellProps: { align: "center" },
            showBorder: true,
            searchable: true,
            filterable: true,

        },
        {
            filterKey: "reportAuther",
            id: "reportAuther",
            label: "Report Auther",
            minWidth: 50,
            tableCellProps: { align: "center" },
            searchable: true,
            filterable: true,
            onClick: () => console.log("ahhhh"),
        },
        {
            filterKey: "reportReviwer",
            id: "reportReviwer",
            label: "Report Reviwer",
            minWidth: 100,
            tableCellProps: { align: "center" },
            searchable: true,
            filterable: true,


        },
        {
            filterKey: "status",
            id: "status",
            label: "Status",
            minWidth: 100,
            tableCellProps: { align: "center" },
            searchable: true,
            filterable: true,
        },
        {
            filterKey: "score",
            id: "score",
            label: "Score",
            minWidth: 100,
            tableCellProps: { align: "center" },
            searchable: true,
            filterable: true,
        },
    ];
    return (
        <CustomDataTable
            data={data}
            totalItems={data.length}
            headerItems={header}
            fetchData={() => { }}
            showToolbar={false}
            showPagination={false}
            stickyHeader={true}
            boxShadow={5}
        />
    )
}

export default ReportsPage
import { Box } from '@mui/system'
import React from 'react'

interface TableRowProps {
    data: string[][]
    light: boolean
}

const TableRow = ({ data, light }: TableRowProps) => {
    return (
        <>
            {data.map((dataEle: string[], i: number) =>
                <Box sx={{
                    display: 'flex', gap: 1, mt: 1, cursor: 'pointer'
                }} key={i}>

                    {dataEle.map((ele: string, i: number) =>
                        <Box key={i} sx={{
                            borderRadius: '0.5rem',
                            backgroundColor: light ? 'primary.dark' : 'primary.lighter',
                            color: light ? 'white' : 'primary.main',
                            padding: '0.75rem 2rem',
                            boxSizing: 'border-box',
                            flexBasis: i === 0 ? '66%' : '34%',
                            textAlign: 'center'
                        }}> {ele}</Box>
                    )
                    }
                </Box >
            )}
        </>
    )
}

export default TableRow
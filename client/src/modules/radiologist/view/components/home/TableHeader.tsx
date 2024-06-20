import { Box } from '@mui/system'
import React from 'react'

interface TableHeaderProps {
    header: string[]
    light: boolean
}

const TableHeader = ({ header, light }: TableHeaderProps) => {
    return (
        <Box sx={{
            display: 'flex', gap: 1, cursor: 'pointer'
        }}>
            {header.map((headerEle: string, i: number) =>
                <Box key={i} sx={{
                    borderRadius: '0.5rem',
                    backgroundColor: light ? 'white' : 'primary.main',
                    color: light ? 'primary.main' : 'white',
                    padding: '0.75rem 2rem',
                    boxSizing: 'border-box',
                    flexBasis: i === 0 ? '66%' : '34%',
                    textAlign: 'center',
                }}> {headerEle}</Box>
            )}
        </Box>
    )
}

export default TableHeader
import React from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

interface RadiologistTable {
    data: string[][]
    light: boolean
}

const RadiologistTable = ({ data, light }: RadiologistTable) => {
    return (
        <>
            <TableHeader header={data[0]} light={light} />
            <TableRow data={data.slice(1)} light={light}/>
        </>
    )
}

export default RadiologistTable
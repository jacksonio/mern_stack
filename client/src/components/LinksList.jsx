import React from 'react'
import {Link} from "react-router-dom";
import './styles.css'


export const LinksList = ({links}) => {

    if(!links.length) {
        return <p className='center'>
            No links available
        </p>
    }
    return (
        <table className={'responsive-table'}>
            <thead>
            <tr>
                <th>#</th>
                <th>Origin</th>
                <th>Shorted</th>
                <th>Link detail</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td className={'max_table_cell_width'}>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open link</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

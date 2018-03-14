import React from 'react';
// import { Link } from 'react-router-dom';

export const Single = ({jobSources, loading, handleEdit}) => {

    return (jobSources).map((jobSource, index) => {
        return (<tr key={index}>
            <td>{index + 1}.</td>
            <td>{jobSource.name}</td>
            <td>{jobSource.weburl}</td>
            <td>
                {jobSource.job_interval}
                {
                    jobSource.job_interval === 'other' && 
                    <span> ({jobSource.job_interval_details})</span>
                }
            </td>
            <td>{(jobSource.status) ? 'Active' : 'Inactive'}</td>
            <td>{jobSource.created_at}</td>
            <td>
                <button className="btn bg-maroon btn-flat" data-toggle="modal" data-target="#viewJobSourceModal" data-backdrop="static">
                    <i className="fa fa-search"title="View"></i>
                    &nbsp;View
                </button>

                <button className="btn bg-purple btn-flat" data-toggle="tooltip" data-placement="bottom" title="Schedule Job">
                    <i className="fa fa-cogs" aria-hidden="true"></i>
                    &nbsp;Schedule Job
                </button>
                
                <button className="btn bg-orange btn-flat" data-toggle="modal" data-target="#newScrapeRequestModal" data-backdrop="static" onClick={() => handleEdit(jobSource.id)}>
                    {(loading) ?
                        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> :
                        <i className="fa fa-pencil"></i>
                    }
                    &nbsp;Edit
                </button>
                
                <button className="btn bg-green btn-flat" data-toggle="tooltip" data-placement="bottom" title="View Jobs">
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    &nbsp;View Jobs
                </button>
            </td>
        </tr>)
    });
}
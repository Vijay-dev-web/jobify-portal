import React from 'react'
import Wrapper from '../assets/wrappers/Job';
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa';
import day from 'dayjs';
import JobInfo from './JobInfo';
import { Form, Link } from 'react-router-dom';

const Job = ({
  _id, company, position, createdAt, jobStatus, jobType, jobLocation
}) => {

  const date = day(createdAt).format("DD MM YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company?.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className='btn edit-btn'>Edit</Link>
          <Form method="post" action={`/dashboard/delete-job/${_id}`}>
            <button type="submit" className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job;
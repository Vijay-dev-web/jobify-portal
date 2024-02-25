import mongoose, { Mongoose, mongo } from 'mongoose';
import Job from '../models/job.js';
import { StatusCodes } from 'http-status-codes';
import dayjs from 'dayjs';
import { JOB_SORTING_OPTIONS, JOB_STATUS } from '../utils/constants.js';

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObj = {
    createdBy: req.user.userId
  };

  if (search) {
    queryObj.$or = [
      {
        company: {
          $regex: search,
          $options: "i"
        }
      },
      {
        position: {
          $regex: search,
          $options: "i"
        }
      }
    ];
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObj.jobStatus = jobStatus;
  }

  if (jobType && jobType !== 'all') {
    queryObj.jobType = jobType;
  }

  const sortKey = JOB_SORTING_OPTIONS[sort] || JOB_SORTING_OPTIONS[0];

  const totalJobsCount = await Job.countDocuments(queryObj);
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  console.log('queryObj : ', queryObj);
  const allJobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);
  const totalPages = Math.ceil(totalJobsCount / limit);

  res.status(StatusCodes.OK).json({
    totalJobsCount,
    currentPage: Number(page),
    allJobs,
    totalPages
  })
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({
    message: 'Job successfully created',
    job
  });
}

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id)
  res.status(StatusCodes.OK).json({ job });
}

export const editJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
  res.status(StatusCodes.OK).json({
    message: 'Job successfully edited',
    job
  });
}

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({
    message: 'job successfully deleted',
    job
  })
}

export const jobStats1 = async (req, res) => {
  //total on number of jobs in status declined, interview, pending
  //month applications received fo the last 6 months
  let jobStats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
      $group: {
        _id: "$jobStatus",
        count: {
          $sum: 1
        }
      }
    }
  ]);

  jobStats = jobStats.reduce((acc, item) => {
    const { _id: status, count } = item;
    acc[status] = count;
    return acc;
  }, {});

  const defaultStatus = {
    declined: jobStats['declined'] || 0,
    pending: jobStats['pending'] || 0,
    interview: jobStats['interview'] || 0
  };

  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt"
          },
          month: {
            $month: "$createdAt"
          }
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1
      }
    },
    {
      $limit: 6
    }
  ]);

  monthlyApplications = monthlyApplications.map((item) => {
    const { count, _id: { year, month } } = item;
    const date = dayjs().year(year).month(month - 1).format('MMM YYYY');
    return {
      date,
      count
    }
  }).reverse();

  res.status(StatusCodes.OK).json({
    defaultStatus,
    monthlyApplications
  });
};

export const jobStats = async (req, res) => {

  let defaultStats = {
  };
  let monthlyApplications = [];

  defaultStats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
      $group: {
        _id: '$jobStatus',
        count: {
          $sum: 1
        }
      }
    }
  ]);

  defaultStats = defaultStats.reduce((acc, item) => {
    const { _id: status, count } = item;
    if (Object.values(JOB_STATUS).includes(status)) {
      acc[status] = count;
    }
    return acc;
  }, {})

  monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt'
          },
          month: {
            $month: '$createdAt'
          }
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        '_id.year': -1,
        '_id.month': -1
      }
    },
    {
      $limit: 6
    }
  ]);

  monthlyApplications = monthlyApplications.reduce((acc, item) => {
    const { count, _id: { month, year } } = item;
    acc.push({
      date: dayjs().year(year).month(month - 1).format('MMM YY'),
      count
    });
    return acc;
  }, []).reverse();

  res.status(StatusCodes.OK).json({
    defaultStats,
    monthlyApplications
  })
};

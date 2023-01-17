
const insertMany = async (model, insertData) => {
  return await model.insertMany(insertData);
};

const create = async (model, insertData) => {
  return await model.create(insertData);
};

const remove = async (model, condition) => {
  return await model.remove(condition);
};

const find = async (model, condition, projection, skipObj) => {
  return await model.find(condition, projection, skipObj);
};

const findByPagination = async (model, condition, projection, skipObj, skip, limit) => {
  return await model.find(condition, projection, skipObj).skip(skip).limit(limit);
};

const findOne = async (model, condition, projection, skipObj) => {
  return await model.findOne(condition, projection, skipObj).collation({ locale: 'en', strength: 1 });
};

const distinct = async (model, key) => {
  return await model.distinct(key);
};

const aggrigate = async (model, condition, mapping, projection, skipObj, skip, limit) => {
  let aggr = []
  if (condition) {
    aggr.push(
      {
        $match: condition
      });
    if (mapping)
      aggr = aggr.concat(mapping);
  } else {
    aggr = mapping
  }
  if (projection) {
    aggr.push({ $project: projection })
  }
  return await model.aggregate(aggr);
};

const update = async (model, condition, updatedValues) => {
  return await model.update(condition, { $set: updatedValues }, { multi: true });
};

const updateArray = async (model, condition, updatedValues) => {
  return await model.update(condition, { $push: updatedValues });
};

const findOneAndUpdate = async (model, condition, updatedValues) => {
  return await model.findOneAndUpdate(
    condition,
    { $set: updatedValues },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

const countDocuments = async (model, query) => {
  return await model.countDocuments(query).collation({ locale: 'en', strength: 1 });
};

module.exports = {
  insertMany,
  create,
  remove,
  find,
  findByPagination,
  findOne,
  update,
  findOneAndUpdate,
  countDocuments,
  aggrigate,
  distinct,
  updateArray,
};

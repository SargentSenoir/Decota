let recordStatusList = ['active', 'inactive', 'deleted'];

let RecordStatusEnum = recordStatusList.reduce((result, item) => {
    const key = item.charAt(0).toUpperCase() + item.slice(1);
    result[key] = item;
    return result;
  }, {});

module.exports = {
    recordStatusList,
    RecordStatusEnum
}
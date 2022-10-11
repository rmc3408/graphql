const convertISOtoSQL = (data) => {
  let dateUnformatted;
  if (!data) { 
    dateUnformatted = new Date();
  } else {
    dateUnformatted = new Date(data);
  }
  const oldformat = dateUnformatted.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'medium' });
  const [date, time] = oldformat.split(', ');
  const [month, day, year] = date.split('/');
  const [hour, _] = time.split(' ');

  const newTime = `${year}-${month}-${day} ${hour}`;
  return newTime;
};

module.exports.convertISOtoSQL = convertISOtoSQL
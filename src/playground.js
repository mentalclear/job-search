const jobs = [
  { title: 'Angular Developer', org: 'Microsoft' },
  { title: 'Programmer', org: 'Google' },
  { title: 'Developer', org: 'Microsoft' },
];

console.log(jobs.filter(job => job.org === 'Microsoft'));

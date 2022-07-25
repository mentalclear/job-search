const jobs = [
  { title: 'Angular Developer', org: 'Microsoft' },
  { title: 'Programmer', org: 'Google' },
  { title: 'Developer', org: 'Microsoft' },
  { title: 'Developer', org: 'Google' },
];

console.log(jobs.filter(job => job.org === 'Microsoft' || job.title === 'Developer'));

const exec = require('child_process').exec;
const fs = require('fs');

const family = process.env.TASK_FAMILY;
const region = process.env.AWS_REGION;
const outfile = process.env.TASK_DEF_OUTFILE || 'taskdef.json';

const child = exec('aws ecs describe-task-definition --task-definition '+family+' --region '+region, (err, stdout) => {
  if (err) throw err;
  try {
    const parsed = JSON.parse(stdout);
  } catch (e) {
    console.error('error parsing returned JSON', stdout);
    throw e;
  }
  const newDef = {
    containerDefinitions: parsed.taskDefinition.containerDefinitions,
    family: family
  }
  fs.writeFileSync(outfile, JSON.stringify(newDef, null, 2));
});

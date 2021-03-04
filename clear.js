const fs = require('fs');
const path = require('path');
const builtPollutionPath = path.resolve(__dirname, './build/_snowpack');
if (fs.existsSync(builtPollutionPath)) {
  try {
    fs.rmSync(builtPollutionPath, { recursive: true, force: true });
    console.log('清理完成');
  } catch (e) {
    console.log(e.message);
  }
}

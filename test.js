const { spawn } = require("child_process");
const { remove } = require("fs-extra");
const gulp = require("gulp");

const watchTriggered = (changedFiles) => {
    if (!Array.isArray(changedFiles)) {
        changedFiles = [changedFiles];
    }
    console.log("Watch triggered! Changed files are: " + JSON.stringify(changedFiles));
};

console.log("Deleting other_project node_modules / package-lock.json if any");
Promise.all([
    remove("other_project/node_modules"),
    remove("other_project/package-lock.json"),
])

console.log("Starting files watch...");
const watchOutput = gulp.watch([
    "**/*",
    "!other_project/node_modules/**/*",
    "!other_project/package-lock.json*",
]);
watchOutput.on("add", watchTriggered);
watchOutput.on("change", watchTriggered);
watchOutput.on("unlink", watchTriggered);

console.log("Starting npm install of other_project...");
spawn("npm", ["install"], { cwd: "other_project" });
import { spawnSync } from "child_process";
import path from "path";
import { remote, version } from "./package.json";

function deploy() {
  const options = {
    cwd: path.resolve(__dirname, "./build"),
  };
  //push dist folder to deploy repo
  spawnSync("git", ["init"], options);
  console.log("Initialising Repository");
  spawnSync("git", ["init"], options);
  console.log("Adding remote url");
  spawnSync("git", ["remote", "add", remote.name, remote.gitPath], options);
  console.log("Add all files");
  spawnSync("git", ["add", ".", "--all"], options);
  console.log(`Commit with v${version}`);
  spawnSync("git", ["commit", "-m", `v${version}`], options);
  console.log("Push the changes to repo");
  spawnSync("git", ["push", "-f", remote.name, "master"], options);
}
deploy();

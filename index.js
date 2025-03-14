import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const git = simpleGit();
const path = "./data.json";

const startDate = moment("2022-01-01");
const endDate = moment("2022-12-31");

async function generateCommits() {
    for (let date = startDate.clone(); date.isBefore(endDate); date.add(1, 'day')) {
        const commitDate = date.format("YYYY-MM-DD HH:mm:ss");
        
        const commitCount = Math.floor(Math.random() * 10) + 1;

        for (let i = 0; i < commitCount; i++) {
            const data = { date: commitDate };

            await jsonfile.writeFile(path, data);

            await git.add([path])
                .commit(`Commit on ${commitDate}`, {
                    '--date': commitDate,
                }, {
                    env: {
                        GIT_AUTHOR_DATE: commitDate,
                        GIT_COMMITTER_DATE: commitDate
                    }
                });
        }
    }

    await git.push();
    console.log("All commits pushed successfully!");
}

generateCommits();

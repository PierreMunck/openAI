import got from 'got';

export class GitlabAction {

    constructor(giturl,apiKey) {
        this.http = got.extend({
            prefixUrl: `${giturl}/api/v4/`,
            responseType: 'json',
            headers: {
              'private-token': apiKey,
            },
          });
    }

    async query(path, options) {
        const response = await this.http(path, options).then(response => {
            console.log(response.statusCode);
            if(response.statusCode != 200) {

                console.log(`Unexpected status code: ${response.statusCode}`);
                throw new Error(`Unexpected status code: ${response.statusCode}`);
            }
            return response.body;
        });
        return response;
    }
    
    async mergeRequest(projectid, mergeRequestid) {
        const diffpath = `projects/${projectid}/merge_requests/${mergeRequestid}`;
        console.log(diffpath);
        return this.query(diffpath, {
            method: 'GET',
            responseType: 'json',
        });
    }
    
    async mergeRequestDiff(projectid, mergeRequestid) {
        const diffpath = `projects/${projectid}/merge_requests/${mergeRequestid}/diffs`;
        console.log(diffpath);
        return this.query(diffpath, {
            method: 'GET',
            responseType: 'json',
        });
    }
}